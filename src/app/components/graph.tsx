// Graph.tsx
'use client';

import { useTranslations } from 'next-intl';

import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface GraphProps {
    data: any;
    loading: boolean;
    error: string | null;
}

export default function Graph({ data, loading, error }: GraphProps) {
    const t = useTranslations('Chart');

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    const transformData = (rawData: any) => {
        if (!rawData) return { labels: [], datasets: [] };

        const labels = rawData.map((item: any) =>
            new Date(item.annee).getFullYear().toString()
        );

        // Trouver la valeur maximale des usages thermosensibles
        const maxMwh = Math.max(...rawData.map((item: any) => item.moyenne_usages_thermosensibles_mwh));

        const usagesThermosensibles = rawData.map(
            (item: any) => (item.moyenne_usages_thermosensibles_mwh / maxMwh) * 100 // Normalisation
        );

        const partThermosensible = rawData.map(
            (item: any) => item.moyenne_part_thermosensible
        );

        return {
            labels,
            datasets: [
                {
                    label: t('averageUses'),
                    data: usagesThermosensibles,
                    borderColor: "#0f1bb5",
                    backgroundColor: "#1423DC",
                    stack: "combined",
                    type: "bar" as const,
                },
                {
                    label: t('averagePart'), // Traduction du label
                    data: partThermosensible,
                    borderColor: "#698f23",
                    backgroundColor: "#698f23",
                    stack: "combined",
                    type: "line" as const,
                },
            ],
        };
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: t('chartTitle'),
            },
            legend: {
                position: "top" as const,
            },
        },
        responsive: true,
        scales: {
            y: {
                stacked: true,
            },
        },
    };

    return (
        <>
            <div className="w-full h-full flex items-center justify-center">
                {data && <Chart type="bar" data={transformData(data)} options={options} />}
            </div>
            {/* Debug <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
    );
}
