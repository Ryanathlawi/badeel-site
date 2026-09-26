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
    people: {
      name: string;
      role: string;
      bio: string;
      tags: string[];
      links?: { label: string; href: string }[];
    }[];
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
    eyebrow: "الحكاية",
    title: "بدأ كل هذا بحساب مسروق",
    paras: [
      "لا تبدأ الحكايات الكبيرة في العادة بحدث كبير، بل بلحظة صغيرة يمرّ بها المرء غافلًا ثم يقضي بعدها زمنًا طويلًا يعيد تأمّلها، وحكاية بديل بدأت بلحظة من هذا النوع، في ليلة عادية لا يميّزها شيء، جلست فيها أمام الشاشة كما أفعل كل ليلة، وكتبت كلمة السر كما كتبتها ألف مرة، فجاءني الرد بأنها غير صحيحة",
      "ظننته أول الأمر خطأً في الاتصال، فأعدت المحاولة مرة ومرتين، ثم طلبت استعادة الحساب فإذا البريد المرتبط به لم يعد بريدي، وفي تلك الدقائق القليلة أدركت أن سنوات كاملة من اللعب والمشتريات والصداقات قد انتقلت بصمت إلى يد لا أعرفها، وأن ذلك كله جرى في أقل من عشر دقائق ودون أن أشعر بشيء",
      "وقضيت الأسبوع التالي بين تذاكر الدعم، رسائل تُغلق من تلقاء نفسها، وردود مكتوبة لكل الناس ولا تخاطب أحدًا منهم، وانتظار يطول ثم ينتهي إلى لا شيء، وفي كل مرة أغلقت فيها نافذة الدعم كان سؤال واحد يعود إليّ بإلحاح أشدّ من سابقه، من أين دخلوا؟",
      "ولم يكن الجواب بعيدًا كما ظننت، فقبل ذلك بأسابيع كنت أستعمل أداة صغيرة لتبديل الحسابات، من تلك الأدوات الشائعة التي يفتحها آلاف اللاعبين كل يوم مطمئنّين، أداة مجانية سريعة تعفيك من عناء الخروج والدخول في كل مرة، ولهذا بالذات انتشرت، فالناس قلّما يسألون عمّا يريحهم",
      "وهنا تبيّنت لي حقيقة كنت أعرفها ولا ألتفت إليها، فهذه الأدوات لا تطلب منك كلمة السر ولا رمز التحقق، وإنما تطلب ما هو أثمن منهما جميعًا، أعني جلستك المفتوحة، ذلك الملف الصغير الذي يقول للمنصّة إنك أنت، فمن ملكه لم يعد بحاجة إلى كلمة سرّك أصلًا، لأنه صار في نظر المنصّة أنت",
      "ثم تحفظ هذه الأدوات ذلك الملف في مكان لا تراه، وبصيغة لا تقرؤها، وتفعل به ما لا تعلمه، وما دام كودها مغلقًا فليس في وسع أحد أن يثبت ما يجري لملفاتك بعد أن تسلّمها، لا أنت ولا غيرك، فأنت في الحقيقة لا تبرم عقدًا مع أداة، وإنما تسلّم مفاتيح بيتك لغريب لأنه وعدك بأن يحرسه",
      "وقد علّمتني تلك التجربة أن الثقة التي لا يمكن التحقق منها ليست ثقة، بل أمل نعلّقه على نوايا الآخرين، وأن الأمان الحقيقي لا يُطلب من الناس أن يصدّقوه، وإنما يُعرض عليهم ليروه بأعينهم",
      "فبحثت عن بديل أطمئن إليه، ووجدت أدوات كثيرة، غير أن أكثرها يطلب صلاحيات المدير على الجهاز كله، وبعضها يحفظ الجلسات بلا تشفير يستحق الذكر، وأغلبها لا يعرف العربية أصلًا، ولم أجد بينها أداة واحدة أستطيع أن أفتح كودها وأقرأ بنفسي ما تفعله بملفاتي",
      "فعزمت على أن أكتبه بنفسي، لا لأنني أردت أن أصنع برنامجًا، بل لأنني أردت أن أنام مطمئنًّا وأنا أعلم أين تذهب جلستي بالضبط، وقديمًا قيل إن الحاجة أمّ الاختراع، وأحسب أن الخسارة أمّه الأخرى",
      "وأقمته على قاعدة واحدة لم أتنازل عنها في سطر من سطوره، أنك لا ينبغي أن تثق بنا، فكل شيء في بديل مفتوح مقروء، وكل ملف يحفظه يُشفَّر بمفتاح لا وجود له خارج جهازك، وكل خطوة في التبديل لها طريق رجوع إن تعثّرت، فإن أردت أن تتيقّن فاقرأ الكود، وإن أردت ما هو أبعد من ذلك فابنِ النسخة بنفسك وقارنها بالتي ننشرها",
      "ولم أسلك هذا الطريق وحدي، فمؤيد المطيري لم يأتِ في آخره ليجرّب البرنامج ويبدي رأيه فيه، بل كان معي قبل أن يكون للبرنامج اسم، منذ الليلة التي حكيت له فيها ما جرى وأنا ما زلت أغالب غضبي، فلم يقل لي انسَ الأمر ودعه، وإنما قال جملة بسيطة غيّرت مجرى كل شيء، طيب، وش نسوي؟",
      "ومن تلك الليلة صار الطريق طريقنا معًا، وأمضينا ليالي طويلة نخطّ على الورق كيف ينبغي لهذا الشيء أن يعمل قبل أن يُكتب منه سطر واحد، أمسك أنا بالمحرّك ويمسك هو بالمعمار من جهته، يسأل عن الحالة التي لم تخطر لي، ويستوقفني عند كل قرار متعجّل ليسأل، وماذا لو انقطعت الكهرباء في هذه اللحظة بالذات؟",
      "وفكرة أن تكون لكل خطوة في التبديل طريق رجوع كانت فكرته هو، فقد كنت أبني سبع خطوات تمضي إلى الأمام وحسب، فقال لي إن الخطوة التي لا تعرف كيف تعود لا تستحق أن تُكتب، فأعدنا بناء المحرّك كله على هذا الأصل، وهو اليوم أمتن ما في بديل، وأكثر ما يطمئنني حين أغمض عينيّ",
      "والوجه الذي تراه للبرنامج وجهه هو، ترتيب الشاشات، وموضع كل زر، وما يراه المستخدم في ثانيته الأولى وما لا ينبغي أن يراه أبدًا، كل ذلك خرج من بين يديه، وهو الذي أصرّ على أن تكون الواجهة عربية من اليمين إلى اليسار بحقّ لا بترجمة مقلوبة على عجل، وهو الذي ردّ عليّ عشرات التصاميم التي كنت أراها جميلة، وقال لي إنها جميلة في عينك وحدك لأنك أنت من صنعها، وكان محقًّا",
      "وهو العين التي لا يفوتها شيء، فلا يخرج إصدار من بديل قبل أن يسلكه بيده على أجهزة حقيقية ومنصّات حقيقية وحسابات حقيقية، وقد ردّ عليّ إصدارات كاملة قبل ساعات من نشرها لأن خطوة واحدة فيها كانت غامضة على من يفتح البرنامج أول مرة، وكان على حقّ في كل مرة",
      "وكنّا نختلف كثيرًا، غير أن أجمل ما في بديل وُلد من ذلك الاختلاف، لأن كل ميزة فيه مرّت على عقلين لا على عقل واحد، وهذا عندي هو الفرق بين أداة يكتبها شخص لنفسه وبرنامج يبنيه اثنان لغيرهما",
      "وبديل اليوم مفتوح المصدر كاملًا تحت رخصة GPL-3.0، ولسنا نطلب منك أن تثق بنا، وإنما نطلب منك أن تقرأ، فإن وجدت فيه ما لا يرضيك فأخبرنا، فما كُتبت هذه الأداة في الأصل إلا لأن أحدًا لم يخبرني قبل أن أخسر حسابي.",
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
      {
        tag: "ديسكورد",
        title: "نشاطك على ديسكورد، باختيارك",
        body: "يقدر بديل أن يُظهر لأصدقائك أنه مفتوح عندك، بسطرين عامّين بلا اسم حساب ولا اسم منصّة، وهو مطفأ ما لم تشغّله بنفسك من الإعدادات.",
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
        links: [
          { label: "ديسكورد", href: "https://discord.gg/H8sq6Uc3kA" },
          { label: "ادعم التطوير", href: "https://www.paypal.com/paypalme/RayanAthlawi" },
        ],
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
    eyebrow: "The story",
    title: "All of this started with a stolen account",
    paras: [
      "Great stories seldom begin with great events. They begin with a small moment one passes through without noticing, and then spends a long time turning over afterwards. The story of badeel began with such a moment, on an ordinary night with nothing to set it apart. I sat before the screen as I did every night, typed my password as I had typed it a thousand times, and was told it was wrong.",
      "At first I took it for a connection error and tried again, once, then twice. Then I asked to recover the account, and found that the email tied to it was no longer mine. In those few minutes I understood that whole years of playing, of purchases, of friendships, had passed silently into a hand I did not know, and that all of it had happened in under ten minutes without my feeling a thing.",
      "I spent the following week among support tickets: threads that closed themselves, replies written to everyone and addressed to no one, waits that stretched on and ended in nothing. And each time I closed the support window, a single question returned to me, more insistent than the last: where did they come in?",
      "The answer was not as far away as I had thought. A few weeks earlier I had been using a small account switcher, one of those popular tools that thousands of players open every day without a second thought. Free, fast, and it spares you the trouble of signing out and back in every time, which is precisely why it spread. People seldom question what makes their lives easier.",
      "Here a truth became clear to me that I had known without ever heeding. Such tools do not ask for your password or your verification code. They ask for something worth more than both together: your open session, the small file that tells the platform you are you. Whoever holds it no longer needs your password at all, because in the platform's eyes, they have become you.",
      "These tools then keep that file somewhere you cannot see, in a format you cannot read, and do with it what you cannot know. And so long as their code stays closed, no one can prove what happens to your files once you hand them over, not you and not anyone else. You are not entering an agreement with a tool; you are handing the keys of your house to a stranger because he promised to guard it.",
      "That experience taught me that trust which cannot be verified is not trust but hope, a hope we hang on the intentions of others; and that real security is not something people should be asked to believe, but something laid before them to see with their own eyes.",
      "So I searched for an alternative I could rely on. I found many tools, yet most demanded administrator rights over the entire machine, some stored sessions with no encryption worth mentioning, and nearly all of them knew no Arabic at all. Not one let me open its code and read for myself what it did with my files.",
      "So I resolved to write it myself, not because I wished to make a program, but because I wished to sleep at peace, knowing exactly where my session goes. It has long been said that necessity is the mother of invention; I have come to believe that loss is its other mother.",
      "And I built it on a single principle I have not surrendered in any line of it: you should not have to trust us. Everything in badeel is open and readable; every file it saves is encrypted under a key that exists nowhere outside your machine; and every step of a switch has a way back if it stumbles. If you wish to be certain, read the code. If you wish for more, build it yourself and compare it with what we publish.",
      "I did not walk this road alone. Moayad Almutairi did not arrive at the end to try the program and offer his opinion; he was with me before the program had a name, from the night I told him what had happened while I was still wrestling with my anger. He did not tell me to let it go. He said one simple thing that changed the course of everything: so, what do we do?",
      "From that night the road became ours. We spent long nights sketching on paper how this thing ought to work before a single line of it was written. I held the engine, and he held the architecture from his side, asking about the case that had not occurred to me, stopping me at every hasty decision to ask: and what if the power fails at this very moment?",
      "The idea that every step of a switch must have a way back was his. I had been building seven steps that only moved forward, and he told me that a step which does not know how to return does not deserve to be written. So we rebuilt the whole engine on that foundation, and today it is the strongest part of badeel, and the thing that most lets me rest when I close my eyes.",
      "And the face you see on the program is his. The order of the screens, the place of every button, what a user sees in their first second and what they must never see, all of it came from his hands. He insisted the interface be truly Arabic, right to left by design rather than a translation flipped over in haste, and he turned down dozens of designs I thought beautiful, telling me they were beautiful only in my eyes, because I was the one who made them. He was right.",
      "He is also the eye that nothing slips past. No release leaves badeel until he has walked it through himself on real machines, real platforms and real accounts. He has sent whole builds back hours before they were due, because a single step in them was unclear to someone opening the program for the first time, and he was right every time.",
      "We disagreed often, yet the finest things in badeel were born of that disagreement, because every feature in it passed through two minds rather than one. That, to me, is the difference between a tool one person writes for himself and a program two people build for everyone else.",
      "badeel today is fully open source under GPL-3.0. We do not ask you to trust us; we ask you to read. And if you find in it something that does not please you, tell us, for this tool was written, in the end, only because no one told me before I lost my account.",
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
      {
        tag: "Discord",
        title: "Your Discord activity, if you want it",
        body: "badeel can show your friends that it is open, in two generic lines with no account or platform name, and it stays off unless you turn it on yourself.",
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
        links: [
          { label: "Discord", href: "https://discord.gg/H8sq6Uc3kA" },
          { label: "Support the work", href: "https://www.paypal.com/paypalme/RayanAthlawi" },
        ],
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
