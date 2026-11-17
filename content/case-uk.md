# Case study 2 (UK): out-of-hours NOC cover for a UK MSP

> **Label rule for the coding agent:** same illustrative-scenario banner above the H1 as the US page. See `build_brief.md`.

## Page metadata

| Field | Value |
|---|---|
| URL slug | `/case-studies/uk-msp-out-of-hours-noc` |
| Canonical | `https://www.noc247.io/case-studies/uk-msp-out-of-hours-noc` |
| Title tag (≤60) | `UK MSP Out-of-Hours NOC Case Study \| NOC247` |
| Meta description (≤155) | `How NOC247 covered a 25-person UK MSP out of hours, inside NinjaOne and HaloPSA, with UK GDPR in view.` |
| H1 | How NOC247 covered a 25-person UK MSP out of hours |
| Primary keyword | out-of-hours NOC support (UK) |
| Secondary keywords | outsourced NOC for UK MSPs, white label NOC UK, NinjaOne NOC UK, UK MSP out-of-hours cover |
| Schema | `Article` + `FAQPage` + `BreadcrumbList`. No review or client markup |
| Breadcrumb | Home > Case studies > UK MSP out-of-hours NOC |
| Dates | datePublished 2026-11-16 |
| Voice | Use "out-of-hours" and British spelling (organisation, catalogue, programme) on this page, matching `/noc-services-for-msps-uk` |

## Body copy

A 25-person MSP in the English Midlands had no night shift and was not going to build one. Cover sat on a duty-engineer rota, a mobile phone, and a Christmas week nobody wanted. NOC247 took the out-of-hours window, including bank holidays, inside the MSP's own NinjaOne tenant and HaloPSA. UK GDPR and Cyber Essentials stayed the MSP's to own; the tickets now carry the evidence.

## The engagement at a glance

| Item | Detail |
|---|---|
| MSP profile | Independent MSP in the English Midlands, 25 people, 9 in service delivery |
| Clients | 30 client organisations, mostly 15 to 80 staff, a few with sites in Scotland and Northern Ireland |
| Endpoints | 800, of which about 40 are servers |
| Tool stack | NinjaOne (RMM), HaloPSA (PSA), Auvik on the larger sites, Acronis Cyber Protect for backup on most servers |
| Hours the MSP staffed | 8:00 AM to 5:30 PM UK time, Monday to Friday |
| Out-of-hours cover before | A duty-engineer rota across four people, one week in four |
| Window NOC247 covered | 5:30 PM to 8:00 AM on weeknights, weekends and every bank holiday |
| Security posture | The MSP holds Cyber Essentials Plus and signs a data processing agreement with each client |
| Coverage | Out-of-hours only; the MSP's own desk keeps business hours |

## The challenge

NinjaOne alerts went to the duty engineer's phone. Anything below a P1 waited for the morning, so the 8:00 AM queue opened with overnight items nobody had looked at. A backup warning on a Friday night was read on Monday.

The calendar was the harder part. Easter, the two May bank holidays, the August bank holiday and Christmas to New Year are long unstaffed windows. Scotland and Northern Ireland also have bank holidays England does not, and clients with sites there expected the MSP to know.

## How NOC247 onboarded this MSP

The sequence is the one NOC247 publishes for every MSP, and this MSP was live in 7 to 10 business days.

1. **Discovery.** A 90-minute session covered the client roster, the duty rota, the SLA tables and any client with special instructions, including a law firm that never allows out-of-hours changes.
2. **Monitor ingestion and audit.** A technician account was created inside the MSP's own NinjaOne tenant, named the way clients already see the team, and a second account in HaloPSA. Devices were not re-enrolled and nothing moved to a NOC247-owned tenant. The audit flagged noisy conditions, gaps and duplicates between NinjaOne and Auvik.
3. **Runbook, priorities and calendar.** The runbook records which actions NOC247 may take, per client. The holiday calendar lists every bank holiday by nation, so cover is explicit for Easter Monday in Belfast and 2 January in Glasgow.
4. **Shadow shifts.** NOC247 read the live feed and wrote what it would have done into a queue only the MSP could see, with no action rights, until the MSP signed off.
5. **Go-live and calibration.** The first 30 days included a weekly review of every escalation, runbook change and tuned threshold.

## How out-of-hours cover ran

The duty engineer sent the handover package before 5:30 PM, including any client on a change freeze. NOC247 acknowledged it and took the queue. At 8:00 AM the shift lead handed it back with a named owner on every open ticket.

Overnight, the runbook decided who was called:

- An Acronis warning on a file server was checked as a one-off or a repeat, and the ticket recorded which. The backup path is the one in [how overnight backup failures are handled](/msp-backup-monitoring).
- A disk-space condition was cleared with the approved clean-up, and the ticket recorded the free space before and after.
- A spike in Microsoft 365 sign-in alerts that matched a Microsoft service notice was tagged and logged, and nobody was woken.
- A branch firewall that stopped answering, confirmed down in Auvik and classed as a P1 under that client's SLA, was a phone call to the duty engineer with the context packet.

The greeting, the technician name and the ticket signature were the MSP's own.

## Permissions and escalation

| Layer | What happened | Who acted |
|---|---|---|
| Tier 1 | Validated the alert, ran the documented diagnostic, closed noise | NOC247 analyst |
| Tier 2 | Applied known-good remediations written into the runbook | NOC247 analyst |
| Tier 3 | Escalated to the MSP's duty engineer with the steps already attempted | MSP |
| Stayed with the MSP | Client approvals, commercial decisions and anything outside the agreed runbook | MSP |

## What was specific to this MSP

- **UK GDPR.** The MSP is a processor for its clients, and NOC247 is a sub-processor where analysts can see systems that hold personal data. The data processing agreement maps to GDPR Article 28, and it was reviewed before go-live. The escalation tree names who is called if an out-of-hours alert looks like personal-data exposure, in line with Article 33.
- **Cyber Essentials.** The scheme covers firewalls, secure configuration, user access control, malware protection and security update management, and expects critical and high-risk updates within 14 days. The certification stays the MSP's. What changed is the evidence: patch windows, failed patches and access changes each sit in a ticket with a timestamp.
- **Bank holidays.** The runbook holds the holiday calendar for England, Scotland, Wales and Northern Ireland. UK bank holidays are covered at base pricing.
- **The rota.** For a team of this size, the duty rota no longer depends on four named people staying reachable.

## The morning report

The report is built from HaloPSA timestamps: alerts received, tickets opened and closed, actions taken with their approval reference, items for a person ranked by urgency, recurring alerts with a tuning proposal, and near-misses. Each line traces to a ticket ID.

## What changed

| Before | After |
|---|---|
| The duty phone was the only overnight cover | NOC247 held the queue from 5:30 PM to 8:00 AM, including weekends and bank holidays |
| Anything below a P1 waited, unread, for the morning | Those alerts were triaged overnight and written into HaloPSA before the desk opened |
| A Friday-night backup warning was read on Monday | Backup warnings were checked the night they arrived |
| Four people carried the rota, including Christmas | The duty engineer is called only when the runbook says the event needs them |

## See your own version

Send one week of your out-of-hours alerts and see which pages needed a person.

- **[Get the free After-Hours Alert Audit](/free-alert-audit)**
- **[Book a 30-minute scoping call](https://calendly.com/noc247-scoping-call/30min)**

Related: [NOC services for MSPs in the UK](/noc-services-for-msps-uk) · [NinjaOne NOC](/ninjaone-noc) · [Pricing](/pricing) · [How to choose a white-label NOC partner](/blog/how-to-choose-a-white-label-noc-partner)

## FAQ (for FAQPage schema)

**Does NOC247 cover UK bank holidays?**
Yes. UK bank holidays, including the Scottish, Welsh and Northern Irish ones, are covered at base pricing, and the holiday calendar is written into the runbook.

**Will NOC247 work inside NinjaOne and HaloPSA?**
Yes. On this engagement NOC247 worked inside the MSP's own NinjaOne tenant and wrote tickets into HaloPSA under the MSP's ticket display name. See [NinjaOne NOC](/ninjaone-noc).

**How does this fit with UK GDPR?**
NOC247's position for UK clients is a data processing agreement mapped to GDPR Article 28. The MSP remains responsible for its own obligations to its clients. The breach-escalation path was agreed in discovery.

**Does using a NOC affect Cyber Essentials certification?**
The certification covers the MSP's own scope and is the MSP's to maintain. The NOC adds evidence: patch windows, failed patches and access changes are recorded in tickets with timestamps.
