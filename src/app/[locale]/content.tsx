// Import i18n
import { useTranslations } from 'next-intl';

import Graph from '../components/graph';
import Form from '../components/form';

import { useState } from "react";




export default function ContentView() {
    const t = useTranslations('contentView');

    const [departement, setDepartement] = useState<string>(''); // État pour le département sélectionné
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
            <div id='content-description' className="p-8 rounded-lg flex flex-col items-start justify-start gap-2 overflow-scroll">
                <h2 id='content-description-title' className='text-2xl'>{t('titleDescription')}</h2>
                <p>La thermosensibilité, selon Enedis, désigne la variation de la consommation électrique en fonction des températures extérieures. Elle reflète l'influence de la température sur l'utilisation de l'énergie, notamment pour le chauffage en hiver et la climatisation en été. Par exemple, une baisse de température d'un degré peut entraîner une augmentation de la consommation de 10 kWh, ce qui correspond à une thermosensibilité de 10 kWh/degré-jour. Enedis fournit des données sur la thermosensibilité pour aider les collectivités locales à établir des diagnostics énergétiques et orienter leurs politiques de rénovation énergétique.</p>
                <div>Source : <a href="https://data.enedis.fr/api/datasets/1.0/consommation-electrique-par-secteur-dactivite-epci/attachments/note_methodologique_thermosensibilite_pdf/?utm_source=chatgpt.com">Data Enedis</a> & <a href="https://www.enedis.fr/presse/2e-panorama-thermosensibilite-action-coeur-de-ville?utm_source=chatgpt.com">Enedis</a>
                </div>
            </div>
            
        </div>
    );
}