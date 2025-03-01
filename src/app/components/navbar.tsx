

export default function Navbar() {

    return (
        <div id='navbar' className='fixed top-0 right-0 left-0 w-full flex items-center justify-between px-8'>
            <a className="py-2" href=""><img id="navbar-logo" src="/icon/logo.svg" alt="" /></a>
            <nav id="navbar-link" className="flex gap-8 py-4">
                <a href="https://github.com/danphannguyen/enedis-project">Github</a>
                <a href="https://data.enedis.fr/explore/dataset/consommation-electrique-par-secteur-dactivite-commune/information">Open Data</a>
                <a href="https://observatoire.enedis.fr">Observatoire</a>
            </nav>
        </div>
    );
}