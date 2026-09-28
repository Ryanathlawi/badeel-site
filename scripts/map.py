# -*- coding: utf-8 -*-
"""المخطط الهندسي لبديل.

    python scripts/map.py

يكتب public/diagram/badeel-ar.svg و badeel-en.svg، ومعهما الخط واللقطات مضمّنة
داخل الملف نفسه حتى يُفتح في أي مكان بلا اعتماد على شيء خارجي.
"""
import base64
import html
import os
import re
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from icons import icon_svg_inner  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOTS = os.path.join(ROOT, "public", "img", "shots")
OUT = os.path.join(ROOT, "public", "diagram")
FONTS = os.path.join(ROOT, "src", "fonts")
os.makedirs(OUT, exist_ok=True)

W, H = 1920, 1520
VERSION = "v0.1.4"

PAL = {
    "bg": "#0b0f15",
    "grid": "#121821",
    "text": "#e6ecf4",
    "muted": "#9aa8ba",
    "faint": "#66748a",
    "card": "#131a24",
    "card_line": "#25303e",
    "edge": "#c3cfdd",
    "label_bg": "#0b0f15",
    "accent": "#2ab6a6",
    "accent_soft": "#11302d",
    "gold": "#e4b052",
    "shot_line": "#25303e",
    "zone": {
        "pc": ("#0d141c", "#2b3949", "#7fd6ca"),
        "vault": ("#0a1614", "#1d4b45", "#40c694"),
        "gh": ("#151109", "#4d3a17", "#e4b052"),
        "life": ("#0c131e", "#2a3c58", "#70b2e8"),
    },
}


def T(ar, en):
    return {"ar": ar, "en": en}


def b64(path):
    return base64.b64encode(open(path, "rb").read()).decode()


def shot(name, w, h):
    """يقصّ اللقطة لنسبة w:h ويصغّرها إلى ضعف المقاس ثم يعيدها base64."""
    im = Image.open(os.path.join(SHOTS, f"{name}.png")).convert("RGB")
    a_src, a_dst = im.width / im.height, w / h
    if a_src > a_dst:
        nw = int(im.height * a_dst)
        im = im.crop(((im.width - nw) // 2, 0, (im.width - nw) // 2 + nw, im.height))
    elif a_src < a_dst:
        nh = int(im.width / a_dst)
        im = im.crop((0, 0, im.width, nh))
    im = im.resize((w * 2, h * 2), Image.LANCZOS)
    tmp = os.path.join(OUT, f"_{name}.webp")
    im.save(tmp, "WEBP", quality=86, method=5)
    data = b64(tmp)
    os.remove(tmp)
    return data


def wrap(s, n):
    out, line = [], ""
    for word in s.split():
        if len(line) + len(word) + 1 > n and line:
            out.append(line)
            line = word
        else:
            line = f"{line} {word}".strip()
    if line:
        out.append(line)
    return out


# ------------------------------------------------------------------ المحتوى

TX = {
    "title": T("بديل", "badeel"),
    "title2": T("المخطط الهندسي", "the engineering map"),
    "subtitle": T(
        "كل قطعة في البرنامج وكيف تتحدث مع التي بعدها: الواجهة، المحرّك، الخزنة، ويندوز، المنصّات السبع، ومجلد بياناتك المشفّر",
        "Every piece of the program and how it talks to the next: the interface, the engine, the vault, Windows, the seven platforms, and your encrypted data folder",
    ),
    "legend": T(
        "الخطّ المتصل: حركة ملفات على جهازك · الخطّ المتقطّع: قراءة أو استعلام · الأرقام الذهبية تشير إلى اللقطة بجانبها",
        "solid: files moving on your machine · dashed: a read or a query · gold numbers point into the screenshot beside them",
    ),
    "chips": T(
        ["مجاني", "GPL-3.0", "Rust", VERSION],
        ["free", "GPL-3.0", "Rust", VERSION],
    ),
    "z_pc": T("01 · جهاز اللاعب", "01 · YOUR MACHINE"),
    "z_vault": T("02 · الخزنة والبيانات", "02 · VAULT AND DATA"),
    "z_gh": T("03 · المصدر والتحديثات", "03 · SOURCE AND UPDATES"),
    "z_life": T("04 · رحلة التبديل من الضغطة إلى اللعب", "04 · A SWITCH, FROM CLICK TO PLAY"),
    "plats": T(
        ("المنصّات السبع", "ستيم وباتل نت ورايوت وإيبك ويوبيسوفت وروكستار وجوج. بديل يقرأ ملفات الجلسة التي أنشأتها المنصّة نفسها ولا يلمس ملفات الألعاب"),
        ("The seven platforms", "Steam, Battle.net, Riot, Epic, Ubisoft, Rockstar and GOG. badeel reads the session files the platform created and never touches game files"),
    ),
    "win": T(
        ("ويندوز", "ثلاث واجهات فقط: السجل لمعرفة أين ثُبّتت المنصّات، ونظام الملفات للنسخ وإعادة التسمية، وإدارة العمليات لإغلاق المنصّة قبل التبديل"),
        ("Windows", "Only three interfaces: the registry to find where platforms live, the file system to copy and rename, and process control to close a platform before switching"),
    ),
    "noadmin": T(
        ("بلا صلاحيات مدير", "يعمل بصلاحية المستخدم العادي. إن طلب أحدهم صلاحيات المدير باسم بديل فليس هو"),
        ("No admin rights", "It runs as an ordinary user. If something asks for administrator rights in badeel's name, it is not badeel"),
    ),
    "app": T("بديل", "badeel"),
    "app_sub": T("ملف تنفيذي واحد", "a single executable"),
    "app_note": T("Rust · eframe و egui · بلا متصفح مدمج", "Rust · eframe and egui · no embedded browser"),
    "shot1": T(
        "اللقطة أعلاه من النسخة المنشورة بلا تجميل: الشاشة الرئيسية بالشعار الأمني وأرقام ملفك الشخصي",
        "The capture above is from the published build, untouched: the home screen with the security emblem and your profile's live numbers",
    ),
    "shot2": T(
        "الأرقام الذهبية تشير إلى القطع نفسها المشروحة على اليمين",
        "The gold numbers point at the same pieces explained beside it",
    ),
    "numbers": T("ما تشير إليه الأرقام", "WHAT THE NUMBERS POINT AT"),
    "three": T("بقية الشاشات", "THE OTHER SCREENS"),
    "engine": T("المحرّك · الوحدات التي تنفّذ التبديل", "THE ENGINE · THE UNITS THAT PERFORM A SWITCH"),
    "under": T("تحتها مباشرة", "DIRECTLY BENEATH"),
    "vault_note": T(
        "لا يخرج أي مفتاح إلى القرص. المفتاح يعيش في الذاكرة وحدها ويُمحى عند الإغلاق",
        "No key ever reaches the disk. It lives in memory alone and is wiped on exit",
    ),
    "folder": T("مجلد بياناتك", "your data folder"),
    "gh_note": T(
        "الاتصال الوحيد الذي يخرج من البرنامج. لا يرسل معه شيئًا عنك ولا عن جهازك، وتقدر أن توقفه من الإعدادات",
        "The only connection the program ever makes. It carries nothing about you or your machine, and you can switch it off in settings",
    ),
    "life_note": T(
        "لو تعثّرت أي مرحلة من هذه المراحل رجع كل ملف لمسه بديل إلى حالته قبل الضغطة، وحتى غياب ملف يُحفظ كحالة ويُستعاد",
        "If any stage stumbles, every file badeel touched returns to its state before the click, and even a missing file is recorded as state and restored",
    ),
    "credit": T(
        "بديل · تأسيس وتطوير ريان الأثلاوي ومؤيد المطيري · مفتوح المصدر تحت رخصة GPL-3.0",
        "badeel · founded and built by Ryan Athlawi and Moayad Almutairi · open source under GPL-3.0",
    ),
    "gen": T(f"وُلِّد آليًا من scripts/map.py · {VERSION}", f"generated by scripts/map.py · {VERSION}"),
    "e_pick": T("يختار حسابًا", "picks an account"),
    "e_read": T("يقرأ ويكتب", "reads and writes"),
    "e_close": T("يُغلق ثم يُشغّل", "closes then launches"),
    "e_seal": T("يشفّر ويفكّ", "seals and unseals"),
    "e_check": T("يسأل عن آخر إصدار", "asks for the latest build"),
}

CALLOUTS = [
    (0.834, 0.321),
    (0.600, 0.377),
    (0.250, 0.300),
    (0.521, 0.621),
    (0.022, 0.430),
    (0.521, 0.795),
    (0.150, 0.978),
]

CALLOUT_TXT = [
    T(("الشعار الأمني", "سداسي بثلاث طبقات حوله قوسان يدوران وخط مسح ضوئي. القفل في وسطه أخضر ما دامت الخزنة مفتوحة"),
      ("The security emblem", "A three-layer hexagon with two turning arcs and a scanning line. The lock at its centre stays green while the vault is open")),
    T(("شارات الطمأنة", "حالة الخزنة، ونوع التشفير، وأن المفتاح مربوط بهذا الجهاز، وأنه لا يوجد تتبّع. أربع حقائق لا وعود"),
      ("Assurance chips", "Vault state, the cipher in use, that the key is bound to this machine, and that nothing is tracked. Four facts, not promises")),
    T(("أرقام ملفك الشخصي", "كم حسابًا محفوظًا لديك، وكم منصّة وجدها مثبّتة من السبع، واسم الملف الشخصي النشط"),
      ("Your profile's numbers", "How many accounts you have saved, how many of the seven platforms were found installed, and the active profile's name")),
    T(("بطاقات المنصّات", "كل منصّة ببطاقتها ولونها وعدد حساباتها، ونقطة خضراء إن كانت مثبّتة. الضغط عليها يفتح حساباتها"),
      ("Platform tiles", "Each platform with its own colour and account count, and a green dot when it is installed. Clicking one opens its accounts")),
    T(("الشريط الجانبي", "الرئيسية ثم المنصّات السبع ثم الفريق والإعدادات. الأرقام من واحد إلى سبعة تنقلك بينها من لوحة المفاتيح"),
      ("The side rail", "Home, then the seven platforms, then team and settings. Keys 1 to 7 move you between them from the keyboard")),
    T(("لوحة المميزات", "تتبدّل كل ست ثوانٍ ونصف وتشرح قطعة من البرنامج في كل مرة. تقدر إطفاءها من الإعدادات"),
      ("The feature board", "It changes every six and a half seconds and explains one piece at a time. You can switch it off in settings")),
    T(("مفاتيح الاختصار", "معروضة دائمًا في الأسفل حتى لا تحتاج أن تحفظها: Esc للإغلاق، والأرقام للمنصّات، و S للإعدادات، و L لقفل الخزنة"),
      ("Keyboard shortcuts", "Always shown at the bottom so you never have to memorise them: Esc closes, digits jump to platforms, S opens settings, L locks the vault")),
]

MODULES = [
    ("book-marked", T(("الدليل", "تعريف كل منصّة: أين تسكن وأي ملفات تخصّها"), ("Catalog", "every platform: where it lives and which files are its own"))),
    ("repeat", T(("التبديل", "المراحل السبع كاملة مع طريق الرجوع"), ("Switch", "all seven stages with the way back"))),
    ("square-power", T(("العمليات", "إغلاق لطيف ثم بالقوة بعد ثماني ثوانٍ"), ("Processes", "a polite close, then force after eight seconds"))),
    ("files", T(("الملفات", "نسخ موثّق وإعادة تسمية ذرّية"), ("Files", "verified copies and atomic renames"))),
    ("search", T(("الاكتشاف", "قراءة السجل وملفات المنصّات لإيجاد المسار"), ("Discovery", "reading the registry and platform files to find the path"))),
]

UNDER = [
    ("list", T(("الفهرس", "أسماء الحسابات وصورها وعدّاد الاستخدام"), ("Index", "account names, pictures and usage counters"))),
    ("folder-tree", T(("المسارات", "مجلد لكل ملف شخصي على حدة"), ("Paths", "a separate folder for every profile"))),
    ("users", T(("الملفات الشخصية", "لكل شخص حساباته ولونه وإعداداته"), ("Profiles", "each person keeps their own accounts, colour and settings"))),
    ("languages", T(("اللغة", "عربي وإنجليزي باتجاه كامل"), ("Language", "Arabic and English with full direction support"))),
]

VAULT = [
    ("lock", T(("AES-256-GCM", "تشفير معتمد مع تحقّق من السلامة. أي تعديل على الملف يُكتشف قبل أن يُقرأ منه بايت واحد"),
               ("AES-256-GCM", "Authenticated encryption. Any tampering is caught before a single byte is read out"))),
    ("key-round", T(("Argon2id", "يشتقّ كلمة السر بأربعة وستين ميجابايت من الذاكرة وثلاث جولات، فتخمينها مكلف حتى بعتاد قوي"),
                    ("Argon2id", "Derives your password with 64 MB of memory and three passes, so guessing it is costly even on strong hardware"))),
    ("shield-check", T(("حماية ويندوز", "المفتاح مغلّف بـ DPAPI ومربوط بحساب ويندوز وبهذا الجهاز. الملف المنسوخ إلى حاسب آخر لا يُفتح"),
                       ("Windows DPAPI", "The key is wrapped by DPAPI and bound to this Windows account and machine. A copy elsewhere will not open"))),
]

FOLDER = [
    ("profiles.json", T("من يستخدم هذا الجهاز ولون واجهة كل واحد", "who uses this machine and each one's colour")),
    ("vault.json", T("المفتاح مغلّفًا، ولا يُفكّ إلا على هذا الجهاز", "the wrapped key, unwrappable only here")),
    ("accounts\\<المنصّة>\\", T("كل جلسة محفوظة مشفّرة على حدة", "every saved session, sealed separately")),
    (".work\\rollback-*", T("نسخة الرجوع أثناء التبديل، تُمحى بعد نجاحه", "the rollback copy during a switch, erased once it succeeds")),
]

GH = [
    ("git-branch", T(("المستودع", "كل سطر منشور ومقروء تحت رخصة GPL-3.0"), ("Repository", "every line published and readable under GPL-3.0"))),
    ("workflow", T(("البناء الآلي", "النسخة تُبنى على خوادم GitHub من المصدر نفسه"), ("CI build", "the binary is built on GitHub's runners from that same source"))),
    ("package", T(("الإصدارات", "ملف واحد لكل إصدار مع سجلّ تغييراته"), ("Releases", "one file per release with its changelog"))),
    ("refresh-cw", T(("فحص التحديث", "سؤال واحد عن رقم آخر إصدار ولا شيء غيره"), ("Update check", "a single question about the latest version number and nothing else"))),
]

LIFE = [
    ("الضغطة", "تختار حسابًا وتضغط زر التبديل، فيسألك بديل مرة واحدة حتى لا تقطع لعبتك بالغلط"),
    ("النسخة الاحتياطية", "يأخذ صورة عن كل مسار سيغيّره قبل أن يلمس شيئًا، وغياب ملف يُسجّل أيضًا"),
    ("الإغلاق", "يطلب من المنصّة أن تُغلق بلطف، ثم يغلقها بالقوة بعد ثماني ثوانٍ إن أصرّت"),
    ("الحفظ", "يحفظ جلستك الحالية إن كان حسابها معروفًا عنده حتى لا تفقد شيئًا"),
    ("فكّ التشفير", "يفكّ ملفات الحساب المطلوب في مجلد مؤقت بجانب الوجهة لا في مكان عام"),
    ("التركيب", "يضع الملفات بإعادة تسمية ذرّية: إما أن تتم كاملة أو لا تتم، فلا يبقى ملف نصفه قديم"),
    ("التشغيل", "يفتح المنصّة على الحساب الجديد ثم يمحو نسخة الرجوع، وتبدأ اللعب"),
]

LIFE_EN = [
    ("The click", "You pick an account and press switch, and badeel asks once so a stray click never kills your game"),
    ("The backup", "It snapshots every path it is about to change before touching anything, and a missing file is recorded too"),
    ("The close", "It asks the platform to close politely, then forces it after eight seconds if it insists"),
    ("The save", "It stores your current session if that account is already known, so nothing is lost"),
    ("Unsealing", "It decrypts the requested account into a temporary folder next to the destination, never somewhere public"),
    ("Installing", "It puts the files in place with an atomic rename: all or nothing, so no file is ever half old"),
    ("Launching", "It opens the platform on the new account, wipes the rollback copy, and you play"),
]


def tx(key, lang):
    v = TX[key]
    return v[lang] if isinstance(v, dict) else v


# ------------------------------------------------------------------ التخطيط


class Layout:
    def __init__(self, rtl, w=W, h=H):
        self.rtl, self.W, self.H = rtl, w, h
        self.items = []

    def X(self, x, w=0):
        return self.W - x - w if self.rtl else x

    def add(self, kind, **it):
        self.items.append((kind, it))

    def zone(self, key, x, y, w, h, title):
        self.add("zone", key=key, x=self.X(x, w), y=y, w=w, h=h, title=title)

    def panel(self, key, x, y, w, h, title, sub, note):
        self.add("panel", key=key, x=self.X(x, w), y=y, w=w, h=h, title=title, sub=sub, note=note)

    def card(self, key, x, y, w, h, icon, title, lines, tone="pc", big=False):
        self.add("card", key=key, x=self.X(x, w), y=y, w=w, h=h, icon=icon, title=title,
                 lines=lines, tone=tone, big=big)

    def module(self, key, x, y, w, h, icon, title, lines, box=True):
        self.add("module", key=key, x=self.X(x, w), y=y, w=w, h=h, icon=icon, title=title,
                 lines=lines, box=box)

    def image(self, key, x, y, w, h, data, caption=None, cap2=None):
        self.add("image", key=key, x=self.X(x, w), y=y, w=w, h=h, b64=data, caption=caption, cap2=cap2)

    def text(self, key, x, y, w, size, s, color="text", bold=False, mono=False,
             anchor="start", ls=None, s2=None):
        self.add("text", key=key, x=self.X(x, w), y=y, w=w, size=size, s=s, color=color,
                 bold=bold, mono=mono, anchor=anchor, ls=ls, s2=s2)

    def chip(self, key, x, y, w, h, s):
        self.add("chip", key=key, x=self.X(x, w), y=y, w=w, h=h, s=s)

    def edge(self, key, pts, label=None, lpos=None, dashed=False, accent=False):
        p = [((self.W - x) if self.rtl else x, y) for x, y in pts]
        lp = ((self.W - lpos[0]) if self.rtl else lpos[0], lpos[1]) if lpos else None
        self.add("edge", key=key, pts=p, label=label, lpos=lp, dashed=dashed, accent=accent)

    def line(self, key, pts, tone="life"):
        self.add("line", key=key, pts=[((self.W - x) if self.rtl else x, y) for x, y in pts], tone=tone)

    def callout(self, key, x, y, n, mirror=True):
        self.add("callout", key=key, x=(self.W - x) if (self.rtl and mirror) else x, y=y, n=n)

    def node(self, key, x, y, n, title, lines, place):
        self.add("node", key=key, x=(self.W - x) if self.rtl else x, y=y, n=n, title=title,
                 lines=lines, place=place)


def build(lang, A):
    L = Layout(lang == "ar")
    t = lambda k: tx(k, lang)

    # ── الترويسة
    L.add("logo", x=L.X(46, 62), y=34)
    L.text("h_title", 128, 30, 1300, 30, t("title"), bold=True, s2=t("title2"))
    L.text("h_sub", 128, 74, 1300, 14, t("subtitle"), color="muted")
    L.text("h_legend", 128, 100, 1300, 12.5, t("legend"), color="faint", mono=True)
    off = 0
    for i, c in enumerate(t("chips")[::-1]):
        cw = len(c) * 8.2 + 26
        L.chip(f"chip{i}", W - 60 - off - cw, 44, cw, 30, c)
        off += cw + 10
    L.line("h_rule", [(40, 136), (W - 40, 136)], tone="rule")

    # ── المناطق
    L.zone("pc", 40, 196, 1180, 900, t("z_pc"))
    L.zone("vault", 1262, 196, 618, 470, t("z_vault"))
    L.zone("gh", 1262, 706, 618, 390, t("z_gh"))
    L.zone("life", 40, 1136, 1840, 296, t("z_life"))

    # 01 — الصفّ العلوي
    for key, x, w, icon, tone in [
        ("plats", 70, 430, "gamepad-2", "pc"),
        ("win", 524, 430, "monitor-cog", "pc"),
        ("noadmin", 978, 212, "user-check", "accent"),
    ]:
        title, body = t(key)
        L.card(key, x, 236, w, 86, icon, title, wrap(body, 62 if w > 300 else 30), tone)

    # لوح البرنامج
    L.panel("app", 70, 350, 1120, 716, t("app"), t("app_sub"), t("app_note"))
    sx, sy, sw, sh = 92, 414, 520, 275
    L.image("shot", sx, sy, sw, sh, A["home"], caption=t("shot1"), cap2=t("shot2"))
    isx = L.X(sx, sw)
    for i, (px, py) in enumerate(CALLOUTS):
        L.callout(f"c{i}", isx + px * sw, sy + py * sh, i + 1, mirror=False)

    lx, ly = 640, 414
    L.text("numbers", lx, ly - 12, 540, 11.5, t("numbers"), color="faint", mono=True, ls="0.12em")
    for i, ct in enumerate(CALLOUT_TXT):
        yy = ly + 18 + i * 52
        L.callout(f"cl{i}", lx + 12, yy + 6, i + 1)
        L.text(f"ct{i}", lx + 32, yy - 9, 500, 13, ct[lang][0], bold=True)
        for j, ln in enumerate(wrap(ct[lang][1], 74)):
            L.text(f"cb{i}_{j}", lx + 32, yy + 9 + j * 13.5, 500, 11, ln, color="muted")

    # بقية الشاشات
    ix, iy = 92, 740
    L.text("three", ix, iy - 12, 520, 11.5, t("three"), color="faint", mono=True, ls="0.12em")
    L.image("th_prof", 92, 752, 164, 92, A["profiles"],
            caption=T("اختيار الملف", "profile picker")[lang])
    L.image("th_set", 268, 752, 164, 92, A["settings"],
            caption=T("الإعدادات", "settings")[lang])
    L.image("th_team", 444, 752, 164, 92, A["team"],
            caption=T("الفريق والقصة", "team and story")[lang])

    # المحرّك
    mx, my = 92, 890
    L.text("engine", mx, my - 12, 1080, 11.5, t("engine"), color="faint", mono=True, ls="0.12em")
    for i, (icon, label) in enumerate(MODULES):
        L.module(f"m{i}", mx + i * 216, my + 6, 206, 74, icon, label[lang][0], wrap(label[lang][1], 34)[:2])
    ux, uy = 92, 1000
    L.text("under", ux, uy - 12, 1080, 11.5, t("under"), color="faint", mono=True, ls="0.12em")
    for i, (icon, label) in enumerate(UNDER):
        L.module(f"u{i}", ux + i * 270, uy + 6, 258, 52, icon, label[lang][0], wrap(label[lang][1], 44)[:1], box=False)

    # 02 — الخزنة
    for i, (icon, label) in enumerate(VAULT):
        L.card(f"v{i}", 1292, 236 + i * 96, 560, 86, icon, label[lang][0], wrap(label[lang][1], 76), "vault", big=True)
    L.text("vault_note", 1292, 528, 560, 11, t("vault_note"), color="faint", mono=True)
    L.text("folder", 1292, 556, 560, 11.5, t("folder"), color="faint", mono=True, ls="0.12em")
    for i, (name, note) in enumerate(FOLDER):
        L.text(f"f{i}", 1292, 578 + i * 22, 260, 12, name, color="text", mono=True)
        L.text(f"fn{i}", 1560, 578 + i * 22, 292, 11, note[lang], color="muted")

    # 03 — GitHub
    for i, (icon, label) in enumerate(GH):
        x = 1292 + (i % 2) * 288
        y = 746 + (i // 2) * 104
        L.card(f"g{i}", x, y, 272, 92, icon, label[lang][0], wrap(label[lang][1], 36), "gh")
    L.text("gh_note", 1292, 962, 560, 11.5, t("gh_note"), color="muted")

    # ── الأسهم
    L.edge("e1", [(660, 322), (660, 350)], t("e_pick"), (760, 336))
    L.edge("e2", [(1190, 700), (1226, 700), (1226, 480), (1262, 480)], t("e_seal"), (1226, 590), accent=True)
    L.edge("e3", [(1292, 900), (1226, 900), (1226, 1010), (1190, 1010)], t("e_check"), (1226, 955), dashed=True)
    L.edge("e4", [(300, 322), (300, 236)], t("e_close"), (400, 280), dashed=True)
    L.edge("e5", [(740, 322), (740, 236)], t("e_read"), (840, 280), dashed=True)

    # 04 — رحلة التبديل
    lx0, lx1, ly0 = 170, 1750, 1276
    L.line("life_axis", [(lx0, ly0), (lx1, ly0)])
    n = len(LIFE)
    for i in range(n):
        x = lx0 + i * (lx1 - lx0) / (n - 1)
        title, body = LIFE[i] if lang == "ar" else LIFE_EN[i]
        L.node(f"n{i}", x, ly0, i + 1, title, wrap(body, 30)[:4], "up" if i % 2 == 0 else "down")
    L.text("life_note", 40, 1396, 1820, 10.5, t("life_note"), color="faint", mono=True, anchor="end")

    # ── الذيل
    L.line("f_rule", [(40, 1452), (W - 40, 1452)], tone="rule")
    L.text("credit", 40, 1468, 1300, 11.5, t("credit"), color="faint", mono=True)
    L.text("gen", W - 40 - 520, 1468, 520, 11.5, t("gen"), color="faint", mono=True, anchor="end")
    return L


# ------------------------------------------------------------------ SVG


def render(L, lang, font_css):
    rtl = L.rtl
    esc = html.escape
    pal = PAL
    Wd, Hd = L.W, L.H
    fam = "'BadeelAr','IBM Plex Sans Arabic',system-ui,sans-serif" if rtl else "'BadeelAr',Inter,system-ui,sans-serif"
    mono = "'DM Mono','JetBrains Mono',Consolas,monospace"
    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {Wd} {Hd}" width="{Wd}" height="{Hd}" '
        f'role="img" lang="{lang}" direction="{"rtl" if rtl else "ltr"}">',
        f"<style>{font_css}text{{font-family:{fam};direction:{'rtl' if rtl else 'ltr'};unicode-bidi:plaintext}}"
        f".m{{font-family:{mono}}}</style>",
        f'<defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">'
        f'<path d="M40 0H0V40" fill="none" stroke="{pal["grid"]}" stroke-width="1"/></pattern>'
        f'<marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
        f'orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{pal["edge"]}"/></marker>'
        f'<marker id="arra" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
        f'orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{pal["accent"]}"/></marker>'
        f'<filter id="sh" x="-10%" y="-10%" width="120%" height="130%">'
        f'<feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.5"/></filter>'
        f'<linearGradient id="hd" x1="{1 if rtl else 0}" y1="0" x2="{0 if rtl else 1}" y2="0">'
        f'<stop offset="0" stop-color="{pal["accent"]}" stop-opacity="0.32"/>'
        f'<stop offset="1" stop-color="{pal["accent"]}" stop-opacity="0"/></linearGradient></defs>',
        f'<rect width="{Wd}" height="{Hd}" fill="{pal["bg"]}"/><rect width="{Wd}" height="{Hd}" fill="url(#g)"/>',
        f'<rect x="{Wd - 1140 if rtl else 40}" y="0" width="1100" height="150" fill="url(#hd)" opacity="0.5"/>',
    ]

    def txt(x, y, size, s, color, bold=False, m=False, anchor="start", ls=None, s2=None):
        arabic = bool(re.search(r"[؀-ۿ]", s))
        m = m and not arabic
        if arabic and s and not s[0].isspace():
            s = "‏" + s
        extra = f' letter-spacing="{ls}"' if (ls and m) else ""
        tail = f'<tspan fill="{pal["muted"]}" font-weight="400"> {esc(s2)}</tspan>' if s2 else ""
        cls = ' class="m"' if m else ""
        return (f'<text{cls} x="{x:.0f}" y="{y:.0f}" font-size="{size}" font-weight="{700 if bold else 400}" '
                f'fill="{color}" text-anchor="{anchor}"{extra}>{esc(s)}{tail}</text>')

    def rect(x, y, w, h, fill, stroke, rx=14, sw=1.5, dash="", extra=""):
        return (f'<rect x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}" rx="{rx}" '
                f'fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{dash}{extra}/>')

    def start(x, w):
        return x + w if rtl else x

    ink = pal["bg"]

    for kind, it in L.items:
        if kind == "zone":
            fill, line, acc = pal["zone"][it["key"]]
            o.append(rect(it["x"], it["y"], it["w"], it["h"], fill, line, rx=20, sw=2,
                          dash=' stroke-dasharray="10 7"'))
            tw = len(it["title"]) * (8.2 if lang == "en" else 8.8) + 34
            tx_ = it["x"] + it["w"] - 18 - tw if rtl else it["x"] + 18
            o.append(f'<rect x="{tx_:.0f}" y="{it["y"] - 15}" width="{tw:.0f}" height="30" rx="10" fill="{acc}"/>')
            o.append(txt(tx_ + tw / 2, it["y"] + 5, 13, it["title"], ink, bold=True,
                         m=(lang == "en"), anchor="middle"))
        elif kind == "logo":
            x, y = it["x"], it["y"]
            o.append(f'<rect x="{x}" y="{y}" width="62" height="62" rx="19" fill="{pal["accent"]}"/>')
            o.append(f'<g stroke="{ink}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none">'
                     f'<path d="M{x + 16} {y + 25}h30M{x + 39} {y + 18}l7 7-7 7"/>'
                     f'<path d="M{x + 46} {y + 39}h-30M{x + 23} {y + 32}l-7 7 7 7"/></g>')

    for kind, it in L.items:
        if kind != "panel":
            continue
        x, y, w, h = it["x"], it["y"], it["w"], it["h"]
        o.append(rect(x, y, w, h, pal["card"], pal["card_line"], rx=18, extra=' opacity="0.55"'))
        o.append(rect(x, y, w, 44, pal["card"], pal["card_line"], rx=18))
        o.append(f'<rect x="{x}" y="{y + 22}" width="{w}" height="22" fill="{pal["card"]}"/>')
        o.append(f'<line x1="{x}" y1="{y + 44}" x2="{x + w}" y2="{y + 44}" stroke="{pal["card_line"]}"/>')
        ix = x + w - 20 - 22 if rtl else x + 20
        o.append(icon_svg_inner("repeat", pal["accent"], ix, y + 11, 22))
        o.append(txt(start(x + 52, w - 104), y + 28, 14.5, it["title"], pal["text"], bold=True))
        if it["sub"]:
            sx_ = x + w - 52 - len(it["title"]) * 10 if rtl else x + 52 + len(it["title"]) * 10
            o.append(txt(sx_, y + 28, 12.5, it["sub"], pal["muted"]))
        if it["note"]:
            o.append(txt(x + 18 if rtl else x + w - 18, y + 28, 11.5, it["note"], pal["faint"],
                         m=True, anchor="end"))

    for kind, it in L.items:
        if kind == "card":
            x, y, w, h = it["x"], it["y"], it["w"], it["h"]
            accent = it["tone"] == "accent"
            acc = pal["accent"] if accent else pal["zone"][it["tone"]][2]
            o.append(rect(x, y, w, h, pal["accent_soft"] if accent else pal["card"],
                          pal["accent"] if accent else pal["card_line"], rx=12,
                          extra="" if accent else ' filter="url(#sh)"'))
            ix = x + w - 36 if rtl else x + 16
            if not accent:
                o.append(f'<circle cx="{ix + 10:.0f}" cy="{y + 26}" r="16" fill="{acc}" opacity="0.16"/>')
            o.append(icon_svg_inner(it["icon"], acc, ix, y + 16, 20))
            tx_ = x + w - 52 if rtl else x + 52
            o.append(txt(tx_, y + 26, 14.5 if it["big"] else 13.5, it["title"], pal["text"], bold=True))
            for i, ln in enumerate(it["lines"]):
                o.append(txt(tx_, y + 45 + i * 15, 11.5, ln, pal["muted"]))
        elif kind == "module":
            x, y, w, h = it["x"], it["y"], it["w"], it["h"]
            if it["box"]:
                o.append(rect(x, y, w, h, pal["card"], pal["card_line"], rx=11))
            ix = x + w - 12 - 17 if rtl else x + 12
            o.append(icon_svg_inner(it["icon"], pal["accent"] if it["box"] else pal["zone"]["pc"][2],
                                    ix, y + 11, 17))
            tx_ = x + w - 38 if rtl else x + 38
            o.append(txt(tx_, y + 24, 12, it["title"], pal["text"], bold=True))
            for j, ln in enumerate(it["lines"]):
                o.append(txt(x + w - 12 if rtl else x + 12, y + 44 + j * 13, 10.5, ln, pal["muted"]))
        elif kind == "image":
            x, y, w, h = it["x"], it["y"], it["w"], it["h"]
            o.append(f'<rect x="{x - 1:.0f}" y="{y - 1}" width="{w + 2:.0f}" height="{h + 2}" rx="8" fill="{pal["shot_line"]}"/>')
            o.append(f'<image x="{x:.0f}" y="{y}" width="{w:.0f}" height="{h}" '
                     f'href="data:image/webp;base64,{it["b64"]}" preserveAspectRatio="none"/>')
            if it["caption"]:
                o.append(txt(start(x, w), y + h + 17, 10.5, it["caption"], pal["faint"]))
            if it.get("cap2"):
                o.append(txt(start(x, w), y + h + 32, 10.5, it["cap2"], pal["faint"]))
        elif kind == "text":
            a = it["anchor"]
            if a == "middle":
                x = it["x"] + it["w"] / 2
            elif (a == "start") != rtl:
                x = it["x"]
            else:
                x = it["x"] + it["w"]
            o.append(txt(x, it["y"] + it["size"], it["size"], it["s"], pal[it["color"]],
                         bold=it["bold"], m=it["mono"], anchor=a, ls=it["ls"], s2=it.get("s2")))
        elif kind == "chip":
            o.append(rect(it["x"], it["y"], it["w"], it["h"], pal["card"], pal["card_line"], rx=it["h"] / 2))
            o.append(txt(it["x"] + it["w"] / 2, it["y"] + it["h"] / 2 + 4, 12, it["s"], pal["text"],
                         m=True, anchor="middle"))
        elif kind == "callout":
            o.append(f'<circle cx="{it["x"]:.0f}" cy="{it["y"]:.0f}" r="12.5" fill="{pal["gold"]}" '
                     f'stroke="{pal["bg"]}" stroke-width="2"/>')
            o.append(txt(it["x"], it["y"] + 4, 11.5, str(it["n"]), ink, bold=True, m=True, anchor="middle"))
        elif kind == "line":
            col = pal["card_line"] if it["tone"] == "rule" else pal["zone"]["life"][2]
            d = " ".join(f"{'M' if i == 0 else 'L'}{px:.0f} {py:.0f}" for i, (px, py) in enumerate(it["pts"]))
            o.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{1 if it["tone"] == "rule" else 2}" '
                     f'opacity="{1 if it["tone"] == "rule" else 0.7}"/>')
        elif kind == "node":
            acc = pal["zone"]["life"][2]
            x, y = it["x"], it["y"]
            o.append(f'<circle cx="{x:.0f}" cy="{y}" r="10" fill="{pal["bg"]}" stroke="{acc}" stroke-width="2.5"/>')
            o.append(txt(x, y + 4, 9.5, str(it["n"]), acc, bold=True, m=True, anchor="middle"))
            up = it["place"] == "up"
            ty_ = y - 88 if up else y + 40
            o.append(f'<line x1="{x:.0f}" y1="{y - 13 if up else y + 13}" x2="{x:.0f}" '
                     f'y2="{y - 26 if up else y + 26}" stroke="{acc}" opacity="0.6"/>')
            o.append(txt(x, ty_, 13.5, it["title"], pal["text"], bold=True, anchor="middle"))
            for j, ln in enumerate(it["lines"]):
                o.append(txt(x, ty_ + 20 + j * 14, 10.5, ln, pal["muted"], anchor="middle"))

    for kind, it in L.items:
        if kind != "edge":
            continue
        d = " ".join(f"{'M' if i == 0 else 'L'}{px:.0f} {py:.0f}" for i, (px, py) in enumerate(it["pts"]))
        col = pal["accent"] if it["accent"] else pal["edge"]
        dash = ' stroke-dasharray="7 6"' if it["dashed"] else ""
        o.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="1.6"{dash} '
                 f'marker-end="url(#{"arra" if it["accent"] else "arr"})" opacity="0.9"/>')
        if it["label"]:
            lx, ly = it["lpos"]
            tw = len(it["label"]) * (6.6 if lang == "en" else 7.2) + 18
            o.append(f'<rect x="{lx - tw / 2:.0f}" y="{ly - 11}" width="{tw:.0f}" height="22" rx="7" '
                     f'fill="{pal["label_bg"]}" stroke="{pal["card_line"]}"/>')
            o.append(txt(lx, ly + 4, 10.5, it["label"], pal["text"], anchor="middle"))

    o.append("</svg>\n")
    return "\n".join(o)


def main():
    font_css = ""
    for weight, name in ((400, "thmanyahsans-Regular"), (700, "thmanyahsans-Bold")):
        path = os.path.join(FONTS, f"{name}.woff2")
        if os.path.exists(path):
            font_css += (f"@font-face{{font-family:'BadeelAr';font-weight:{weight};"
                         f"src:url(data:font/woff2;base64,{b64(path)}) format('woff2')}}")

    A = {
        "home": shot("home", 520, 275),
        "profiles": shot("profiles", 164, 92),
        "settings": shot("settings", 164, 92),
        "team": shot("team", 164, 92),
    }

    for lang in ("ar", "en"):
        L = build(lang, A)
        svg = render(L, lang, font_css)
        path = os.path.join(OUT, f"badeel-{lang}.svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(svg)
        print(f"{os.path.relpath(path, ROOT)}  {len(svg) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
