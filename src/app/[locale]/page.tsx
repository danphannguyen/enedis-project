'use client'
// Import i18n
import { useTranslations } from 'next-intl';
import GraphView from './graph';


export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <div>
            <h1>{t('title')}</h1>
            <GraphView />
        </div>
    );
}