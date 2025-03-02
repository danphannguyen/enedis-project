import Image from "next/image";


export default function Navbar() {

    return (
        <div id='navbar' className='fixed top-0 right-0 left-0 w-full flex items-center justify-between px-8'>
            <a className="py-2" href=""><Image id="navbar-logo" src="/icon/logo.svg" alt="" width={32} height={32} /></a>
            <nav id="navbar-link" className="flex gap-8 py-4">
                <a href="https://github.com/danphannguyen/enedis-project" target="_blank">Github</a>
                <a href="https://data.enedis.fr/explore/dataset/consommation-electrique-par-secteur-dactivite-commune/information" target="_blank">Open Data</a>
                <a href="https://observatoire.enedis.fr" target="_blank">Observatoire</a>
            </nav>
        </div>
    );
}