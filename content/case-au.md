# Case study 3 (Australia): 24/7 NOC cover for an Australian MSP

> **Label rule for the coding agent:** same illustrative-scenario banner above the H1 as the US page. See `build_brief.md`. Open question for Mihir: the live site names the US and UK as the markets served (see `build_brief.md` "Claims to confirm before publishing"); this page should only go live once he confirms Australia is a market NOC247 will serve.

## Page metadata

| Field | Value |
|---|---|
| URL slug | `/case-studies/australia-msp-24x7-noc` |
| Canonical | `https://www.noc247.io/case-studies/australia-msp-24x7-noc` |
| Title tag (≤60) | `Australian MSP 24/7 NOC Scenario \| NOC247` |
| Meta description (≤155) | `Illustrative scenario: how NOC247 would cover a 35-person MSP across AEST and AWST, with Essential Eight evidence. Modelled, not a client result.` |
| H1 | Illustrative scenario: how NOC247 would cover a 35-person Australian MSP across AEST and AWST |
| Primary keyword | outsourced NOC for Australian MSPs |
| Secondary keywords | white label NOC Australia, after-hours NOC support Australia, Essential Eight MSP NOC, Datto RMM NOC |
| Schema | `Article` + `FAQPage` + `BreadcrumbList`. No review or client markup |
| Breadcrumb | Home > Case studies > Australian MSP 24/7 NOC |
| Dates | datePublished 2026-11-16 |
| Voice | Use "organisation", "catalogue" and "programme" (Australian spelling matches British) |

## Body copy

> **Illustrative scenario, not a client result.** This page models how NOC247 would cover a typical Australian MSP. The MSP, its numbers and the alerts below are assumptions we chose to make the process concrete. No client name, quote or outcome is implied. Figures in the tables are model inputs, not results.

# Illustrative scenario: how NOC247 would cover a 35-person Australian MSP across AEST and AWST

An Australian MSP with a Sydney head office and a Perth branch has an unusual problem. Its business day is not one day. By the time Sydney finishes at 5:30 PM, Perth clients are still working for two more hours, and the people who answer Perth's phones went home with Sydney. This scenario shows how a white-label NOC would close that seam, and what the MSP would be able to evidence for the Essential Eight.

## The scenario at a glance

| Item | Assumption (model input) |
|---|---|
| MSP profile | MSP with a head office in Sydney and a branch in Perth, 35 people, 13 in service delivery |
| Clients | 60 client organisations across New South Wales, Victoria, Queensland and Western Australia |
| Endpoints | 1,500, of which about 90 are servers |
| Tool stack | Datto RMM (RMM), Autotask PSA (PSA), Datto BCDR on the servers that have it, Auvik for network monitoring |
| Hours staffed today | 8:30 AM to 5:30 PM Sydney time for the east coast; Perth staff cover 8:30 AM to 5:30 PM Perth time |
| After-hours cover today | A shared on-call phone, with the east-coast and Perth engineers each taking nights for their own region |
| Window to cover | Everything outside both desks, plus weekends and public holidays by state |
| Coverage model | Out-of-hours for each region against its own desk hours, plus weekends and state public holidays; neither desk carries the phone overnight |

## The gap

Perth runs two to three hours behind Sydney depending on the season, because most eastern states move to daylight saving and Western Australia and Queensland do not. For part of the year, the east-coast desk shuts at 5:30 PM Sydney time while Perth is still in the middle of its afternoon. The Perth engineer is alone for hours with 20 clients' tickets and the east-coast queue.

Public holidays add another layer. They differ by state, and a state holiday can leave one desk closed while the other is open.

## How NOC247 would onboard this MSP

NOC247 publishes a 7 to 10 business day onboarding for an MSP with one RMM and PSA. A mixed state footprint adds to the discovery work, not the sequence.

1. **Discovery.** A 90-minute session covering the client roster by state, each client's operating hours, SLA tables, the Sydney and Perth desks, and which clients have special handling.
2. **Monitor ingestion and audit.** A named technician account is created in the MSP's Datto RMM and Autotask. The audit flags noisy monitors, missing monitors and wrong thresholds, and the Datto and Auvik alert sets are checked for duplicates.
3. **Runbook, priorities and time-zone map.** Every client gets a priority table and a local-hours record, so a P2 at a Perth client at 4:00 PM Perth time is not treated as after-hours when it is 6:00 PM in Sydney. The holiday calendar is built by state.
4. **Shadow shifts.** NOC247 watches the live feed and writes what it would have done into a queue only the MSP sees.
5. **Go-live and calibration.** The MSP signs off, NOC247 takes the queue, and the first 30 days include a weekly review of escalations and thresholds.

## What one modelled night looks like

The times are illustrative. The first column gives Sydney time and the second gives Perth time, using standard time (during eastern daylight saving the gap is three hours). Device names are invented.

| Sydney time | Perth time | What happens | Who acts |
|---|---|---|---|
| 5:30 PM | 3:30 PM | East-coast desk closes. The handover package covers east-coast clients and the Perth desk's open items | MSP service delivery lead |
| 6:00 PM | 4:00 PM | NOC247 takes the east-coast queue. Perth keeps its own desk until 5:30 PM Perth time | NOC247 shift lead |
| 9:10 PM | 7:10 PM | A Datto BCDR backup fails to verify at a Perth client after hours | Tier 1 reads the verification result and the job history; see [how overnight backup failures are handled](/msp-backup-monitoring) |
| 11:30 PM | 9:30 PM | Patch window at a Victorian client completes with two failed endpoints | Tier 2 re-runs the approved patch policy, then records the result and the failure reason |
| 3:20 AM | 1:20 AM | A Queensland site loses its WAN link | Tier 1 confirms in Auvik; a P1 under the client's SLA, so NOC247 phones the MSP's on-call engineer with the context packet |
| 7:00 AM | 5:00 AM | Morning report prepared for the east coast | NOC247 shift lead |
| 8:30 AM | 6:30 AM | Handover to the Sydney desk | Named owner on every open ticket |

## Permissions and escalation

| Layer | What happens | Who acts |
|---|---|---|
| Tier 1 | Validates the alert, runs the documented diagnostic, closes noise | NOC247 analyst |
| Tier 2 | Applies known-good remediations that are written into the runbook | NOC247 analyst |
| Tier 3 | Escalates to the MSP's on-call engineer with the steps already attempted | MSP |
| Stays with the MSP | Client approvals, commercial decisions and anything outside the agreed runbook | MSP |

## What is specific to an Australian MSP

- **AEST, AEDT and AWST.** The MSP's clients sit across at least three time zones, and the offset between Sydney and Brisbane changes twice a year. The runbook stores each client's local hours and handover times in the client's own time zone, so the daylight-saving change is an update to a calendar, not a surprise.
- **The Essential Eight.** Clients often ask their MSP about Essential Eight maturity, which includes patching applications, patching operating systems and regular backups. Assessors look for evidence. In this scenario the MSP's patch windows, failed patches and backup checks are each in an Autotask ticket with a time and an outcome, which makes that evidence easier to produce. The maturity assessment itself stays with the MSP and its assessor.
- **Public holidays by state.** The runbook holds the calendar for each state, and cover for each holiday is agreed in discovery.
- **Distance from the NOC.** An Australian MSP's evening is another time zone's working day, which is why the handover package and the morning report are the two documents that matter most.

## What the MSP would see each morning

A report built from Autotask timestamps: alerts received, tickets created and closed, actions taken with approval references, items needing a decision ranked by urgency, recurring alerts with a tuning proposal and near-misses. A separate section lists patch and backup outcomes per client so they can be filed as evidence.

## What we would measure

| Measure | How it would be defined |
|---|---|
| Time to acknowledge | From alert received to a named engineer taking action, timestamped in Autotask |
| Cross-zone handover completeness | Handover packages and reports delivered on time with every line completed, reviewed weekly during calibration |
| Patch and backup evidence | Patch and backup tickets carrying a window, outcome and failure reason |
| Wrong-region escalations | Escalations sent to the wrong desk or contact because of a time-zone error, which should be zero |

## Real results

This scenario is not a client engagement, so there are no results to report. When an MSP approves published figures from an engagement like this one, this section will show the measured before and after, the period and how it was measured.
<!-- REAL-RESULTS-SLOT: au-msp (render nothing; the coding agent keeps this marker so real results can be dropped in) -->

## See your own version

Send one week of your after-hours alerts and see which pages needed a person.

- **[Get the free After-Hours Alert Audit](/free-alert-audit)**
- **[Book a 30-minute scoping call](https://calendly.com/noc247-scoping-call/30min)**

Related: [RMM integrations](/rmm-integrations) · [24/7 NOC support](/247-noc-support) · [Pricing](/pricing) · [How to choose a white-label NOC partner](/blog/how-to-choose-a-white-label-noc-partner)

## FAQ (for FAQPage schema)

**Is this a real Australian client?**
No. It is an illustrative scenario built from a realistic Australian MSP profile and NOC247's published onboarding, runbook, escalation and reporting process. The figures are model inputs, not results.

**How does a NOC cover Perth and Sydney in the same rota?**
Each client's local hours, handover times and holiday calendar are recorded in the runbook, so the NOC works to the client's own time zone. The handover package and morning report are the two documents that carry the seam between desks.

**Will NOC247 work inside Datto RMM and Autotask?**
Yes. NOC247 works inside Datto RMM and Autotask PSA using named technician accounts, and runs only the components, policies and runbook actions the MSP has approved.

**Does a NOC help with the Essential Eight?**
It helps with evidence, not certification. Patch windows, failed patches and backup checks are recorded as tickets with a time and an outcome. The maturity assessment stays with the MSP and its assessor.

**How are Australian public holidays covered?**
The holiday calendar for each state is agreed in discovery and written into the runbook, so it is clear who covers what on each date.
