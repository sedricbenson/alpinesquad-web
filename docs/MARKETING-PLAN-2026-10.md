# Alpine Squad — marketing plan (2026-10-25)

Written in a cloud session from the repos, the store metadata, the website,
and `current-atlas/MARKETING.md`. Nothing here has been executed; every
item is either a code or content change queued for a branch, or a
checklist for Sedric. Budget assumption: **$0 paid acquisition** until an
app shows organic traction worth amplifying.

## 1. What we are marketing

| App | Store id | State | Price model | Audience |
|---|---|---|---|---|
| Spelly | 6757465281 | live | free + unlock | parents, homeschool, teachers, spelling-bee families |
| Bible Blitz | 6771674002 | live (1.0.2) | free + $ lifetime Premium | Christians who quiz, church youth groups, Sabbath School / Sunday School leaders |
| HamCram | 6777842196 | live | free + unlock | ham radio licence candidates (Technician/General/Extra) |
| MusicQuest | 6774342789 | live | free + unlock | piano students, music teachers, homeschool music |
| Scratchy | 6786076591 | live | free + unlock (ads flag set) | parents of toddlers / preschoolers |
| Glide | 6807579233 | live | free + unlock | casual puzzle players |
| Untangle Dots | 6807323625 | live | free + $2.99 unlock | calm-puzzle players, daily-puzzle habit |
| Current Charts | (own listing) | live | $19.99/yr, $79.99 lifetime | Salish Sea boaters, kayakers, racers |
| Word Trap | 6809978528 | TestFlight build 1, one click from review | free + $2.99 unlock + $0.99 hints | Wordle-habit players |
| Pianotune | 6772577552 | final prep (repo not reachable from the cloud) | TBD (pro price) | piano technicians, serious players |
| Switch Lights | 6807579427 | not public | — | — |

Every live app already has: a landing page at `alpinesquad.com/<app>`, an
OG image, a `FAQPage` + `MobileApplication` schema block, an
`apple-itunes-app` smart banner, `ct=` campaign tokens on every App Store
link (so App Analytics → Acquisition → Campaigns attributes installs per
page), hero-framed store screenshots, a support page, and in-app share
cards. That is the foundation; the plan below is what sits on top.

## 2. Principles

1. **Proof before push.** The Current Charts rule applies to all of them:
   a page that shows the thing working beats an ad. Screenshots, a 20-second
   capture, a daily-puzzle share card.
2. **Honest claims only.** Store copy was just re-audited for exactly this;
   nothing in a post may say more than the listing says.
3. **One domain.** Everything lands on `alpinesquad.com/<app>` until an app
   earns graduation (`docs/DOMAIN-GRADUATION.md`). Pianotune is the only
   candidate.
4. **Communities, not channels.** Each app has a small, identifiable
   community that already talks about the problem. Show up there as a
   member who built something, answer questions, link once.
5. **Daily-habit apps market themselves** when the share card is good.
   Word Trap, Untangle Dots, Bible Blitz (Daily Challenge) and Glide get the
   most leverage per hour from share-card polish.

## 3. Zero-cost levers to pull this month

### 3.1 App Store product pages (owner, ASC web, ~1 h per app)
- **Promotional text** (170 chars, editable without a build): rotate a
  seasonal line per app. Bible Blitz: Advent/Christmas trivia in December.
  Spelly: back-to-school, spelling-bee season (Jan–Mar). HamCram: before
  each quarterly question-pool change and around Field Day (June).
- **In-App Events** (free, show in search and on the product page): Bible
  Blitz "Christmas Daily Challenges", Word Trap launch event, Untangle Dots
  "Daily Puzzle streak month". One event per app, 2 weeks each.
- **Custom Product Pages** (up to 35 per app): one per keyword cluster,
  e.g. Spelly "spelling bee practice" page leading with the bee mode shot;
  HamCram "Technician exam" page. Each CPP has its own link for the
  matching landing-page section and the matching community post.
- **Ratings**: every app already prompts for a review at a natural high
  point. Reply to every review in ASC within a week; replies show publicly.

### 3.2 Website (code, this repo)
- **Per-app "share" OG images** are done. Add a **press kit** page
  (`/press`): icon, 3 screenshots, 2-sentence blurb, founder line, contact.
  Journalists and newsletter writers link what is easy to link.
- **Launch pages for Word Trap and Pianotune** flip from Coming Soon to live
  the day each is Ready for Distribution (`APP_IDS` already has both ids;
  the pages already carry the comment where to add `appId`).
- **A `/daily` hub**: one page listing today's daily puzzles across the
  apps (Word Trap, Untangle Dots, Glide, Bible Blitz) with their share
  cards. It is the SEO page for "daily word puzzle" style queries and the
  natural cross-promotion surface.
- **Blog, 2 posts/month, each tied to one app and one search phrase**:
  "How to study for the Technician exam in two weeks" (HamCram), "Why
  spelling tests fail and what spaced review does instead" (Spelly), "Bible
  trivia questions by book" (Bible Blitz; the 2,000-question bank is the
  content), "Salish Sea slack-water planning" (Current Charts).
  **Status 2026-10-25:** the first three are live at `/guides/` (branch
  `fable/articles-2026-10`): `technician-exam-two-weeks`,
  `spelling-spaced-review`, `bible-trivia-30-questions`, each with Article
  JSON-LD and its own `ct=web-article-*` store link. The Current Charts
  post, `salish-sea-slack-water-planning` (`ct=web-article-slack-water`),
  followed the same day on `fable/guide-slack-water-2026-10`.

### 3.3 In the apps (code, each repo; queued as wave 5)
- **"More from Alpine Squad" row** in every Settings screen: icon + one
  line + App Store link with `ct=xpromo-<fromapp>` for each sibling that fits
  the audience (Spelly ↔ Bible Blitz ↔ MusicQuest for families; Word Trap ↔
  Untangle Dots ↔ Glide for puzzlers; HamCram and Current Charts stand
  alone). Cheapest install channel we have and fully attributable.
- **Share text carries the store link with `ct=share`** in every app. Word
  Trap and Untangle Dots already share an image; make sure the text has the
  link, not just the image.
- **Widgets and quick actions** (Bible Blitz wave 4, PR #21) are retention
  features that also show up in App Store feature screenshots.

### 3.4 Communities (owner, 1–2 h/week total)

| App | Where the audience already is | What to post |
|---|---|---|
| Bible Blitz | r/Christianity, r/Bible, r/Adventist (Sedric runs Sabbath School content in the `church` repo), church youth-group leaders, Christian homeschool Facebook groups, Bible-study app roundups on YouTube | the Daily Challenge share card with a question people argue about; a "quiz your youth group" post with the Category mode |
| Spelly | r/homeschool, r/Teachers, r/Parenting, Facebook homeschool groups, Teachers Pay Teachers blog audience, spelling-bee parent forums | a 20-second clip of hear-the-word → type → review; "14,000 words, tiered by grade" |
| HamCram | r/amateurradio, r/HamRadio, QRZ forums, Ham Radio Crash Course Discord, local ARRL club newsletters (VE teams recommend study apps), ARRL "Ham Radio License Manual" readers | "I passed with this" posts come from users; seed them by giving VE teams a code-free free-forever Technician pool to mention |
| MusicQuest | r/piano, r/musictheory, r/pianolearning, piano-teacher Facebook groups, Piano World forums, music homeschool co-ops | note-reading progress screenshot; "13 key signatures, both clefs" |
| Scratchy | parenting subreddits, "best toddler apps" roundups, Montessori groups | short screen capture; stress no ads inside play (verify the ads flag claim before posting) |
| Glide, Untangle Dots, Word Trap | r/puzzles, r/iosgaming, TouchArcade forums, r/wordle and r/WordleDaily (Word Trap), Product Hunt (Word Trap launch), daily-puzzle newsletters | the daily share card; "same puzzle for everyone" |
| Current Charts | see `current-atlas/MARKETING.md` (racers, kayakers, boating-education, 48° North, Seattle Boat Show) | agreement-map vs the book; slack-time plan share |
| Pianotune | Piano Technicians Guild chapters (PTG Journal, chapter newsletters), Piano World "Piano Tuner-Technicians" forum, r/pianotuning, YouTube tuner reviewers | accuracy proof against a reference tuning; 88-key inharmonicity capture video; launch at PTG regional seminars |

Rule for every post: answer the thread's actual question first, link the
landing page (not the store) once, and say you built it.

### 3.5 Newsletters and roundups
One email each, with the press-kit link, to the people who already write
these lists: iOS-app roundup newsletters, the ham radio podcasts/YouTube
channels that review study apps, homeschool curriculum bloggers, Christian
app roundups, PNW boating press. Expect 1 in 10 to reply; that is enough.

## 4. Launch playbook (Word Trap now, Pianotune next)

1. **T-7 days:** landing page live with Coming Soon, press kit up, three
   community threads identified, 20-second capture recorded.
2. **T-0 (Ready for Distribution):** flip the page to live (`appId` +
   button), post the in-app event, Product Hunt (Word Trap only), one post
   per community, email the roundups.
3. **T+1 to T+14:** reply to every review and comment, post the daily share
   card from your own play on days 1, 3, 7.
4. **T+30:** read App Analytics campaigns by `ct=`; keep the two channels
   that produced installs, drop the rest, write the post-mortem into this
   file.

## 5. Measurement

- App Analytics → Acquisition → Campaigns (the `ct=` tokens): per page, per
  community post, per cross-promo row.
- Search Console on `alpinesquad.com`: which `/app` pages get impressions,
  for which queries; feeds the blog topics.
- Per app, weekly: impressions → product-page views → installs → first-day
  retention → paywall views → purchases. All in ASC; write the row into
  `docs/METRICS.md` (create on first entry).
- Decision rule: an app that sustains ≥ 500 product-page views/week
  organically is the one that gets the next month's content effort.

## 6. Next 30 days, in order

1. Submit Word Trap (owner: App Privacy publish, Add for Review).
2. Merge the polish/next/content PRs after Mac verification so the
   screenshots and copy on the store match the apps.
3. Press kit page + `/daily` hub (this repo).
4. "More from Alpine Squad" settings row in Spelly, Bible Blitz, MusicQuest,
   Word Trap, Untangle Dots, Glide (wave 5; Glide and Untangle Dots need
   their repos granted to the cloud session).
5. One In-App Event per live app.
6. Two blog posts (HamCram Technician guide, Bible Blitz questions by book).
7. Pianotune: grant the repo, finish the store packet, PTG outreach list.
