import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function Opportunities() {
  const { t } = useTranslation('common');
  return (
    <>
      <NavBar />
      <main
        className={`relative min-h-screen flex flex-col items-center justify-center text-white py-24 px-4 animate-fade-in ${geistSans.className} ${geistMono.className}`}
        style={{
          backgroundImage: `url('/bluetogold.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: '#25388f',
        }}
      >
        {/* Background image layer */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bluetogold.png"
            alt="Blue to Gold Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative z-10 max-w-3xl w-full flex flex-col gap-12">
          <h1 className="text-5xl font-extrabold mb-8 text-center">{t('businessOpportunitiesMain')}</h1>
          <section>
            <h2 className="text-2xl font-bold mb-2">{t('g2pMain').split('\n')[0]}</h2>
            <p className="mb-4">{t('g2pMain').split('\n').slice(1).join(' ')}</p>
            <h2 className="text-2xl font-bold mb-2 mt-6">{t('resourcesMain').split('\n')[0]}</h2>
            <p>{t('resourcesMain').split('\n')[1]}</p>
            <p className="mt-2">{t('resourcesMain').split('\n')[2]}</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 