/**
 * The guides index. One entry per article under src/pages/guides/.
 * Keep `path` in sync with the file name; the index page and the
 * footer read from here so a new article is one line plus one page.
 */
export type Guide = {
  path: string;
  title: string;
  description: string;
  app: string;
  appHref: string;
  icon: string;
  datePublished: string;
  readingMinutes: number;
};

export const GUIDES: Guide[] = [
  {
    path: '/guides/technician-exam-two-weeks',
    title: 'Pass the Technician exam in two weeks',
    description:
      'A realistic 14-day study plan for the FCC Technician license: how the question pool is built, what to memorize, what to understand, and when to take practice exams.',
    app: 'HamCram',
    appHref: '/hamcram',
    icon: '/images/hamcram-icon.png',
    datePublished: '2026-10-25',
    readingMinutes: 9,
  },
  {
    path: '/guides/spelling-spaced-review',
    title: 'Why Friday spelling tests fail, and what spaced review does instead',
    description:
      'Cramming Monday’s list for Friday’s test produces a Friday score and little else. Here is what the spacing effect says, and how to run short spaced reviews at home.',
    app: 'Spelly',
    appHref: '/spelly',
    icon: '/images/spelly-icon.png',
    datePublished: '2026-10-25',
    readingMinutes: 7,
  },
  {
    path: '/guides/bible-trivia-30-questions',
    title: '30 Bible trivia questions by book',
    description:
      'Thirty Bible trivia questions with answers and KJV references, grouped by book from Genesis to Revelation. Ready for a youth group, a Sabbath School class, or the dinner table.',
    app: 'Bible Blitz',
    appHref: '/bible-blitz',
    icon: '/images/bibleblitz-icon.png',
    datePublished: '2026-10-25',
    readingMinutes: 6,
  },
];
