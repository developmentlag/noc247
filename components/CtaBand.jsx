const AUDIT = '/free-alert-audit';
const CALENDLY = 'https://calendly.com/noc247-scoping-call/30min';

export default function CtaBand({ children }) {
  return (
    <aside className="cta-band" aria-label="Next step">
      <p>{children}</p>
      <div className="cta-band__actions">
        <a className="btn-accent" href={AUDIT}>Get the free After-Hours Alert Audit</a>
        <a className="btn-secondary !border-white/30 !bg-white/10 !text-white" href={CALENDLY}>Book a 30-minute scoping call</a>
      </div>
    </aside>
  );
}
