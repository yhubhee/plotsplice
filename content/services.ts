// The four service categories and every service on the site.
// The menu, footer, home page shelf and service pages are all generated from this file.
//
// Copy rules: never promise bestseller status, sales numbers, rankings or a Wikipedia page.
// No invented statistics. If a figure is needed, write [[TODO: real figure]] and it will
// show up highlighted on the page until it’s replaced.

import type { Faq } from "./home";

export type CategoryId = "marketing" | "publishing" | "author-brand" | "growth";

export type Category = {
  id: CategoryId;
  title: string;
  /** Short name used in the header menu. */
  menuTitle: string;
  summary: string;
};

export type Step = { title: string; detail: string };

export type Service = {
  slug: string;
  title: string;
  category: CategoryId;
  /** One sentence for cards and menus. */
  shortDescription: string;
  heroLine: string;
  whoItsFor: string;
  /** 4 to 6 bullets. */
  whatYouGet: string[];
  /** 3 to 4 steps. */
  howItWorks: Step[];
  /** 3 questions. */
  faqs: Faq[];
};

export const categories: Category[] = [
  {
    id: "marketing",
    title: "Marketing",
    menuTitle: "Marketing",
    summary: "Put your book in front of the readers most likely to finish it and tell a friend.",
  },
  {
    id: "publishing",
    title: "Publishing",
    menuTitle: "Publishing",
    summary: "Take a manuscript to a finished book that holds up beside anything on a bookshop table.",
  },
  {
    id: "author-brand",
    title: "Author Brand",
    menuTitle: "Author Brand",
    summary: "Build the name, site and reader list that carry over from this book to the next.",
  },
  {
    id: "growth",
    title: "Growth & Discoverability",
    menuTitle: "Growth & Discoverability",
    summary: "Show up where readers now look for books: search, retail algorithms and AI assistants.",
  },
];

export const services: Service[] = [
  // ---------------------------------------------------------------- Marketing
  {
    slug: "amazon-marketing",
    title: "Amazon Marketing",
    category: "marketing",
    shortDescription: "Listings, categories and ad campaigns that help Amazon show your book to likely buyers.",
    heroLine: "Amazon is where most readers will decide about your book. Your page should make that decision easy.",
    whoItsFor:
      "Authors whose book is live on Amazon but barely moving, and authors about to publish who want the page right from day one. It works best when the book already has a strong cover and a few honest reviews.",
    whatYouGet: [
      "A rewritten book description built around your hook and your reader",
      "Category and keyword research based on what similar readers buy and search for",
      "A+ Content designed for your book page",
      "Amazon Ads campaigns set up, tested and adjusted against your budget",
      "A plain-language report on what ran, what it cost and what changed",
    ],
    howItWorks: [
      { title: "Review the page", detail: "We go through your listing, sales history and closest competing books." },
      { title: "Fix the foundations", detail: "Description, categories, keywords and A+ Content come first, because ads can’t rescue a weak page." },
      { title: "Test small", detail: "We run low-budget ad tests to learn which targets bring real interest." },
      { title: "Adjust and report", detail: "Spend moves toward what’s working, and you see the reasoning." },
    ],
    faqs: [
      {
        question: "Will this get me to number one in my category?",
        answer: "We can’t promise that, and nobody honestly can. We can make your page stronger and your ad spending more careful, which gives the book a better chance with every reader who finds it.",
      },
      {
        question: "Do I need to give you my KDP login?",
        answer: "We’ll agree on the safest access for the work involved. For ads, Amazon lets you add us to your advertising account without handing over your main password.",
      },
      {
        question: "How much ad budget do I need?",
        answer: "It depends on your genre and goals, so we recommend a figure in your plan. You can start small, and the ad budget is always separate from our fee.",
      },
    ],
  },
  {
    slug: "goodreads-marketing",
    title: "Goodreads Marketing",
    category: "marketing",
    shortDescription: "Giveaways, shelving and reader outreach that start honest conversation on Goodreads.",
    heroLine: "Goodreads readers are serious, opinionated and hard to fool. That’s exactly why they’re worth reaching.",
    whoItsFor:
      "Authors of fiction and narrative non-fiction whose readers track what they read. It’s especially useful before a launch, when early shelving and reviews can start conversation.",
    whatYouGet: [
      "A complete, polished author profile and book page",
      "A giveaway plan timed around your launch or relaunch",
      "Research into the lists, groups and shelves your readers actually use",
      "Respectful outreach to readers and reviewers in your genre",
      "Guidance on engaging as an author without getting yourself in trouble",
    ],
    howItWorks: [
      { title: "Clean up your presence", detail: "We fix your profile, book data, editions and series links." },
      { title: "Map your readers", detail: "We find the comparable books, groups and lists where your readers gather." },
      { title: "Run the campaign", detail: "Giveaways and outreach go out on a schedule tied to your wider plan." },
    ],
    faqs: [
      {
        question: "Can you get me more five-star reviews?",
        answer: "No. We never buy reviews or ask anyone for a particular rating. We help get your book to readers likely to enjoy it, and they write what they honestly think.",
      },
      {
        question: "What should I do about a bad review?",
        answer: "Usually nothing. Replying rarely helps and can draw more attention to it. If a pattern of feedback points to a fixable problem, we’ll tell you.",
      },
      {
        question: "Are Goodreads giveaways worth the cost?",
        answer: "Sometimes. They tend to work better for building shelves and awareness than for direct sales. We’ll tell you whether one makes sense for your book and budget.",
      },
    ],
  },
  {
    slug: "social-media-booktok",
    title: "Social Media & BookTok",
    category: "marketing",
    shortDescription: "Content built around your book’s hook, plus creator outreach in your genre.",
    heroLine: "You don’t need to become an influencer. You need one clear idea about your book that people want to share.",
    whoItsFor:
      "Authors in visual, emotional or community-driven genres such as romance, fantasy, thrillers and memoir. It also suits non-fiction authors with a strong point of view who are willing to show up on camera or in writing.",
    whatYouGet: [
      "A short positioning brief on your book’s hook, tropes and audience",
      "A content plan you can realistically keep up with",
      "Ready-to-post scripts, captions and video ideas",
      "A vetted list of BookTok and Bookstagram creators in your genre",
      "Personal outreach to creators, with advance copies where appropriate",
    ],
    howItWorks: [
      { title: "Find the hook", detail: "We work out what makes your book easy to talk about in one line." },
      { title: "Choose your platforms", detail: "We pick one or two that suit your book and ignore the rest." },
      { title: "Create and post", detail: "We prepare content in batches, ready for you to approve." },
      { title: "Reach creators", detail: "We pitch the creators whose readers match yours and track the responses." },
    ],
    faqs: [
      {
        question: "Can you make my book go viral on BookTok?",
        answer: "Nobody can promise that. What we can do is give your book a clear hook, consistent content and real creator outreach, which are the parts within anyone’s control.",
      },
      {
        question: "Do I have to appear on camera?",
        answer: "No. Faceless formats such as text overlays, aesthetic footage and voiceover can work well. If you’re comfortable on camera, it often helps, but it isn’t required.",
      },
      {
        question: "Are creator posts paid?",
        answer: "Most outreach is gifted, meaning a creator gets a free copy and chooses whether to post. Some creators charge for promotion, and any paid post must be disclosed by the creator.",
      },
    ],
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    category: "marketing",
    shortDescription: "Amazon, Meta and BookBub ads, tested on small budgets before any money is scaled.",
    heroLine: "Ads make a good book page work harder. They won’t fix a weak one, and we’ll tell you if yours isn’t ready.",
    whoItsFor:
      "Authors with a finished, well-packaged book and money set aside to test. It’s a particularly good fit for series authors, where a reader who buys one book may go on to buy the next.",
    whatYouGet: [
      "A readiness check on your cover, description and reviews before any spend",
      "Campaign setup on the platforms that suit your book",
      "Ad creative and copy written around your hook",
      "Small-budget tests with a clear rule for stopping or scaling each one",
      "Regular reports showing spend, results and our next decision",
    ],
    howItWorks: [
      { title: "Check readiness", detail: "If the book page will waste your ad money, we fix that first." },
      { title: "Set the budget and goal", detail: "We agree what you can comfortably spend and what we’re trying to learn." },
      { title: "Test small", detail: "We run several small tests across targets and creative instead of one big bet." },
      { title: "Scale carefully", detail: "Only what shows real promise gets more budget." },
    ],
    faqs: [
      {
        question: "Will ads pay for themselves?",
        answer: "Not always, especially for a single book at a low price. We’ll talk honestly about the numbers for your book, including when ads are a way to build readership rather than an immediate profit.",
      },
      {
        question: "Which platform is best?",
        answer: "It depends on your book. Amazon Ads reaches people already shopping, Meta can find readers by interest, and BookBub reaches committed readers. Most books should start with one.",
      },
      {
        question: "Is the ad spend included in your fee?",
        answer: "No. Ad spend is paid directly to the platform from your own account, so you always see exactly where the money goes.",
      },
    ],
  },
  {
    slug: "pr-media-outreach",
    title: "PR & Media Outreach",
    category: "marketing",
    shortDescription: "Targeted pitches to the reviewers, podcasts and press your readers already follow.",
    heroLine: "Journalists don’t cover books. They cover stories. We find the story in yours and take it to the right people.",
    whoItsFor:
      "Authors with a newsworthy angle, a relevant expertise or a compelling personal story. It’s a strong fit for memoir and non-fiction, and for fiction with a clear connection to a current conversation.",
    whatYouGet: [
      "A press kit with your bio, book summary, angles and author photo guidance",
      "Three to five story angles tailored to different kinds of outlets",
      "A researched media list of reviewers, podcasts, newsletters and press",
      "Personal pitches and follow-ups, never mass email blasts",
      "A coverage log showing who we contacted, who replied and what ran",
    ],
    howItWorks: [
      { title: "Find the angles", detail: "We interview you and find what’s interesting beyond the fact that a book exists." },
      { title: "Build the list", detail: "We research the specific people whose audience overlaps with your readers." },
      { title: "Pitch personally", detail: "Each pitch is written for its recipient and followed up with care." },
      { title: "Prepare and report", detail: "We help you get ready for interviews and keep you updated on every response." },
    ],
    faqs: [
      {
        question: "Can you guarantee press coverage?",
        answer: "No. Editors and hosts decide what they cover, and that independence is what makes coverage valuable. We can guarantee careful targeting and honest reporting on every pitch.",
      },
      {
        question: "How far ahead should I start?",
        answer: "As early as you can. Many reviewers and long-lead outlets work months ahead of publication, though podcasts and newsletters can be pitched closer to launch or after it.",
      },
      {
        question: "My book has been out for a while. Is it too late?",
        answer: "Not for podcasts, newsletters and stories tied to current events. Traditional review outlets usually prefer new books, so we’d focus on angles that don’t depend on a release date.",
      },
    ],
  },
  {
    slug: "book-launch-strategy",
    title: "Book Launch Strategy",
    category: "marketing",
    shortDescription: "A dated launch plan covering early reviews, pricing, promotions and launch week.",
    heroLine: "A launch isn’t a single day. It’s months of small jobs done in the right order, and we plan every one.",
    whoItsFor:
      "First-time authors planning a launch and experienced authors who want a calmer one. Ideally you come to us with several months' lead time, though we can also plan a relaunch for a book that’s already out.",
    whatYouGet: [
      "A week-by-week launch calendar with an owner for each task",
      "An advance reader and early-review plan that follows retailer rules",
      "Pricing and promotion recommendations for launch week and after",
      "Launch-team materials, email copy and social posts",
      "A plan for the weeks after launch, when many books lose momentum",
    ],
    howItWorks: [
      { title: "Set the date and goal", detail: "We pressure-test your timeline and agree what a good launch means for this book." },
      { title: "Build the calendar", detail: "Everything is mapped backward from launch day, including reviews, marketing and retail setup." },
      { title: "Run the campaign", detail: "We manage the moving parts and keep you up to date on what’s next." },
      { title: "Review and extend", detail: "After launch, we look at what worked and plan the next phase." },
    ],
    faqs: [
      {
        question: "How much lead time do you need?",
        answer: "More is better, because early reviews and press take time. If your date is close, we’ll tell you what’s still achievable or whether moving it would serve the book better.",
      },
      {
        question: "Can you relaunch a book that’s already published?",
        answer: "Yes. A relaunch often pairs a new cover or description with a promotion and fresh outreach. We’ll first diagnose why it didn’t reach readers the first time.",
      },
      {
        question: "Will this make my launch a bestseller?",
        answer: "We can’t promise that. We can give the book an organized, well-timed launch, so it has its best chance and you aren’t left guessing what to do next.",
      },
    ],
  },
  {
    slug: "reddit-marketing",
    title: "Reddit Marketing",
    category: "marketing",
    shortDescription: "Value-first discussion in the right reader communities, with every rule respected and no spam.",
    heroLine: "Reddit can smell an ad from a mile away. We help your book join the conversation the right way, or not at all.",
    whoItsFor:
      "Authors whose book connects to a passionate subject or genre community, and who are comfortable with a slower approach. It’s a good fit for niche non-fiction, sci-fi, fantasy and thrillers.",
    whatYouGet: [
      "Research into the subreddits where your readers already talk about books",
      "A summary of each community’s rules on self-promotion",
      "Discussion ideas and posts that are useful even to people who never buy your book",
      "Guidance for participating under your own name, as yourself",
      "Monitoring of relevant conversations you could genuinely add to",
    ],
    howItWorks: [
      { title: "Research communities", detail: "We read the rules and the culture before anything is written." },
      { title: "Plan contributions", detail: "We work out what you can honestly offer, such as expertise, research or a behind-the-scenes story." },
      { title: "Post with care", detail: "You participate openly as the author, and we follow each community’s rules." },
    ],
    faqs: [
      {
        question: "Do you use fake accounts or paid upvotes?",
        answer: "Never. They break Reddit’s rules, they get found out, and they can do lasting harm to your name. Everything we suggest is done openly.",
      },
      {
        question: "Can I just post a link to my book?",
        answer: "Usually not. Many communities ban or limit self-promotion, and those that allow it often restrict it to certain threads. We’ll show you what each one permits.",
      },
      {
        question: "How quickly does this work?",
        answer: "It’s slow, and it’s a poor fit if you need sales next week. Its value is in reaching people who trust their community’s opinions far more than they trust ads.",
      },
    ],
  },

  // --------------------------------------------------------------- Publishing
  {
    slug: "book-publishing",
    title: "Book Publishing",
    category: "publishing",
    shortDescription: "Hands-on management of your self-publishing, from ISBNs to live retail listings.",
    heroLine: "You keep your rights and your royalties. We handle the many small jobs between a final file and a live book.",
    whoItsFor:
      "Authors with a finished or nearly finished manuscript who want to self-publish professionally but don’t want to learn every platform and specification themselves.",
    whatYouGet: [
      "A publishing plan and timeline covering formats, retailers and pricing",
      "Guidance on ISBNs, copyright registration and imprint setup",
      "Setup on Amazon KDP, IngramSpark and other relevant platforms",
      "Metadata, including categories, keywords and description",
      "Proof review for print and ebook before anything goes live",
      "Coordination of editors, designers and formatters if you need them",
    ],
    howItWorks: [
      { title: "Plan the release", detail: "We decide formats, retailers, pricing and a realistic date." },
      { title: "Prepare the files", detail: "We confirm your interior, cover and metadata meet every platform’s requirements." },
      { title: "Upload and proof", detail: "We set everything up in accounts you own, then check the proofs with you." },
      { title: "Publish", detail: "We confirm each listing is live and correct, and hand over a record of everything." },
    ],
    faqs: [
      {
        question: "Who owns the rights and royalties?",
        answer: "You do. The accounts are in your name, and royalties are paid by the retailers directly to you. We’re paid for the service, not out of your royalties.",
      },
      {
        question: "Are you a traditional publisher?",
        answer: "No. We help you publish independently, so you make the decisions and keep control. There’s no advance, because we aren’t buying your rights.",
      },
      {
        question: "Do I need my own ISBN?",
        answer: "It depends on your plans and country. Owning your own ISBN gives you more independence, though Amazon offers a free option for its own platform. We’ll explain the tradeoff for your book.",
      },
    ],
  },
  {
    slug: "ghostwriting",
    title: "Ghostwriting",
    category: "publishing",
    shortDescription: "A professional writer who shapes your ideas and voice into a complete manuscript.",
    heroLine: "You have the knowledge, the story or the idea. We provide the writing time and craft to get it on the page.",
    whoItsFor:
      "Founders, experts and people with a story worth telling who don’t have the time or the writing experience to complete a book alone. You’ll need to give the process real time for interviews and feedback.",
    whatYouGet: [
      "A writer matched to your subject, genre and way of speaking",
      "A detailed outline to approve before drafting starts",
      "Recorded interviews, so the book sounds like you",
      "Chapters delivered in stages, with room for your feedback",
      "A complete, revised manuscript ready for professional editing",
      "A written agreement covering confidentiality and rights",
    ],
    howItWorks: [
      { title: "Scope and match", detail: "We define the book’s purpose, length and timeline, and match you with a writer." },
      { title: "Outline", detail: "Interviews and research become a chapter-by-chapter plan for your approval." },
      { title: "Draft in stages", detail: "Chapters arrive in batches, so your feedback shapes the rest of the book." },
      { title: "Revise and hand over", detail: "We complete agreed revisions and transfer the finished manuscript to you." },
    ],
    faqs: [
      {
        question: "Will the book really be mine?",
        answer: "Yes. Your agreement sets out rights and credit before work starts. The usual arrangement is that your name goes on the cover and you own the finished work.",
      },
      {
        question: "Do you use AI to write the book?",
        answer: "Your agreement will state exactly how any tools are used. [[TODO: confirm your ghostwriting AI policy]]",
      },
      {
        question: "How long does it take?",
        answer: "A full-length book usually takes many months, depending on its length, research and how quickly feedback comes back. You’ll get a schedule before you commit.",
      },
    ],
  },
  {
    slug: "editing-proofreading",
    title: "Editing & Proofreading",
    category: "publishing",
    shortDescription: "Developmental, line and copy editing, followed by a final proofread.",
    heroLine: "Readers forgive a lot, but not a book that makes them work too hard. Good editing keeps them reading and keeps your voice.",
    whoItsFor:
      "Authors at any stage, from a messy first draft to a finished manuscript that needs a last check. If you aren’t sure which kind of editing you need, a sample edit will tell us.",
    whatYouGet: [
      "An honest assessment of which level of editing your book needs",
      "An editor with experience in your genre",
      "Developmental feedback on structure, pacing, character or argument",
      "Line and copy edits with tracked changes, so you stay in control",
      "A style sheet to keep names, spellings and details consistent",
      "A final proofread after layout, if your package includes one",
    ],
    howItWorks: [
      { title: "Sample edit", detail: "We review a sample to assess what your manuscript needs." },
      { title: "Match and schedule", detail: "We pair you with a genre-appropriate editor and agree on dates." },
      { title: "Edit", detail: "You receive tracked changes and notes that explain the reasoning." },
      { title: "Review and proof", detail: "You accept or reject changes, then the book gets a final proof." },
    ],
    faqs: [
      {
        question: "What’s the difference between the editing types?",
        answer: "Developmental editing looks at the big picture, like structure and story. Line editing works on style sentence by sentence. Copyediting fixes grammar and consistency. Proofreading catches the last errors before publication.",
      },
      {
        question: "Will editing change my voice?",
        answer: "It shouldn’t. A good editor makes you sound more like yourself. You see each change as a tracked edit, and the final decision is always yours.",
      },
      {
        question: "Can one person do every stage?",
        answer: "We prefer a fresh pair of eyes for proofreading, because anyone who’s read a manuscript several times begins to miss things.",
      },
    ],
  },
  {
    slug: "book-cover-design",
    title: "Book Cover Design",
    category: "publishing",
    shortDescription: "A cover that signals your genre at thumbnail size and still looks good in hand.",
    heroLine: "Readers judge your book by its cover in about the time it takes to scroll past. Give them a reason to stop.",
    whoItsFor:
      "Authors publishing a new book, and authors whose existing book isn’t connecting because its cover sends the wrong signal about genre or quality.",
    whatYouGet: [
      "Research into current covers in your genre",
      "Several distinct concepts to choose from",
      "Revision rounds on your chosen direction",
      "Files for ebook, print and audiobook",
      "Thumbnail testing, so it reads at small sizes",
      "Licensed images and fonts, with the details documented",
    ],
    howItWorks: [
      { title: "Brief", detail: "We discuss your story, your readers and the covers you do and don’t like." },
      { title: "Concepts", detail: "A designer presents distinct directions based on genre research." },
      { title: "Refine", detail: "We develop your chosen concept through agreed rounds of revisions." },
      { title: "Deliver", detail: "You receive print-ready and digital files that meet platform specifications." },
    ],
    faqs: [
      {
        question: "Should my cover look like other books in my genre?",
        answer: "It should fit in enough for readers to recognize the genre and stand out enough to be remembered. A cover that’s too unusual can tell a reader it isn’t for them.",
      },
      {
        question: "Do I own the finished cover?",
        answer: "You get the rights you need to use the cover to publish and market your book. Your agreement spells out the details, including any stock image licenses.",
      },
      {
        question: "Will a new cover increase my sales?",
        answer: "It can help if the current cover is the problem, but we can’t promise a number. We’ll tell you honestly whether the cover is what’s holding the book back.",
      },
    ],
  },
  {
    slug: "formatting-layout",
    title: "Formatting & Layout",
    category: "publishing",
    shortDescription: "Clean interior layouts for print and ebook, ready for every major retailer.",
    heroLine: "When a book is laid out well, nobody notices. When it isn’t, every reader does.",
    whoItsFor:
      "Authors with a fully edited manuscript. It suits novels and memoir, and non-fiction with more complex needs such as tables, images, footnotes or workbook pages.",
    whatYouGet: [
      "A custom interior design that suits your genre",
      "Print-ready PDF for your chosen trim size",
      "Reflowable ebook files that work across devices and apps",
      "Careful handling of chapter openers, widows, orphans and page breaks",
      "Front and back matter, including your newsletter sign-up page",
      "One round of corrections after your review",
    ],
    howItWorks: [
      { title: "Choose a style", detail: "We agree on trim size, typefaces and the feel of the interior." },
      { title: "Lay out the book", detail: "We typeset the interior and prepare your ebook." },
      { title: "Check", detail: "You review the proofs while we test files on the platforms and devices that matter." },
      { title: "Deliver", detail: "You receive final files, ready for upload, along with the source files we’ve agreed on." },
    ],
    faqs: [
      {
        question: "Should my manuscript be edited first?",
        answer: "Yes. Changes after layout can shift pages and create new errors, so it’s best to finish editing first. A final proofread of the laid-out pages is still worthwhile.",
      },
      {
        question: "Can you handle images and tables?",
        answer: "Yes, though complex layouts take more time and don’t always reflow well as ebooks. We’ll recommend the best approach for your readers.",
      },
      {
        question: "Will the files work on KDP and IngramSpark?",
        answer: "Yes. We format to each platform’s current specifications and will tell you if a choice like paper type or trim size needs a different file.",
      },
    ],
  },
  {
    slug: "audiobook-production",
    title: "Audiobook Production",
    category: "publishing",
    shortDescription: "Narrator casting, recording, editing and mastering to retailer specifications.",
    heroLine: "Some of your readers will never open your book, but they’d happily listen to it on the way to work.",
    whoItsFor:
      "Authors with a final, published-quality text. It’s a natural fit for memoir, business and self-help books read by the author, and for fiction with a strong voice.",
    whatYouGet: [
      "Narrator auditions, or coaching if you’re reading it yourself",
      "Pronunciation guide and character notes for the narrator",
      "Professional recording, editing and mastering",
      "Files that meet ACX and other distributors' technical requirements",
      "Audiobook cover adapted to the square format",
      "Distribution setup in your own accounts",
    ],
    howItWorks: [
      { title: "Cast", detail: "We shortlist narrators, and you choose the voice from their auditions." },
      { title: "Prepare", detail: "We finalize the script and create notes for names, terms and tone." },
      { title: "Record and edit", detail: "The book is recorded, edited and mastered, and you review the audio." },
      { title: "Distribute", detail: "We prepare the final files and submit them to your chosen retailers." },
    ],
    faqs: [
      {
        question: "Should I narrate it myself?",
        answer: "For memoir and expert non-fiction, your own voice can add a lot. It’s also harder than it looks, so we’ll listen to a sample and give you an honest view.",
      },
      {
        question: "Are AI voices an option?",
        answer: "Some retailers restrict them, and many listeners prefer human narrators. We’ll explain the current rules and tradeoffs if you want to consider it.",
      },
      {
        question: "How long does production take?",
        answer: "It depends on the book’s length and the narrator’s schedule, and retailer review adds further time. Your plan will include dates for each stage.",
      },
    ],
  },
  {
    slug: "rights-translation-scouting",
    title: "Rights & Translation Scouting",
    category: "publishing",
    shortDescription: "Research and outreach to find foreign-language and subsidiary rights opportunities.",
    heroLine: "Your book may have readers in languages and formats you haven’t considered. We go and look for them.",
    whoItsFor:
      "Authors who’ve kept their rights and whose book has some evidence of interest, such as strong reviews, press coverage or sales. Books with universal themes or clear international appeal are the best fit.",
    whatYouGet: [
      "A review of which rights you currently hold",
      "Market research into the most promising territories for your book",
      "A rights sheet and pitch materials",
      "A target list of publishers, agents and co-agents",
      "Outreach and a log of every response",
      "Advice on when to bring in a literary lawyer",
    ],
    howItWorks: [
      { title: "Check your rights", detail: "We confirm what’s available and what your existing agreements allow." },
      { title: "Research the markets", detail: "We identify where your book has the strongest case and why." },
      { title: "Prepare and pitch", detail: "We build your rights sheet and approach the right contacts." },
      { title: "Report", detail: "You see each response and decide what to pursue, with legal advice on any contract." },
    ],
    faqs: [
      {
        question: "Can you guarantee a translation deal?",
        answer: "No. Rights deals are hard to win, and many books won’t find one. We’ll give you an honest view of your book’s prospects before you spend money on outreach.",
      },
      {
        question: "Are you a literary agent or a lawyer?",
        answer: "We’re neither. We scout and make introductions. Any contract should be reviewed by a qualified literary lawyer or agent before you sign it.",
      },
      {
        question: "Could I pay for a translation myself instead?",
        answer: "You could, and sometimes it makes sense. It’s a large upfront cost, so we’d want to look at the size of that market and whether you can reach it first.",
      },
    ],
  },

  // ------------------------------------------------------------- Author Brand
  {
    slug: "author-platform-strategy",
    title: "Author Platform Strategy",
    category: "author-brand",
    shortDescription: "A realistic plan for where to show up, what to say and what to ignore.",
    heroLine: "You can’t be everywhere and still write books. Let’s work out the few places that are worth your time.",
    whoItsFor:
      "Authors who feel they should be doing more but don’t know what. It’s useful before a first book, between books, and for non-fiction authors whose platform matters to their wider work.",
    whatYouGet: [
      "An audit of your existing website, social accounts, email list and press",
      "A clear definition of who your readers are and where they gather",
      "A recommendation on which channels to prioritize and which to drop",
      "A content approach and schedule that fits your actual week",
      "A short list of measures that show whether it’s working",
    ],
    howItWorks: [
      { title: "Audit", detail: "We review what you have and what’s taking up your time." },
      { title: "Decide", detail: "We pick your priorities with your goals, genre and capacity in mind." },
      { title: "Plan", detail: "You get a written plan with tasks, templates and a realistic rhythm." },
    ],
    faqs: [
      {
        question: "Do I need a platform before I publish?",
        answer: "It helps, and some non-fiction publishers look for one, but it isn’t a reason to delay a good book. Even a simple website and email list gives you a place to start.",
      },
      {
        question: "Will I have to post every day?",
        answer: "Almost certainly not. A schedule you can maintain beats an ambitious one you’d drop within a month.",
      },
      {
        question: "Can you carry out the plan as well?",
        answer: "Yes. You can run it yourself, or we can handle some or all of it through our other services.",
      },
    ],
  },
  {
    slug: "bestseller-strategy",
    title: "Bestseller Strategy",
    category: "author-brand",
    shortDescription: "An honest campaign plan to give your book its strongest chance at list visibility, with no guarantees.",
    heroLine: "No one can promise you a bestseller. We can show you what it takes, and whether it’s the right goal for your book.",
    whoItsFor:
      "Authors with a strong book, a real budget and an existing or growing audience, who want an honest assessment of their chances. It’s most relevant for books with a launch still ahead.",
    whatYouGet: [
      "A plain explanation of how the major lists and retail rankings differ",
      "An honest assessment of whether list visibility is realistic for your book",
      "A coordinated plan for concentrating sales interest around launch",
      "Audience-building, promotion and pre-order recommendations",
      "A clear list of tactics we refuse to use, and why",
    ],
    howItWorks: [
      { title: "Assess", detail: "We look at the book, your audience, your budget and the competition." },
      { title: "Define success", detail: "We agree on a goal that would be worthwhile even if no list comes calling." },
      { title: "Plan and coordinate", detail: "We line up pre-orders, outreach and promotions around a focused window." },
      { title: "Review", detail: "We report honestly on what happened and what to carry into the next phase." },
    ],
    faqs: [
      {
        question: "Do you guarantee bestseller status?",
        answer: "No. Rankings and lists depend on sales, competition and, for some lists, editorial decisions that nobody outside can control. Anyone guaranteeing it deserves your suspicion.",
      },
      {
        question: "What about buying bulk copies to reach a list?",
        answer: "We won’t do it. Major lists watch for artificial sales, and those schemes can cost a lot of money for very little real readership.",
      },
      {
        question: "Is a short-lived Amazon category badge worth chasing?",
        answer: "It can be a nice moment, but it’s not the same as finding lasting readers. We’d rather build you an audience that’s still there the following month.",
      },
    ],
  },
  {
    slug: "author-branding",
    title: "Author Branding",
    category: "author-brand",
    shortDescription: "A clear position, voice and visual identity that readers can recognize and remember.",
    heroLine: "A brand isn’t a logo. It’s what readers expect when they see your name on the next book.",
    whoItsFor:
      "Authors planning a series or several books, those changing genres, and experts whose book is part of a wider career. It helps most when your online presence feels scattered or out of date.",
    whatYouGet: [
      "A positioning statement describing who you write for and why you’re different",
      "Guidelines for your voice, with examples of how to apply them",
      "A short and long author bio",
      "A visual identity of colors, type and a simple wordmark",
      "Templates for social posts and newsletters",
      "Direction for your author photos",
    ],
    howItWorks: [
      { title: "Listen", detail: "We talk through your books, readers and goals, and study comparable authors." },
      { title: "Define", detail: "We write your position and voice for you to react to." },
      { title: "Design", detail: "We develop a visual identity that suits your genre and your personality." },
      { title: "Hand over", detail: "You get a short guide and templates that are simple to use." },
    ],
    faqs: [
      {
        question: "I’m a novelist. Do I really need a brand?",
        answer: "You already have one. It’s whatever readers assume when they find you. This work simply makes it deliberate, so it helps your next book.",
      },
      {
        question: "What if I write in more than one genre?",
        answer: "We’ll help you decide whether to connect them under one name or keep them separate. It depends on how much your readerships overlap.",
      },
      {
        question: "Will this make me sound like a corporation?",
        answer: "It shouldn’t. The aim is to sound more like the best version of you, not to hide you behind marketing language.",
      },
    ],
  },
  {
    slug: "speaking-events",
    title: "Speaking & Events",
    category: "author-brand",
    shortDescription: "Talk topics, a speaker kit and pitches to festivals, bookshops and organizations.",
    heroLine: "A room full of people who came to hear you can be worth more than a thousand passing scrolls.",
    whoItsFor:
      "Non-fiction authors and experts who want speaking to be part of their work, and fiction authors looking for festivals, bookshop events and library talks. You should be willing to prepare and to travel, or to speak online.",
    whatYouGet: [
      "Signature talk topics based on your book",
      "A speaker kit with your bio, topics, photos and video links",
      "A researched list of relevant festivals, conferences, bookshops and organizations",
      "Personal pitches and follow-up",
      "Advice on selling books at events and collecting email sign-ups",
    ],
    howItWorks: [
      { title: "Shape the talks", detail: "We turn your book’s ideas into topics that event organizers can picture on their program." },
      { title: "Build your kit", detail: "We prepare what organizers need to say yes quickly." },
      { title: "Pitch", detail: "We approach the most suitable events, working around their application windows." },
      { title: "Make it count", detail: "We help you plan how to turn each event into readers and sign-ups." },
    ],
    faqs: [
      {
        question: "Can you guarantee paid speaking gigs?",
        answer: "No. Organizers choose their speakers and many events, especially early on, don’t pay much. We’ll be clear about what’s realistic at your stage.",
      },
      {
        question: "I don’t have any speaking experience. Is that a problem?",
        answer: "Not necessarily. Bookshops, libraries and local groups are good places to start, and we can help you build up to larger events.",
      },
      {
        question: "Do you book travel and logistics?",
        answer: "This service covers strategy, materials and outreach. Once you’ve accepted an invitation, you and the organizer handle travel unless we’ve agreed otherwise.",
      },
    ],
  },
  {
    slug: "newsletter-email",
    title: "Newsletter & Email",
    category: "author-brand",
    shortDescription: "A reader list you own, with sign-up incentives and emails people look forward to.",
    heroLine: "Platforms change their rules overnight. Your email list stays yours and goes with you to every book.",
    whoItsFor:
      "Every author who plans to publish more than one book, and anyone tired of relying on social media algorithms. You can start from scratch or fix a list you’ve neglected.",
    whatYouGet: [
      "Email platform setup in an account you own",
      "A sign-up incentive, such as a bonus chapter or short story",
      "Sign-up forms for your website and links for your book’s back matter",
      "A welcome sequence for introducing new readers to you",
      "A simple newsletter format and content calendar",
      "List-growth ideas that don’t involve buying email addresses",
    ],
    howItWorks: [
      { title: "Set it up", detail: "We choose a suitable platform and connect your forms." },
      { title: "Give readers a reason", detail: "We develop an incentive that attracts people who’ll enjoy your work." },
      { title: "Write the welcome", detail: "We write the first emails that every new subscriber receives." },
      { title: "Keep it going", detail: "We set a realistic rhythm and can write or manage your issues." },
    ],
    faqs: [
      {
        question: "I have nothing to write about. What would I send?",
        answer: "More than you think: what you’re reading, the research behind your book, or what you’re working on. We’ll give you a format that makes it much easier.",
      },
      {
        question: "Can you buy or rent a list for me?",
        answer: "No. Bought lists hurt your deliverability, can break email laws and don’t contain people who actually asked to hear from you.",
      },
      {
        question: "How often should I send emails?",
        answer: "As often as you can do it well. Consistency matters more than frequency, and monthly is a sensible place for many authors to start.",
      },
    ],
  },
  {
    slug: "wikipedia-online-presence",
    title: "Wikipedia & Online Presence",
    category: "author-brand",
    shortDescription: "The press coverage and consistent public record that independent notability rests on.",
    heroLine: "No one can promise you a Wikipedia page, because it depends on independent notability. We help build the public record that notability rests on.",
    whoItsFor:
      "Authors who want a stronger, more credible and more consistent presence when someone searches their name. That includes authors who’ve asked about Wikipedia and want an honest answer.",
    whatYouGet: [
      "An honest assessment of where you stand against Wikipedia’s notability guidelines",
      "An audit of what people and AI assistants find when they look you up",
      "Consistent author details across Google, Amazon, Goodreads and other profiles",
      "A press and coverage plan aimed at credible, independent sources",
      "Structured data on your website to help search engines understand who you are",
    ],
    howItWorks: [
      { title: "Assess", detail: "We review your existing coverage and tell you plainly how it measures up." },
      { title: "Clean up", detail: "We fix inconsistent bios, outdated profiles and missing information." },
      { title: "Build", detail: "We pursue real press and credible mentions through our PR work." },
      { title: "Maintain", detail: "You get a simple record of your profiles, so they stay accurate." },
    ],
    faqs: [
      {
        question: "Can you get me a Wikipedia page?",
        answer: "We can’t promise one, and you should be cautious of anyone who does. Wikipedia’s volunteer editors decide based on significant coverage in independent, reliable sources. A page without that can be deleted.",
      },
      {
        question: "Can I write my own Wikipedia page?",
        answer: "Wikipedia strongly discourages it, because you have a conflict of interest. Paid contributors must also disclose that they’re being paid. We follow those rules and won’t try to get around them.",
      },
      {
        question: "What will I get if I never qualify for a page?",
        answer: "A consistent, credible presence, which is the part that helps readers, journalists and AI assistants understand who you are. It’s valuable with or without Wikipedia.",
      },
    ],
  },
  {
    slug: "author-website-builds",
    title: "Professional Author Website Builds",
    category: "author-brand",
    shortDescription: "Custom, fast, mobile-ready sites built to be found on Google and recommended by AI assistants.",
    heroLine: "Your website is the one place online where you set the rules. It should load fast, look like you and be easy to find.",
    whoItsFor:
      "Authors without a site, and authors whose existing site is slow, dated or hard to update. It suits fiction and non-fiction authors alike, whether you have one book or a growing backlist.",
    whatYouGet: [
      "A custom design based on your books and your author brand",
      "A fast site that works well on phones",
      "Book pages with buy links, descriptions and structured data",
      "Email sign-up forms connected to your newsletter",
      "Search and AI discoverability built in from the start",
      "A simple way to update your content, plus a handover walkthrough",
    ],
    howItWorks: [
      { title: "Plan", detail: "We agree on your site’s goal, pages and content." },
      { title: "Design", detail: "You review the design before we build it." },
      { title: "Build", detail: "We build the site, connect your tools and write the structured data." },
      { title: "Launch", detail: "We test everything, launch it on your domain and show you how to run it." },
    ],
    faqs: [
      {
        question: "Will I own the website?",
        answer: "Yes. The domain and hosting accounts are in your name, so you aren’t locked in to working with us.",
      },
      {
        question: "Will it get me to the top of Google?",
        answer: "We can’t promise rankings. We build the site so search engines and AI assistants can read and understand it, and you’ll be in a much stronger position to be found.",
      },
      {
        question: "Can I update it myself?",
        answer: "Yes. We’ll set up a simple way to change your books, events and news, and we’ll show you how to use it during handover.",
      },
    ],
  },

  // -------------------------------------------------- Growth & Discoverability
  {
    slug: "ai-discoverability-google-play-books",
    title: "AI Discoverability (GEO) & Google Play Books",
    category: "growth",
    shortDescription: "Index and structure your book so Google, ChatGPT, Perplexity and Rufus can surface it.",
    heroLine: "Readers now ask an assistant what to read next. It can only suggest books it can find and understand.",
    whoItsFor:
      "Authors with a published book who want to be found in more places, particularly in non-fiction and clearly defined fiction niches. It’s also for those who’ve only published on Amazon and aren’t yet on Google Play Books.",
    whatYouGet: [
      "A test of how major AI assistants currently describe your book and which books they suggest",
      "Google Play Books setup, with your book’s metadata prepared",
      "Structured data for your book and author pages",
      "Clear, consistent descriptions across your retailer pages and website",
      "A plan for earning third-party mentions that assistants can draw on",
      "A follow-up test to compare with where you started",
    ],
    howItWorks: [
      { title: "Baseline", detail: "We ask leading assistants the questions your readers ask, and record the answers." },
      { title: "Fix the facts", detail: "We make your book’s information accurate and consistent everywhere it appears." },
      { title: "Publish and structure", detail: "We set up Google Play Books and add structured data to your website." },
      { title: "Build mentions", detail: "We pursue reviews, lists and articles, then test again." },
    ],
    faqs: [
      {
        question: "Can you guarantee ChatGPT will recommend my book?",
        answer: "No. These tools change often and don’t offer a way to pay for an organic recommendation. We can make your book easier to find, understand and cite.",
      },
      {
        question: "What does GEO mean?",
        answer: "Generative engine optimization. It’s the practice of making your information easy for AI assistants to find and use, much as SEO does for search engines.",
      },
      {
        question: "My book is exclusive to Amazon through KDP Select. Can I still use Google Play Books?",
        answer: "Not for the ebook while it’s enrolled, because KDP Select requires digital exclusivity. We can look at whether to leave when your term ends. Your other AI discoverability work can start right away.",
      },
    ],
  },
  {
    slug: "amazon-listing-seo-audit",
    title: "Amazon Listing SEO & Visibility Audit",
    category: "growth",
    shortDescription: "A line-by-line review of your listing, with a prioritized list of what to fix first.",
    heroLine: "Before you spend another dollar on ads, find out what your Amazon page is telling readers and the algorithm.",
    whoItsFor:
      "Authors whose book is live on Amazon but struggling to get found or to turn visitors into buyers. It’s a good first step if you aren’t sure what to do next, and it has a clear, contained scope.",
    whatYouGet: [
      "A review of your title, subtitle, description, categories and keywords",
      "A comparison against the closest competing books in your niche",
      "A review of your cover, price, reviews and look-inside sample as readers see them",
      "A check for Rufus and on-page information gaps",
      "A prioritized list of what to fix, from most to least important",
      "Rewritten copy for your description, if included in your plan",
    ],
    howItWorks: [
      { title: "Collect", detail: "You send us your book and existing listing details." },
      { title: "Audit", detail: "We review your page against comparable books and search behavior." },
      { title: "Prioritize", detail: "You get a written report, ordered by what’s most likely to matter." },
      { title: "Walk through", detail: "We go through the findings together, so you can act on them or hand them to us." },
    ],
    faqs: [
      {
        question: "What exactly will I receive?",
        answer: "A written report with specific recommendations, not a generic checklist. Each one explains what to change, and why it matters for your book.",
      },
      {
        question: "Do I have to hire you to make the changes?",
        answer: "No. Many of the fixes are ones you can make yourself in KDP. If you’d rather hand them to us, we can do that as a separate step.",
      },
      {
        question: "Will the audit improve my rank?",
        answer: "An audit alone doesn’t change anything. Making the fixes gives your book a better chance of being found, but we can’t promise a particular rank or sales result.",
      },
    ],
  },
  {
    slug: "substack-growth",
    title: "Substack Growth",
    category: "growth",
    shortDescription: "Build or grow your Substack and pitch features to relevant Substack and Medium publications.",
    heroLine: "Substack puts your writing in front of people who already like reading. That’s a good crowd for an author.",
    whoItsFor:
      "Authors who enjoy writing regularly, especially essayists, memoirists, non-fiction writers and novelists with a strong voice. You should be ready to publish consistently, or have us help you do it.",
    whatYouGet: [
      "Publication setup or a review of your existing Substack",
      "A clear positioning and name for your publication",
      "An editorial calendar and post formats you can sustain",
      "A plan for Notes, recommendations and collaborations",
      "Pitches for features on relevant Substack and Medium publications",
      "Advice on if and when to turn on paid subscriptions",
    ],
    howItWorks: [
      { title: "Position", detail: "We define what your publication offers and who it’s for." },
      { title: "Set up", detail: "We build out your page, welcome email and first posts." },
      { title: "Grow", detail: "We work on Notes, recommendations and collaborations with similar writers." },
      { title: "Get featured", detail: "We pitch your best work to relevant publications." },
    ],
    faqs: [
      {
        question: "How is Substack different from a normal newsletter?",
        answer: "It’s a newsletter with a built-in network, so other writers can recommend you and readers can discover you there. You can also export your subscriber emails.",
      },
      {
        question: "Can you promise a feature on a big publication?",
        answer: "No. Editors choose what they publish. We’ll select the best fits, shape your pitch and tell you what comes back.",
      },
      {
        question: "Should I charge for it?",
        answer: "Often not at first. We usually suggest building an engaged free audience, then adding a paid tier if you have something people clearly want more of.",
      },
    ],
  },
  {
    slug: "book-trailer-videos",
    title: "Book Trailer Videos",
    category: "growth",
    shortDescription: "Cinematic and short-form trailers for Reels, TikTok and Shorts, built around your core hook.",
    heroLine: "A good trailer doesn’t summarize your book. It makes someone need to know what happens next.",
    whoItsFor:
      "Authors with a strong visual or emotional hook, especially in thrillers, fantasy, romance and memoir. It works best alongside a social or launch plan, so that the video actually gets seen.",
    whatYouGet: [
      "A concept and script built around your book’s central hook",
      "A cinematic trailer for your website, YouTube and launch",
      "Short vertical cuts for Reels, TikTok and Shorts",
      "Licensed footage and music, with the details documented",
      "Captions, because many people watch with the sound off",
      "A simple plan for where and when to post each version",
    ],
    howItWorks: [
      { title: "Find the hook", detail: "We pick the single moment or question that will stop a scroll." },
      { title: "Script and storyboard", detail: "You approve the concept before production starts." },
      { title: "Produce", detail: "We edit the trailer and short cuts, with rounds of revisions." },
      { title: "Deliver", detail: "You receive files in each format, along with a posting plan." },
    ],
    faqs: [
      {
        question: "Do book trailers sell books?",
        answer: "A trailer on its own rarely does. It’s most useful as a tool that gives your social, ads and launch something strong to work with. We’d tell you if your money would go further elsewhere.",
      },
      {
        question: "Will I need to appear in it?",
        answer: "No, unless you want to. Many trailers use licensed footage, typography, voiceover and music. Author-led versions can work well for memoir and non-fiction.",
      },
      {
        question: "Can I use it in paid ads?",
        answer: "Usually yes, and short versions are often built with that in mind. We’ll make sure the licenses for footage and music cover how you plan to use the video.",
      },
    ],
  },
];

export const servicesIn = (category: CategoryId) =>
  services.filter((service) => service.category === category);

export const getService = (slug: string) => services.find((service) => service.slug === slug);

export const getCategory = (id: CategoryId) => categories.find((category) => category.id === id)!;

/** Up to three other services from the same category. */
export const relatedServices = (service: Service) =>
  servicesIn(service.category)
    .filter((other) => other.slug !== service.slug)
    .slice(0, 3);

export type MenuCategory = Pick<Category, "id" | "title" | "menuTitle"> & {
  services: Pick<Service, "slug" | "title">[];
};

// Just what the menu and contact form need. They run in the browser, so passing them
// this instead of the full list keeps all the page copy out of every visitor's download.
export const serviceMenu: MenuCategory[] = categories.map(({ id, title, menuTitle }) => ({
  id,
  title,
  menuTitle,
  services: servicesIn(id).map(({ slug, title }) => ({ slug, title })),
}));
