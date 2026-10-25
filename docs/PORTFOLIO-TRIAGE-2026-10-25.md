# Portfolio triage — every reachable repo (2026-10-25)

`list_repos` from the cloud session returns **147 repositories**: 22 under
`sedricbenson`, 124 under `proximia` (work; out of scope here), 1 under
`schmoli`. The `proximia` repos are the day job and are not consumer
products; nothing below touches them.

## Verdicts

| Verdict | Meaning |
|---|---|
| **SHIP** | a finished or near-finished product; the remaining work is submission admin |
| **POLISH** | live; keeps getting the HIG/content passes |
| **BUILD** | a real product idea with code or a spec, needs weeks of work |
| **FOLD IN** | not its own product; its content feeds a shipping app |
| **PARK** | README-only idea or not a software product; revisit only on demand |
| **BLOCKED** | cannot be reached from the cloud session (private repo not granted to the Claude GitHub App) |

## sedricbenson repos

| Repo | What it is | State found | Verdict | Next action |
|---|---|---|---|---|
| `ios-distance` | **Word Trap** (A–Z guessing game), `com.alpinesquad.wordtrap` | TestFlight build 1 VALID on ASC 6809978528, 5 framed shots, IAPs created, review notes filled. Polish PR [#2](https://github.com/sedricbenson/ios-distance/pull/2) opened today (daily seed time-zone bug, streak reminder, tests). | **SHIP** | Owner: build the polish branch, run the two new test suites, cut build 2 via `fastlane beta`; ASC web: App Privacy → Publish, Add for Review with both IAPs. Then flip `src/pages/word-trap` to live. |
| `piano-tuner` | **Pianotune**, pro piano tuner, ASC 6772577552 | Private, **not granted to the Claude GitHub App** (every attach attempt refused). Website page says final prep; disclosures pages exist. | **SHIP / BLOCKED** | Owner: add `sedricbenson/piano-tuner` to the Claude GitHub App at https://claude.ai/connect-github. Then: read its STATE/metadata, audit, polish branch, store packet, launch per the marketing plan. |
| `bible-blitz` | live | PRs #19 polish, #20 content, #21 wave 4 (widgets + quick actions) | **POLISH** | Mac verification order in `docs/PORTFOLIO-WORKQUEUE-2026-10-24.md`. |
| `spelling-game` | Spelly, live | PRs #11–#13 | **POLISH** | same |
| `music-quest` | MusicQuest, live | PRs #2–#4 | **POLISH** | same |
| `scratchy` | live | PRs #1–#3 | **POLISH** | same |
| `current-atlas` | Current Charts, live | PRs #14–#15 | **POLISH** | same |
| `alpinesquad-web` | marketing site | PR #2 | **POLISH** | press kit + `/daily` hub next |
| `disclosures` | public privacy/terms/support pages for every app (incl. `pianotune/`, `wordtrap/`, `switchgrid/`, `chroma/`) | current | — | keep in step with each listing |
| `golf-bowl` | golf × bowling-pins physics game, SpriteKit | **Phase 0**: six Swift files, no Xcode project, four design docs | **BUILD** (large) | A real game concept but months of physics/level work. Not before Word Trap and Pianotune ship. If taken up: design docs are good; start with a one-hole playable prototype on a feature branch. |
| `music-colors` | README idea: scan sheet music, render colour-coded notes | one README | **FOLD IN** | Optical music recognition is a research project; the colour-note idea fits MusicQuest as a "colour notes" display option for beginners (Figurenotes-style). Add to `music-quest/docs/future`. |
| `wish-list` | README idea: family wish lists with sizes, Amazon import, sharing | one README | **PARK** | crowded category (Amazon, Giftster, Elfster); would need accounts + sync + affiliate links. Revisit only with a distribution angle. |
| `word-counter` | empty README | — | **PARK** | nothing to build from |
| `memory-portal` | empty README | — | **PARK** | nothing to build from |
| `quote-merch` | Next.js 14 scaffold for a print-on-demand quote-merch store (Printful/Stripe) | base scaffold, no products | **PARK** | a business, not an app; only worth it with a product catalogue and ad budget |
| `affiliate-website` | empty | — | **PARK** | |
| `flor-maya` | Flor Maya vanilla, Amazon FBA business + site | active business repo | — | not a software product; out of scope for this plan |
| `church` | Sabbath School content, quizzes, sermons, slides, Christmas play | active content repo | **FOLD IN** | The kids' quizzes and lessons are Bible Blitz content: a "Kids" category or age-tiered question set in v1.1, sourced from `sabbath-school/`. Also the first community for Bible Blitz posts. |
| `egw` | 1,483-book Markdown archive of EGW / pioneer writings | archive | **PARK** (as a product) | useful for research; 19 titles are restricted, and a reader app would compete with the free official app. Could supply Bible Blitz "Adventist history" questions if wanted. |
| `suno-music-generator` | Suno pipeline, incl. Bible songs | active | **FOLD IN** | marketing content: 30-second Bible-song clips for Bible Blitz social posts; verify Suno commercial-use terms per plan tier first. |
| `book-ideas`, `resume`, `lucia-auth-poc`, `luxand-face-recognition` | personal / prototypes | — | **PARK** | |
| `spellstrike` | archived | — | — | predecessor of Spelly; nothing to do |

## Live apps whose repos the cloud cannot see

`HamCram` (6777842196), `Glide` (6807579233), `Untangle Dots` (6807323625)
and `Switch Lights` (6807579427) have landing pages and disclosures but no
repository in the session's list. They are presumably private repos not
granted to the Claude GitHub App, like `piano-tuner`. Grant them the same
way and they get the same polish + "More from Alpine Squad" cross-promo
pass as the other five.

## Release plan for the two SHIP candidates

### Word Trap (this week)
1. Mac: `git checkout fable/polish-2026-10` in `ios-distance`, build, run
   `distanceTests`. Fix anything the compiler says (blind-written Swift).
2. `fastlane beta` from `ios-app/` → build 2.
3. ASC web: App Privacy → Data Not Collected → Publish. Add for Review with
   both IAPs selected. Submit.
4. On Ready for Distribution: `alpinesquad-web` → `src/pages/word-trap`
   add `appId` + App Store button; publish the press kit; follow §4 of the
   marketing plan.

### Pianotune (as soon as the repo is granted)
1. Grant the repo; attach; read `STATE.md`/`HANDOFF.md`/fastlane metadata.
2. HIG + content audit (the tuner's temperament tables and inharmonicity
   copy need the same fact-check the quiz banks got).
3. Polish branch, store packet (name/subtitle/keywords, 5 framed shots,
   review notes with a test piano recording), pricing decision (pro tool:
   one-time at a pro price, or yearly; decide before the IAP is created).
4. Flip the landing page, PTG outreach, graduation watch per
   `DOMAIN-GRADUATION.md`.

## What was not done and why
- No branch was opened in `golf-bowl`, `quote-merch`, or the README-only
  repos: nothing there is close enough to a product for a cloud pass to
  move it, and credits are better spent on the two SHIP candidates and the
  five live apps.
- `proximia/*` was not read.
