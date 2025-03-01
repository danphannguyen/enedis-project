// Import i18n
import { useTranslations } from 'next-intl';




export default function ContentView() {
    const t = useTranslations('contentView');

    return (
        <div id="content-wrapper">
            <section className="p-8 rounded-lg">
                <h1 id='content-section-title' className='text-2xl'>{t('titleGraph')}</h1>
            </section>
            <aside className="p-8 flex items-start justify-center rounded-lg">
                <h2 id='content-aside-title' className='text-2xl'>{t('titleAside')}</h2>
            </aside>
            
        </div>
    );
}