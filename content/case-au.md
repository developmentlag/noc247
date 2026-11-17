# Case study 3 (Australia): 24/7 NOC cover for an Australian MSP

> **Label rule for the coding agent:** same illustrative-scenario banner above the H1 as the US page. See `build_brief.md`. Open question for Mihir: the live site names the US and UK as the markets served (see `build_brief.md` "Claims to confirm before publishing"); this page should only go live once he confirms Australia is a market NOC247 will serve.

## Page metadata

| Field | Value |
|---|---|
| URL slug | `/case-studies/australia-msp-24x7-noc` |
| Canonical | `https://www.noc247.io/case-studies/australia-msp-24x7-noc` |
| Title tag (≤60) | `Australian MSP 24/7 NOC Case Study \| NOC247` |
| Meta description (≤155) | `How NOC247 covered a 35-person Australian MSP across Sydney and Perth, with Essential Eight evidence in the tickets.` |
| H1 | How NOC247 covered a 35-person Australian MSP across AEST and AWST |
| Primary keyword | outsourced NOC for Australian MSPs |
| Secondary keywords | white label NOC Australia, after-hours NOC support Australia, Essential Eight MSP NOC, Datto RMM NOC |
| Schema | `Article` + `FAQPage` + `BreadcrumbList`. No review or client markup |
| Breadcrumb | Home > Case studies > Australian MSP 24/7 NOC |
| Dates | datePublished 2026-11-16 |
| Voice | Use "organisation", "catalogue" and "programme" (Australian spelling matches British) |

## Body copy

A 35-person Australian MSP had a Sydney head office and a Perth branch, and its business day was not one day. When Sydney finished at 5:30 PM, Perth clients were still working, and the people who answered Perth's phones had gone home with Sydney. NOC247 closed that seam. Each desk keeps its own day. Neither carries the phone overnight. Patch windows, failed patches and backup checks now sit in Autotask with a time and an outcome, which is the evidence clients ask for against the Essential Eight.

## The engagement at a glance

| Item | Detail |
|---|---|
| MSP profile | MSP with a head office in Sydney and a branch in Perth, 35 people, 13 in service delivery |
| Clients | 60 client organisations across New South Wales, Victoria, Queensland and Western Australia |
| Endpoints | 1,500, of which about 90 are servers |
| Tool stack | Datto RMM (RMM), Autotask PSA (PSA), Datto BCDR on the servers that have it, Auvik for network monitoring |
| Hours the MSP staffed | 8:30 AM to 5:30 PM Sydney time for the east coast; Perth staff cover 8:30 AM to 5:30 PM Perth time |
| After-hours cover before | A shared on-call phone, with the east-coast and Perth engineers each taking nights for their own region |
| Window NOC247 covered | Everything outside both desks, plus weekends and public holidays by state |
| Coverage | Out-of-hours for each region against its own desk hours, plus weekends and state public holidays |

## The challenge

Perth runs two to three hours behind Sydney depending on the season, because most eastern states move to daylight saving and Western Australia and Queensland do not. For part of the year the east-coast desk shut at 5:30 PM Sydney time while Perth was still in its afternoon. The Perth engineer was then alone with the Perth book and the east-coast queue.

Public holidays differ by state, so one desk could be closed while the other was open.

## How NOC247 onboarded this MSP

NOC247's published onboarding for one RMM and one PSA is 7 to 10 business days. The mixed state footprint added to discovery, not to the sequence.

1. **Discovery.** A 90-minute session covered the client roster by state, each client's operating hours, the SLA tables, the Sydney and Perth desks, and which clients have special handling.
2. **Monitor ingestion and audit.** A named technician account was created in the MSP's Datto RMM and Autotask. The audit flagged noisy monitors, missing monitors and wrong thresholds, and checked Datto and Auvik for duplicate alerts.
3. **Runbook, priorities and time-zone map.** Every client has a priority table and a local-hours record, so a P2 at a Perth client at 4:00 PM Perth time is not treated as after-hours just because it is 6:00 PM in Sydney. The holiday calendar was built by state.
4. **Shadow shifts.** NOC247 watched the live feed and wrote what it would have done into a queue only the MSP could see.
5. **Go-live and calibration.** The MSP signed off, NOC247 took the queue, and the first 30 days included a weekly review of escalations and thresholds.

## How the two desks were covered

The east-coast desk closed at 5:30 PM Sydney and sent a handover package that also listed the Perth desk's open items. NOC247 took the east-coast queue then, and took Perth when that desk closed at 5:30 PM Perth time. The morning report for Sydney was ready before the Sydney desk opened at 8:30 AM, with a named owner on every open ticket.

Overnight work followed the runbook in the client's own time zone:

- A Datto BCDR backup that failed verification was read against the job history before anyone was called. The path is the one in [how overnight backup failures are handled](/msp-backup-monitoring).
- A patch window that completed with failures was re-run under the approved policy, and the ticket recorded the result and the failure reason.
- A site that lost its WAN link, confirmed down in Auvik and classed as a P1 under that client's SLA, was a phone call to the MSP's on-call engineer with the context packet.

## Permissions and escalation

| Layer | What happened | Who acted |
|---|---|---|
| Tier 1 | Validated the alert, ran the documented diagnostic, closed noise | NOC247 analyst |
| Tier 2 | Applied known-good remediations written into the runbook | NOC247 analyst |
| Tier 3 | Escalated to the MSP's on-call engineer with the steps already attempted | MSP |
| Stayed with the MSP | Client approvals, commercial decisions and anything outside the agreed runbook | MSP |

## What was specific to this MSP

- **AEST, AEDT and AWST.** Clients sit across at least three time zones, and the offset between Sydney and Brisbane changes twice a year. The runbook stores each client's local hours and handover times in that client's own time zone.
- **The Essential Eight.** Clients ask about maturity on patching applications, patching operating systems and regular backups. Assessors look for evidence. Patch windows, failed patches and backup checks are each an Autotask ticket with a time and an outcome. The maturity assessment itself stays with the MSP and its assessor.
- **Public holidays by state.** The calendar for each state was agreed in discovery and written into the runbook.
- **The handover documents.** Because the MSP's evening is another time zone's working day, the handover package and the morning report are the two documents that carry the seam between desks.

## The morning report

The report is built from Autotask timestamps: alerts received, tickets created and closed, actions taken with approval references, items that need a decision ranked by urgency, recurring alerts with a tuning proposal, and near-misses. A separate section lists patch and backup outcomes per client so they can be filed as evidence.

## What changed

| Before | After |
|---|---|
| Perth was alone for the overlap after Sydney went home | NOC247 takes the east-coast queue when Sydney closes, and Perth when Perth closes |
| Each region carried its own night phone | Neither desk carries the phone overnight |
| A state holiday could leave one desk uncovered | The state holiday calendar is in the runbook, and cover for each date was agreed up front |
| Essential Eight evidence was whatever someone could reconstruct | Patch and backup outcomes are already in Autotask, with a time |

## See your own version

Send one week of your after-hours alerts and see which pages needed a person.

- **[Get the free After-Hours Alert Audit](/free-alert-audit)**
- **[Book a 30-minute scoping call](https://calendly.com/noc247-scoping-call/30min)**

Related: [RMM integrations](/rmm-integrations) · [24/7 NOC support](/247-noc-support) · [Pricing](/pricing) · [How to choose a white-label NOC partner](/blog/how-to-choose-a-white-label-noc-partner)

## FAQ (for FAQPage schema)

**How does a NOC cover Perth and Sydney on the same engagement?**
Each client's local hours, handover times and holiday calendar are in the runbook, so the night shift works to the client's own time zone. The handover package and the morning report carry the seam between the two desks.

**Will NOC247 work inside Datto RMM and Autotask?**
Yes. On this engagement NOC247 worked inside Datto RMM and Autotask with named technician accounts, and ran only the policies and runbook actions the MSP had approved.

**Does a NOC help with the Essential Eight?**
It helps with evidence, not certification. Patch windows, failed patches and backup checks are recorded as tickets with a time and an outcome. The maturity assessment stays with the MSP and its assessor.

**How are Australian public holidays covered?**
The holiday calendar for each state was agreed in discovery and written into the runbook, so it is clear who covers each date.
