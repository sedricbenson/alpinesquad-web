# Local pickup (2026-10-25)

The cloud session that produced the `fable/*` branches ran out of cloud
credits. Everything it finished is pushed and listed in
`PORTFOLIO-WORKQUEUE-2026-10-24.md`. This file is what a **local** Claude
session (Mac, Xcode available) needs to pick up where it stopped.

## State of every branch (all pushed)

| Repo | Branches | Status |
|---|---|---|
| bible-blitz | `fable/polish-2026-10` → `fable/next-2026-10` → `fable/wave4-2026-10`; `fable/content-2026-10` | polish/next/content complete, reviewed, PRs #18 #19 #20. **wave4 is a WIP commit (046635a): untested, incomplete.** |
| music-quest | same shape; PRs #2 #3 #4 | **wave4 is a WIP commit (bdf4fc3): only the pbxproj device-family edit, nothing else.** |
| scratchy | polish/next/content; PRs #1 #2 #3 | wave4 not started (no branch pushed) |
| spelling-game | polish/next/content; PRs #11 #12 #13 | wave4 not started |
| current-atlas | polish/next; PRs #14 #15 | wave4 not started |
| alpinesquad-web | `fable/polish-2026-10`; PR #2 | complete |

## First job locally: build and verify (needs Xcode, nobody else can do it)

For each repo, in this order: `fable/polish-2026-10`, then
`fable/content-2026-10`, then `fable/next-2026-10`.

1. Build. Every branch was written and read-reviewed without a compiler;
   expect a few small signature fixes. Each PR body and each repo's
   `HANDOFF.md` (or `WORKQUEUE.md` for Current Charts) lists the APIs to
   check first.
2. Run the test suites named in the PR body.
3. Do the device checks named in the PR body (StoreKit sandbox, VoiceOver,
   audio, Reduce Motion, iPad).
4. Recapture screenshots and run `fastlane/frame_screenshots.py` per
   `fastlane/SCREENSHOTS.md` (Bible Blitz, Scratchy, Spelly) or the repo's
   own capture script (MusicQuest, Current Charts).
5. Only then merge, in that order per repo, with web PR #2 first.

Nothing ships without the owner testing the UI. Version numbers were left
alone everywhere; the pre-existing blockers (Appfile team id, K4 copy,
Scratchy parental gate, NIV/NKJV rights, Spelly trial decision) still hold.

## Wave 4 briefs (not done; start each from the repo's `fable/next-2026-10`)

### Current Charts: favourite-pass widget
XcodeGen project (`app/project.yml`), so the target can be added in the spec.
App Group `group.com.alpinesquad.currentcharts` on both targets; move
`PackStore.storeDir` and favourites to the group container with a one-time
migration and a fallback to the old path. Widget target `CurrentChartsWidget`
(`app-extension`, `com.apple.widgetkit-extension`), sources in
`app/CurrentChartsWidget/`: bundle, `AppIntentConfiguration` widget selecting
a `PassEntity` (reuse wave-2 `Intents/PassEntity.swift` if it compiles without
the app target), timeline provider reading the best pack from the group
container and computing `SlackFinder.nextTurn` (entries every 15 min for 6 h),
views for accessoryCircular / accessoryRectangular / systemSmall / systemMedium
(medium draws a mini flood/ebb curve). `Legal.dataFooter` on systemMedium.
`widgetURL` `currentcharts://pass/<id>` → `IntentRouter.pendingStationID`;
register the URL scheme in project.yml. Pro gating: widget shows readings only
if the app wrote an `isPro` flag to the group UserDefaults. CLAUDE.md rules:
water-only rendering, footer unchanged, CDN only.

### Bible Blitz: quick actions + widget sources
WIP commit 046635a has `Engine/WidgetBridge.swift` and edits to `AppState`,
`BibleBlitzApp`, `HomeView`, `MainTabView`; none of it was finished or
reviewed. Intended scope: dynamic `UIApplication.shared.shortcutItems`
(Today's Challenge, Quick Play, Verse of the Day) handled through
`AppState.pendingRoute` via a `UIApplicationDelegateAdaptor` +
`UISceneDelegate`; a `WidgetBridge` writing a JSON snapshot (streak, daily
done, today's verse, level) to `UserDefaults(suiteName:
"group.com.alpinesquad.bibleblitz")` and calling
`WidgetCenter.shared.reloadAllTimelines()`; widget extension sources in
`BibleBlitzWidget/` at the repo root (streak widget, verse widget, provider,
entitlements, README with the Xcode "New Target → Widget Extension" steps),
because the pbxproj cannot be edited blind. Handle `bibleblitz://verse` in
`onOpenURL`.

### MusicQuest: iPad
WIP commit bdf4fc3 changed only `TARGETED_DEVICE_FAMILY` in the pbxproj (check
it compiles and that iPad orientations are set). Remaining: replace
`.scaleEffect(staffScale)` in `GameView` with laid-out sizing like LearnView;
readable width (~700 pt) on Home, Journey, Settings, Statistics, Achievements,
Help, Paywall; staff card max ~640 pt; replace
`UIApplication.shared.connectedScenes.first` in `ShareManager` and
`AppReviewManager` with the foreground-active scene; A–G keyboard shortcuts in
Name That Note; share-sheet popover anchor on iPad; description and What's
New mention iPad; 13" screenshots become required.

### Spelly: Type the Word mode
`TypeTheWordViewModel` + `TypeTheWordView` as a third mode: hear the word
(wave-2 `SpeechManager`), picture when one exists, `TextField` with
autocorrect off / no capitalisation / asciiCapable / Return submits,
`@FocusState` on each word, keyboard-safe layout with Submit in a bottom
`safeAreaInset`; exact-match check (case-insensitive, trimmed); after a miss
show the correct spelling with differing letters highlighted and spell it
aloud, wait for Next; 10 words per round; a life spent at round start; same
mastery/XP recording as Picture Spell; third `GameModeButton` on Home; tests
for the answer check and diff highlighter; description/promo/What's New.

### Scratchy: iPad
`TARGETED_DEVICE_FAMILY` → "1,2" in the pbxproj; iPad orientations in
`Info.plist` (`UIRequiresFullScreen` true for now); two-column Home on
regular width; canvas capped by `gameColumnWidth`, answers centred; readable
width on picker/shop/stats/settings/Premium/daily; `ScratchCanvasView` must
survive rotation mid-round without erasing progress; sheets sized for iPad;
description and What's New mention iPad; 13" screenshots required.

## Cost note
The cloud pool was spent by ~60 parallel agent runs (audits, three
implementation waves, compile reviews, content fact-checks). Locally, prefer
one agent at a time and let Xcode do the verifying.
