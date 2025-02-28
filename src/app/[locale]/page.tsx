'use client'
// Import i18n
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Import react
import { useEffect } from 'react';

// Import custom services
import { EnedisApiService } from '@/services/enedis-api';

export default function HomePage() {
    const t = useTranslations('HomePage');

    useEffect(() => {
        async function fetchDataGraph(nomDepartement: string) {
            try {
                const filters = {
                    conso_moyenne_usages_thermosensibles_mwh: 0,
                    part_thermosensible: 0,
                    nom_departement: nomDepartement
                };
                const data = await EnedisApiService.getConsumptionByDepartment(filters, 50);
                console.log("Données Enedis :", data);
            } catch (error) {
                console.error("Erreur :", error);
            }
        }

        fetchDataGraph("Aisne"); // Remplace "Paris" par un département dynamique si nécessaire
    }, []);

    return (
        <div>
            <h1>{t('title')}</h1>
            <Link href="/about">{t('about')}</Link>
        </div>
    );
}