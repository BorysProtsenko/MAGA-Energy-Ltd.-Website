import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from 'next/image';
import useInView from '../hooks/useInView';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function About() {
  const [aboutRef, aboutInView] = useInView();
  const { t } = useTranslation('common');

  const leaderList = [
    { name: 'Biagio Mele', titleKey: 'leaderBiagioTitle', descKey: 'leaderBiagioDesc' },
    { name: 'Mark Ross', titleKey: 'leaderMarkTitle', descKey: 'leaderMarkDesc' },
    { name: 'David Tian', titleKey: 'leaderDavidTitle', descKey: 'leaderDavidDesc' },
    { name: 'Patrick Amantea', titleKey: 'leaderPatrickTitle', descKey: 'leaderPatrickDesc' },
  ];
  const leaderInViews = leaderList.map(() => useInView({ threshold: 0.2 }));

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <section className="w-full bg-black">
        <div className="relative w-full h-[60vh] sm:h-[75vh]">
          <Image
            src="/Hero3.png"
            alt="About MAGA Hero Background"
            fill
            className="object-cover object-top w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center animate-fade-in z-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
              {t('aboutTitle', 'About MAGA Energy Ltd.')}
            </h1>
            <p className="text-lg sm:text-xl text-white mt-4 drop-shadow-md">
              {t('aboutSubtitle', 'Built on innovation, integrity, and performance.')}
            </p>
          </div>
        </div>
      </section>

      {/* Shared Background Section */}
      <section className="relative w-full text-white px-6 py-16 sm:py-24 overflow-hidden">
        <Image
          src="/bluetogold.png"
          alt="Blue to Gold Background"
          fill
          className="object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* About Text */}
        <div
          ref={aboutRef}
          className={`relative z-20 max-w-4xl mx-auto text-center mb-20 transition-all duration-700 ease-out transform ${
            aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ul className="text-lg sm:text-xl leading-relaxed text-left list-disc pl-6">
            {t('aboutText', `MAGA Energy Ltd. is a private, Calgary-based oil and gas production company committed to operational excellence, sustainability, and responsible energy development. With a deep-rooted presence in Alberta’s energy landscape, we specialize in maximizing production while minimizing environmental impact.\n\nOur core operations are centered in key regions surrounding Edmonton, including Acheson, Berrymoor, Campbell, Golden Spike, Morinville, PKCU, Spruce Grove, St. Albert, Tofield, and Westlock. These areas are known for their rich resources, and we are proud to play a vital role in powering both local communities and broader markets.\n\nMAGA’s team is built on innovation, integrity, and performance. We take pride in doing energy right — with smart practices, modern tools, and a steadfast commitment to safety and efficiency.`)
              .split('\n')
              .filter(line => line.trim() !== '')
              .map((line, idx) => (
                <li key={idx} className="mb-4">{line.replace(/^•\s?/, '')}</li>
              ))
            }
          </ul>
        </div>

        {/* Leadership Section */}
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-white font-serif tracking-wide">
            {t('leadership', 'Our Leadership')}
          </h2>
          <div className="flex flex-col gap-16 text-left font-serif text-lg leading-relaxed">
            {leaderList.map((leader, idx) => {
              const [ref, inView] = leaderInViews[idx];
              return (
                <div
                  key={idx}
                  ref={ref}
                  className={`text-white border-l-4 border-brand-gold pl-6 transform transition-all duration-700 ease-out hover:scale-[1.03] ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${idx * 0.3}s` }}
                >
                  <h3 className="text-2xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-md italic mb-2 text-brand-gold">{t(leader.titleKey)}</p>
                  <p>{t(leader.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
