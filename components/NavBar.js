import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { t } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lng) => {
    router.push(router.pathname, router.asPath, { locale: lng });
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const languages = [
    { code: 'en', label: 'English', flag: '/flags/canada.png' },
{ code: 'fr', label: 'Français', flag: '/flags/france.png' },
{ code: 'zh', label: '中文', flag: '/flags/china.png' },

  ];

  const currentLang = languages.find((l) => l.code === router.locale) || languages[0];

  return (
    <nav
      className={`bg-[#2c2c2c] border border-gray-700 fixed top-0 w-full z-[999] text-gray-100 px-6 py-4 shadow-md transition-transform duration-300 ${
        showNav ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Language Selector */}
<div className="relative">
  <button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="flex items-center gap-2 px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-500 transition duration-300"
  >
    <Image src={currentLang.flag} alt={currentLang.label + ' Flag'} width={20} height={15} />
    {currentLang.label}
  </button>
  {dropdownOpen && (
    <div className="absolute mt-2 bg-[#2c2c2c] text-white rounded shadow z-50 w-40 border border-gray-700">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-white hover:text-blue-500 transition"
        >
          <Image src={lang.flag} alt={lang.label} width={20} height={15} />
          {lang.label}
        </button>
      ))}
    </div>
  )}
</div>


        {/* Logo */}
        <Link href="/" passHref>
          <div className="cursor-pointer relative h-12 w-[180px] ml-6">
            <Image
              src="/MagaEnergy1.png"
              alt="Maga Energy Logo"
              fill
              className="object-contain brightness-175"
              priority
            />
          </div>
        </Link>

        {/* Nav Links */}
        <ul className="hidden sm:flex items-center gap-6 text-base font-semibold ml-auto">
          <li>
            <Link href="/" locale={router.locale}>
              <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-500 transition capitalize">
                {t('home')}
              </button>
            </Link>
          </li>
          <li>
            <Link href="/about" locale={router.locale}>
              <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-500 transition capitalize">
                {t('about')}
              </button>
            </Link>
          </li>
          <li>
            <Link href="/operations" locale={router.locale}>
              <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-500 transition capitalize">
                {t('operations')}
              </button>
            </Link>
          </li>
          <li>
            <Link href="/opportunities" locale={router.locale}>
              <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-500 transition capitalize">
                {t('opportunities')}
              </button>
            </Link>
          </li>
          <li>
            <Link href="/contact" locale={router.locale}>
              <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-500 transition capitalize">
                {t('contact')}
              </button>
            </Link>
          </li>
          <li className="relative flex items-center gap-3">
            <a
              href="tel:1-855-624-2855"
              className="px-5 py-2 rounded-full border border-white bg-[#FFD700] text-black hover:bg-white hover:text-blue-500 transition duration-300 font-semibold capitalize"
            >
              {t('callUs')}
            </a>
            <span className="text-[#FFD700] text-lg sm:text-xl font-semibold pl-4 text-center">
              1-855-MAGA-855
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
