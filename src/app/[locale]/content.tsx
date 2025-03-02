// Import i18n
import { useTranslations } from 'next-intl';

// Imports custom components
import Graph from '../components/graph';
import Form from '../components/form';

// Imports from React
import { useState } from "react";


export default function ContentView() {
    const t = useTranslations('contentView');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [departement, setDepartement] = useState<string>(''); // État pour le département sélectionné
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (departement: string) => {
        if (!departement) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/caching?departement=${departement}`);
            if (response.ok) {
                const result = await response.json();
                setData(result.results);
                console.log('Données récupérées :', result.results);
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

    const handleFormSubmit = (departement: string) => {
        setDepartement(departement);
        fetchData(departement); // Charger les données pour ce département
    };

    return (
        <div id="content-wrapper">
            <section className="p-8 rounded-lg">
                <h1 id='content-section-title' className='text-2xl'>{t('titleGraph')}</h1>
                <Graph data={data} loading={loading} error={error}/>
            </section>
            <aside className="p-8 flex flex-col items-start justify-start rounded-lg gap-4">
                <h2 id='content-aside-title' className='text-2xl'>{t('titleAside')}</h2>
                <Form onSubmit={handleFormSubmit}/>
            </aside>
            <div id='content-description' className="p-8 rounded-lg flex flex-col items-start justify-start gap-2 overflow-y-scroll">
                <h2 id='content-description-title' className='text-2xl'>{t('titleDescription')}</h2>
                <p>{t('contentDescription')}</p>
                <div>Source : <a href="https://data.enedis.fr/api/datasets/1.0/consommation-electrique-par-secteur-dactivite-epci/attachments/note_methodologique_thermosensibilite_pdf/?utm_source=chatgpt.com">Data Enedis</a> & <a href="https://www.enedis.fr/presse/2e-panorama-thermosensibilite-action-coeur-de-ville?utm_source=chatgpt.com">Enedis</a>
                </div>
            </div>
            
        </div>
    );
}