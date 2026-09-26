# -*- coding: utf-8 -*-
"""بطاقة المعاينة الاجتماعية: public/img/og.png بقياس 1200x630."""
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

import arabic_reshaper

try:
    from bidi.algorithm import get_display
except ImportError:  # python-bidi >= 0.5
    from bidi import get_display

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.dirname(ROOT)
FONTS = os.path.join(APP, "assets", "fonts", "fallback")
OUT = os.path.join(ROOT, "public", "img", "og.png")

W, H = 1200, 630
BG = (14, 18, 25)
PANEL = (21, 27, 37)
LINE = (35, 44, 58)
TEXT = (231, 237, 245)
FAINT = (139, 153, 171)
TEAL = (42, 182, 166)
BLUE = (112, 178, 232)


RESHAPER = arabic_reshaper.ArabicReshaper({"delete_harakat": False})


def shape(s):
    return get_display(RESHAPER.reshape(s))


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


AR = lambda s: font("IBMPlexSansArabic-Medium.ttf", s)
EN = lambda s: font("segoeuib.ttf", s)


def hexagon(cx, cy, r):
    from math import cos, pi, sin

    return [
        (cx + r * cos(pi / 3 * i - pi / 2), cy + r * sin(pi / 3 * i - pi / 2)) for i in range(6)
    ]


def glow(size, center, radius, colour, strength):
    """هالة دائرية ناعمة تُدمج فوق الخلفية."""
    layer = Image.new("L", size, 0)
    d = ImageDraw.Draw(layer)
    d.ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        fill=int(255 * strength),
    )
    return layer.filter(ImageFilter.GaussianBlur(radius * 0.55))


def build():
    im = Image.new("RGB", (W, H), BG)

    # هالتان لونيتان في الخلفية
    for centre, radius, colour, strength in (
        ((980, 90), 400, TEAL, 0.22),
        ((180, 620), 430, BLUE, 0.13),
    ):
        mask = glow((W, H), centre, radius, colour, strength)
        im.paste(Image.new("RGB", (W, H), colour), (0, 0), mask)

    d = ImageDraw.Draw(im, "RGBA")

    # شبكة خلايا سدسية خفيفة
    step = 74
    for row in range(-1, H // int(step * 0.87) + 2):
        for col in range(-1, W // step + 2):
            cx = col * step + (step // 2 if row % 2 else 0)
            cy = row * step * 0.87
            tone = TEAL if (row + col) % 3 else BLUE
            d.polygon(hexagon(cx, cy, step * 0.3), outline=tone + (16,), width=1)

    # لقطة البرنامج على اليسار
    shot = Image.open(os.path.join(ROOT, "public", "img", "shots", "home.png")).convert("RGBA")
    sw = 760
    sh = round(shot.height * sw / shot.width)
    shot = shot.resize((sw, sh), Image.LANCZOS)
    card = Image.new("RGBA", (sw + 4, sh + 4), LINE + (255,))
    card.paste(shot, (2, 2))
    round_mask = Image.new("L", card.size, 0)
    ImageDraw.Draw(round_mask).rounded_rectangle([0, 0, card.size[0] - 1, card.size[1] - 1], 16, 255)
    px, py = -96, (H - sh) // 2
    shadow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        [px + 8, py + 14, px + card.size[0] + 8, py + card.size[1] + 14], 22, 150
    )
    im.paste((0, 0, 0), (0, 0), shadow.filter(ImageFilter.GaussianBlur(26)))
    im.paste(card.convert("RGB"), (px, py), round_mask)

    d = ImageDraw.Draw(im, "RGBA")

    # الكتلة النصية على اليمين
    right = W - 66
    d.polygon(hexagon(right - 22, 126, 26), fill=TEAL + (235,))
    d.polygon(hexagon(right - 22, 126, 13), fill=BG + (255,))

    d.text((right - 62, 100), shape("بديل"), font=AR(64), fill=TEXT, anchor="ra")
    d.text(
        (right, 196),
        shape("مبدّل حسابات الألعاب"),
        font=AR(38),
        fill=TEXT,
        anchor="ra",
    )
    d.text(
        (right, 252),
        shape("سبع منصّات في نافذة واحدة، وبضغطة واحدة"),
        font=AR(25),
        fill=FAINT,
        anchor="ra",
    )

    # شرائح المزايا
    chips = ["مفتوح المصدر", "بدون كلمة سر", "AES-256"]
    x = right
    for i, label in enumerate(chips):
        latin = all(ord(c) < 0x590 for c in label)
        f = EN(22) if latin else AR(22)
        text = label if latin else shape(label)
        tw = d.textlength(text, font=f)
        pad = 17
        box = [x - tw - pad * 2, 320, x, 372]
        d.rounded_rectangle(box, 13, fill=TEAL + (34,), outline=TEAL + (110,), width=1)
        d.text((x - pad, 331), text, font=f, fill=TEXT if i else TEAL, anchor="ra")
        x = box[0] - 11

    d.line([(right - 330, 424), (right, 424)], fill=LINE + (255,), width=2)
    d.text(
        (right, 446),
        shape("مجاني ومفتوح المصدر تحت رخصة GPL-3.0"),
        font=AR(23),
        fill=FAINT,
        anchor="ra",
    )
    d.text((right, 490), "ryanathlawi.github.io/badeel-site", font=EN(22), fill=TEAL, anchor="ra")
    d.text(
        (right, 540),
        shape("ريان الأثلاوي ومؤيد المطيري"),
        font=AR(21),
        fill=FAINT,
        anchor="ra",
    )

    # إطار خارجي رقيق
    d.rectangle([0, 0, W - 1, H - 1], outline=LINE + (255,), width=1)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    im.save(OUT, optimize=True)
    print("wrote", OUT, im.size, os.path.getsize(OUT) // 1024, "KB")


if __name__ == "__main__":
    build()
