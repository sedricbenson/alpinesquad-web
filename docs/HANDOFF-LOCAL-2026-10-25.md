# Handoff to a LOCAL Claude session (2026-10-25, end of cloud session)

Paste this file's path to the local session first: `docs/HANDOFF-LOCAL-2026-10-25.md`
in `alpinesquad-web`. Then read `docs/PORTFOLIO-WORKQUEUE-2026-10-24.md` for the
per-repo detail.

## Why the cloud session stopped where it did
- The cloud container has no copy of `~/git/personal`; it only sees GitHub
  repos the Claude GitHub App is allowed to read. `sedricbenson/piano-tuner`
  (and the HamCram, Glide, Untangle Dots, Switch Lights repos) are private and
  not granted to the app, so nothing could be read or written for them. A
  local session has the folder directly, so start there.
- Everything else is pushed. Every working tree was clean at hand-off.

## State: 21 open PRs, all unverified (no Xcode in the cloud)
Merge order per repo: web PR first, then polish → content → next → wave 4.
Build and run the tests named in each PR body before merging anything.

| Repo | PRs (base ← head) |
|---|---|
| alpinesquad-web | #2 `main ← fable/polish-2026-10` (support, press, daily pages; marketing plan; triage; ASC paste sheet; outreach drafts). Vercel preview builds. |
| bible-blitz | #18 polish, #19 next, #20 content, #21 wave 4 (quick actions, widget sources + README, cross-promo row) |
| spelling-game | #11 polish, #12 next, #13 content, #14 wave 4 (Type the Word mode + tests + screenshot route, cross-promo row) |
| music-quest | #2 polish, #3 next, #4 content, #5 wave 4 (iPad honest staff scaling, readable widths, cross-promo row) |
| scratchy | #1 polish, #2 next, #3 content, #4 wave 4 (iPad portrait, readable columns) |
| current-atlas | #14 polish, #15 next, #16 wave 4 (favourite-pass widget target via project.yml, App Group, URL scheme) |
| ios-distance (Word Trap) | #2 `main ← fable/polish-2026-10` (daily-seed time-zone fix, streak reminder, tests, cross-promo row) |

Every share link in every app now carries `ct=share`; cross-promo rows carry
`ct=xpromo-<app>`; web pages carry `ct=web-*` / `press`. Read App Analytics →
Acquisition → Campaigns after a week.

## Do first, locally (highest value)
1. **Pianotune** (`~/git/personal/piano-tuner`): read its STATE/HANDOFF and
   fastlane metadata; HIG + content audit (temperament tables, inharmonicity
   copy need the same fact-check the quiz banks got); polish branch; store
   packet (name/subtitle/keywords, 5 framed shots, review notes with a test
   recording, pricing decision); flip `src/pages/pianotune` on the site when
   Ready. Outreach plan: `docs/MARKETING-PLAN-2026-10.md` (PTG chapters).
2. **Word Trap submit**: build `ios-distance` `fable/polish-2026-10`, run
   `distanceTests`, `fastlane beta` from `ios-app/` (build 2), ASC web: App
   Privacy → Publish, Add for Review with both IAPs. Then flip
   `src/pages/word-trap` to live.
3. Build-verify the wave-4 PRs (the two widget PRs touch project files).

## Parallel briefs the cloud session queued but did not start
Each is self-contained; run them as subagents locally, one branch each,
commit + push every 5 minutes, PR at the end with the attribution footer.
- **Spelly custom word lists** (`fable/wave5-lists-2026-10` off wave4):
  `CustomWordList` + `CustomListStore` (UserDefaults JSON, `parse()` splits
  newline/comma, trims, lowercases, dedupes), `CustomListsView` editor sheet,
  Home "Practice a list" button → Type the Word over the list (no life, mastery
  under category "custom", no daily credit, telemetry `type_the_word_custom`),
  Settings row, `CustomWordListTests`, What's New line.
- **Scratchy parental gate** (`fable/wave5-gate-2026-10` off wave4): wire the
  existing `ParentalGate`/`ParentalGateView` (zero call sites) in front of the
  Grown-ups sheet and every outbound link; remember success for the foreground
  session only; accessible; test the pure part; What's New line. Then the
  cross-promo row can go into Scratchy too.
- **Bible Blitz kids set** (`fable/content-kids-2026-10` off content): 150
  easy KJV-verifiable questions for ages 6–10 in
  `bibleblitz/Data/questions-kids.json` (same schema), validator + report in
  `docs/audits/`, not wired in.
- **Site guides** (`fable/articles-2026-10` off web polish): `/guides/`
  index + three articles (Technician exam in two weeks; why Friday spelling
  tests fail / spaced review; 30 Bible trivia questions by book), Article
  JSON-LD, footer link, `ct=web-article-<slug>` store links.
- **Golf Bowl vertical slice** (`fable/prototype-2026-10` off main): XcodeGen
  `ios-app/project.yml`, SwiftUI + SpriteKit one-hole prototype (drag to aim,
  friction, 10 pins with physics, 3 shots, results), pure `ShotMath` + tests,
  PROJECT_STATE update.
- **Suno Bible songs vol 2** (`fable/bible-vol2-2026-10`): 12 new kids' Bible
  story songs in `songs/bible/bible-stories-for-kids-vol2.md` following
  `docs/SUNO-CURRENT-RECIPE.md` and the lyric guide (bracket cues, no
  parentheses/quotes/caps, no drums, SDA rules), run `scripts/lyric_lint.py`,
  gate pending.

## Standing rules (unchanged)
Nothing ships without the owner's UI test. Never run fastlane from an
agent; never bump versions; never edit the Bible Blitz Appfile until the
team-id question (4355X679QV vs RX4VX27BHL) is settled. Current Charts:
water-only rendering, `Legal.dataFooter` unchanged, no zoom fade, CDN only.
MusicQuest K4/`introLine` is owner STOP. Commit trailer on every commit:
`Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` and
`Claude-Session: https://claude.ai/code/session_01JQ4QnVfswoDrAdJHu4jgpK`.

## Owner blockers still open
Appfile team id; MusicQuest K4 copy; NIV/NKJV content-rights answer; Spelly
48-hour trial decision; 13" iPad screenshots for Scratchy and MusicQuest
once the device family changes; App Group creation for the two widget apps
if automatic signing does not add it.
