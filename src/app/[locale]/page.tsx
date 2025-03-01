'use client'
// Import i18n
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Import react
import { useEffect } from 'react';

// Import custom services
import { EnedisApiService } from '@/services/enedis-api';

// Import redis
import redis from '@/lib/redis'

export default function HomePage() {
    const t = useTranslations('HomePage');

    useEffect(() => {
        async function fetchDataGraph(nomDepartement: string) {
            // Try to retrieve data from Redis cache
            const cachedData = await redis.get(nomDepartement);
            if (cachedData) {
                console.log('Serving from cache');
                console.log(cachedData)
                return cachedData;
            } else {
                try {
                    const filters = {
                        conso_moyenne_usages_thermosensibles_mwh: 0,
                        part_thermosensible: 0,
                        nom_departement: nomDepartement
                    };
                    const data = await EnedisApiService.getConsumptionByDepartment(filters, 50);
                    redis.setex(nomDepartement, 3600, JSON.stringify(data));

                    console.log('Serving from Enedis API');
                    console.log(data)
                    return data
                } catch (error) {
                    console.error("Erreur :", error);
                }
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