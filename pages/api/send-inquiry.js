const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, rmm, endpoints, message = '', intent = '' } = req.body || {};
  const fields = [name, company, email, rmm, endpoints, message];
  if (
    fields.some((value) => typeof value !== 'string') ||
    !name.trim() ||
    name.length > 120 ||
    !company.trim() ||
    company.length > 200 ||
    !EMAIL_PATTERN.test(email.trim()) ||
    email.length > 254 ||
    !rmm.trim() ||
    rmm.length > 100 ||
    !endpoints.trim() ||
    endpoints.length > 100 ||
    message.length > 5000 ||
    (intent && (typeof intent !== 'string' || intent.length > 80))
  ) {
    return res.status(400).json({ error: 'Please check the form details and try again.' });
  }

  const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    console.error('[Inquiry API] RESEND_API_KEY and RESEND_FROM_EMAIL must be configured');
    return res.status(500).json({ error: 'We could not send your message. Please try again later.' });
  }

  const safeCompany = company.trim().replace(/[\r\n]/g, ' ');
  const emailText = [
    `Name: ${name.trim()}`,
    `Company: ${safeCompany}`,
    `Email: ${email.trim()}`,
    `RMM: ${rmm.trim()}`,
    `Endpoints: ${endpoints.trim()}`,
    '',
    'Message:',
    message.trim() || '—',
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: ['hello@noc247.io'],
        reply_to: email.trim(),
        subject:
          intent === 'alert_audit'
            ? `NOC247 alert audit request — ${safeCompany}`
            : `NOC247 website inquiry — ${safeCompany}`,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      console.error(`[Inquiry API] Resend returned status ${resendResponse.status}`);
      return res.status(502).json({ error: 'We could not send your message. Please try again later.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Inquiry API] Resend request failed:', error);
    return res.status(502).json({ error: 'We could not send your message. Please try again later.' });
  }
}
