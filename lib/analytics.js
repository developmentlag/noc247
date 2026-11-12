export const GA_MEASUREMENT_ID = 'G-M3NEZ1VLBH';
export const CALENDLY_URL = 'https://calendly.com/noc247-scoping-call/30min';

export function gtagEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, { ...params, send_to: GA_MEASUREMENT_ID });
}

export function trackGenerateLead({ form, rmm } = {}) {
  const params = { form };
  if (rmm) params.rmm = rmm;
  gtagEvent('generate_lead', params);
}

export function trackPageView(pagePath) {
  if (typeof window === 'undefined') return;
  gtagEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath || window.location.pathname + window.location.search + window.location.hash,
  });
}

export function trackCalendlyClick(linkUrl) {
  gtagEvent('calendly_click', {
    link_url: linkUrl || CALENDLY_URL,
  });
}

export function trackCalendlyBooking() {
  trackGenerateLead({ form: 'calendly_booking' });
  gtagEvent('calendly_booking');
}
