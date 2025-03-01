'use client'
// Import i18n
import { useTranslations } from 'next-intl';

import ContentView from './content';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


export default function HomePage() {
    const t = useTranslations('homePage');

    return (
        <div>
            <Navbar />
            <h1>{t('title')}</h1>
            <ContentView />
            <Footer />
        </div>
    );
}