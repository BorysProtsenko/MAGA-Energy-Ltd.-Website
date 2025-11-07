import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useInView from '../hooks/useInView';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function Home() {
  const { t } = useTranslation('common');

  const features = [
    {
      id: 'innovation',
      title: t('innovationTitle'),
      desc: t('innovationDesc'),
      align: 'right',
      href: '/about',
      glow: '#006699',
    },
    {
      id: 'sustainability',
      title: t('sustainabilityTitle'),
      desc: t('sustainabilityDesc'),
      align: 'left',
      href: '/operations',
      glow: '#32CD32',
    },
    {
      id: 'efficiency',
      title: t('efficiencyTitle'),
      desc: t('efficiencyDesc'),
      align: 'right',
      href: '/contact',
      glow: '#FF9900',
    },
  ];

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <section className="w-full bg-black">
        <div className="relative w-full h-screen">
          <Image
            src="/Hero3.png"
            alt="Oil and gas operations"
            fill
            className="object-cover object-top w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center px-4 pt-24 pb-40 text-center animate-fade-in z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-white mt-4 drop-shadow-md">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Zigzag Icon Section */}
      <div className={`${geistSans.className} ${geistMono.className} grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-b from-black to-gray-900 -mt-20`}>
        <section className="w-full py-16 px-4 bg-brand-black">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {features.map((card, index) => {
              const [ref, visible] = useInView();

              return (
                <div
                  ref={ref}
                  key={index}
                  style={{ transitionDelay: `${index * 0.3}s` }}
                  className={`flex flex-col sm:flex-row ${card.align === 'left' ? 'sm:flex-row-reverse' : ''} items-center gap-6 transition-all duration-700 ease-out transform ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
                >
                  <div className="flex-1 text-white text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-brand-gold mb-2">{card.title}</h3>
                    <p className="text-gray-300 text-sm">{card.desc}</p>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <a href={card.href} className="relative group w-24 h-24">
                      {/* Icon base */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          maskImage: `url("/icons/${card.id}.svg")`,
                          WebkitMaskImage: `url("/icons/${card.id}.svg")`,
                          maskSize: 'cover',
                          WebkitMaskSize: 'cover',
                          backgroundColor: '#ffffff',
                        }}
                      />
                      {/* Neon glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                        style={{
                          maskImage: `url("/icons/${card.id}.svg")`,
                          WebkitMaskImage: `url("/icons/${card.id}.svg")`,
                          maskSize: 'cover',
                          WebkitMaskSize: 'cover',
                          backgroundColor: card.glow,
                          boxShadow: `0 0 25px 8px ${card.glow}`,
                        }}
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

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
