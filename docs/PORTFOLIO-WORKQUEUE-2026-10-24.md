# Alpine Squad portfolio — work queue (2026-10-24)

One list for all seven repos. Each app repo also has its own `HANDOFF.md`
(or `WORKQUEUE.md` for Current Charts) with the per-item detail; this file is
the order to work them in and what is blocked on what.

## State at the end of the cloud pass

| Repo | Branch | What is on it | PR |
|---|---|---|---|
| bible-blitz | `fable/polish-2026-10` → `fable/next-2026-10`, `fable/content-2026-10` | 5 P0 bugs, 9 P1 polish items, dead code removed, framer + re-framed panels, support URL; then Siri Shortcuts, reminder time + settings link, native share, verses due for review, iPad keyboard; content: all 2,000 questions fact-checked against the KJV, seeder syncs corrections to existing installs, NIV attribution wording | [#18](https://github.com/sedricbenson/bible-blitz/pull/18), [#19](https://github.com/sedricbenson/bible-blitz/pull/19) (stacked), [#20](https://github.com/sedricbenson/bible-blitz/pull/20) (content) |
| music-quest | `fable/polish-2026-10` → `fable/next-2026-10`, `fable/content-2026-10` | 5 P0 bugs, 9 P1 polish items, metadata, support URL; then system appearance, VoiceOver staff placement, Rapid pause during feedback, practice reminder, colour-blind Mastery Map; content: eight music-theory corrections (Help, unit subtitles, bass F♭ position, ledger-line count) | [#2](https://github.com/sedricbenson/music-quest/pull/2), [#3](https://github.com/sedricbenson/music-quest/pull/3) (stacked), [#4](https://github.com/sedricbenson/music-quest/pull/4) (content) |
| scratchy | `fable/polish-2026-10` → `fable/next-2026-10`, `fable/content-2026-10` | 5 P0 bugs, 7 P1 items, age-rating fix (ads), framer + re-framed panels, support URL; then share-card image, `scratchy://daily`, load guard, per-theme haptic texture, daily share card; content: eleven items whose wrong answers were a kind of the right answer | [#1](https://github.com/sedricbenson/scratchy/pull/1), [#2](https://github.com/sedricbenson/scratchy/pull/2) (stacked), [#3](https://github.com/sedricbenson/scratchy/pull/3) (content) |
| spelling-game | `fable/polish-2026-10` → `fable/next-2026-10`, `fable/content-2026-10` | 4 P0 bugs, 12 P1 items, emoji dedupe, honest metadata, docs archive, framer, support URL; then hear the word, spell after a miss, practice missed words, trial-aware paywall, daily reminder; content: every distractor reviewed (2,191 entries fixed, 141 removed), 3,007 words re-tiered so Easy is ages 6-10 | [#11](https://github.com/sedricbenson/spelling-game/pull/11), [#12](https://github.com/sedricbenson/spelling-game/pull/12) (stacked), [#13](https://github.com/sedricbenson/spelling-game/pull/13) (content) |
| current-atlas | `fable/polish-2026-10` → `fable/next-2026-10` | 3 P0 bugs, 11 P1 items, metadata, WORKQUEUE; then Siri next-slack intent, open-a-pass shortcut, share a plan, iPad side panel, cockpit glance | [#14](https://github.com/sedricbenson/current-atlas/pull/14), [#15](https://github.com/sedricbenson/current-atlas/pull/15) (stacked) |
| alpinesquad-web | `fable/polish-2026-10` | honest Scratchy + Bible Blitz copy, `/support` page, this file | [#2](https://github.com/sedricbenson/alpinesquad-web/pull/2) |
| affiliate-website | main | empty repo (README only) | none |

Every Swift change was written and then reviewed a second time without a
compiler (one review pass per wave: polish, next wave 2, next wave 3). The stacked `next`
PRs target the `polish` branch, so each diff reads on its own; merge
`polish` first, then retarget or merge `next`. Nothing was built, tested, or run on a simulator. The cloud
environment has no Xcode, no DNS, and its network policy blocks the npm
registry. Treat every branch as **unverified until a Mac build passes**.

Each audit is checked in at `docs/audits/2026-10-24-hig-audit.md` in its
repo. Items the audit raised but the branch did not take are listed there
and in the repo's handoff, with the reason.

App Review notes (`fastlane/metadata/review_information/notes.txt`) are on
the polish branches of Bible Blitz, MusicQuest, Scratchy, and Spelly, so
`deliver` uploads them with the version. Current Charts keeps its notes in
`attach_build_and_review.rb`.

## Order of work on the Mac

Do these in order; each step unblocks the next.

1. **alpinesquad-web PR #2** — check the Vercel preview (`/support`,
   `/scratchy`, `/bible-blitz`), merge. The app listings' `support_url.txt`
   now point at `/support`, so this goes first.
2. **Build each app branch** (`polish` first, then `next`). Open the project, build, fix anything the
   compiler catches. The handoffs name the APIs the agents were least sure
   of; start there. Expected: a handful of small signature fixes per repo,
   not rewrites.
3. **Content PRs** (#20 Bible Blitz, #13 Spelly, #3 Scratchy, #4 MusicQuest) are data plus small model fixes and can
   merge the moment the polish PR is in; they fix wrong trivia answers and
   real-word "misspellings" that players could not avoid.
4. **Run the test suites.** Bible Blitz (Swift Testing + UI), MusicQuest
   (472 unit + UI classes), Scratchy (unit + 28 UI incl.
   `ListingAndCopyTests`), Spelly (`spellyTests`, `spellyUITests`),
   Current Charts (135 XCTests + 3 UI + `python -m pytest tests/`).
   Several tests were updated on the branches to match new copy and
   locale-dependent time strings; a failing test is as likely a stale
   assertion as a real regression.
5. **Device checks the simulator cannot do** (one device, ~30 minutes):
   - MusicQuest: Listen with the silent switch on, then answer a question;
     background the app mid-Rapid and return (timer should resume, not fail).
   - Scratchy: finish a round with an interstitial loaded; the next
     round's clock must not run under the ad. VoiceOver: scratch with
     direct interaction, use the "Reveal a little" action.
   - Spelly: Ask-to-Buy sandbox, restore with nothing purchased, Try Word
     Blitz from a Picture Spell result.
   - Bible Blitz: delete and reinstall as a Premium sandbox user; Premium
     must be back without Restore. Two fresh installs show the same Daily.
   - Current Charts: launch in Airplane Mode as a subscriber (no paywall);
     Reduce Motion on, press Play; Settings → Manage Subscription opens the
     sheet; a device set to 24-hour time shows 24-hour times.
6. **Screenshots.** Every raw capture in the repos predates this pass.
   Per repo: run the capture path, drop PNGs in `raw-iphone/` (and
   `raw-ipad/`), then `python3 fastlane/frame_screenshots.py …` as
   `fastlane/SCREENSHOTS.md` describes. MusicQuest and Current Charts
   keep their own capture scripts; MusicQuest's live home shot still shows
   the old "Master music theory" tagline and Current Charts' store assets
   show the retired footer, so both need fresh captures.
7. **Merge, bump nothing yet.** Version/build numbers were left alone on
   every branch (1.0.3 (7), 1.2 (12), 1.1.1 (7), 1.0.3 (11), 1.0.2 (16)).
   The HANDOFF blockers that predate this pass still hold:
   - Bible Blitz and Spelly: `fastlane/Appfile` team `4355X679QV` vs
     Xcode `RX4VX27BHL`. Settle before any archive.
   - All: confirm TestFlight has no build ≥ the committed number.
   - Scratchy: metadata push for the new What's New; AdMob app linked.
   - MusicQuest: K4 intro-card copy is still the owner's STOP.
   - Current Charts: attach all three subscriptions to the version.
8. **Submit** per each repo's handoff.

## Next level (not started; needs Xcode for new targets)

Ranked by what buyers notice, then by effort. All are specified in the
P2 sections of the audits.

| App | Feature | Size | Why first |
|---|---|---|---|
| Current Charts | Lock Screen / Home Screen widget for a favourite pass (next slack + mini curve); App Group for the pack store | M | The strongest "first-party" signal for a boating app; Weather-style glance |
| Bible Blitz | Streak + Verse of the Day widget, Quick Actions (intents are done in #19) | M | Daily-habit apps live on the Home Screen |
| MusicQuest | iPad (flip `TARGETED_DEVICE_FAMILY`, fix the staff `scaleEffect`, multi-scene lookups) (appearance is done in #3) | M | Teachers and parents use iPads |
| Spelly | Type-the-word mode (hear-the-word is done in #12) | M | The missing half of a spelling app |
| Scratchy | Daily widget, Game Center (share card is done in #2) | M / M | Shareable results drive installs for a casual game |
| All | String Catalog + `String(localized:)` groundwork | M each | Required before any localisation; no `.xcstrings` exists anywhere |
| All | iCloud sync (KVS for the UserDefaults-backed stores, CloudKit for SwiftData) | S–L | Expected by anyone with two devices |

Owner decisions still open (do not guess):
- Scratchy: parental gate in front of Grown-ups (the code exists, unused);
  streak semantics (per-day vs consecutive wins); the second splash screen.
- Current Charts: Settings headline still says "Not for navigation."
- MusicQuest: K4 intro-card copy.
- Bible Blitz: NIV/NKJV content-rights answer (packet D3).
- Spelly: whether the 48-hour on-device Pro trial ships in 1.0.3.

## affiliate-website
Empty repository (an initial README). Nothing to do until there is a brief.
