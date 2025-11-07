import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation('common');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const mailtoLink = `mailto:bprotsenko@magaenergy.ca?subject=Message from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;

    window.location.href = mailtoLink;
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen px-4 sm:px-8 py-28 text-white bg-gradient-to-br from-[#25388f] to-[#1a1a40] animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-12 drop-shadow-md">
          {t('contactTitle')}
        </h1>

        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-12">
          {/* Contact Info */}
          <div className="w-full max-w-xl bg-white/10 p-8 sm:p-12 rounded-xl backdrop-blur-sm shadow-lg text-white transition duration-700 opacity-0 animate-fade-in-up text-lg sm:text-xl">
            <h2 className="text-2xl font-bold text-brand-gold mb-4">MAGA ENERGY</h2>
            <p className="text-md leading-relaxed">
              9th Floor, 900 6 Avenue SW,<br />
              Calgary, AB T2P 3K2<br /><br />
              <strong>{t('phone')}:</strong> 1-855-MAGA-855 (1-855-624-2855)<br />
              <strong>{t('emailLabel')}:</strong>{' '}
              <a href="mailto:land@magaenergy.ca" className="underline text-brand-gold">
                land@magaenergy.ca
              </a><br /><br />
              <strong>{t('emergency')}:</strong><br />
              1-403-770-6821
            </p>
          </div>
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
