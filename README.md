# Site Builder

**[English](#english) · [Oʻzbekcha](#ozbekcha) · [Русский](#русский)**

A self-contained CMS and site builder: a visual block editor, content in three languages, news with
categories, a media library, twelve ready-made site templates and an export to static HTML/CSS/JS.

---

## English

### What this is

Site Builder is a small CMS in the spirit of WordPress or Tilda. You assemble pages from blocks,
translate them into Russian, Uzbek and English, and either serve the result from the app or export
it as a folder of static files that needs no backend at all.

The public part has three layers:

| Address | What it is |
|---|---|
| `/` | The builder's own site: what the product does, a showcase of the twelve templates, a link to your site |
| `/templates`, `/demo/<key>` | Template gallery and live demos you can walk through like a real site |
| `/ru`, `/uz`, `/en` | The site you built — the one your visitors see |
| `/admin` | The admin panel |

The project scaffold came from `create-next-app`; only `package.json`, `tsconfig.json` and the
Tailwind/PostCSS/ESLint configs are left from it. Everything else — the schema, the block system,
the editor, i18n, the export and the templates — is written here.

### Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 plus theme CSS variables (`--tpl-*`) and visual styles (`--sk-*`) |
| Database | SQLite through Prisma 7 (the `better-sqlite3` adapter) |
| Rich text | TipTap, deliberately limited to bold/italic/links/lists/H2–H3 |
| Drag and drop | dnd-kit |
| Export | a hand-written static generator plus `archiver` for the ZIP |

### Quick start

```bash
npm install
cp .env.example .env     # then edit the values
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Builder portal: `http://localhost:3000`. Your site: `http://localhost:3000/ru`.
Admin panel: `http://localhost:3000/admin`.

### Environment (`.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Path to the SQLite file, `file:./dev.db` by default |
| `AUTH_SECRET` | A long random string used to sign the session cookie |
| `ADMIN_EMAIL` | Email of the single administrator |
| `ADMIN_PASSWORD` | Administrator password (the account is created on first login or by the seed) |

> Change `ADMIN_PASSWORD` before any real use.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Export CSS bundle plus the production Next build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run db:seed` | Fill the database with the demo site and the UI dictionary |
| `npm run build:export-css` | Rebuild the CSS bundle shipped with exported sites |
| `npm run photos:fetch` | Download the template photos into `public/templates` |
| `npm run db:media` | Put the artwork onto an already seeded demo site |

### Features

- **Block editor.** Fourteen block types (hero, rich text, image + text, gallery, feature grid, call to
  action, testimonials, pricing, team, stats, FAQ, contact form, logo strip, video). Blocks are dragged
  on the preview itself, inserted between one another, duplicated and hidden.
- **Three content languages.** Every page and article keeps three independent block trees; the structure
  stays in sync and only the text differs.
- **Styling without CSS.** Per block: background, text and accent colour (palette or an arbitrary hex),
  heading size, padding, content width, corner radius, alignment.
- **Themes and visual styles.** Twelve palettes and twelve visual styles — section rhythm, cards, buttons
  and typography change wholesale, without editing a single block.
- **News and categories** with the same editor and the same translations.
- **UI dictionary** for the public site (buttons, navigation, form messages) in three languages.
- **Twelve site templates**: pages, categories, articles, menus, theme, style and artwork. Preview one at
  `/demo/<key>`, then apply it in the panel — replacing the site or adding to it.
- **Static export.** A ZIP with a `/{locale}/...` tree and an `assets/` folder, ready for any static host.

### Project layout

```
prisma/                    schema, migrations, seed
scripts/                   template photo downloader
public/templates/          bundled template photos + manifest.json
src/
  app/
    (portal)/              the builder's own site: home page and template gallery
    demo/[key]/            public template demos
    (public)/[locale]/     the site you built
    admin/                 pages, news, categories, media, menu, dictionary,
                           settings, design, templates, export
  blocks/
    types.ts               block types, zod schemas, editor field specs
    registry.tsx           the single place that renders React and static HTML
    components/            React components of the blocks
    static/                HTML generators for the very same blocks
    classes.ts palette.ts  shared markup classes, palettes and visual styles
  components/site/         header, footer, admin bar of the public site
  components/templates/    template card and demo shell
  lib/
    actions/               server actions
    export/                the static generator and the ZIP packer
    site-templates/        the twelve templates, their artwork and demo helpers
    portal-i18n/           portal translations
    admin-i18n/            admin panel translations
```

The guiding rule: **a block is described once**. Its React component and its HTML generator share the
class strings in `blocks/classes.ts`, so the live site and the exported files look identical.

### Security

What the project does on its own:

- One administrator account; the password is stored as a bcrypt hash, the session is a signed JWT in
  an `httpOnly` cookie (`sameSite=lax`, `secure` in production).
- Every server action and the ZIP export are behind `requireAdmin`. Redirects after signing in and
  after switching the language accept internal paths only.
- HTML from the editor is sanitized on save: only the tags TipTap can produce survive, `javascript:`
  links, event handlers, `<script>` and `<iframe>` are stripped — on the live site and in the export.
- The media library accepts PNG, JPEG, WebP, GIF and AVIF only. SVG is rejected on purpose: it is a
  document that can carry a script and would be served from your own origin.
- Sign-in is limited to ten attempts per ten minutes per address; the public contact form to five
  submissions per hour, with caps on field count and length.
- Responses carry `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and a restrictive
  `Permissions-Policy`.

What to keep in mind:

- Change `ADMIN_PASSWORD` and set a long random `AUTH_SECRET` before exposing the app.
- The rate limiter lives in the process memory: with several instances behind a balancer each keeps
  its own count.
- Signing out clears the cookie, but an already issued token stays valid until it expires (7 days).
- There is no Content-Security-Policy yet — Next relies on inline scripts in development, so a strict
  policy is a separate piece of work for deployment.
- `npm audit` reports advisories in `mysql2`, a driver bundled with Prisma. This project uses SQLite,
  the driver is never loaded; the only “fix” offered is a downgrade to Prisma 6, which is worse.

### Exporting a site

`/admin/export` → “Download ZIP”. The archive holds an `index.html` per language directory plus an
`assets/` folder. Links inside are absolute, so the contents belong at the **root** of the host, and the
host must serve `index.html` for directory paths (the default on Netlify, GitHub Pages, Cloudflare Pages,
S3 and nginx). To check locally, run `npx serve` in the unpacked folder.

The contact form has no backend in an exported site: if an external endpoint (Formspree, say) is set in
the site settings, the form posts there; otherwise it opens the visitor's mail client.

---

## Oʻzbekcha

### Bu nima

Site Builder — WordPress yoki Tilda ruhidagi kichik CMS. Sahifalarni bloklardan yig'asiz, ularni rus,
o'zbek va ingliz tillariga tarjima qilasiz, natijani esa ilovadan ko'rsatasiz yoki backendsiz ishlaydigan
statik fayllar papkasi sifatida yuklab olasiz.

Ochiq qismning uch qatlami bor:

| Manzil | Bu nima |
|---|---|
| `/` | Konstruktorning o'z sayti: mahsulot nima qilishi, 12 shablon vitrinasi, sizning saytingizga havola |
| `/templates`, `/demo/<kalit>` | Shablonlar vitrinasi va haqiqiy saytdek aylanib chiqiladigan demolar |
| `/ru`, `/uz`, `/en` | Siz yig'gan sayt — tashrifchilar ko'radigani |
| `/admin` | Boshqaruv paneli |

Loyiha karkasi `create-next-app` bilan yaratilgan; undan faqat `package.json`, `tsconfig.json` va
Tailwind/PostCSS/ESLint konfiglari qolgan. Qolgan hamma narsa — sxema, blok tizimi, muharrir, i18n,
eksport va shablonlar — shu loyihada yozilgan.

### Texnologiyalar

| Qatlam | Texnologiya |
|---|---|
| Freymvork | Next.js 16 (App Router), React 19, TypeScript |
| Uslublar | Tailwind CSS v4, mavzu o'zgaruvchilari (`--tpl-*`) va bezak uslublari (`--sk-*`) |
| Ma'lumotlar bazasi | Prisma 7 orqali SQLite (`better-sqlite3` adapteri) |
| Matn muharriri | TipTap, ataylab cheklangan: qalin/kursiv/havola/ro'yxat/H2–H3 |
| Surib olib qo'yish | dnd-kit |
| Eksport | o'z statik generatori va ZIP uchun `archiver` |

### Tez boshlash

```bash
npm install
cp .env.example .env     # so'ng qiymatlarni tahrirlang
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Konstruktor portali: `http://localhost:3000`. Sizning saytingiz: `http://localhost:3000/ru`.
Boshqaruv paneli: `http://localhost:3000/admin`.

### Muhit o'zgaruvchilari (`.env`)

| O'zgaruvchi | Vazifasi |
|---|---|
| `DATABASE_URL` | SQLite fayliga yo'l, sukut bo'yicha `file:./dev.db` |
| `AUTH_SECRET` | Sessiya kukisini imzolash uchun uzun tasodifiy satr |
| `ADMIN_EMAIL` | Yagona administrator elektron pochtasi |
| `ADMIN_PASSWORD` | Administrator paroli (hisob birinchi kirishda yoki sid orqali yaratiladi) |

> Haqiqiy foydalanishdan oldin `ADMIN_PASSWORD` ni almashtiring.

### Skriptlar

| Buyruq | Nima qiladi |
|---|---|
| `npm run dev` | Ishlab chiqish serveri |
| `npm run build` | Eksport uchun CSS va Next ning produkshen yig'ilishi |
| `npm start` | Produkshen yig'ilishini ishga tushirish |
| `npm run lint` | ESLint |
| `npm run db:seed` | Bazani demo sayt va lug'at bilan to'ldirish |
| `npm run build:export-css` | Eksport bilan ketadigan CSS to'plamini qayta yig'ish |
| `npm run photos:fetch` | Shablon fotolarini `public/templates` ga yuklab olish |
| `npm run db:media` | Grafikani allaqachon yaratilgan demo saytga joylash |

### Imkoniyatlar

- **Blokli muharrir.** O'n to'rt xil blok (muqova, matn, rasm + matn, galereya, afzalliklar to'ri, chaqiriq,
  fikrlar, tariflar, jamoa, raqamlar, savol-javob, shakl, logotiplar lentasi, video). Bloklar to'g'ridan-to'g'ri
  ko'rinishda suriladi, bir-birining orasiga qo'shiladi, nusxalanadi va yashiriladi.
- **Uch til.** Har bir sahifa va maqolada uchta mustaqil blok daraxti bor; tuzilma bir xil, faqat matn farq qiladi.
- **CSS'siz uslublar.** Har bir blok uchun: fon, matn va urg'u rangi (palitra yoki ixtiyoriy HEX), sarlavha
  o'lchami, ichki bo'shliqlar, kontent kengligi, burchaklar, tekislash.
- **Mavzular va bezak uslublari.** 12 palitra va 12 uslub: bo'limlar ritmi, kartalar, tugmalar va tipografika
  bloklarga tegmasdan butunlay o'zgaradi.
- **Yangiliklar va ruknlar** — o'sha muharrir va o'sha tarjimalar bilan.
- **Sayt yozuvlari lug'ati** (tugmalar, navigatsiya, shakl xabarlari) uch tilda.
- **12 sayt shabloni**: sahifalar, ruknlar, maqolalar, menyular, mavzu, uslub va grafika. `/demo/<kalit>` da
  ko'ring, so'ng panelda qo'llang — saytni almashtirib yoki mavjudiga qo'shib.
- **Statikaga eksport.** `/{til}/...` daraxti va `assets/` papkasi bo'lgan ZIP, istalgan statik hosting uchun.

### Loyiha tuzilishi

```
prisma/                    sxema, migratsiyalar, sid
scripts/                   shablon fotolari yuklovchisi
public/templates/          shablon fotolari va manifest.json
src/
  app/
    (portal)/              konstruktorning o'z sayti
    demo/[key]/            shablonlarning ochiq demolari
    (public)/[locale]/     siz yig'gan sayt
    admin/                 boshqaruv paneli
  blocks/                  bloklar: sxemalar, React va statik HTML bitta manbadan
  components/site/         sayt shapkasi, podvali, administrator paneli
  components/templates/    shablon kartasi va demo karkasi
  lib/
    actions/               server action'lar
    export/                statik generator va ZIP
    site-templates/        12 shablon, ularning grafikasi va demo yordamchilari
    portal-i18n/           portal tarjimalari
    admin-i18n/            panel tarjimalari
```

Asosiy qoida: **blok bir marta tasvirlanadi**. Uning React komponenti va HTML generatori
`blocks/classes.ts` dagi umumiy sinf satrlaridan foydalanadi, shuning uchun jonli sayt va eksport
qilingan fayllar bir xil ko'rinadi.

### Xavfsizlik

Loyiha o'zi bajaradigan narsalar:

- Bitta administrator hisobi; parol bcrypt xeshi sifatida saqlanadi, sessiya — `httpOnly` kukidagi
  imzolangan JWT (`sameSite=lax`, produkshenda `secure`).
- Barcha server action'lar va ZIP eksport `requireAdmin` ostida. Kirishdan keyin va til
  almashtirilgandan keyingi qaytishlar faqat ichki manzillarni qabul qiladi.
- Muharrirdan kelgan HTML saqlashda tozalanadi: faqat TipTap yarata oladigan teglar qoladi,
  `javascript:` havolalar, hodisa ishlovchilari, `<script>` va `<iframe>` olib tashlanadi — ham
  jonli saytda, ham eksportda.
- Mediateka faqat PNG, JPEG, WebP, GIF va AVIF qabul qiladi. SVG ataylab rad etiladi: uning ichida
  skript bo'lishi mumkin, u esa sizning domeningizdan beriladi.
- Kirish har bir manzil uchun o'n daqiqada o'n urinish bilan cheklangan; ochiq aloqa shakli — soatiga
  besh yuborish, maydonlar soni va uzunligi ham cheklangan.
- Javoblarda `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` va cheklovchi
  `Permissions-Policy` bor.

Nimani yodda tutish kerak:

- Ilovani ochiq qo'yishdan oldin `ADMIN_PASSWORD` ni almashtiring va uzun tasodifiy `AUTH_SECRET`
  qo'ying.
- Chastota cheklovi jarayon xotirasida yashaydi: balansirovchi ortida bir nechta nusxa bo'lsa, har
  biri o'z hisobini yuritadi.
- Chiqish kukini o'chiradi, lekin allaqachon berilgan token muddati tugaguncha (7 kun) amal qiladi.
- Content-Security-Policy hali yo'q — Next ishlab chiqishda inline skriptlardan foydalanadi, shuning
  uchun qat'iy siyosat joylashtirish paytidagi alohida ish.
- `npm audit` Prisma bilan keladigan `mysql2` drayveridagi ogohlantirishlarni ko'rsatadi. Loyiha
  SQLite ishlatadi, drayver hech qachon yuklanmaydi; taklif qilingan yagona «tuzatish» — Prisma 6 ga
  tushish, bu esa yomonroq.

### Saytni yuklab olish

`/admin/export` → “ZIP arxivni yuklab olish”. Arxivda har bir til uchun `index.html` va `assets/` papkasi
bor. Ichki havolalar mutlaq, shuning uchun arxiv mazmunini hostingning **ildiziga** qo'yish kerak, hosting
esa katalog yo'llari uchun `index.html` berishi lozim (Netlify, GitHub Pages, Cloudflare Pages, S3 va
nginx'da shunday). Mahalliy tekshiruv uchun ochilgan papkada `npx serve` ni ishga tushiring.

Statik saytda aloqa shaklining backendi yo'q: sozlamalarda tashqi manzil ko'rsatilgan bo'lsa (masalan,
Formspree), shakl o'sha yerga yuboradi, aks holda tashrifchining pochta mijozini ochadi.

---

## Русский

### Что это

Site Builder — небольшая CMS в духе WordPress и Tilda. Страницы собираются из блоков, переводятся на
русский, узбекский и английский, а результат либо отдаётся приложением, либо выгружается папкой
статических файлов, которой вообще не нужен бэкенд.

У публичной части три слоя:

| Адрес | Что это |
|---|---|
| `/` | Сайт самого конструктора: что умеет продукт, витрина 12 шаблонов, ссылка на ваш сайт |
| `/templates`, `/demo/<ключ>` | Витрина шаблонов и живые демо, по которым можно ходить как по сайту |
| `/ru`, `/uz`, `/en` | Собранный вами сайт — тот, который видят посетители |
| `/admin` | Панель управления |

Каркас проекта создан `create-next-app`; от него остались только `package.json`, `tsconfig.json` и
конфиги Tailwind/PostCSS/ESLint. Всё остальное — схема, блочная система, редактор, i18n, экспорт и
шаблоны — написано здесь.

### Стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 16 (App Router), React 19, TypeScript |
| Стили | Tailwind CSS v4, переменные тем (`--tpl-*`) и стилей оформления (`--sk-*`) |
| База данных | SQLite через Prisma 7 (адаптер `better-sqlite3`) |
| Редактор текста | TipTap, намеренно ограниченный: жирный/курсив/ссылки/списки/H2–H3 |
| Drag-and-drop | dnd-kit |
| Экспорт | собственный генератор статики и `archiver` для ZIP |

### Быстрый старт

```bash
npm install
cp .env.example .env     # затем отредактируйте значения
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Портал конструктора: `http://localhost:3000`. Ваш сайт: `http://localhost:3000/ru`.
Панель управления: `http://localhost:3000/admin`.

### Переменные окружения (`.env`)

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | Путь к файлу SQLite, по умолчанию `file:./dev.db` |
| `AUTH_SECRET` | Длинная случайная строка для подписи сессионной куки |
| `ADMIN_EMAIL` | Email единственного администратора |
| `ADMIN_PASSWORD` | Пароль администратора (учётка создаётся при первом входе или сидом) |

> Смените `ADMIN_PASSWORD` до любого реального использования.

### Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | Дев-сервер |
| `npm run build` | Сборка CSS для экспорта и прод-сборка Next |
| `npm start` | Запуск прод-сборки |
| `npm run lint` | ESLint |
| `npm run db:seed` | Наполнение базы демо-сайтом и словарём переводов |
| `npm run build:export-css` | Пересборка CSS-бандла для выгружаемой статики |
| `npm run photos:fetch` | Загрузка фотографий шаблонов в `public/templates` |
| `npm run db:media` | Разложить графику по уже созданному демо-сайту |

### Возможности

- **Блочный редактор.** 14 типов блоков (обложка, текст, изображение + текст, галерея, сетка преимуществ,
  призыв к действию, отзывы, тарифы, команда, цифры, вопрос-ответ, форма, лента логотипов, видео).
  Перетаскивание прямо на превью, вставка между блоками, дублирование, скрытие.
- **Три языка контента.** У каждой страницы и статьи три независимых дерева блоков; структура одна,
  различается только текст.
- **Стили без CSS.** Для каждого блока: фон, цвет текста и акцента (палитра или произвольный HEX),
  размер заголовка, отступы, ширина содержимого, скругления, выравнивание.
- **Темы и стили оформления.** 12 палитр и 12 стилей: ритм секций, карточки, кнопки и типографика
  меняются целиком, без правки блоков.
- **Новости и рубрики** — тот же редактор и те же переводы.
- **Словарь надписей сайта** (кнопки, навигация, сообщения форм) на трёх языках.
- **12 шаблонов сайтов**: страницы, рубрики, статьи, меню, тема, стиль и графика. Посмотреть можно на
  `/demo/<ключ>`, применить — в панели, заменив сайт или добавив к нему.
- **Экспорт в статику.** ZIP с деревом `/{язык}/...` и папкой `assets/` — для любого статического хостинга.

### Структура проекта

```
prisma/                    схема БД, миграции, сид
scripts/                   загрузчик фотографий шаблонов
public/templates/          фотографии шаблонов и manifest.json
src/
  app/
    (portal)/              сайт самого конструктора: главная и витрина шаблонов
    demo/[key]/            публичные демонстрации шаблонов
    (public)/[locale]/     собранный сайт
    admin/                 страницы, новости, рубрики, медиа, меню, словарь,
                           настройки, дизайн, шаблоны, экспорт
  blocks/
    types.ts               типы блоков, zod-схемы, спецификации полей редактора
    registry.tsx           единая точка: React-рендер и рендер в статический HTML
    components/            React-компоненты блоков
    static/                генераторы HTML тех же блоков для экспорта
    classes.ts palette.ts  общие классы вёрстки, палитры и стили оформления
  components/site/         шапка, подвал и полоса администратора публичного сайта
  components/templates/    карточка шаблона и каркас демонстрации
  lib/
    actions/               server actions
    export/                генератор статики и упаковка в ZIP
    site-templates/        12 шаблонов, их графика и помощники демонстрации
    portal-i18n/           переводы портала
    admin-i18n/            переводы интерфейса админки
```

Ключевой принцип: **блок описан один раз** — его React-компонент и генератор статического HTML берут
общие строки классов из `blocks/classes.ts`, поэтому живой сайт и выгруженная статика выглядят одинаково.

### Безопасность

Что проект делает сам:

- Один администратор; пароль хранится как bcrypt-хеш, сессия — подписанный JWT в куке `httpOnly`
  (`sameSite=lax`, в проде `secure`).
- Все server actions и выгрузка ZIP закрыты `requireAdmin`. Возвраты после входа и после смены языка
  принимают только внутренние адреса.
- HTML из редактора чистится при сохранении: остаются лишь теги, которые умеет TipTap; ссылки
  `javascript:`, обработчики событий, `<script>` и `<iframe>` вырезаются — и на сайте, и в экспорте.
- Медиатека принимает только PNG, JPEG, WebP, GIF и AVIF. SVG отклоняется сознательно: это документ,
  внутри которого может лежать скрипт, а отдаётся он с вашего же домена.
- Вход ограничен десятью попытками за десять минут с адреса; публичная форма — пятью отправками в
  час, с ограничением числа полей и их длины.
- В ответах стоят `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` и урезанная
  `Permissions-Policy`.

Что держать в голове:

- Смените `ADMIN_PASSWORD` и задайте длинный случайный `AUTH_SECRET` до публичного размещения.
- Ограничение частоты живёт в памяти процесса: при нескольких экземплярах за балансировщиком у
  каждого будет свой счётчик.
- Выход стирает куку, но уже выпущенный токен действует до истечения срока (7 дней).
- Content-Security-Policy пока нет: Next в разработке использует инлайн-скрипты, поэтому строгая
  политика — отдельная работа при выкладке.
- `npm audit` показывает предупреждения в `mysql2` — драйвере, который приходит вместе с Prisma.
  Проект работает на SQLite, драйвер не загружается; единственное предлагаемое «исправление» —
  откат на Prisma 6, что хуже.

### Выгрузка сайта

`/admin/export` → «Скачать ZIP-архив». В архиве — `index.html` по каталогу на каждый язык и папка
`assets/`. Ссылки внутри абсолютные, поэтому содержимое архива нужно класть в **корень** хостинга, а сам
хостинг должен отдавать `index.html` для путей-каталогов (поведение по умолчанию у Netlify, GitHub Pages,
Cloudflare Pages, S3 и nginx). Для локальной проверки: `npx serve` в распакованной папке.

Форма обратной связи в статике не имеет бэкенда: если в настройках указан внешний адрес обработчика
(например, Formspree), форма отправляет туда, иначе открывает почтовый клиент посетителя.
