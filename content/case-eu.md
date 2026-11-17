# Case study 4 (Europe): multi-country NOC cover for a European MSP

> **Label rule for the coding agent:** same illustrative-scenario banner above the H1 as the US page. See `build_brief.md`. Open question for Mihir: the live site does not name any European market or an EU data-transfer arrangement. This page should only go live once he confirms NOC247 will serve EU MSPs and has the contract terms (DPA and a transfer mechanism) it describes.

## Page metadata

| Field | Value |
|---|---|
| URL slug | `/case-studies/europe-msp-multi-country-noc` |
| Canonical | `https://www.noc247.io/case-studies/europe-msp-multi-country-noc` |
| Title tag (≤60) | `European MSP Multi-Country NOC Case Study \| NOC247` |
| Meta description (≤155) | `How NOC247 covered a 30-person MSP with clients in the Netherlands, Belgium and Germany.` |
| H1 | How NOC247 covered a 30-person MSP serving clients in three EU countries |
| Primary keyword | white label NOC for European MSPs |
| Secondary keywords | outsourced NOC Europe, NIS2 MSP NOC, GDPR NOC outsourcing, multi-country MSP NOC |
| Schema | `Article` + `FAQPage` + `BreadcrumbList`. No review or client markup |
| Breadcrumb | Home > Case studies > European MSP multi-country NOC |
| Dates | datePublished 2026-11-16 |
| Voice | British spelling; metric/24-hour times |

## Body copy

A 30-person MSP based in the Netherlands, with clients in Belgium and Germany, had three public-holiday calendars and one question from its larger clients: who holds admin access out of hours, under what rights, and how fast would the MSP know. NOC247 took the out-of-hours window inside the MSP's own N-able N-central and HaloPSA. The data processing agreement and the transfer terms were agreed before any access was granted. Whether an incident is reportable stayed with the MSP.

## The engagement at a glance

| Item | Detail |
|---|---|
| MSP profile | MSP based in the Netherlands, 30 people, 11 in service delivery |
| Clients | 35 client organisations in the Netherlands, Belgium and Germany |
| Endpoints | 1,000, of which about 55 are servers |
| Tool stack | N-able N-central (RMM), HaloPSA (PSA), N-able Cove Data Protection for backup, Auvik on larger sites |
| Hours the MSP staffed | 08:00 to 17:30 Central European Time, Monday to Friday |
| Out-of-hours cover before | A shared duty phone across three engineers, plus the owner as the second line |
| Window NOC247 covered | 17:30 to 08:00 on weeknights, and weekends and public holidays in all three countries |
| Security posture | The MSP is in scope of NIS2 and signs a data processing agreement with each client |
| Coverage | Out-of-hours and holidays; the MSP's desk keeps business hours |

## The challenge

The engineers were good in a crisis and short on sleep. The duty phone rang for alerts that cleared on their own and for ones that did not, and at 03:00 the engineer could not tell them apart.

The holiday calendar made it worse. Belgian National Day on 21 July is a normal working day in the Netherlands and Germany. King's Day is 27 April in the Netherlands. German Unity Day is 3 October. Corpus Christi is a holiday in some German states and not others.

Larger clients had started asking, in security questionnaires, who could reach their systems out of hours and how fast they would be told about a problem.

## How NOC247 onboarded this MSP

The sequence is NOC247's standard onboarding. Discovery was longer because the roster crosses borders.

1. **Discovery.** A 90-minute session covered the client roster by country, each client's hours, the SLA tables, the duty rota, and which clients restrict which analysts may see their systems.
2. **Contract and data terms first.** Before any access was granted, the MSP and NOC247 agreed the data processing agreement and the mechanism that covers analyst access from outside the EU.
3. **Monitor ingestion and audit.** Named technician accounts were created in N-central and HaloPSA with least privilege. The audit flagged noisy monitors, gaps, wrong thresholds and duplicates between N-central and Auvik.
4. **Runbook, priorities and calendars.** Each client has a priority table, local hours and a holiday calendar for its country, and for the German state where that matters.
5. **Shadow shifts, then go-live.** NOC247 watched the live feed without action rights until the MSP signed off. The first 30 days included a weekly calibration review.

## How the night shift ran

The duty engineer sent the handover package before 17:30 CET, including which of the three countries had a holiday the next day. NOC247 acknowledged it and took the queue. The morning report was ready before 08:00, and every open ticket had a named owner.

The runbook sorted the night:

- A Cove backup session that reported an error was read for the session status and the error text before any retry. The path is the one in [how overnight backup failures are handled](/msp-backup-monitoring).
- A patch-failure condition was re-run under the approved policy, and the ticket recorded the result and the failure reason.
- A burst of failed administrator logins on a firewall was not touched. NOC247 wrote the evidence into a P1 ticket and phoned the duty engineer with the timeline. Whether the event was reportable stayed with the MSP.

Client-facing messages in Dutch, French or German stayed with the MSP. The NOC worked from the runbooks in English.

## Permissions and escalation

| Layer | What happened | Who acted |
|---|---|---|
| Tier 1 | Validated the alert, ran the documented diagnostic, closed noise | NOC247 analyst |
| Tier 2 | Applied known-good remediations written into the runbook | NOC247 analyst |
| Tier 3 | Escalated to the MSP's duty engineer with the steps already attempted | MSP |
| Stayed with the MSP | Client approvals, regulatory decisions and anything outside the agreed runbook | MSP |

## What was specific to this MSP

- **GDPR and data location.** The MSP is a processor for its clients, and NOC247 is a sub-processor where analysts can see personal data. The data processing agreement and the transfer mechanism for analyst access from outside the EU, including standard contractual clauses, were agreed before go-live. Clients were told who the sub-processors are.
- **NIS2.** Managed service providers sit in the directive's ICT service management category. For a significant incident the directive sets an early warning within 24 hours, a notification within 72 hours and a final report within a month. NOC247 does not decide whether an incident is reportable. It records when the alert arrived, who was told and when, so the MSP's timeline is reliable.
- **Three calendars.** The Netherlands, Belgium and Germany do not share a public-holiday list, and some German holidays vary by state. The runbook holds a calendar per client.
- **Language.** Client communication in Dutch, French or German stays with the MSP unless the MSP has delegated a scripted message.

## The morning report

The report is built from HaloPSA timestamps: alerts received, tickets created and closed, actions taken with approval references, items that need a person ranked by urgency, recurring alerts with a tuning proposal, and near-misses. Anything that touched a client's access or data is listed separately, with the timeline, so the MSP can answer a client questionnaire from the ticket.

## What changed

| Before | After |
|---|---|
| One duty phone covered three countries | NOC247 holds the queue from 17:30 to 08:00, including weekends and each country's holidays |
| The engineer could not tell a clearing alert from a real one at 03:00 | The runbook separates a logged notice from a phone call, and the call arrives with the timeline |
| Holiday cover depended on who remembered which country | Each client's holiday calendar is in the runbook and was agreed before go-live |
| Questionnaire answers about out-of-hours access were assembled later | The data processing terms were signed first, and security-relevant tickets already carry the timeline |

## See your own version

Send one week of your after-hours alerts and see which pages needed a person.

- **[Get the free After-Hours Alert Audit](/free-alert-audit)**
- **[Book a 30-minute scoping call](https://calendly.com/noc247-scoping-call/30min)**

Related: [Managed NOC services for MSPs](/managed-noc-services-for-msps) · [Auvik NOC](/auvik-noc) · [N-able NOC](/n-able-noc) · [How to choose a white-label NOC partner](/blog/how-to-choose-a-white-label-noc-partner)

## FAQ (for FAQPage schema)

**Can a NOC cover clients in several countries?**
Yes. On this engagement each client's hours, escalation contacts and holiday calendar are in the runbook. The handover package and the morning report carry the detail between the MSP's desk and the night shift.

**How does GDPR apply when a NOC accesses client systems?**
The NOC is a sub-processor if its analysts can see personal data. The data processing agreement and the mechanism that covers analyst access from outside the EU were agreed before go-live, and the MSP's clients were told who the sub-processors are.

**Does a NOC make an MSP NIS2 compliant?**
No. Reporting a significant incident stays with the MSP. The NOC makes the incident timeline reliable by recording when an alert arrived, who was contacted and when.

**Does NOC247 speak Dutch, French or German with clients?**
The night shift works from the MSP's runbooks in English. Client-facing communication stays with the MSP unless the MSP delegates a scripted message.
