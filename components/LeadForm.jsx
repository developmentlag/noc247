import { useState } from 'react';
import { trackGenerateLead } from '../lib/analytics';

const INITIAL = {
  name: '',
  company: '',
  email: '',
  rmm: '',
  endpoints: '',
  howShared: '',
  message: '',
};

export default function LeadForm({
  formName = 'noc_enquiry',
  intent = '',
  submitLabel = 'Send the request',
  howSharedLabel = '',
  successText = 'Received. We will reply to the email you entered.',
}) {
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const message = [
      howSharedLabel && fields.howShared ? `${howSharedLabel}: ${fields.howShared}` : '',
      fields.message,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          company: fields.company,
          email: fields.email,
          rmm: fields.rmm,
          endpoints: fields.endpoints,
          message,
          intent,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || 'We could not send your message. Please try again later.');
      }
      trackGenerateLead({ form: formName, rmm: fields.rmm });
      setStatus('sent');
      setFields(INITIAL);
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'We could not send your message. Please try again later.');
    }
  };

  if (status === 'sent') {
    return (
      <p className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6 text-brand-700" role="status">
        {successText}
      </p>
    );
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-brand-700 outline-none focus:border-accent-500';

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="text-sm font-medium text-brand-700">
        Name
        <input className={inputClass} name="name" value={fields.name} onChange={onChange} required maxLength={120} autoComplete="name" />
      </label>
      <label className="text-sm font-medium text-brand-700">
        Company / MSP
        <input className={inputClass} name="company" value={fields.company} onChange={onChange} required maxLength={200} autoComplete="organization" />
      </label>
      <label className="text-sm font-medium text-brand-700">
        Work email
        <input className={inputClass} type="email" name="email" value={fields.email} onChange={onChange} required maxLength={254} autoComplete="email" />
      </label>
      <label className="text-sm font-medium text-brand-700">
        RMM
        <input className={inputClass} name="rmm" value={fields.rmm} onChange={onChange} required maxLength={100} />
      </label>
      <label className="text-sm font-medium text-brand-700">
        Endpoint mix
        <input className={inputClass} name="endpoints" value={fields.endpoints} onChange={onChange} required maxLength={100} />
      </label>
      {howSharedLabel ? (
        <label className="text-sm font-medium text-brand-700">
          {howSharedLabel}
          <input className={inputClass} name="howShared" value={fields.howShared} onChange={onChange} maxLength={200} />
        </label>
      ) : null}
      <label className="text-sm font-medium text-brand-700">
        Message
        <textarea className={inputClass} name="message" value={fields.message} onChange={onChange} rows={5} maxLength={4000} />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
