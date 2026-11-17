import ContentMarkdown from './ContentMarkdown';
import CtaBand from './CtaBand';

const CHECKS = [
  ['1. Coverage hours', '1-coverage-hours'],
  ['2. Tool compatibility', '2-tool-compatibility'],
  ['3. Action permissions', '3-action-permissions'],
  ['4. Escalation ownership', '4-escalation-ownership'],
  ['5. Reporting', '5-reporting'],
  ['6. Security and access', '6-security-and-access'],
  ['7. Pricing and contract', '7-pricing-and-contract'],
  ['8. Pilot terms', '8-pilot-terms'],
];

function splitSections(markdown) {
  return markdown.split(/\n(?=## )/).map((part) => {
    const match = part.match(/^## (.+)/);
    return { heading: match ? match[1].trim() : '', markdown: part };
  });
}

function Figure({ src, alt, width, height, caption }) {
  return (
    <figure className="present-figure">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function PresentBody({ markdown, checklist = false, midAfter = '', midText = '' }) {
  const sections = splitSections(markdown);
  return (
    <>
      {sections.map((section) => {
        const key = section.heading || 'lead';
        const cta = /see your own version|ready to see|see how many/i.test(section.heading);
        return (
          <div key={key}>
            <section className={cta ? 'present-section present-section--cta' : 'present-section'}>
              {section.heading === '2. Tool compatibility' ? (
                <Figure
                  src="/illustrations/tool-stack.svg"
                  alt="Diagram of RMM, PSA, backup and network tools feeding one NOC desk that works inside the MSP's own stack. Not a product screenshot."
                  width="720"
                  height="320"
                  caption="The checklist asks which of these the vendor has run in production, inside your tenant."
                />
              ) : null}
              {section.heading === 'Copy this: Shift Handover Protocol' ? (
                <Figure
                  src="/illustrations/handover-flow.svg"
                  alt="Diagram of a handover from the MSP day desk, through a package, to the night NOC, and back as a morning report."
                  width="720"
                  height="280"
                  caption="The protocol below is the text version of this handover."
                />
              ) : null}
              <ContentMarkdown markdown={section.markdown} heading={section.heading} />
            </section>
            {checklist && section.heading === 'How to use the checklist' ? (
              <ol className="check-nav" aria-label="Eight-point checklist">
                {CHECKS.map(([label, id], index) => (
                  <li key={id}>
                    <a href={`#${id}`}>
                      <span>{index + 1}</span>
                      {label.replace(/^\d+\.\s/, '')}
                    </a>
                  </li>
                ))}
              </ol>
            ) : null}
            {midText && section.heading === midAfter ? <CtaBand>{midText}</CtaBand> : null}
          </div>
        );
      })}
    </>
  );
}
