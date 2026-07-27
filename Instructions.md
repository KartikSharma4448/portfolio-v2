# Instructions.md — Idea → Validated PRD Lock File

> **What this is:** A single markdown file. User pastes their raw idea into a chat (ChatGPT/Claude) along with this file. The AI runs ONE bounded clarification round, gives honest (not hallucinated) research caveats, and produces a locked PRD the user can hand to a code agent (Cursor, Claude Code, etc.) without re-explaining the project every session.
>
> **What this is NOT:** A live market research engine. A legal/trademark authority. A replacement for the user's own judgment on scope, budget, and timeline.

---

## ⚠️ MANDATORY DISCLAIMER (AI must state this before starting)

Before running Step 1, the AI must tell the user, verbatim in spirit:

> "I don't have live internet access unless web search is explicitly enabled in this chat. Any market size, competitor, or trademark comment I make is based on my training data, which may be outdated or wrong. Treat it as a starting hypothesis, not a verified fact — verify names/trademarks yourself before you register anything, and verify market claims with a real search before you act on them."

If the AI has live web search available in this environment, it should use it for Step 3 (Research) and say so. If it doesn't, it must still give the disclaimer and proceed with clearly-labeled assumptions.

---

## STEP 1 — Idea Intake & Bounded Clarification

**Input:** Raw idea/thought from user, in any language mix (Hinglish is fine), any length.

**AI behavior:**
1. Read the idea. Identify what's missing to make it buildable — not "what would be nice to know," but "what would cause a wrong PRD if I guess it."
2. Ask **ONE round of clarifying questions — maximum 6 questions, minimum 3.** Not unlimited back-and-forth. Not zero questions either (that's how wrong assumptions get baked in).
3. **Recommended default question set** (AI should always cover these unless the user's idea already answers them):
   - Who is the target user, specifically? (not "everyone")
   - What's the core problem being solved — one sentence?
   - What's the team? (solo dev, small team, what skills already exist)
   - What's the budget posture? (bootstrap/free-tier only, or funded)
   - What's the timeline pressure? (weekend MVP, hackathon, 3-month build)
   - Is there a must-have platform constraint? (web only, mobile, both)
4. After the user answers, **AI does NOT ask a second round.** If something is still ambiguous, the AI states its assumption explicitly in the PRD (Step 5) under an "Assumptions Made" section, rather than going back to the user again. This is the actual mechanism that avoids "baar baar prompt dena" — bounded questions, then documented assumptions, not infinite chat.

> **Recommendation (override if you disagree):** Cap at one round. If you want zero rounds, the tradeoff is the AI will guess on all 6 points above and document guesses instead — riskier, but truly zero-friction. I'd keep one round; it's the cheapest insurance against a PRD built on wrong assumptions.

---

## STEP 2 — Duplicate/Crowded-Space Check (Honesty-Gated)

**AI behavior:**
1. Based on training knowledge (or live search if available), name 2–5 existing products/companies that look similar to this idea.
2. For each, state: what they do, and — **only if genuinely known, not guessed** — a rough sense of how established they are (funded startup vs. side project vs. dead project).
3. **AI must explicitly say "I cannot verify this is current" if it hasn't used live search.**
4. AI must NOT make trademark/legal ownership claims (e.g. "no one owns this name"). It can say "I'm not aware of a conflict in my training data" and nothing stronger. The PRD must carry this forward as an action item for the user: "Manually verify name availability at the relevant trademark registry and check domain/social handle availability before committing to this name."

> **Recommendation:** This step should never say a name or idea is "clear" or "safe" — only "no known conflict found, unverified." That phrasing is deliberate; a stronger claim from an AI without search access is a liability for the user, not a favor.

---

## STEP 3 — Lightweight Market Reality Check

**AI behavior, in order:**
1. State the idea back in one sentence to confirm shared understanding.
2. List 2–4 **specific, non-generic** reasons this could fail (not "market is competitive" — actually name the mechanism: e.g. "distribution is the hard part here because X, not the product").
3. List 1–3 **real gaps or underserved angles** if visible — but flagged as hypothesis, not verified fact.
4. Explicitly state whether this idea needs a business/company registration to operate legally at MVP stage, or whether it can launch as an individual/freelance project first (most MVPs don't need company registration on day one — flag this so the user doesn't over-invest in paperwork before validating).

> **Recommendation:** Don't let the AI write a "market opportunity" section that sounds like a pitch deck. Force it to write failure modes first, opportunity second.

---

## STEP 4 — Tech Stack & Architecture Decision

**AI must decide based on stated criteria, not trend-chasing. Criteria in priority order:**
1. **Team's existing skill** (from Step 1 answers) — reuse known stack unless there's a concrete reason not to.
2. **Budget posture** — if bootstrap/free-tier, must justify every paid service; default to free-tier infra unless scale requirements say otherwise.
3. **Timeline** — hackathon/weekend MVP gets a simpler, faster-to-ship stack even if "less ideal" long-term.
4. **Expected scale** — do not suggest microservices/Kubernetes/multi-region for an unvalidated MVP. That is over-engineering and the AI must actively avoid it unless the user's answers show real scale need already exists.

**Output of this step:**
- Frontend, backend, database, hosting — named specifically, not "a modern stack."
- Database schema at a **structural level** (entities + relationships), not full SQL yet.
- One paragraph justifying the choice against the 4 criteria above, so the user can see *why*, not just *what*.

> **Recommendation:** If the user already has a known stack, the AI should default to that unless the idea has a hard technical reason not to. Don't reinvent tooling per-project without cause.

---

## STEP 5 — Security & Production-Discipline Baseline (Non-negotiable, applies regardless of project)

The AI must bake these into the PRD as **mandatory, non-optional requirements**, not suggestions:
- Authentication: no custom-rolled auth unless explicitly justified; use established libraries/providers.
- Authorization: explicit access control rules per data table/route — especially Row-Level Security if using Supabase/Postgres-as-a-service. This is the single most common vibe-coding disaster (open tables, no RLS) and must be called out by name.
- Secrets: environment variables only, never hardcoded, never committed.
- Input validation: server-side validation required on every write path, not just client-side.
- Error handling: no "happy path only" code — PRD must list expected error/edge cases per core feature, not leave them implicit.
- Rate limiting / abuse prevention: flagged as required for any public-facing write endpoint (signup, comments, uploads, etc.)

> **Dropped by design:** an earlier draft of this concept included "5 = x is the smart/production way to write assignments." That's not a real pattern — it's a syntax error in most languages when used for assignment. The real technique (Yoda conditions, `if (5 == x)`) applies only to *comparisons*, to catch accidental `=` typos, and most modern linters/type systems have made it unnecessary anyway. It's excluded here because including it would teach wrong syntax.

---

## STEP 6 — PRD Assembly & Lock (Fixed Template — do not vary structure between runs)

The AI outputs a single PRD using **exactly this structure every time**, so downstream code agents get consistent input format across projects:

```
# [Project Name] — PRD v1.0 (Locked: [date])

## 1. One-Line Summary
## 2. Target User & Core Problem
## 3. Assumptions Made (from unanswered Step 1 gaps)
## 4. Competitive Landscape (unverified, training-data based)
## 5. Failure Risks & Market Reality Check
## 6. Tech Stack (with justification against team/budget/timeline/scale)
## 7. Database Schema (entities + relationships)
## 8. Core Features (MVP-scoped — explicitly mark what's OUT of scope for v1)
## 9. Security & Production Requirements (non-negotiable baseline from Step 5)
## 10. Open Questions for Human Review Before Build
```

**Section 10 is mandatory and cannot be empty by default.** If the AI genuinely has zero open questions, it must say so explicitly — but in practice, assumptions from Step 3 should surface here for the user to sanity-check.

---

## STEP 7 — Human Checkpoint (Required — do not skip)

**Before the PRD is treated as "locked" and handed to a code agent:**

The AI must ask: *"Review Section 10 (Open Questions) and Section 6 (Tech Stack). Reply 'approved' to lock this PRD as-is, or tell me what to change."*

This is the one deliberate pause in the whole flow. Skipping it means wrong assumptions (team size guessed wrong, wrong scale guessed, wrong stack picked) go straight into code — expensive to unwind later. It costs the user one message. That trade is worth it.

Only after the user replies "approved" (or equivalent) does the AI output the final locked PRD block, ready to paste into a code agent's context/system file.

---

## Known Limitations of This File (state these to the user if asked)

- No live research unless the chat environment has web search enabled — competitive/market claims are hypotheses, not facts.
- No legal/trademark authority — name checks are advisory only.
- This file covers **idea → PRD**, not **PRD → shipped code**. A separate build-stage discipline file (coding standards, enforced per-session) is a different tool and is intentionally out of scope here — combining them was considered and rejected because idea-validation and code-enforcement need different context at different times.
