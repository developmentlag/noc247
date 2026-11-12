import { useState } from 'react';
import { gtagEvent } from '../lib/analytics';

const PUBLISHED_DESK = '$220k–$320k+ per year before tools';
const PUBLISHED_HEAD = '$90,000–$135,000 per year';

export default function CostEstimator() {
  const [endpoints, setEndpoints] = useState('');
  const [overnight, setOvernight] = useState('');
  const [result, setResult] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const count = endpoints.trim();
    if (!count || !overnight) return;
    setResult({ endpoints: count, overnight });
    gtagEvent('calculator_complete', {
      endpoints: count,
      overnight_staff: overnight,
    });
  };

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card md:p-8">
      <h2 className="font-display text-2xl font-semibold text-brand-700">Estimate the in-house desk</h2>
      <p className="mt-3 text-sm leading-7 text-brand-600">
        Outputs are labelled estimates. They reuse ranges already published on this site. They are not a NOC247 price and they do not claim a savings percentage.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-700">
          Endpoints under management
          <input
            className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-brand-700 outline-none focus:border-accent-500"
            inputMode="numeric"
            value={endpoints}
            onChange={(event) => setEndpoints(event.target.value)}
            required
            maxLength={40}
            placeholder="For example, 800"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-medium text-brand-700">Do you already staff overnight?</legend>
          <div className="mt-2 flex flex-col gap-2 text-sm text-brand-700">
            <label className="flex items-center gap-2">
              <input type="radio" name="overnight" value="no" checked={overnight === 'no'} onChange={() => setOvernight('no')} required />
              No overnight staff
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="overnight" value="yes" checked={overnight === 'yes'} onChange={() => setOvernight('yes')} />
              Yes, overnight is already staffed
            </label>
          </div>
        </fieldset>
        <button type="submit" className="btn-primary">Show the estimate</button>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/50 p-5" role="status">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">Estimate, not a quote</p>
          <p className="mt-3 text-sm leading-7 text-brand-700">
            You entered {result.endpoints} endpoints. This model does not turn that count into a dollar rate. NOC247 quotes per endpoint after a look at the RMM, and does not publish a rate card here.
          </p>
          {result.overnight === 'no' ? (
            <p className="mt-3 text-sm leading-7 text-brand-700">
              With no overnight staff, the published comparison is a three-shift in-house desk: {PUBLISHED_DESK} (homepage FAQ). A single L1 analyst is published at {PUBLISHED_HEAD} (outsourced NOC page). A 24/7 rota is a team, not one salary. [placeholder] headcount beyond those published lines is not filled in here.
            </p>
          ) : (
            <p className="mt-3 text-sm leading-7 text-brand-700">
              You already staff overnight. The comparison is gaps (sickness, holidays, a second pair of eyes), not a full new desk. This page does not publish a partial-desk price. The three-shift figure of {PUBLISHED_DESK} is only the full-desk reference from the homepage FAQ.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
