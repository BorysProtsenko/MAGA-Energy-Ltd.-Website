import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

// Move regions array outside the component to fix invalid hook call
const regions = [
  {
    name: 'Westlock',
    descKey: 'westlockDesc',
    image: '/westlock.jpg',
  },
  {
    name: 'St. Albert, Campbell, Morinville',
    descKey: 'stAlbertDesc',
    image: '/ghostpine.jpg',
  },
  {
    name: 'Acheson, Golden Spike',
    descKey: 'achesonDesc',
    image: '/archeson.jpg',
  },
  {
    name: 'Pembina, Berrymoor',
    descKey: 'pembinaDesc',
    image: '/berrymoor.jpeg',
  },
  {
    name: 'Tofield',
    descKey: 'tofieldDesc',
    image: '/tofield.jpg',
  },
];

export default function Operations() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const { t } = useTranslation('common');

  // Remove icon mapping arrays
  // const regionIcons = [...];
  // const miniMapIcon = [...];

  const sectionRefs = regions.map(() => useInView({ threshold: 0.6 }));

  useEffect(() => {
    sectionRefs.forEach(([_, inView], idx) => {
      if (inView) setVisibleIndex(idx);
    });
  }, [sectionRefs.map(([_, inView]) => inView).join()]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMap(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar />

      <main
        className="relative min-h-screen flex flex-col lg:flex-row text-white animate-fade-in"
        style={{
          backgroundImage: `url('/bluetogold.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 py-28 px-6 z-20">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white text-center mb-24 drop-shadow-lg tracking-wide">
            {t('operationsTitle')}
          </h1>

          {/* Explanatory paragraph and icons */}
          <div className="mb-[24vh] flex flex-col items-center">
            <p className="text-lg text-gray-200 max-w-2xl text-center mb-8">
              {t('operationsIntro')}
            </p>
            {/* Icons row */}
            <div className="flex gap-10 justify-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 mb-2"
                  style={{
                    maskImage: 'url(/icons/efficiency.svg)',
                    WebkitMaskImage: 'url(/icons/efficiency.svg)',
                    maskSize: 'cover',
                    WebkitMaskSize: 'cover',
                    backgroundColor: '#FF9900',
                  }}
                />
                <span className="text-brand-gold font-semibold">{t('btcMining')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 mb-2"
                  style={{
                    maskImage: 'url(/icons/innovation.svg)',
                    WebkitMaskImage: 'url(/icons/innovation.svg)',
                    maskSize: 'cover',
                    WebkitMaskSize: 'cover',
                    backgroundColor: '#006699',
                  }}
                />
                <span className="text-brand-gold font-semibold">{t('oil')}</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 mb-2"
                  style={{
                    maskImage: 'url(/icons/gas.svg)',
                    WebkitMaskImage: 'url(/icons/gas.svg)',
                    maskSize: 'cover',
                    WebkitMaskSize: 'cover',
                    backgroundColor: '#FF0000', // red
                  }}
                />
                <span className="text-brand-gold font-semibold">{t('gas')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[60vh]">
            {regions.map((region, idx) => {
              const [ref] = sectionRefs[idx];
              // Icon mapping for each region title
              const regionIcons = [
                // Westlock: Gas and BTC
                [
                  { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                  { src: '/icons/efficiency.svg', alt: 'BTC', color: '#FF9900' },
                ],
                // St. Albert: Gas
                [
                  { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                ],
                // Acheson: Oil and Gas
                [
                  { src: '/icons/innovation.svg', alt: 'Oil', color: '#006699' },
                  { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                ],
                // Pembina: Oil and Gas
                [
                  { src: '/icons/innovation.svg', alt: 'Oil', color: '#006699' },
                  { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                ],
                // Tofield: BTC only
                [
                  { src: '/icons/efficiency.svg', alt: 'BTC', color: '#FF9900' },
                ],
              ];
              return (
                <div
                  key={idx}
                  ref={ref}
                  className="min-h-[100vh] flex flex-col gap-8"
                >
                  <div className="transition duration-300">
                    <h3
                      className={`text-4xl font-bold mb-4 flex items-center gap-3 ${
                        visibleIndex === idx ? 'text-brand-gold' : 'text-white'
                      }`}
                    >
                      {region.name}
                      <span className="flex gap-2 ml-2">
                        {regionIcons[idx].map((icon, i) => (
                          <span key={i} className="inline-block w-10 h-10">
                            <span
                              style={{
                                maskImage: `url(${icon.src})`,
                                WebkitMaskImage: `url(${icon.src})`,
                                maskSize: 'cover',
                                WebkitMaskSize: 'cover',
                                backgroundColor: icon.color,
                                display: 'inline-block',
                                width: '100%',
                                height: '100%',
                              }}
                              title={icon.alt}
                            ></span>
                          </span>
                        ))}
                      </span>
                    </h3>
                    <Image
                      src={region.image}
                      alt={region.name}
                      width={600}
                      height={350}
                      className="rounded-lg shadow-lg mb-4 object-cover"
                    />
                    <p className="text-lg text-gray-200">
                      {t(region.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sticky Map Sidebar */}
        <div className={`hidden lg:block sticky top-0 self-start z-10 w-[60%] h-screen overflow-hidden relative transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${showMap ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
          <div className="relative w-full h-[80%] top-0">
            <Image
              src="/CanadaMap.png"
              alt="Canada Map"
              fill
              className="object-contain rounded-none"
              priority
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 35%, black 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, black 35%, black 100%)',
              }}
            />
          </div>
          {/* Mini map and area info at bottom left of Canada map */}
          <div className="absolute bottom-0 left-[20%] flex flex-row items-end gap-6 w-[calc(100%-2rem)] max-w-full z-50">
              {/* Mini map */}
              <div className="w-[24.5rem] h-[15.5rem] relative border-4 border-black rounded-xl overflow-hidden bg-black">
                {/* Tablet button */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-gray-300 shadow-md z-30" />
                {/* Removed miniMapIcon overlays here, just show images */}
                {[
                  '/WestLockMini.png',      // Westlock
                  '/StAlbertMini1.png',     // St. Albert, Campbell, Morinville
                  '/AchesonMini.png',      // Acheson, Golden Spike
                  '/PembinaMIni.png',      // Pembina, Berrymoor
                  '/ToFieldMini.jpg',      // Tofield
                ].map((src, idx) => {
                  // Mini icon mapping for each region
                  const miniIcons = [
                    // Westlock: BTC and Gas
                    [
                      { src: '/icons/efficiency.svg', alt: 'BTC', color: '#FF9900' },
                      { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                    ],
                    // St. Albert: Gas
                    [
                      { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                    ],
                    // Acheson: Oil and Gas
                    [
                      { src: '/icons/innovation.svg', alt: 'Oil', color: '#006699' },
                      { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                    ],
                    // Pembina: Oil and Gas
                    [
                      { src: '/icons/innovation.svg', alt: 'Oil', color: '#006699' },
                      { src: '/icons/gas.svg', alt: 'Gas', color: '#FF0000' },
                    ],
                    // Tofield: BTC only
                    [
                      { src: '/icons/efficiency.svg', alt: 'BTC', color: '#FF9900' },
                    ],
                  ];
                  return (
                    <div
                      key={src}
                      className={`absolute w-full h-full transition-all duration-700 ease-out ${visibleIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                      style={{ zIndex: visibleIndex === idx ? 20 : 10 }}
                    >
                      <Image
                        src={src}
                        alt={`Mini map ${idx + 1}`}
                        fill
                        className="object-contain"
                        priority={visibleIndex === idx}
                      />
                      {/* Mini icons at top right, stacked if two */}
                      <div
                        className="absolute top-2 flex flex-col items-end gap-1"
                        style={idx === 4 ? { right: '0.5rem' } : idx === 3 ? { right: '0rem' } : { right: '0.25rem' }}
                      >
                        {miniIcons[idx].map((icon, i) => (
                          <span
                            key={i}
                            className="w-7 h-7"
                            style={{
                              maskImage: `url(${icon.src})`,
                              WebkitMaskImage: `url(${icon.src})`,
                              maskSize: 'cover',
                              WebkitMaskSize: 'cover',
                              backgroundColor: icon.color,
                              display: 'inline-block',
                            }}
                            title={icon.alt}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Area info text */}
              <div className="bg-black/70 text-white rounded-lg p-4 max-w-xs min-w-[180px] shadow-lg transition-all duration-700">
                {[
                  t('miniWestlockInfo'),
                  t('miniStAlbertInfo'),
                  t('miniAchesonInfo'),
                  t('miniPembinaInfo'),
                  t('miniTofieldInfo'),
                ][visibleIndex]}
              </div>
            </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}