# موقع بديل · badeel site

الموقع التعريفي لبرنامج [بديل](https://github.com/Ryanathlawi/badeel)، ثنائي اللغة عربي وإنجليزي مع دعم كامل للاتجاه من اليمين إلى اليسار، وفيه نسخة تفاعلية من نافذة البرنامج ومخطط كامل يشرح كل قطعة فيه.

The marketing site for [badeel](https://github.com/Ryanathlawi/badeel), bilingual Arabic and English with full RTL, an interactive replica of the app window, and a full map of how every piece works.

**https://ryanathlawi.github.io/badeel-site/**

## التشغيل · Running

```bash
npm install
npm run dev
```

للبناء `npm run build`، وللفحص `npm run lint`.

## المخطط · The map

المخطط يُولَّد بـ Python مع Pillow، ويخرج ملفي SVG قائمين بذاتهما فيهما الخطوط واللقطات مضمّنة، فلا يعتمدان على أي مورد خارجي.

```bash
python scripts/map.py
python scripts/og.py
```

## البناء والنشر · Deploy

يُنشر تلقائيًا على GitHub Pages عند كل دفعة إلى `main` عبر [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## الرخصة · Licence

GPL-3.0 — انظر [LICENSE](LICENSE)
