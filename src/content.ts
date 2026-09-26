import type { Lang } from "./i18n.ts";

export type Tool = { name: string; kind: string; why: string };
export type Stage = { n: string; title: string; body: string; detail: string[] };
export type Touch = { id: string; where: string; files: string[] };

type Inside = {
  title: string;
  lead: string;
  toolsTitle: string;
  toolsLead: string;
  tools: Tool[];
  noTitle: string;
  no: string[];
  lifeTitle: string;
  lifeLead: string;
  life: Stage[];
  touchTitle: string;
  touchLead: string;
  touchCols: [string, string];
  touch: Touch[];
  neverTitle: string;
  neverLead: string;
  never: string[];
  verifyTitle: string;
  verifyLead: string;
  verify: { title: string; body: string; cmd?: string }[];
};

const ar: Inside = {
  title: "داخل بديل",
  lead: "هذه الصفحة تشرح كل ما يفعله البرنامج على جهازك من لحظة فتحه إلى لحظة إغلاقه، فلا شيء مخفي، ولا شيء نطلب منك أن تصدّقه بلا دليل، وكل ما تقرأه هنا تقدر أن تراه في الكود بنفسك.",

  toolsTitle: "بماذا بُني",
  toolsLead: "كل قطعة في بديل اخترناها لسبب، والسبب دائمًا واحد وهو أن تكون قادرًا على مراجعتها.",
  tools: [
    {
      name: "Rust",
      kind: "لغة البرنامج كاملًا",
      why: "لغة تمنع أخطاء الذاكرة وقت الترجمة لا وقت التشغيل، وهي أخطر ثغرات البرامج المكتوبة بلغات أقدم، وبرنامج يمسك جلساتك يجب أن يُكتب بلغة لا تسمح بهذا النوع من الأخطاء أصلًا.",
    },
    {
      name: "eframe و egui",
      kind: "الواجهة",
      why: "الواجهة مرسومة بكرت الشاشة مباشرة داخل البرنامج نفسه، بلا متصفح مدمج ولا محرك ويب، وهذا يعني أن حجم الملف عشرة ميجابايت بدل مئتين، وأن سطح الهجوم أصغر بكثير.",
    },
    {
      name: "AES-256-GCM",
      kind: "تشفير الجلسات",
      why: "التشفير المعتمد الذي تستخدمه البنوك والأنظمة الحكومية، يشفّر ويتحقق من السلامة في الوقت نفسه، فأي تعديل على الملف يُكتشف قبل أن يُقرأ منه بايت واحد.",
    },
    {
      name: "Argon2id",
      kind: "اشتقاق كلمة السر",
      why: "فائز مسابقة اشتقاق كلمات السر عام ٢٠١٥، نستخدمه بأربعة وستين ميجابايت من الذاكرة وثلاث جولات، فمحاولة تخمين كلمة السر تصير مكلفة جدًا حتى على كروت شاشة قوية.",
    },
    {
      name: "Windows DPAPI",
      kind: "ربط المفتاح بالجهاز",
      why: "واجهة الحماية في ويندوز نفسه، والمفتاح مقفل بحساب ويندوز الذي تستخدمه وبهذا الجهاز، فحتى لو نسخ أحدهم مجلد بياناتك كاملًا إلى حاسب آخر فلن يفتح.",
    },
    {
      name: "winreg",
      kind: "قراءة سجل ويندوز",
      why: "لمعرفة أين ثبّتت منصّاتك فعليًا بدل تخمين المسارات، نقرأ قيمًا محددة بعينها ولا نكتب في السجل إلا ما تطلبه المنصّة نفسها عند التبديل.",
    },
    {
      name: "serde و serde_json",
      kind: "قراءة الملفات",
      why: "لقراءة ملفات إعدادات المنصّات وكتابة فهرس حساباتك، وهي مكتبة معيارية معروفة يستخدمها أغلب مشاريع Rust.",
    },
  ],

  noTitle: "وما الذي رفضنا استخدامه",
  no: [
    "لا Electron ولا أي متصفح مدمج، فهذه تجرّ معها ثغرات المتصفح كلها",
    "لا Node ولا حزم npm تتحدث في الخلفية",
    "لا إطار .NET يحتاج تثبيتًا مسبقًا",
    "لا مكتبة تحليلات ولا تتبّع من أي نوع",
    "لا خدمة ويندوز ولا مهمة مجدولة تبقى بعد إغلاق البرنامج",
  ],

  lifeTitle: "من أول خطوة إلى آخر خطوة",
  lifeLead: "هذا هو كل ما يجري داخل جهازك، مرتبًا بالترتيب الذي يحدث فيه فعلًا.",
  life: [
    {
      n: "01",
      title: "التشغيل",
      body: "تفتح الملف التنفيذي فيبدأ العمل فورًا بلا تثبيت وبلا صلاحيات مدير.",
      detail: [
        "يقرأ إعداداتك من مجلد واحد هو APPDATA\\badeel، أو من مجلد UserData بجانب الملف إن أردته محمولًا",
        "يطلب صلاحية المستخدم العادي فقط، ولو طلب منك ويندوز صلاحيات مدير فاعلم أن هذا ليس بديل",
        "يقرأ ملف الملفات الشخصية ليعرف من يستخدم الجهاز، ويعرض شاشة الاختيار إن كان فيها أكثر من ملف",
      ],
    },
    {
      n: "02",
      title: "اكتشاف المنصّات",
      body: "يبحث عن المنصّات السبع في المكان الذي ثُبّتت فيه فعلًا لا في مسار مكتوب مسبقًا.",
      detail: [
        "يقرأ قيمًا محددة من سجل ويندوز مثل SteamPath لستيم و InstallDir ليوبيسوفت",
        "يقرأ ملفات المنصّات نفسها مثل RiotClientInstalls.json لمعرفة مسار عميل رايوت",
        "يتحقق أن الملف التنفيذي موجود فعلًا في المسار قبل أن يعتبر المنصّة مثبّتة",
        "كل هذه القراءات للقراءة فقط ولا يكتب فيها شيئًا في هذه المرحلة",
      ],
    },
    {
      n: "03",
      title: "فتح الخزنة",
      body: "قبل أن يعرض حساباتك يحتاج المفتاح الذي تُفك به، وهو لا يوجد جاهزًا في أي ملف.",
      detail: [
        "المفتاح مخزّن مغلّفًا بحماية ويندوز، وويندوز وحده يفكّه ولحساب المستخدم الذي أنشأه",
        "لو فعّلت كلمة سر فإن Argon2id يشتقّ منها مفتاحًا ثانيًا بأربعة وستين ميجابايت ذاكرة، ولا تُحفظ كلمة السر نفسها في أي مكان",
        "المفتاح يبقى في الذاكرة فقط ويُمحى منها عند الإغلاق، ولا يُكتب على القرص أبدًا",
      ],
    },
    {
      n: "04",
      title: "حفظ حساب",
      body: "تسجّل دخولك في المنصّة كالمعتاد ثم تضغط زر الإضافة، فيأخذ بديل نسخة من الجلسة كما هي.",
      detail: [
        "يحدد ملفات الجلسة الخاصة بتلك المنصّة بالضبط، وهي ملفات أنشأتها المنصّة بنفسها",
        "ينسخها إلى مجلد الملف الشخصي داخل مجلد بديل، ويتحقق من أن حجم النسخة مطابق للأصل",
        "يشفّر كل ملف على حدة بمفتاح الخزنة، ويحتفظ ببنية المجلدات كما هي",
        "لا يفتح هذه الملفات ولا يحلل محتواها ولا يبحث فيها عن اسم مستخدم أو كلمة سر",
      ],
    },
    {
      n: "05",
      title: "التبديل",
      body: "هذه أهم خطوة في البرنامج كله، وهي مقسومة إلى سبع مراحل لا تنجح إلا كلها معًا.",
      detail: [
        "أولًا يأخذ نسخة احتياطية من كل مسار سيغيّره، وحتى غياب ملف يُسجّل كحالة ليُستعاد لاحقًا",
        "ثانيًا يطلب من المنصّة أن تُغلق بلطف، وينتظرها ثماني ثوانٍ، ثم يغلقها بالقوة إن أصرّت على البقاء",
        "ثالثًا يحفظ جلستك الحالية إن كان حسابها محفوظًا عنده، حتى لا تفقد شيئًا بالتبديل",
        "رابعًا يفكّ تشفير ملفات الحساب المطلوب في مجلد مؤقت بجانب الوجهة",
        "خامسًا يركّب الملفات بإعادة تسمية ذرّية، وهي عملية إما أن تتم كاملة أو لا تتم أصلًا فلا يبقى ملف نصفه قديم ونصفه جديد",
        "سادسًا يشغّل المنصّة بالحساب الجديد إن اخترت ذلك",
        "سابعًا لو تعثّرت أي مرحلة من هذه المراحل فإنه يمشي عكسيًا ويرجع كل ملف لمسته إلى حالته قبل الضغطة",
      ],
    },
    {
      n: "06",
      title: "التحديث",
      body: "الاتصال الوحيد الذي يخرج من بديل، ويمكنك إيقافه من الإعدادات.",
      detail: [
        "يسأل GitHub عن آخر إصدار منشور ولا يرسل معه أي معلومة عنك ولا عن جهازك",
        "لو وجد إصدارًا أحدث عرض عليك تنبيهًا داخل البرنامج وانتظر موافقتك",
        "ينزّل الملف الجديد ويحتفظ بالقديم بجانبه، فلو حصل خلل رجعت للنسخة السابقة",
      ],
    },
    {
      n: "07",
      title: "الإغلاق",
      body: "يغلق ولا يترك خلفه شيئًا يعمل.",
      detail: [
        "يحفظ إعداداتك وحالة ملفك الشخصي ثم يمحو المفتاح من الذاكرة",
        "لا يبقي خدمة ولا عملية في الخلفية ولا مهمة مجدولة",
        "لو حذفت مجلد بديل فقد حذفت كل أثر له من جهازك",
      ],
    },
  ],

  touchTitle: "ما الذي يلمسه بالضبط",
  touchLead: "هذه هي كل الملفات التي يقرأها بديل أو يبدّلها في كل منصّة، ولا شيء خارج هذه القائمة.",
  touchCols: ["المنصّة", "ملفات الجلسة"],
  touch: [
    {
      id: "steam",
      where: "ستيم",
      files: [
        "config\\loginusers.vdf",
        "config\\config.vdf",
        "HKCU\\Software\\Valve\\Steam (AutoLoginUser)",
      ],
    },
    {
      id: "battlenet",
      where: "باتل نت",
      files: ["APPDATA\\Battle.net\\Battle.net.config"],
    },
    {
      id: "riot",
      where: "رايوت",
      files: [
        "Riot Client\\Data\\RiotGamesPrivateSettings.yaml",
        "Riot Client\\Data\\RiotClientPrivateSettings.yaml",
        "Riot Client\\Data\\Sessions",
        "Riot Client\\Data\\Cookies",
      ],
    },
    {
      id: "epic",
      where: "إيبك",
      files: ["EpicGamesLauncher\\Saved\\Config\\Windows\\GameUserSettings.ini"],
    },
    {
      id: "ubisoft",
      where: "يوبيسوفت",
      files: [
        "Ubisoft Game Launcher\\user.dat",
        "Ubisoft Game Launcher\\ConnectSecureStorage.dat",
        "Ubisoft Game Launcher\\settings.yaml",
      ],
    },
    {
      id: "rockstar",
      where: "روكستار",
      files: [
        "Rockstar Games\\Launcher\\settings_user.dat",
        "Rockstar Games\\Launcher\\settings_machine.dat",
        "Rockstar Games\\Launcher\\CrashLogs\\settings.dat",
      ],
    },
    {
      id: "gog",
      where: "جوج جالاكسي",
      files: [
        "GOG.com\\Galaxy\\Configuration\\config.json",
        "HKCU\\Software\\GOG.com\\Galaxy (refreshToken)",
        "HKCU\\Software\\GOG.com\\Galaxy\\settings (userId)",
      ],
    },
  ],

  neverTitle: "وما الذي لا يفعله أبدًا",
  neverLead: "هذه ليست وعودًا في صفحة تسويقية بل أشياء غير موجودة في الكود أصلًا، وتستطيع البحث عنها بنفسك ولن تجدها.",
  never: [
    "لا يطلب كلمة سر المنصّة ولا يقرأها ولا يخزّنها في أي مكان",
    "لا يرسل حساباتك ولا أي جزء منها إلى أي خادم",
    "لا يفتح اتصالًا بأي جهة غير GitHub، والغرض الوحيد هو سؤاله عن آخر إصدار",
    "لا يحتاج صلاحيات مدير ولا يطلبها منك",
    "لا يعدّل ملفات الألعاب ولا يحقن نفسه في أي عملية",
    "لا يثبّت خدمة ولا تعريفًا ولا مهمة تعمل بدونك",
    "لا يجمع أي معلومة عنك ولا عن جهازك ولا عن عدد مرات استخدامك",
  ],

  verifyTitle: "كيف تتأكد بنفسك",
  verifyLead: "لا نطلب منك أن تثق بكلامنا، وهذه أربع طرق يستطيع أي شخص أن يتحقق بها، وبعضها لا يحتاج أي خبرة برمجية.",
  verify: [
    {
      title: "اقرأ الكود",
      body: "كل سطر في بديل منشور تحت رخصة GPL-3.0، ابحث في المستودع عن كلمة password أو http وستجد بنفسك أين تُستخدم وأين لا تُستخدم.",
    },
    {
      title: "ابنِ النسخة بنفسك",
      body: "حمّل المصدر وابنه على جهازك بأمر واحد، وقارن ما خرج معك بما ننشره، فلو أضفنا شيئًا لا يوجد في الكود لظهر الفرق فورًا.",
      cmd: "cargo build --release",
    },
    {
      title: "راقب الشبكة",
      body: "شغّل أي مراقب اتصالات مثل جدار حماية ويندوز أو برنامج مراقبة، ثم استخدم بديل كما تشاء، ولن ترى أي اتصال إلا عند فحص التحديثات، وتقدر أن توقف الفحص من الإعدادات فلا يبقى اتصال واحد.",
    },
    {
      title: "افتح ملفاتك المشفّرة",
      body: "ادخل مجلد بديل وافتح أي ملف حساب بأي محرر نصوص، وسترى بيانات مشفّرة لا تعني شيئًا، وهذا بالضبط ما سيراه من يسرق الملف.",
    },
  ],
};

const en: Inside = {
  title: "Inside badeel",
  lead: "This page explains everything the program does on your machine from the moment you open it to the moment you close it. Nothing is hidden, nothing is asked of you on faith, and every claim here is something you can see for yourself in the source.",

  toolsTitle: "What it is built with",
  toolsLead: "Every piece in badeel was chosen for a reason, and the reason is always the same: so that you can review it.",
  tools: [
    {
      name: "Rust",
      kind: "the entire program",
      why: "A language that catches memory bugs at compile time rather than at run time, and those are the most dangerous class of flaws in software written in older languages. A program that holds your sessions should be written in a language that does not allow them at all.",
    },
    {
      name: "eframe and egui",
      kind: "the interface",
      why: "The interface is drawn straight on the GPU inside the program itself. No embedded browser, no web engine. That is why the file is ten megabytes instead of two hundred, and why the attack surface is far smaller.",
    },
    {
      name: "AES-256-GCM",
      kind: "session encryption",
      why: "The authenticated encryption banks and governments rely on. It encrypts and verifies integrity at the same time, so any tampering is detected before a single byte is read out.",
    },
    {
      name: "Argon2id",
      kind: "password derivation",
      why: "Winner of the 2015 Password Hashing Competition. We run it with 64 MB of memory and three passes, which makes guessing a password expensive even on strong GPUs.",
    },
    {
      name: "Windows DPAPI",
      kind: "binding the key to the machine",
      why: "Windows' own protection interface. The key is locked to the Windows account you use and to this machine, so even a full copy of your data folder will not open on another computer.",
    },
    {
      name: "winreg",
      kind: "reading the registry",
      why: "To find where your platforms are actually installed instead of guessing paths. We read specific named values and write nothing to the registry except what a platform itself requires during a switch.",
    },
    {
      name: "serde and serde_json",
      kind: "reading files",
      why: "For reading the platforms' config files and writing your account index. A standard, widely reviewed library used across the Rust ecosystem.",
    },
  ],

  noTitle: "And what we refused to use",
  no: [
    "No Electron and no embedded browser, which drag along every browser vulnerability",
    "No Node and no npm packages phoning home in the background",
    "No .NET runtime you have to install first",
    "No analytics library and no telemetry of any kind",
    "No Windows service and no scheduled task left behind after you close it",
  ],

  lifeTitle: "From the first step to the last",
  lifeLead: "This is everything that happens on your machine, in the order it actually happens.",
  life: [
    {
      n: "01",
      title: "Launch",
      body: "You open the executable and it starts working immediately, with no installer and no administrator rights.",
      detail: [
        "It reads your settings from a single folder, APPDATA\\badeel, or from a UserData folder next to the file if you want it portable",
        "It asks for ordinary user rights only. If Windows ever asks you for administrator rights, that is not badeel",
        "It reads the profiles file to see who uses this machine, and shows the picker when there is more than one",
      ],
    },
    {
      n: "02",
      title: "Finding your platforms",
      body: "It looks for the seven platforms where they are actually installed rather than at a hardcoded path.",
      detail: [
        "It reads specific registry values such as SteamPath for Steam and InstallDir for Ubisoft",
        "It reads the platforms' own files, such as RiotClientInstalls.json, to find the Riot client",
        "It confirms the executable really exists at that path before treating the platform as installed",
        "All of this is read-only and writes nothing at this stage",
      ],
    },
    {
      n: "03",
      title: "Opening the vault",
      body: "Before it can show your accounts it needs the key, and that key does not sit ready in any file.",
      detail: [
        "The key is stored wrapped by Windows protection, and only Windows can unwrap it, only for the account that created it",
        "If you enabled a password, Argon2id derives a second key from it with 64 MB of memory. The password itself is never stored anywhere",
        "The key lives in memory only and is wiped on exit. It is never written to disk",
      ],
    },
    {
      n: "04",
      title: "Saving an account",
      body: "You sign in on the platform as usual and press the add button, and badeel takes a copy of the session as it is.",
      detail: [
        "It targets exactly the session files belonging to that platform, files the platform created itself",
        "It copies them into your profile folder inside the badeel directory and verifies the copy matches the original in size",
        "It encrypts every file separately with the vault key and keeps the folder structure intact",
        "It does not open those files, analyse their contents, or look inside them for a username or a password",
      ],
    },
    {
      n: "05",
      title: "Switching",
      body: "This is the most important step in the whole program, and it is split into seven stages that only succeed together.",
      detail: [
        "First it backs up every path it is about to change, and even a missing file is recorded as state so it can be restored",
        "Second it asks the platform to close politely, waits eight seconds, then forces it if it insists on staying",
        "Third it saves your current session if that account is already known to it, so you lose nothing by switching",
        "Fourth it decrypts the requested account's files into a temporary folder next to the destination",
        "Fifth it puts the files in place with an atomic rename, an operation that either completes fully or not at all, so no file is ever half old and half new",
        "Sixth it launches the platform on the new account if you asked it to",
        "Seventh, if any stage stumbles it walks backwards and returns every file it touched to its state before the click",
      ],
    },
    {
      n: "06",
      title: "Updating",
      body: "The only connection that ever leaves badeel, and you can turn it off in settings.",
      detail: [
        "It asks GitHub for the latest published release and sends nothing about you or your machine with the request",
        "If a newer version exists it shows a notice inside the program and waits for your approval",
        "It downloads the new file and keeps the old one beside it, so a bad build is one restart away from being undone",
      ],
    },
    {
      n: "07",
      title: "Closing",
      body: "It closes and leaves nothing behind running.",
      detail: [
        "It saves your settings and your profile state, then wipes the key from memory",
        "No service, no background process, no scheduled task",
        "Delete the badeel folder and you have deleted every trace of it from your machine",
      ],
    },
  ],

  touchTitle: "Exactly what it touches",
  touchLead: "These are all the files badeel reads or swaps on each platform. Nothing outside this list.",
  touchCols: ["Platform", "Session files"],
  touch: [
    {
      id: "steam",
      where: "Steam",
      files: [
        "config\\loginusers.vdf",
        "config\\config.vdf",
        "HKCU\\Software\\Valve\\Steam (AutoLoginUser)",
      ],
    },
    { id: "battlenet", where: "Battle.net", files: ["APPDATA\\Battle.net\\Battle.net.config"] },
    {
      id: "riot",
      where: "Riot Games",
      files: [
        "Riot Client\\Data\\RiotGamesPrivateSettings.yaml",
        "Riot Client\\Data\\RiotClientPrivateSettings.yaml",
        "Riot Client\\Data\\Sessions",
        "Riot Client\\Data\\Cookies",
      ],
    },
    {
      id: "epic",
      where: "Epic Games",
      files: ["EpicGamesLauncher\\Saved\\Config\\Windows\\GameUserSettings.ini"],
    },
    {
      id: "ubisoft",
      where: "Ubisoft Connect",
      files: [
        "Ubisoft Game Launcher\\user.dat",
        "Ubisoft Game Launcher\\ConnectSecureStorage.dat",
        "Ubisoft Game Launcher\\settings.yaml",
      ],
    },
    {
      id: "rockstar",
      where: "Rockstar",
      files: [
        "Rockstar Games\\Launcher\\settings_user.dat",
        "Rockstar Games\\Launcher\\settings_machine.dat",
        "Rockstar Games\\Launcher\\CrashLogs\\settings.dat",
      ],
    },
    {
      id: "gog",
      where: "GOG Galaxy",
      files: [
        "GOG.com\\Galaxy\\Configuration\\config.json",
        "HKCU\\Software\\GOG.com\\Galaxy (refreshToken)",
        "HKCU\\Software\\GOG.com\\Galaxy\\settings (userId)",
      ],
    },
  ],

  neverTitle: "And what it never does",
  neverLead: "These are not promises on a marketing page. They are things that do not exist in the code, and you are welcome to search for them yourself.",
  never: [
    "It never asks for, reads or stores a platform password",
    "It never sends your accounts, or any part of them, to any server",
    "It opens no connection to anyone but GitHub, and only to ask for the latest release",
    "It needs no administrator rights and never asks for them",
    "It never modifies game files and never injects itself into any process",
    "It installs no service, no driver and no task that runs without you",
    "It collects nothing about you, your machine, or how often you use it",
  ],

  verifyTitle: "How to check for yourself",
  verifyLead: "We are not asking you to take our word. Here are four ways anyone can verify it, and some of them need no programming experience at all.",
  verify: [
    {
      title: "Read the code",
      body: "Every line of badeel is published under GPL-3.0. Search the repository for the word password or http and see for yourself where they are used and where they are not.",
    },
    {
      title: "Build it yourself",
      body: "Download the source and build it on your own machine with one command, then compare what comes out with what we publish. If we added anything that is not in the code, the difference would show immediately.",
      cmd: "cargo build --release",
    },
    {
      title: "Watch the network",
      body: "Run any connection monitor, the Windows firewall or a packet watcher, and use badeel however you like. You will see no connection except the update check, and you can turn that off in settings so there is none at all.",
    },
    {
      title: "Open your encrypted files",
      body: "Go into the badeel folder and open any account file in a text editor. You will see encrypted data that means nothing, and that is exactly what anyone who steals the file would see.",
    },
  ],
};

export const inside = (lang: Lang): Inside => (lang === "ar" ? ar : en);
