# -*- coding: utf-8 -*-
"""قراءة أيقونات lucide من حزمة الموقع وتحويلها إلى عناصر SVG."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LUCIDE = os.path.join(ROOT, "node_modules", "lucide-react", "dist", "esm", "icons")
CACHE = {}


def icon_nodes(name):
    if name in CACHE:
        return CACHE[name]
    src = open(os.path.join(LUCIDE, f"{name}.mjs"), encoding="utf-8").read()
    alias = re.search(r"export \{ default \} from './([\w-]+)\.mjs'", src)
    if alias:
        return icon_nodes(alias.group(1))
    body = src[src.index("node: [") + 6:]
    nodes = []
    for m in re.finditer(r'\[\s*"(\w+)",\s*\{([^}]*)\}\s*\]', body):
        attrs = dict(re.findall(r'(\w+):\s*"([^"]*)"', m.group(2)))
        for k, v in re.findall(r'(\w+):\s*([\d.]+)', m.group(2)):
            attrs.setdefault(k, v)
        attrs.pop("key", None)
        nodes.append((m.group(1), attrs))
    CACHE[name] = nodes
    return nodes


def icon_svg_inner(name, color, x, y, size):
    s = size / 24
    parts = [
        f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.4f})" fill="none" '
        f'stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    ]
    for tag, attrs in icon_nodes(name):
        parts.append(f"<{tag} " + " ".join(f'{k}="{v}"' for k, v in attrs.items()) + "/>")
    parts.append("</g>")
    return "".join(parts)
