import Image from "next/image";


export default function Footer() {

    return (
        <div id='footer' className='fixed bottom-0 right-0 left-0 w-full flex items-center justify-center py-4'>
            <Image id="footer-logo" src="/icon/logo-footer.svg" alt="" width={128} height={128}/>
        </div>
    );
}