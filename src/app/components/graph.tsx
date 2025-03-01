'use client'
// Import react
import { useEffect, useState } from 'react';

export default function Graph() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null); // Utilisez 'any' ou définissez un type adapté pour 'data'
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const [error, setError] = useState<string | null>(null); // Gérer les erreurs

    useEffect(() => {
        // Fonction pour récupérer les données depuis l'API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/caching');

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                    console.log('Données récupérées :', result);
                } else {
                    setError('Une erreur est survenue.');
                }
            } catch (err) {
                setError('Une erreur est survenue lors de la récupération des données.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Chargement...</div>; // Afficher un message de chargement
    if (error) return <div>{error}</div>; // Afficher l'erreur, s'il y en a une

    return (
        <>
            <pre>{JSON.stringify(data, null, 2)}</pre>{/*  Affichage des données */}
        </>

    );
}