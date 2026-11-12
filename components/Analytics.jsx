import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CALENDLY_URL, trackCalendlyBooking, trackCalendlyClick, trackPageView } from '../lib/analytics';

function isCalendlyHref(href) {
  return typeof href === 'string' && href.indexOf('calendly.com/noc247-scoping-call') !== -1;
}

export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    const send = (url) => {
      window.setTimeout(() => trackPageView(url), 0);
    };

    send(router.asPath);
    const onRoute = (url) => send(url);
    router.events.on('routeChangeComplete', onRoute);
    return () => router.events.off('routeChangeComplete', onRoute);
  }, [router]);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target && event.target.closest ? event.target.closest('a') : null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const label = (anchor.textContent || '').replace(/\s+/g, ' ').trim();
      if (isCalendlyHref(href) || label === 'Book a scoping call' || label === 'Book the audit call') {
        trackCalendlyClick(isCalendlyHref(href) ? href : CALENDLY_URL);
      }
    };

    const onMessage = (event) => {
      if (typeof event.origin !== 'string' || event.origin.indexOf('calendly.com') === -1) return;
      const data = event.data;
      if (data && data.event === 'calendly.event_scheduled') trackCalendlyBooking();
    };

    document.addEventListener('click', onClick);
    window.addEventListener('message', onMessage);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return null;
}
