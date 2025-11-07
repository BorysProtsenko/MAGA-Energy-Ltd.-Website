import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [fade, setFade] = useState('in');

  useEffect(() => {
    const handleRouteChangeStart = () => setFade('out');
    const handleRouteChangeComplete = () => setFade('in');

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <div className={fade === 'in' ? 'animate-fade-in' : 'animate-fade-out'}>
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);
