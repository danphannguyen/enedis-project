'use client'
// Import i18n
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Import react
import { useEffect, useState } from 'react';

// Import custom services
import { EnedisApiService } from '@/services/enedis-api';

export default function HomePage() {
    const t = useTranslations('HomePage');
    const [data, setData] = useState<any>(null); // Utilisez 'any' ou définissez un type adapté pour 'data'
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const [error, setError] = useState<string | null>(null); // Gérer les erreurs


    useEffect(() => {
        // Fonction pour récupérer les données depuis l'API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/caching'); // Appel à /api/caching

                // Si la réponse est OK
                if (response.ok) {
                    const result = await response.json();
                    setData(result); // Stocker les données dans l'état
                    console.log('Données récupérées :', result); // Afficher les données dans la console
                } else {
                    setError('Une erreur est survenue.');
                }
            } catch (err) {
                setError('Une erreur est survenue lors de la récupération des données.');
                console.error(err); // Afficher l'erreur dans la console
            } finally {
                setLoading(false); // Changer l'état de chargement
            }
        };

        fetchData();
    }, []); // Le tableau vide [] signifie que l'effet se déclenche uniquement au montage du composant

    if (loading) return <div>Chargement...</div>; // Afficher un message de chargement
    if (error) return <div>{error}</div>; // Afficher l'erreur, s'il y en a une

    return (
        <>
            <div>
                <h1>{t('title')}</h1>
                <Link href="/about">{t('about')}</Link>
            </div>
            <div>
                <h1>Consommation d'énergie</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre> {/* Affichage des données */}
            </div>
        </>
    );
}