# Case study 2 (UK): out-of-hours NOC cover for a UK MSP

> **Label rule for the coding agent:** same illustrative-scenario banner above the H1 as the US page. See `build_brief.md`.

## Page metadata

| Field | Value |
|---|---|
| URL slug | `/case-studies/uk-msp-out-of-hours-noc` |
| Canonical | `https://www.noc247.io/case-studies/uk-msp-out-of-hours-noc` |
| Title tag (≤60) | `UK MSP Out-of-Hours NOC Scenario \| NOC247` |
| Meta description (≤155) | `Illustrative scenario: how NOC247 would cover a 25-person UK MSP out of hours, with UK GDPR in view, inside NinjaOne and HaloPSA. Not a client result.` |
| H1 | Illustrative scenario: how NOC247 would give a 25-person UK MSP out-of-hours cover |
| Primary keyword | out-of-hours NOC support (UK) |
| Secondary keywords | outsourced NOC for UK MSPs, white label NOC UK, NinjaOne NOC UK, UK MSP out-of-hours cover |
| Schema | `Article` + `FAQPage` + `BreadcrumbList`. No review or client markup |
| Breadcrumb | Home > Case studies > UK MSP out-of-hours NOC |
| Dates | datePublished 2026-11-16 |
| Voice | Use "out-of-hours" and British spelling (organisation, catalogue, programme) on this page, matching `/noc-services-for-msps-uk` |

## Body copy

> **Illustrative scenario, not a client result.** This page models how NOC247 would cover a typical UK MSP. The MSP, its numbers and the alerts below are assumptions we chose to make the process concrete. No client name, quote or outcome is implied. Figures in the tables are model inputs, not results.

# Illustrative scenario: how NOC247 would give a 25-person UK MSP out-of-hours cover

A UK MSP with 25 staff does not have a night shift and is not going to build one. What it has is a duty-engineer rota, a mobile phone and a Christmas week nobody wants to be on. This scenario shows how a white-label NOC would take the out-of-hours window, and what the MSP would still need to own for UK GDPR and Cyber Essentials.

## The scenario at a glance

| Item | Assumption (model input) |
|---|---|
| MSP profile | Independent MSP in the English Midlands, 25 people, 9 in service delivery |
| Clients | 30 client organisations, mostly 15 to 80 staff, a few with sites in Scotland and Northern Ireland |
| Endpoints | 800, of which about 40 are servers |
| Tool stack | NinjaOne (RMM), HaloPSA (PSA), Auvik on the larger sites, Acronis Cyber Protect for backup on most servers |
| Hours staffed today | 8:00 AM to 5:30 PM UK time, Monday to Friday |
| Out-of-hours cover today | A duty-engineer rota across four people, one week in four |
| Window to cover | 5:30 PM to 8:00 AM on weeknights, weekends and every bank holiday |
| Security posture | The MSP holds Cyber Essentials Plus (assumed) and signs a data processing agreement with each client |
| Coverage model | Out-of-hours only; the MSP's own desk keeps business hours |

## The gap

In this scenario, NinjaOne alerts go to the duty engineer's phone. Anything below a P1 waits for the morning, which in practice means the 8:00 AM queue starts with 40 or 50 items nobody has looked at. A backup warning on a Friday night is read on Monday.

The harder part is the calendar. Easter, the two May bank holidays, the August bank holiday and Christmas to New Year are long unstaffed windows. Scotland and Northern Ireland also have bank holidays England doesn't, and clients with sites there expect the MSP to know.

## How NOC247 would onboard this MSP

The sequence is the same one NOC247 publishes for every MSP, and most MSPs are live in 7 to 10 business days.

1. **Discovery.** A 90-minute session covering the client roster, the duty rota, SLA tables and any client with special instructions, such as a law firm that never allows out-of-hours changes.
2. **Monitor ingestion and audit.** A technician account is created inside the MSP's own NinjaOne tenant, named the way clients already see the team, and a second in HaloPSA. Devices are not re-enrolled and nothing moves to a NOC247-owned tenant. The audit flags noisy conditions, gaps and duplicates between NinjaOne and Auvik.
3. **Runbook, priorities and calendar.** The runbook records which actions NOC247 may take, per client. The holiday calendar lists every bank holiday by nation, so it is clear who covers Easter Monday in Belfast and the 2 January in Glasgow.
4. **Shadow shifts.** NOC247 reads the live feed and writes what it would have done into a queue only the MSP sees, with no action rights, until the MSP signs off.
5. **Go-live and calibration.** The first 30 days include a weekly review of every escalation, runbook change and tuned threshold.

## What one modelled night looks like

The times are illustrative, UK time. The device names are invented.

| Time | What happens | Who acts |
|---|---|---|
| 5:15 PM | The duty engineer sends the handover package, including the clients on a change freeze | MSP duty engineer |
| 5:30 PM | NOC247 acknowledges and takes the queue | NOC247 shift lead |
| 8:40 PM | An Acronis backup warns on a client file server, reporting a partial job | Tier 1 checks whether it is a one-off or a repeat; the ticket records which. See [how overnight backup failures are handled](/msp-backup-monitoring) |
| 11:50 PM | A NinjaOne disk-space condition on a server | Tier 2 runs the approved clean-up from the runbook and confirms free space; the ticket records before and after |
| 1:30 AM | A client's Microsoft 365 sign-in alerts spike | Tier 1 sees it matches a Microsoft service notice, tags it, logs it and does not escalate |
| 4:10 AM | A branch firewall stops answering at a Scottish site | Tier 1 confirms from Auvik it is down, not noisy. It is a P1 under the client's SLA, so NOC247 phones the duty engineer with the context packet |
| 7:45 AM | Morning report ready | NOC247 shift lead |
| 8:00 AM | Handover to the MSP's service desk | Named owner on every open ticket |

## Permissions and escalation

| Layer | What happens | Who acts |
|---|---|---|
| Tier 1 | Validates the alert, runs the documented diagnostic, closes noise | NOC247 analyst |
| Tier 2 | Applies known-good remediations that are written into the runbook | NOC247 analyst |
| Tier 3 | Escalates to the MSP's duty engineer with the steps already attempted | MSP |
| Stays with the MSP | Client approvals, commercial decisions and anything outside the agreed runbook | MSP |

The phone greeting, the technician name and the ticket signature are the MSP's own. The duty engineer picks up and hears the MSP's greeting, not an unfamiliar one.

## What is specific to a UK MSP

- **UK GDPR and the data processing agreement.** The MSP is usually a processor for its clients, and NOC247 becomes a sub-processor when its analysts can see systems that hold personal data. NOC247's published position for UK clients is a data processing agreement that maps to GDPR Article 28 processing requirements, and the MSP should ask to see it before go-live. Under Article 33 a processor must tell the controller of a breach without undue delay, so the escalation tree should say who is called if an out-of-hours alert looks like personal-data exposure.
- **Cyber Essentials.** The scheme covers firewalls, secure configuration, user access control, malware protection and security update management, and expects critical and high-risk updates to be applied within 14 days. The MSP's certification covers the MSP's scope. What a NOC changes is the evidence: patch windows, failed patches and access changes are each in a ticket with a timestamp.
- **Out-of-hours and bank holidays.** UK holidays differ by nation. The runbook holds the holiday calendar for England, Scotland, Wales and Northern Ireland, and NOC247's published cover includes UK bank holidays at base pricing.
- **Small-team reality.** For a team of this size, the largest benefit of a NOC is often that the duty rota stops depending on four named people.

## What the MSP would see each morning

A report built from HaloPSA timestamps: alerts received, tickets opened and closed, actions taken with their approval reference, items for a human decision ranked by urgency, recurring alerts with a tuning proposal, and near-misses. Each figure traces to a ticket ID.

## What we would measure

| Measure | How it would be defined |
|---|---|
| Time to acknowledge | From alert received to a named engineer taking action, timestamped in HaloPSA |
| Duty-engineer wake-ups | Calls to the duty engineer overnight, each reviewed to confirm it was warranted |
| Morning queue size | Unowned items in the queue at 8:00 AM, compared with the pre-NOC baseline the MSP measures first |
| Patch evidence | Patch tickets with a recorded window, outcome and any failure reason |

## Real results

This scenario is not a client engagement, so there are no results to report. When an MSP approves published figures from an engagement like this one, this section will show the measured before and after, the period and how it was measured.
<!-- REAL-RESULTS-SLOT: uk-msp (render nothing; the coding agent keeps this marker so real results can be dropped in) -->

## See your own version

Send one week of your out-of-hours alerts and see which pages needed a person.

- **[Get the free After-Hours Alert Audit](/free-alert-audit)**
- **[Book a 30-minute scoping call](https://calendly.com/noc247-scoping-call/30min)**

Related: [NOC services for MSPs in the UK](/noc-services-for-msps-uk) · [NinjaOne NOC](/ninjaone-noc) · [Pricing](/pricing) · [How to choose a white-label NOC partner](/blog/how-to-choose-a-white-label-noc-partner)

## FAQ (for FAQPage schema)

**Is this a real UK client?**
No. It is an illustrative scenario built from a realistic UK MSP profile and NOC247's published onboarding, runbook, escalation and reporting process. The figures are model inputs, not results.

**Does NOC247 cover UK bank holidays?**
Yes. UK bank holidays, including the Scottish, Welsh and Northern Irish ones, are covered at base pricing, and the holiday calendar is written into the runbook.

**Will NOC247 work inside NinjaOne and HaloPSA?**
Yes. NOC247 works inside the MSP's own NinjaOne tenant and writes tickets into the PSA, such as HaloPSA, under the MSP's ticket display name. Nothing needs to move. See [NinjaOne NOC](/ninjaone-noc).

**How does this fit with UK GDPR?**
NOC247's published position for UK clients is a data processing agreement mapped to GDPR Article 28 processing requirements. The MSP remains responsible for its own obligations to its clients, so ask to see the agreement and agree the breach-escalation path in discovery.

**Does using a NOC affect our Cyber Essentials certification?**
The certification covers the MSP's own scope and is the MSP's to maintain. A NOC adds evidence: patch windows, failed patches and access changes are recorded in tickets with timestamps.
