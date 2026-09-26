export type Lang = "ar" | "en";

export const isAr = () => document.documentElement.dataset.lang !== "en";

export function setLang(l: Lang) {
  try {
    localStorage.setItem("bd-lang", l);
  } catch {
    /* private mode */
  }
  const d = document.documentElement;
  d.lang = l;
  d.dir = l === "ar" ? "rtl" : "ltr";
  d.dataset.lang = l;
  document.title =
    l === "ar" ? "بديل — مبدّل حسابات الألعاب" : "badeel — game account switcher";
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute(
      "content",
      l === "ar"
        ? "بديل مبدّل حسابات لسبع منصّات ألعاب، بدّل بضغطة واحدة بدون كلمة سر، وكل جلسة مشفّرة بـ AES-256 ومربوطة بجهازك وحده، مجاني ومفتوح المصدر."
        : "badeel switches between your accounts on seven game platforms in one click, with no password. Every session is sealed with AES-256 and bound to your machine alone. Free and open source.",
    );
  }
}

export const REPO = "Ryanathlawi/badeel";
export const REPO_URL = `https://github.com/${REPO}`;

export type Platform = {
  id: string;
  ar: string;
  en: string;
  color: string;
};

export const PLATFORMS: Platform[] = [
  { id: "steam", ar: "ستيم", en: "Steam", color: "var(--steam)" },
  { id: "battlenet", ar: "باتل نت", en: "Battle.net", color: "var(--battlenet)" },
  { id: "riot", ar: "رايوت", en: "Riot Games", color: "var(--riot)" },
  { id: "epic", ar: "إيبك", en: "Epic Games", color: "var(--epic)" },
  { id: "ubisoft", ar: "يوبيسوفت", en: "Ubisoft", color: "var(--ubisoft)" },
  { id: "rockstar", ar: "روكستار", en: "Rockstar", color: "var(--rockstar)" },
  { id: "gog", ar: "جوج جالاكسي", en: "GOG Galaxy", color: "var(--gog)" },
];

type Dict = {
  nav: { features: string; how: string; security: string; story: string; team: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    lead: string;
    download: string;
    source: string;
    note: string;
    by: string;
    chips: string[];
  };
  platforms: { eyebrow: string; title: string; lead: string; note: string };
  story: { eyebrow: string; title: string; paras: string[] };
  features: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { tag: string; title: string; body: string }[];
  };
  how: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; body: string }[];
  };
  security: {
    eyebrow: string;
    title: string;
    lead: string;
    chain: { title: string; body: string }[];
    rollback: { title: string; body: string };
    facts: { k: string; v: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    lead: string;
    people: { name: string; role: string; bio: string; tags: string[] }[];
  };
  cta: { title: string; lead: string; download: string; source: string; note: string };
  footer: { built: string; licence: string; rights: string };
};

const ar: Dict = {
  nav: {
    features: "المميزات",
    how: "كيف يشتغل",
    security: "الأمان",
    story: "القصة",
    team: "الفريق",
  },
  hero: {
    badge: "مجاني ومفتوح المصدر لويندوز",
    title1: "بدّل حساباتك",
    title2: "بضغطة واحدة",
    lead: "بديل ينقلك بين حساباتك في سبع منصّات ألعاب بدون أن تكتب كلمة سر واحدة، وكل جلسة تُحفظ مشفّرة بـ AES-256 ومربوطة بجهازك وحده، فالنسخة المسروقة إلى حاسب آخر لا تُفتح أصلًا.",
    download: "حمّله لويندوز",
    source: "شِف الكود",
    note: "يعمل على ويندوز ١٠ و١١ بملف واحد بلا مثبِّت",
    by: "تأسيس وتطوير ريان الأثلاوي ومؤيد المطيري",
    chips: ["الخزنة مفتوحة", "AES-256-GCM", "هذا الجهاز فقط", "بلا تتبّع"],
  },
  platforms: {
    eyebrow: "المنصّات",
    title: "سبع منصّات في نافذة واحدة",
    lead: "بديل يكتشف ما هو مثبَّت عندك بنفسه، فيقرأ سجل ويندوز وملفات المنصّات ليلقى تثبيتك ولو كان على قرص آخر.",
    note: "لا مسارات مكتوبة مسبقًا، ولا شيء تضبطه بيدك.",
  },
  story: {
    eyebrow: "لماذا بُني أصلًا",
    title: "بدأ كل هذا بحساب مسروق",
    paras: [
      "ما بدأت فكرة بديل في اجتماع ولا على ورقة بيضاء، بدأت في ليلة عادية جدًا فتحت فيها حسابي فلم أجده",
      "في البداية ظننتها مشكلة في الاتصال فأعدت المحاولة مرتين وثلاثًا، ثم جاءت الرسالة التي يعرفها كل من مرّ بهذا، كلمة السر غير صحيحة، وحين طلبت استعادتها اكتشفت أن البريد المرتبط بالحساب لم يعد بريدي، سنوات من اللعب ومن المشتريات ومن الأصدقاء انتقلت كلها إلى شخص لا أعرف عنه شيئًا وفي أقل من عشر دقائق",
      "قضيت الأسبوع الذي بعده في تذاكر الدعم، رسائل تُغلق تلقائيًا وردود جاهزة كُتبت للجميع ولم تُكتب لأحد، وانتظار طويل ينتهي بلا شيء، ومع كل رسالة كنت أعيد على نفسي السؤال نفسه، من أين دخلوا؟",
      "والجواب كان أمامي طوال الوقت، قبل ذلك بأسابيع كنت أستخدم أداة صغيرة لتبديل الحسابات، من تلك الأدوات المنتشرة التي يفتحها آلاف اللاعبين كل يوم وهم مطمئنون، مجانية وسريعة وتوفّر عليك عناء تسجيل الخروج والدخول في كل مرة، وهذا بالضبط سبب انتشارها",
      "وهنا فهمت المشكلة الحقيقية، هذه الأدوات لا تطلب منك كلمة سر ولا رمز تحقق، بل تطلب شيئًا أثمن من الاثنين معًا وهو جلستك المفتوحة، ذلك الملف الصغير الذي يقول للمنصّة إنك أنت، ثم تحفظه في مكان لا تراه وبصيغة لا تقرأها وتفعل به ما لا تعرفه",
      "وما دام الكود مغلقًا فلا أحد يستطيع أن يثبت ماذا يجري لتلك الملفات بعد أن تسلّمها، لا أنت ولا أي شخص آخر، أنت لا توقّع على شيء، بل تسلّم مفاتيح بيتك لأحدهم لأنه قال لك إنه سيحرسها",
      "بحثت وقتها عن بديل أثق به، وجدت أدوات كثيرة لكن أغلبها يطلب صلاحيات المدير على الجهاز كله، وبعضها يحفظ الجلسات بلا تشفير يُذكر، وأكثرها لا يعرف العربية أصلًا، ولم أجد واحدًا أستطيع أن أفتح كوده وأقرأ بنفسي ماذا يفعل بملفاتي",
      "فقرّرت أن أكتبه، لا لأنني أردت أن أبني برنامجًا، بل لأنني أردت أن أنام مرتاحًا وأنا أعرف أين تذهب جلستي بالضبط",
      "وبنيته على قاعدة واحدة لم أتنازل عنها في أي سطر، أنت لا يجب أن تثق بنا، كل شيء في بديل مفتوح ومقروء، وكل ملف تحفظه يُشفّر بمفتاح لا يوجد خارج جهازك، وكل خطوة في التبديل لها طريق رجوع لو تعثّرت، فإن أردت أن تتأكد فافتح الكود، وإن أردت أكثر من ذلك فابنِ النسخة بنفسك وقارنها بالتي ننشرها",
      "ولم أمشِ هذا الطريق وحدي، ومؤيد المطيري لم يأتِ في آخره ليجرّب البرنامج ويقول رأيه فيه، مؤيد كان معي قبل أن يكون للبرنامج اسم، من الليلة التي حكيت له فيها ما صار وأنا ما زلت غاضبًا، فما قال لي خلّها وانسها، قال لي طيب وش نسوي",
      "ومن تلك الليلة صار الطريق طريقنا نحن الاثنين، وجلسنا ليالي طويلة نرسم على الورق كيف يشتغل هذا الشيء قبل أن يُكتب منه سطر واحد، أنا أمسك المحرّك وهو يمسك المعمار من الجهة الثانية، يسأل عن الحالة التي لم تخطر لي، ويوقفني عند كل قرار سريع ليقول لي طيب وش يصير لو انقطعت الكهرباء هنا بالضبط",
      "وفكرة أن لكل خطوة في التبديل طريق رجوع كانت فكرته هو، أنا كنت أبني سبع خطوات تمشي للأمام فقط، وهو الذي قال إن الخطوة التي لا تعرف كيف ترجع لا تستحق أن تُكتب، فأعدنا بناء المحرّك كله على هذا الأساس، وهو اليوم أقوى ما في بديل وأكثر ما أنام مرتاحًا بسببه",
      "والوجه الذي تراه للبرنامج وجهه هو، ترتيب الشاشات وأين يقع كل زر وماذا يرى المستخدم في أول ثانية وماذا لا يجب أن يراه أبدًا، كل هذا خرج من يده، وهو الذي أصرّ أن تكون الواجهة عربية من اليمين إلى اليسار بحق لا بترجمة مقلوبة على عجل، وهو الذي ردّ عليّ عشرات التصاميم التي كنت أراها جميلة وقال لي إنها جميلة في عيني أنا وحدي لأنني أنا الذي بنيتها",
      "وهو العين التي لا يمر من أمامها شيء، فلا يخرج إصدار من بديل قبل أن يمشي عليه بيده على أجهزة حقيقية ومنصّات حقيقية وحسابات حقيقية، وقد ردّ عليّ إصدارات كاملة قبل ساعات من نشرها لأن خطوة واحدة فيها كانت غامضة على من يفتح البرنامج لأول مرة، وكان على حق في كل مرة",
      "نختلف كثيرًا وأحسن ما في بديل خرج من ذلك الاختلاف، لأن كل ميزة فيه مرّت على رأسين لا على رأس واحد، وهذا هو الفرق بين أداة كتبها شخص لنفسه وبين برنامج بناه اثنان لغيرهما",
      "بديل اليوم مفتوح المصدر بالكامل تحت رخصة GPL-3.0، لا نطلب منك أن تثق بنا، نطلب منك أن تقرأ، وإن وجدت فيه ما لا يعجبك فأخبرنا، فهذه الأداة كُتبت أصلًا لأن أحدًا لم يخبرني قبل أن أخسر حسابي.",
    ],
  },
  features: {
    eyebrow: "المميزات",
    title: "كل ما تحتاجه ولا شيء زائد",
    lead: "سبع منصّات ومحرك واحد وواجهة عربية بالكامل من اليمين إلى اليسار.",
    items: [
      {
        tag: "المحرّك",
        title: "تبديل ذرّي لا يترك أثرًا",
        body: "يغلق المنصّة ثم يحفظ جلستك الحالية ثم يركّب الحساب الجديد ثم يشغّلها، وإن تعثّرت أي خطوة رجع كل ملف إلى مكانه بالضبط.",
      },
      {
        tag: "الأمان",
        title: "AES-256 مربوط بجهازك",
        body: "كل جلسة تُحفظ مشفّرة بمفتاح مشتقّ من حماية ويندوز لحسابك، والنسخة المسروقة إلى جهاز آخر لا تُفتح أصلًا.",
      },
      {
        tag: "الخصوصية",
        title: "لا نرى كلمة سرّك",
        body: "بديل لا يطلب كلمة سر المنصّة ولا يقرأها ولا يخزّنها، وإنما يتعامل مع ملفات الجلسة نفسها التي أنشأتها المنصّة.",
      },
      {
        tag: "الملفات الشخصية",
        title: "أكثر من شخص على جهاز واحد",
        body: "لكل شخص ملفه الخاص بحساباته ولون واجهته وإعداداته، وشاشة اختيار تظهر أول ما تفتح البرنامج.",
      },
      {
        tag: "الاكتشاف",
        title: "يلقى تثبيتك مهما كان مكانه",
        body: "لا مسارات مكتوبة مسبقًا، يقرأ سجل ويندوز وملفات المنصّات ليعرف أين ثُبّتت ولو كانت على قرص آخر.",
      },
      {
        tag: "التحديثات",
        title: "يحدّث نفسه بنفسه",
        body: "أي إصدار جديد يصلك كتنبيه داخل التطبيق، وينزّل ويثبّت بضغطة واحدة مع الاحتفاظ بالنسخة السابقة.",
      },
    ],
  },
  how: {
    eyebrow: "كيف يشتغل",
    title: "أربع خطوات ثم العب",
    lead: "لا إعدادات معقّدة ولا صلاحيات مدير ولا حساب تسجّله عندنا.",
    steps: [
      {
        title: "اختر المنصّة",
        body: "من الشاشة الرئيسية أو الشريط الجانبي، أو بالأرقام من واحد إلى سبعة في لوحة المفاتيح.",
      },
      {
        title: "احفظ حسابك",
        body: "سجّل دخولك في المنصّة مرة واحدة كالمعتاد، ثم اضغط زر إضافة الحساب الحالي وسمِّه.",
      },
      {
        title: "بدّل بضغطة",
        body: "بديل يغلق ويحفظ ويركّب ثم يشغّل، ويسألك قبل كل تبديل حتى لا تقطع لعبتك بالغلط.",
      },
      {
        title: "ارجع متى ما بغيت",
        body: "كل جلسة تبقى مشفّرة على جهازك، والتبديل الثاني والثالث يأخذ ثوانيًا.",
      },
    ],
  },
  security: {
    eyebrow: "الأمان",
    title: "ثلاث طبقات قبل أن يلمس أحد جلستك",
    lead: "الأمان هنا ليس شعارًا في صفحة، بل هذه هي السلسلة الفعلية التي تمرّ بها كل جلسة تحفظها.",
    chain: [
      {
        title: "AES-256-GCM",
        body: "تشفير معتمد مع تحقّق من السلامة، فأي تعديل على الملف يُكتشف قبل أن يُقرأ منه بايت واحد.",
      },
      {
        title: "Argon2id",
        body: "لو فعّلت كلمة سر فإنها تُشتقّ بأربعة وستين ميجابايت من الذاكرة وثلاث جولات، وتخمينها مكلف حتى بعتاد قوي.",
      },
      {
        title: "حماية ويندوز",
        body: "المفتاح مربوط بحساب ويندوز وبهذا الجهاز عبر DPAPI، والملف المنسوخ إلى حاسب آخر لا يُفتح.",
      },
    ],
    rollback: {
      title: "وإن تعثّر شيء؟",
      body: "قبل أن يلمس بديل ملفًا واحدًا يأخذ نسخة من كل مسار سيغيّره، فلو فشلت أي خطوة في المنتصف رجع كل شيء إلى حالته قبل الضغطة، وحتى غياب ملف يُحفظ كحالة ويُستعاد.",
    },
    facts: [
      { k: "خوادم", v: "لا يوجد" },
      { k: "حسابات تسجّلها عندنا", v: "لا يوجد" },
      { k: "تحليلات أو تتبّع", v: "لا يوجد" },
      { k: "صلاحيات مدير", v: "غير مطلوبة" },
    ],
  },
  team: {
    eyebrow: "الفريق",
    title: "من بنى بديل",
    lead: "مشروع من شخصين، مفتوح المصدر بالكامل، ومكتوب سطرًا سطرًا.",
    people: [
      {
        name: "ريان الأثلاوي",
        role: "المؤسس ومهندس النظام والتصميم",
        bio: "مؤسس بديل والمهندس الذي بناه سطرًا سطرًا، من المحرّك الذرّي وطبقة التشفير ونظام الاسترجاع إلى الواجهة بكل بكسل فيها، سُرق حسابه مرة فرفض أن يتكرر ذلك لأحد غيره، وبنى مع مؤيد البرنامج الذي كان يتمنى وجوده ذلك اليوم.",
        tags: ["المحرّك", "التشفير", "التصميم"],
      },
      {
        name: "مؤيد المطيري",
        role: "المؤسس المشارك ومعمار التجربة والجودة",
        bio: "الشريك المؤسس والعقل الثاني خلف بديل، ومعه بدأ المشروع قبل أن يكون له اسم، ومنه جاءت فكرة أن لكل خطوة في التبديل طريق رجوع وهي اليوم أقوى ما في المحرّك، ومن يده خرج ترتيب الشاشات وكل زر في مكانه وواجهة عربية من اليمين إلى اليسار بحق لا بترجمة مقلوبة، ولا تصل نسخة إلى المستخدمين قبل أن يمشي عليها بيده على أجهزة ومنصّات حقيقية.",
        tags: ["المعمار", "التجربة", "الجودة"],
      },
    ],
  },
  cta: {
    title: "جرّبه الآن",
    lead: "ملف واحد بلا مثبِّت وبلا حساب، شغّله واحفظ أول حساب في أقل من دقيقة.",
    download: "حمّله لويندوز",
    source: "اقرأ الكود على GitHub",
    note: "يعمل على ويندوز ١٠ و١١ ومجاني تحت رخصة GPL-3.0",
  },
  footer: {
    built: "تأسيس وتطوير ريان الأثلاوي ومؤيد المطيري",
    licence: "مفتوح المصدر تحت رخصة GPL-3.0",
    rights: "أسماء وشعارات المنصّات علامات تجارية لأصحابها، وبديل غير تابع لأي منها.",
  },
};

const en: Dict = {
  nav: {
    features: "Features",
    how: "How it works",
    security: "Security",
    story: "Story",
    team: "Team",
  },
  hero: {
    badge: "Free · open source · Windows",
    title1: "Switch accounts",
    title2: "in one click",
    lead: "badeel moves between your accounts on seven game platforms without you typing a single password. Every session is sealed with AES-256 and bound to this machine alone — a stolen copy will not open anywhere else.",
    download: "Download for Windows",
    source: "View source",
    note: "Windows 10 / 11 · a single file, no installer",
    by: "Founded and built by Ryan Athlawi and Moayad Almutairi",
    chips: ["Vault open", "AES-256-GCM", "This PC only", "No tracking"],
  },
  platforms: {
    eyebrow: "Platforms",
    title: "Seven launchers, one window",
    lead: "badeel finds what you have installed on its own — it reads the Windows registry and the platforms' own files, so it locates your install even on another drive.",
    note: "No hardcoded paths. Nothing for you to configure.",
  },
  story: {
    eyebrow: "Why it exists",
    title: "All of this started with a stolen account",
    paras: [
      "The idea for badeel did not start in a meeting, and it did not start on a blank page. It started on a very ordinary night, when I opened my account and it was not there.",
      "At first I thought it was the connection, so I tried again, twice, three times. Then came the line that anyone who has been through this knows by heart: incorrect password. When I asked to recover it, I found that the email on the account was no longer my email. Years of playing, of purchases, of friends, all of it handed to someone I know nothing about, in under ten minutes.",
      "I spent the week that followed inside support tickets. Threads that closed themselves, replies written for everyone and for nobody, and long waits that ended with nothing. And with every message I kept asking myself the same question: where did they come in from?",
      "The answer had been in front of me the whole time. A few weeks earlier I had been using a small account switcher, one of those widely used tools that thousands of players open every day feeling perfectly safe. Free, fast, and it saves you from signing out and back in every single time, which is exactly why it spread.",
      "That is when I understood the real problem. A tool like that never asks you for a password or a verification code. It asks for something worth more than both of them together: your open session, the small file that tells the platform you are you. Then it keeps that file somewhere you cannot see, in a format you cannot read, and does things with it that you never find out about.",
      "And as long as the source stays closed, nobody can prove what happens to those files once you have handed them over. Not you, and not anyone else. You are not signing an agreement, you are giving the keys to your house to someone because he told you he would look after them.",
      "So I went looking for an alternative I could trust. There were plenty of tools. Most of them wanted administrator rights over the whole machine, some stored sessions with no encryption worth the name, and almost none of them spoke Arabic at all. Not one of them let me open its source and read, for myself, what it was doing with my files.",
      "So I decided to write it. Not because I wanted to build a program, but because I wanted to sleep at night knowing exactly where my session goes.",
      "And I built it on one rule I have not given up on in a single line: you should not have to trust us. Everything in badeel is open and readable, every file it saves is encrypted with a key that exists nowhere outside your own machine, and every step of a switch has a way back if it stumbles. If you want to be certain, read the source, and if you want more than that, build it yourself and compare your build with the one we publish.",
      "And I did not walk this road alone. Moayad Almutairi did not turn up at the end of it to try the program and offer an opinion. Moayad was with me before the program had a name, from the night I told him what had happened while I was still angry about it. He did not tell me to let it go. He asked me what we were going to do about it.",
      "From that night the road became ours, both of us. We spent long nights drawing on paper how this thing should work before a single line of it existed. I would hold the engine and he would hold the architecture from the other side, asking about the case that had never occurred to me, stopping me at every quick decision to ask what happens if the power cuts out right here.",
      "The idea that every step of a switch must have a way back was his. I was building seven steps that only walked forward, and he was the one who said that a step which does not know how to come back does not deserve to be written. So we rebuilt the entire engine on that principle, and today it is the strongest thing in badeel and the part that lets me sleep.",
      "And the face you see on the program is his face. The order of the screens, where every button sits, what a user sees in the first second and what they must never see, all of that came out of his hands. He is the one who insisted the interface be genuinely Arabic, right to left by design and not a translation flipped over in a hurry, and he is the one who sent back dozens of designs I thought were beautiful and told me they were beautiful in my eyes alone, because I was the one who had built them.",
      "He is also the eye nothing gets past. No release leaves badeel before he has walked through it himself on real machines, real platforms and real accounts. He has sent whole builds back hours before they were due to go out because one step in them was unclear to someone opening the program for the first time, and he was right every single time.",
      "We disagree often, and the best of badeel came out of that disagreement, because every feature in it passed through two heads instead of one. That is the difference between a tool somebody wrote for himself and a program two people built for everyone else.",
      "badeel today is fully open source under the GPL-3.0 licence. We are not asking you to trust us, we are asking you to read. And if you find something in it you do not like, tell us, because this tool was written in the first place because nobody told me before I lost my account.",
    ],
  },
  features: {
    eyebrow: "Features",
    title: "Everything you need, nothing extra",
    lead: "Seven platforms, one engine, and a fully right-to-left Arabic interface.",
    items: [
      {
        tag: "Engine",
        title: "An atomic switch",
        body: "It closes the platform, saves your current session, restores the account you picked, then starts it again. If any step fails, every file goes back exactly where it was.",
      },
      {
        tag: "Security",
        title: "AES-256, bound to your PC",
        body: "Every session is stored encrypted under a key derived from your Windows account protection. A stolen copy simply will not open on another machine.",
      },
      {
        tag: "Privacy",
        title: "We never see your password",
        body: "badeel never asks for, reads or stores a platform password. It moves the very session files the platform itself created.",
      },
      {
        tag: "Profiles",
        title: "More than one person, one PC",
        body: "Each person gets their own profile: their own accounts, their own interface colour, their own settings — with a picker the moment you open the app.",
      },
      {
        tag: "Discovery",
        title: "Finds your install anywhere",
        body: "No hardcoded paths. It reads the Windows registry and the platforms' own files to locate them, even on another drive.",
      },
      {
        tag: "Updates",
        title: "It updates itself",
        body: "A new release arrives as a notice inside the app, downloads and installs in one click, and keeps the previous build.",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Four steps, then play",
    lead: "No complicated setup, no administrator rights, no account to register with us.",
    steps: [
      {
        title: "Pick a platform",
        body: "From the home screen or the side rail, or with keys 1 through 7.",
      },
      {
        title: "Save your account",
        body: "Sign in on the platform once as usual, then press Add current account and name it.",
      },
      {
        title: "Switch in one click",
        body: "badeel closes, saves, restores and launches — and asks before every switch so a stray click never kills your game.",
      },
      {
        title: "Come back anytime",
        body: "Every session stays encrypted on your PC. The second and third switch take seconds.",
      },
    ],
  },
  security: {
    eyebrow: "Security",
    title: "Three layers before anyone touches your session",
    lead: "Security here is not a slogan on a page — this is the actual chain every session you save passes through.",
    chain: [
      {
        title: "AES-256-GCM",
        body: "Authenticated encryption: any tampering with the file is detected before a single byte is read out of it.",
      },
      {
        title: "Argon2id",
        body: "If you enable a password it is derived with 64 MB of memory and three passes — guessing it is expensive even on strong hardware.",
      },
      {
        title: "Windows protection",
        body: "The key is bound to your Windows account and this machine through DPAPI. A file copied elsewhere will not open.",
      },
    ],
    rollback: {
      title: "And if something fails?",
      body: "Before badeel touches a single file it captures every path it is about to change. If any step fails midway, everything returns to the state it was in before the click — even a missing file is recorded as state and restored.",
    },
    facts: [
      { k: "Servers", v: "None" },
      { k: "Accounts you register", v: "None" },
      { k: "Analytics or tracking", v: "None" },
      { k: "Administrator rights", v: "Not required" },
    ],
  },
  team: {
    eyebrow: "Team",
    title: "Who built badeel",
    lead: "A two-person project, fully open source, written line by line.",
    people: [
      {
        name: "Ryan Athlawi",
        role: "Founder · systems engineering and design",
        bio: "Founder of badeel and the engineer who built it line by line: the atomic engine, the encryption layer, the rollback system, and every pixel of the interface. His own account was stolen once; he refused to let that happen to anyone else.",
        tags: ["Engine", "Encryption", "Design"],
      },
      {
        name: "Moayad Almutairi",
        role: "Co-founder · architecture, experience and quality",
        bio: "Co-founder and the second mind behind badeel, in it before the program had a name. The rule that every step of a switch must have a way back was his, and it is now the strongest thing in the engine. The order of the screens, where every button sits, and an interface that is genuinely right to left rather than a flipped translation all came out of his hands, and no build reaches users before he has walked it himself on real machines and real platforms.",
        tags: ["Architecture", "Experience", "Quality"],
      },
    ],
  },
  cta: {
    title: "Try it now",
    lead: "One file, no installer, no account. Run it and save your first account in under a minute.",
    download: "Download for Windows",
    source: "Read the code on GitHub",
    note: "Windows 10 / 11 · free under GPL-3.0",
  },
  footer: {
    built: "Founded and built by Ryan Athlawi and Moayad Almutairi",
    licence: "Open source under GPL-3.0",
    rights:
      "Platform names and logos are trademarks of their respective owners. badeel is not affiliated with any of them.",
  },
};

export const t = (lang: Lang): Dict => (lang === "ar" ? ar : en);
