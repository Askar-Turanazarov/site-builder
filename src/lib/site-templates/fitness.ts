import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * Фитнес-клуб «Temir» — Сергелийский район Ташкента.
 * Структура профиля крутится вокруг двух вопросов, с которыми приходят в зал:
 * «сколько стоит» и «когда занятия». Поэтому у шаблона есть отдельная
 * страница расписания — блок, которого нет ни в одном другом профиле, — а
 * абонементы вынесены на первый экран.
 */
export const fitnessTemplate: SiteTemplate = {
  key: "fitness",
  label: L("Фитнес-клуб", "Fitnes klubi", "Fitness club"),
  profile: L(
    "Фитнес-клуб «Temir», Сергели",
    "«Temir» fitnes klubi, Sergeli",
    "Temir fitness club, Sergeli",
  ),
  description: L(
    "Абонементы с ценами, расписание групповых занятий по дням, тренеры с направлениями и запись на пробную тренировку.",
    "Narxlari bilan abonementlar, kunlar bo'yicha guruh mashg'ulotlari jadvali, yo'nalishlari bilan murabbiylar va sinov mashg'ulotiga yozilish.",
    "Memberships with prices, a day-by-day class timetable, trainers with their disciplines and a free trial session.",
  ),
  themeKey: "fitness",
  design: { skin: "arena", fontDisplay: "Rubik", fontBody: "Roboto", radiusScale: "none" },

  settings: {
    siteName: L("Temir", "Temir", "Temir"),
    tagline: L(
      "Фитнес-клуб в Сергели",
      "Sergelidagi fitnes klubi",
      "A fitness club in Sergeli",
    ),
    contactEmail: "info@temirclub.uz",
    contactPhone: "+998 88 302 66 40",
    contactAddress: L(
      "Ташкент, Сергелийский район, ул. Янги Сергели, 5А",
      "Toshkent, Sergeli tumani, Yangi Sergeli ko'chasi, 5A",
      "Tashkent, Sergeli district, 5A Yangi Sergeli street",
    ),
    footerNote: L(
      "© Фитнес-клуб «Temir», Ташкент. Зал открыт с 6:00 до 23:00, в воскресенье с 8:00 до 20:00.",
      "© «Temir» fitnes klubi, Toshkent. Zal 6:00 dan 23:00 gacha, yakshanba 8:00 dan 20:00 gacha ochiq.",
      "© Temir fitness club, Tashkent. Open 6:00–23:00, Sundays 8:00–20:00.",
    ),
  },

  categories: [
    {
      slug: "trenirovki",
      order: 1,
      name: L("Тренировки", "Mashg'ulotlar", "Training"),
      description: L(
        "Разборы упражнений и программ от тренеров клуба — без чудо-методик.",
        "Klub murabbiylaridan mashqlar va dasturlar tahlili — mo''jizaviy uslublarsiz.",
        "Exercise and programme breakdowns from our coaches — no miracle methods.",
      ),
    },
    {
      slug: "pitanie",
      order: 2,
      name: L("Питание", "Ovqatlanish", "Nutrition"),
      description: L(
        "Что есть до и после зала — с поправкой на ташкентскую кухню.",
        "Zaldan oldin va keyin nima yeyish kerak — toshkent oshxonasini hisobga olib.",
        "What to eat before and after training — adjusted for how people actually eat in Tashkent.",
      ),
    },
    {
      slug: "novosti-kluba",
      order: 3,
      name: L("Новости клуба", "Klub yangiliklari", "Club news"),
      description: L(
        "Новое оборудование, изменения в расписании и клубные соревнования.",
        "Yangi uskunalar, jadvaldagi o'zgarishlar va klub musobaqalari.",
        "New equipment, timetable changes and in-club competitions.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "memberships", order: 1, label: L("Абонементы", "Abonementlar", "Memberships") },
    { location: "header", linkType: "page", target: "schedule", order: 2, label: L("Расписание", "Jadval", "Timetable") },
    { location: "header", linkType: "page", target: "trainers", order: 3, label: L("Тренеры", "Murabbiylar", "Trainers") },
    { location: "header", linkType: "category", target: "trenirovki", order: 4, label: L("Блог", "Blog", "Blog") },
    { location: "header", linkType: "page", target: "contacts", order: 5, label: L("Пробная тренировка", "Sinov mashg'uloti", "Free trial") },
    { location: "footer", linkType: "page", target: "memberships", order: 1, label: L("Цены", "Narxlar", "Prices") },
    { location: "footer", linkType: "page", target: "schedule", order: 2, label: L("Расписание", "Jadval", "Timetable") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Фитнес-клуб в Сергели: тренажёрный зал, групповые занятия, бокс и бассейн рядом. Первая тренировка бесплатно.",
        "Sergelidagi fitnes klubi: trenajyor zali, guruh mashg'ulotlari, boks. Birinchi mashg'ulot bepul.",
        "A fitness club in Sergeli: gym floor, group classes and boxing. First session free.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Зал, в который доходят",
            "Odam qatnaydigan zal",
            "The gym people actually keep going to",
          ),
          subheading: L(
            "1 400 м² в Сергели: тренажёрный зал, два групповых зала и ринг. Открыто с 6:00 — успеваете до работы. Первая тренировка с тренером бесплатно.",
            "Sergelida 1 400 m²: trenajyor zali, ikkita guruh zali va ring. 6:00 dan ochiq — ishdan oldin ulgurasiz. Murabbiy bilan birinchi mashg'ulot bepul.",
            "1,400 m² in Sergeli: a gym floor, two studios and a ring. Open from 6:00, so you can train before work. Your first session with a coach is free.",
          ),
          ctaLabel: L("Прийти на пробную", "Sinovga kelish", "Book a free session"),
          ctaLink: "/contacts",
          variant: "fullBleed",
          overlayOpacity: 0.6,
        }),

        S(
          B.stats("stats", [
            { value: L("1 400 м²", "1 400 m²", "1,400 m²"), label: L("Площадь клуба", "Klub maydoni", "Club floor area") },
            { value: L("6:00", "6:00", "6:00"), label: L("Открываемся по будням", "Ish kunlari ochiladi", "We open on weekdays") },
            { value: L("34", "34", "34"), label: L("Групповых занятия в неделю", "Haftasiga guruh mashg'ulotlari", "Group classes a week") },
            { value: L("9", "9", "9"), label: L("Тренеров в клубе", "Klubdagi murabbiylar", "Coaches on the floor") },
          ]),
          { bg: "ink" },
        ),

        B.features(
          "areas",
          L("Направления", "Yo'nalishlar", "What we run"),
          [
            {
              icon: "rocket",
              title: L("Тренажёрный зал", "Trenajyor zali", "Gym floor"),
              body: L(
                "Силовая зона со свободными весами, две стойки для приседа, кардиолиния из 18 тренажёров.",
                "Erkin og'irliklar bilan kuch zonasi, cho'kkalash uchun ikkita tayanch, 18 ta kardio trenajyor.",
                "A free-weights area, two squat racks and a cardio line of 18 machines.",
              ),
            },
            {
              icon: "users",
              title: L("Групповые занятия", "Guruh mashg'ulotlari", "Group classes"),
              body: L(
                "Функциональные, силовые, стретчинг и йога. Группы до 14 человек, запись через администратора.",
                "Funksional, kuch, cho'zilish va yoga. 14 kishigacha guruhlar, administrator orqali yozilish.",
                "Functional, strength, stretching and yoga. Groups of up to 14, booked through reception.",
              ),
            },
            {
              icon: "shield",
              title: L("Бокс и единоборства", "Boks va yakkakurash", "Boxing and martial arts"),
              body: L(
                "Ринг, мешки, детская группа с 8 лет. Тренер — призёр чемпионата Узбекистана.",
                "Ring, qoplar, 8 yoshdan bolalar guruhi. Murabbiy — O'zbekiston chempionati sovrindori.",
                "A ring, heavy bags and a children's group from age eight. The coach is a national championship medallist.",
              ),
            },
            {
              icon: "heart",
              title: L("Персональные тренировки", "Shaxsiy mashg'ulotlar", "Personal training"),
              body: L(
                "Программа под задачу и контроль техники. Первое занятие — разбор техники бесплатно.",
                "Maqsadga mos dastur va texnika nazorati. Birinchi mashg'ulot — texnika tahlili bepul.",
                "A programme for your goal and hands-on technique work. The first session — a technique check — is free.",
              ),
            },
          ],
          4,
        ),

        B.pricing(
          "cards",
          L("Абонементы", "Abonementlar", "Memberships"),
          [
            {
              name: L("Утренний", "Ertalabki", "Morning"),
              price: L("390 000 сум", "390 000 so'm", "390,000 UZS"),
              period: L("в месяц, до 16:00", "oyiga, 16:00 gacha", "per month, until 16:00"),
              features: [
                L("Тренажёрный зал в будни с 6:00 до 16:00", "Ish kunlari 6:00–16:00 trenajyor zali", "Gym floor on weekdays, 6:00–16:00"),
                L("Групповые занятия утреннего блока", "Ertalabki blok guruh mashg'ulotlari", "Morning-slot group classes"),
                L("Заморозка на 7 дней", "7 kunga muzlatish", "Seven days' freeze"),
              ],
              ctaLabel: L("Оформить", "Rasmiylashtirish", "Get it"),
              ctaLink: "/contacts",
            },
            {
              name: L("Полный день", "To'liq kun", "Full day"),
              price: L("590 000 сум", "590 000 so'm", "590,000 UZS"),
              period: L("в месяц, без ограничений", "oyiga, cheklovsiz", "per month, no limits"),
              features: [
                L("Зал и все групповые занятия", "Zal va barcha guruh mashg'ulotlari", "Gym floor and every group class"),
                L("Одна персональная тренировка в подарок", "Bitta shaxsiy mashg'ulot sovg'a", "One free personal session"),
                L("Заморозка на 14 дней", "14 kunga muzlatish", "Fourteen days' freeze"),
                L("Гостевой визит для друга раз в месяц", "Oyiga bir marta do'st uchun mehmon tashrifi", "A guest pass for a friend once a month"),
              ],
              highlighted: true,
              ctaLabel: L("Оформить", "Rasmiylashtirish", "Get it"),
              ctaLink: "/contacts",
            },
            {
              name: L("Годовой", "Yillik", "Annual"),
              price: L("5 400 000 сум", "5 400 000 so'm", "5,400,000 UZS"),
              period: L("за год, выгода 23%", "bir yilga, 23% foyda", "per year, 23% cheaper"),
              features: [
                L("Всё из «Полного дня» на 12 месяцев", "12 oyga «To'liq kun»dagi hamma narsa", "Everything in Full day, for twelve months"),
                L("Заморозка на 30 дней", "30 kunga muzlatish", "Thirty days' freeze"),
                L("Четыре персональные тренировки", "To'rtta shaxsiy mashg'ulot", "Four personal sessions"),
                L("Рассрочка на 3 месяца без процентов", "3 oyga foizsiz bo'lib to'lash", "Three-month instalments, no interest"),
              ],
              ctaLabel: L("Обсудить", "Muhokama qilish", "Discuss"),
              ctaLink: "/contacts",
            },
          ],
        ),

        S(
          B.testimonials(
            "reviews",
            L("Отзывы клуба", "Klub a'zolari fikri", "Member reviews"),
            [
              {
                quote: L(
                  "Ходил в три зала в Сергели, остался здесь из-за утреннего времени: в 6:15 уже открыто и почти пусто, к работе к девяти успеваю спокойно.",
                  "Sergelida uchta zalga qatnadim, ertalabki vaqt uchun shu yerda qoldim: 6:15 da ochiq va deyarli bo'sh, to'qqizga ishga bemalol ulguraman.",
                  "I tried three gyms in Sergeli and stayed here because of the early hours: at 6:15 it is open and almost empty, and I still make work by nine.",
                ),
                authorName: L("Бекзод Хамраев", "Bekzod Xamrayev", "Bekzod Khamraev"),
                authorRole: L("Абонемент «Утренний», второй год", "«Ertalabki» abonement, ikkinchi yil", "Morning membership, second year"),
              },
              {
                quote: L(
                  "Пришла после травмы колена, боялась тренажёров. Тренер две недели работал только над техникой и не давал брать вес — сейчас приседаю без боли.",
                  "Tizza jarohatidan keyin keldim, trenajyorlardan qo'rqardim. Murabbiy ikki hafta faqat texnika ustida ishladi va og'irlik olishimga yo'l qo'ymadi — hozir og'riqsiz cho'kkalayman.",
                  "I came in after a knee injury and was scared of the machines. My coach spent two weeks on technique alone and wouldn't let me add weight — now I squat pain-free.",
                ),
                authorName: L("Шахноза Каримова", "Shahnoza Karimova", "Shakhnoza Karimova"),
                authorRole: L("Персональные тренировки", "Shaxsiy mashg'ulotlar", "Personal training"),
              },
            ],
          ),
          { bg: "surface" },
        ),

        S(
          B.cta("cta", {
            heading: L("Первая тренировка — бесплатно", "Birinchi mashg'ulot — bepul", "Your first session is free"),
            body: L(
              "Приходите с формой и водой, остальное дадим. Тренер проведёт разбор техники и покажет зал.",
              "Sport kiyimi va suv bilan keling, qolganini beramiz. Murabbiy texnikani ko'rib chiqadi va zalni ko'rsatadi.",
              "Bring kit and water, we provide the rest. A coach runs a technique check and shows you the floor.",
            ),
            buttonLabel: L("Записаться", "Yozilish", "Sign up"),
            buttonLink: "/contacts",
          }),
          { bg: "accent", align: "center" },
        ),
      ],
    },

    // ----------------------------------------------------------- расписание
    {
      slug: "schedule",
      title: L("Расписание занятий", "Mashg'ulotlar jadvali", "Class timetable"),
      metaDesc: L(
        "Расписание групповых занятий клуба «Temir» по дням недели: функциональные, силовые, йога, бокс.",
        "«Temir» klubi guruh mashg'ulotlari jadvali hafta kunlari bo'yicha: funksional, kuch, yoga, boks.",
        "The Temir group class timetable by day: functional, strength, yoga and boxing.",
      ),
      blocks: [
        S(
          B.richText(
            "note",
            paragraphs(
              L(
                "Запись на групповое занятие открывается за двое суток и закрывается за час до начала. Если не пришли и не отменили, третий пропуск за месяц закрывает запись на неделю — иначе места держат впустую.",
                "Guruh mashg'ulotiga yozilish ikki kun oldin ochiladi va boshlanishidan bir soat oldin yopiladi. Kelmasangiz va bekor qilmasangiz, oyiga uchinchi qoldirish bir haftaga yozilishni yopadi — aks holda joylar behuda band bo'ladi.",
                "Booking opens two days ahead and closes an hour before the class. If you neither turn up nor cancel, a third no-show in a month blocks booking for a week — otherwise places are held for nobody.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.richText(
            "table",
            {
              ru:
                "<h3>Понедельник, среда, пятница</h3><ul><li><strong>7:00</strong> — функциональная, зал 1, Азиз</li><li><strong>9:30</strong> — стретчинг, зал 2, Дилдора</li><li><strong>18:30</strong> — силовая, зал 1, Азиз</li><li><strong>19:00</strong> — бокс, ринг, Тимур</li><li><strong>20:00</strong> — йога, зал 2, Дилдора</li></ul><h3>Вторник, четверг</h3><ul><li><strong>7:00</strong> — кардио-интервал, зал 1, Севара</li><li><strong>10:00</strong> — мама и малыш, зал 2, Севара</li><li><strong>18:00</strong> — детский бокс с 8 лет, ринг, Тимур</li><li><strong>19:30</strong> — функциональная, зал 1, Азиз</li></ul><h3>Суббота</h3><ul><li><strong>10:00</strong> — общая функциональная, зал 1</li><li><strong>11:30</strong> — йога, зал 2</li><li><strong>13:00</strong> — открытый ринг, спарринги по записи</li></ul>",
              uz:
                "<h3>Dushanba, chorshanba, juma</h3><ul><li><strong>7:00</strong> — funksional, 1-zal, Aziz</li><li><strong>9:30</strong> — cho'zilish, 2-zal, Dildora</li><li><strong>18:30</strong> — kuch, 1-zal, Aziz</li><li><strong>19:00</strong> — boks, ring, Timur</li><li><strong>20:00</strong> — yoga, 2-zal, Dildora</li></ul><h3>Seshanba, payshanba</h3><ul><li><strong>7:00</strong> — kardio-interval, 1-zal, Sevara</li><li><strong>10:00</strong> — ona va bola, 2-zal, Sevara</li><li><strong>18:00</strong> — 8 yoshdan bolalar boksi, ring, Timur</li><li><strong>19:30</strong> — funksional, 1-zal, Aziz</li></ul><h3>Shanba</h3><ul><li><strong>10:00</strong> — umumiy funksional, 1-zal</li><li><strong>11:30</strong> — yoga, 2-zal</li><li><strong>13:00</strong> — ochiq ring, yozilish bo'yicha sparringlar</li></ul>",
              en:
                "<h3>Monday, Wednesday, Friday</h3><ul><li><strong>7:00</strong> — functional, studio 1, Aziz</li><li><strong>9:30</strong> — stretching, studio 2, Dildora</li><li><strong>18:30</strong> — strength, studio 1, Aziz</li><li><strong>19:00</strong> — boxing, the ring, Timur</li><li><strong>20:00</strong> — yoga, studio 2, Dildora</li></ul><h3>Tuesday, Thursday</h3><ul><li><strong>7:00</strong> — cardio intervals, studio 1, Sevara</li><li><strong>10:00</strong> — mum and baby, studio 2, Sevara</li><li><strong>18:00</strong> — children's boxing from age 8, the ring, Timur</li><li><strong>19:30</strong> — functional, studio 1, Aziz</li></ul><h3>Saturday</h3><ul><li><strong>10:00</strong> — open functional class, studio 1</li><li><strong>11:30</strong> — yoga, studio 2</li><li><strong>13:00</strong> — open ring, sparring by sign-up</li></ul>",
            },
          ),
          { bg: "surface", width: "normal" },
        ),

        S(
          B.faq(
            "faq",
            L("О групповых занятиях", "Guruh mashg'ulotlari haqida", "About the classes"),
            [
              {
                question: L("Нужна ли подготовка?", "Tayyorgarlik kerakmi?", "Do I need to be fit already?"),
                answer: L(
                  "Нет. На функциональных тренер даёт три уровня нагрузки в одном занятии — новичок и опытный работают рядом, но с разным весом и темпом.",
                  "Yo'q. Funksionalda murabbiy bitta mashg'ulotda uchta yuklama darajasini beradi — yangi va tajribali yonma-yon, lekin turli og'irlik va sur'atda ishlaydi.",
                  "No. In functional classes the coach gives three levels of load in one session — beginners and regulars train side by side at different weights and paces.",
                ),
              },
              {
                question: L("Можно ли ходить только на группы?", "Faqat guruhlarga qatnash mumkinmi?", "Can I come only for classes?"),
                answer: L(
                  "Да, но отдельного «группового» абонемента нет: занятия входят в «Утренний» и «Полный день». Разовое посещение группы — 70 000 сум.",
                  "Ha, lekin alohida «guruh» abonementi yo'q: mashg'ulotlar «Ertalabki» va «To'liq kun»ga kiradi. Bir martalik tashrif — 70 000 so'm.",
                  "Yes, but there is no separate class-only membership: classes are included in Morning and Full day. A single class drop-in is 70,000 UZS.",
                ),
              },
              {
                question: L("Что с детскими группами?", "Bolalar guruhlari-chi?", "What about children's groups?"),
                answer: L(
                  "Детский бокс с 8 лет по вторникам и четвергам в 18:00. Абонемент на месяц — 320 000 сум, справка от педиатра обязательна.",
                  "8 yoshdan bolalar boksi seshanba va payshanba 18:00 da. Oylik abonement — 320 000 so'm, pediatr ma'lumotnomasi shart.",
                  "Children's boxing from age eight, Tuesdays and Thursdays at 18:00. A monthly pass is 320,000 UZS; a paediatrician's note is required.",
                ),
              },
            ],
          ),
          { width: "narrow" },
        ),
      ],
    },

    // ----------------------------------------------------------- абонементы
    {
      slug: "memberships",
      title: L("Абонементы", "Abonementlar", "Memberships"),
      metaDesc: L(
        "Абонементы клуба «Temir»: утренний, полный день, годовой, персональные тренировки и разовые визиты.",
        "«Temir» klubi abonementlari: ertalabki, to'liq kun, yillik, shaxsiy mashg'ulotlar va bir martalik tashriflar.",
        "Temir memberships: morning, full day, annual, personal training and drop-ins.",
      ),
      blocks: [
        S(
          B.richText(
            "note",
            paragraphs(
              L(
                "Абонемент начинает действовать в день первого визита, а не в день покупки. Заморозить его можно один раз, подряд, по заявлению у администратора — задним числом не оформляем.",
                "Abonement sotib olingan kuni emas, birinchi tashrif kunidan boshlanadi. Uni administratorga ariza bilan bir marta, ketma-ket muzlatish mumkin — o'tgan kunlar bilan rasmiylashtirmaymiz.",
                "Your membership starts on your first visit, not on the day you buy it. It can be frozen once, in one continuous block, on request at reception — never backdated.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.pricing(
          "extra",
          L("Дополнительно", "Qo'shimcha", "Add-ons and drop-ins"),
          [
            {
              name: L("Разовый визит", "Bir martalik tashrif", "Drop-in"),
              price: L("70 000 сум", "70 000 so'm", "70,000 UZS"),
              period: L("одно посещение", "bir tashrif", "one visit"),
              features: [
                L("Тренажёрный зал в любое время", "Istalgan vaqtda trenajyor zali", "Gym floor at any time"),
                L("Или одно групповое занятие", "Yoki bitta guruh mashg'uloti", "Or one group class"),
                L("Шкафчик и душ", "Shkafcha va dush", "Locker and shower"),
              ],
              ctaLabel: L("Прийти", "Kelish", "Just come"),
              ctaLink: "/contacts",
            },
            {
              name: L("Персональные тренировки", "Shaxsiy mashg'ulotlar", "Personal training"),
              price: L("1 800 000 сум", "1 800 000 so'm", "1,800,000 UZS"),
              period: L("за 8 занятий с тренером", "murabbiy bilan 8 mashg'ulot uchun", "for eight sessions with a coach"),
              features: [
                L("Программа под вашу задачу", "Maqsadingizga mos dastur", "A programme built for your goal"),
                L("Контроль техники на каждом подходе", "Har bir yondashuvda texnika nazorati", "Technique checked on every set"),
                L("Разовое занятие — 250 000 сум", "Bir martalik mashg'ulot — 250 000 so'm", "A single session is 250,000 UZS"),
              ],
              highlighted: true,
              ctaLabel: L("Подобрать тренера", "Murabbiy tanlash", "Find a coach"),
              ctaLink: "/trainers",
            },
            {
              name: L("Семейный", "Oilaviy", "Family"),
              price: L("1 020 000 сум", "1 020 000 so'm", "1,020,000 UZS"),
              period: L("в месяц на двоих", "ikki kishiga oyiga", "per month for two"),
              features: [
                L("Два абонемента «Полный день»", "Ikkita «To'liq kun» abonementi", "Two Full day memberships"),
                L("Скидка 14% к раздельной покупке", "Alohida sotib olishga nisbatan 14% chegirma", "14% less than buying separately"),
                L("Детский бокс со скидкой 30%", "Bolalar boksiga 30% chegirma", "30% off children's boxing"),
              ],
              ctaLabel: L("Оформить", "Rasmiylashtirish", "Get it"),
              ctaLink: "/contacts",
            },
          ],
        ),

        S(
          B.features(
            "included",
            L("Что входит в любой абонемент", "Har qanday abonementga nima kiradi", "Included with every membership"),
            [
              {
                icon: "check",
                title: L("Вводная тренировка", "Kirish mashg'uloti", "An induction session"),
                body: L(
                  "Тренер показывает зал, разбирает технику базовых упражнений и записывает стартовые замеры.",
                  "Murabbiy zalni ko'rsatadi, asosiy mashqlar texnikasini tushuntiradi va boshlang'ich o'lchovlarni yozadi.",
                  "A coach shows you the floor, works through basic technique and records your starting measurements.",
                ),
              },
              {
                icon: "clock",
                title: L("Заморозка", "Muzlatish", "Freeze days"),
                body: L(
                  "От 7 до 30 дней в зависимости от абонемента — по заявлению у администратора.",
                  "Abonementga qarab 7 dan 30 kungacha — administratorga ariza bilan.",
                  "Seven to thirty days depending on the membership, on request at reception.",
                ),
              },
              {
                icon: "users",
                title: L("Раздевалка и душ", "Kiyinish xonasi va dush", "Changing rooms and showers"),
                body: L(
                  "Шкафчик с замком на время тренировки, фен и питьевая вода — без доплаты.",
                  "Mashg'ulot vaqtiga qulfli shkafcha, fen va ichimlik suvi — qo'shimcha to'lovsiz.",
                  "A lockable locker while you train, hairdryers and drinking water — no extra charge.",
                ),
              },
            ],
          ),
          { bg: "surface" },
        ),
      ],
    },

    // -------------------------------------------------------------- тренеры
    {
      slug: "trainers",
      title: L("Тренеры", "Murabbiylar", "Trainers"),
      metaDesc: L(
        "Тренеры клуба «Temir»: направления, опыт и дни работы. Персональные тренировки и групповые занятия.",
        "«Temir» klubi murabbiylari: yo'nalishlar, tajriba va ish kunlari. Shaxsiy va guruh mashg'ulotlari.",
        "Temir coaches: disciplines, experience and working days. Personal training and group classes.",
      ),
      blocks: [
        B.team(
          "team",
          L("Кто ведёт тренировки", "Kim mashg'ulot o'tkazadi", "Who coaches here"),
          [
            {
              name: L("Азиз Рустамов", "Aziz Rustamov", "Aziz Rustamov"),
              role: L("Силовые и функциональные · пн, ср, пт", "Kuch va funksional · du, chor, ju", "Strength and functional · Mon, Wed, Fri"),
              bio: L(
                "10 лет в зале, специализация — базовые движения и работа с новичками после травм.",
                "Zalda 10 yil, yo'nalishi — asosiy harakatlar va jarohatdan keyingi yangi kelganlar bilan ishlash.",
                "Ten years on the floor; specialises in the basic lifts and working with beginners after injury.",
              ),
            },
            {
              name: L("Тимур Ахмедов", "Timur Ahmedov", "Timur Akhmedov"),
              role: L("Бокс, взрослые и дети · вт, чт, сб", "Boks, kattalar va bolalar · se, pay, sha", "Boxing, adults and children · Tue, Thu, Sat"),
              bio: L(
                "Призёр чемпионата Узбекистана, тренирует с 2016 года. Детская группа с 8 лет.",
                "O'zbekiston chempionati sovrindori, 2016-yildan murabbiy. 8 yoshdan bolalar guruhi.",
                "A national championship medallist, coaching since 2016. Runs the children's group from age eight.",
              ),
            },
            {
              name: L("Севара Тошпулатова", "Sevara Toshpo'latova", "Sevara Toshpulatova"),
              role: L("Кардио и восстановление · вт, чт, вс", "Kardio va tiklanish · se, pay, ya", "Cardio and recovery · Tue, Thu, Sun"),
              bio: L(
                "Ведёт группы «мама и малыш» и интервальные тренировки. Образование — физкультурный институт.",
                "«Ona va bola» guruhlari va interval mashg'ulotlarini olib boradi. Ma'lumoti — jismoniy tarbiya instituti.",
                "Leads mum-and-baby groups and interval training. Trained at the institute of physical education.",
              ),
            },
            {
              name: L("Дилдора Назарова", "Dildora Nazarova", "Dildora Nazarova"),
              role: L("Йога и стретчинг · ежедневно", "Yoga va cho'zilish · har kuni", "Yoga and stretching · daily"),
              bio: L(
                "Работает с людьми, которые весь день сидят за столом: спина, шея, подвижность таза.",
                "Kun bo'yi stol ortida o'tiradiganlar bilan ishlaydi: bel, bo'yin, chanoq harakatchanligi.",
                "Works with people who sit at a desk all day: back, neck and hip mobility.",
              ),
            },
          ],
        ),

        S(
          B.cta("cta", {
            heading: L("Не знаете, с чего начать?", "Nimadan boshlashni bilmayapsizmi?", "Not sure where to start?"),
            body: L(
              "Приходите на бесплатный разбор техники — тренер посмотрит движения и предложит план на первый месяц.",
              "Bepul texnika tahliliga keling — murabbiy harakatlarni ko'rib, birinchi oyga reja taklif qiladi.",
              "Come for a free technique check — a coach watches how you move and suggests a plan for the first month.",
            ),
            buttonLabel: L("Записаться", "Yozilish", "Sign up"),
            buttonLink: "/contacts",
            style: "outline",
          }),
          { bg: "surface", align: "center" },
        ),
      ],
    },

    // ------------------------------------------------------------ контакты
    {
      slug: "contacts",
      title: L("Пробная тренировка", "Sinov mashg'uloti", "Free trial"),
      metaDesc: L(
        "Записаться на бесплатную тренировку в клуб «Temir»: адрес в Сергели, телефон и форма.",
        "«Temir» klubida bepul mashg'ulotga yozilish: Sergelidagi manzil, telefon va shakl.",
        "Book a free session at Temir: the Sergeli address, phone and a sign-up form.",
      ),
      blocks: [
        S(
          B.richText(
            "where",
            paragraphs(
              L(
                "Клуб на Янги Сергели, 5А — отдельно стоящее здание за автостанцией, вход со стороны парковки. Своя парковка на 40 машин, бесплатная для членов клуба.",
                "Klub Yangi Sergeli, 5A-uyda — avtostansiya orqasidagi alohida bino, kirish to'xtash joyi tomonidan. 40 mashinalik o'z to'xtash joyi, klub a'zolari uchun bepul.",
                "The club is at 5A Yangi Sergeli — a standalone building behind the bus station, entrance from the car park. Forty free parking spaces for members.",
              ),
              L(
                "Зал открыт с 6:00 до 23:00 по будням и субботам, в воскресенье — с 8:00 до 20:00. Пробную тренировку проводим в любое время, кроме вечернего пика с 19:00 до 20:30.",
                "Zal ish kunlari va shanba 6:00 dan 23:00 gacha, yakshanba 8:00 dan 20:00 gacha ochiq. Sinov mashg'ulotini 19:00–20:30 kechki gavjum vaqtdan tashqari istalgan payt o'tkazamiz.",
                "Open 6:00–23:00 on weekdays and Saturdays, 8:00–20:00 on Sundays. Trial sessions run any time except the evening peak, 19:00–20:30.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Записаться на бесплатную тренировку", "Bepul mashg'ulotga yozilish", "Book your free session"),
            submitLabel: L("Записаться", "Yozilish", "Sign up"),
            successMessage: L(
              "Записали! Администратор перезвонит и подтвердит время с тренером.",
              "Yozib oldik! Administrator qo'ng'iroq qilib, murabbiy bilan vaqtni tasdiqlaydi.",
              "You're booked. Reception will call to confirm the time with a coach.",
            ),
            fields: [
              { type: "text", label: L("Имя", "Ism", "Name") },
              { type: "tel", label: L("Телефон", "Telefon", "Phone") },
              { type: "text", label: L("Что интересует: зал, группы, бокс", "Nima qiziq: zal, guruh, boks", "Interested in: gym, classes or boxing") },
              { type: "textarea", label: L("Есть ли травмы или ограничения", "Jarohat yoki cheklovlar bormi", "Any injuries or limitations"), required: false },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "prisedaniya-tehnika",
      categorySlug: "trenirovki",
      title: L(
        "Приседания: три ошибки, из-за которых болит колено",
        "Cho'kkalash: tizza og'rishiga sabab bo'ladigan uchta xato",
        "Squats: three mistakes that make your knees hurt",
      ),
      excerpt: L(
        "Тренер Азиз разбирает, что видно со стороны в первые же две недели у большинства новичков.",
        "Murabbiy Aziz ko'pchilik yangi kelganlarda birinchi ikki haftada yon tomondan nima ko'rinishini tushuntiradi.",
        "Coach Aziz breaks down what you can see from the side in most beginners' first two weeks.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Первая ошибка — вес на носках. Если пятка отрывается от пола, колено уходит вперёд, а нагрузка уходит с ног на сустав. Проверить просто: в нижней точке вы должны свободно шевелить пальцами ног.",
              "Birinchi xato — og'irlik oyoq uchida. Tovon poldan uzilsa, tizza oldinga chiqadi va yuk oyoqdan bo'g'imga o'tadi. Tekshirish oson: pastki nuqtada oyoq barmoqlaringizni bemalol qimirlata olishingiz kerak.",
              "Mistake one: weight on the toes. If your heel lifts, the knee travels forward and the load shifts from the legs to the joint. Easy check: at the bottom you should be able to wiggle your toes freely.",
            ),
            L(
              "Вторая — колени сводятся внутрь. Чаще всего это не «слабые колени», а невключённые ягодицы. Лечится не отдыхом, а лёгкой резинкой выше колен и двумя неделями работы с пустым грифом.",
              "Ikkinchisi — tizzalar ichkariga kiradi. Ko'pincha bu «kuchsiz tizza» emas, ishlamayotgan dumba mushaklari. Dam olish bilan emas, tizza ustidagi yengil rezina va bo'sh grif bilan ikki haftalik ish bilan tuzatiladi.",
              "Mistake two: knees caving inward. Usually this is not weak knees but glutes that are not firing. The fix is not rest but a light band above the knees and two weeks with an empty bar.",
            ),
            L(
              "Третья — глубина ради глубины. Садиться ниже, чем позволяет подвижность таза, значит округлять поясницу. Лучше приседать выше, но ровно, и работать над подвижностью отдельно.",
              "Uchinchisi — chuqurlik uchun chuqurlik. Chanoq harakatchanligi imkon berganidan pastroq cho'kkalash belni yumaloqlashtiradi. Yuqoriroq, lekin tekis cho'kkalash va harakatchanlik ustida alohida ishlash yaxshiroq.",
              "Mistake three: depth for its own sake. Going lower than your hip mobility allows rounds the lower back. Better to squat higher but flat, and work on mobility separately.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "chto-est-pered-zalom",
      categorySlug: "pitanie",
      title: L(
        "Что есть перед вечерней тренировкой после работы",
        "Ishdan keyingi kechki mashg'ulotdan oldin nima yeyish kerak",
        "What to eat before an evening session after work",
      ),
      excerpt: L(
        "Без спортпита и сложных схем: обычная еда за два часа до зала и почему плов — не лучший вариант.",
        "Sport ozuqasi va murakkab sxemalarsiz: zaldan ikki soat oldin oddiy ovqat va nega palov eng yaxshi tanlov emas.",
        "No supplements, no complicated schemes: ordinary food two hours before, and why plov is not the best choice.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Главная проблема вечерней тренировки — вы приходите либо голодным, либо сразу после плотного обеда в столовой. И то и другое даёт вялую тренировку.",
              "Kechki mashg'ulotning asosiy muammosi — siz yo och, yo oshxonadagi to'yimli tushlikdan keyin darhol kelasiz. Ikkalasi ham mashg'ulotni sust qiladi.",
              "The main problem with evening training is that you arrive either hungry or straight after a heavy canteen lunch. Both make for a sluggish session.",
            ),
            L(
              "Рабочая схема простая: нормальный обед в 13:00 и лёгкий перекус за полтора-два часа до зала — лепёшка с творогом, банан, горсть орехов. Этого достаточно на часовую тренировку.",
              "Ishlaydigan sxema oddiy: 13:00 da to'liq tushlik va zaldan bir yarim–ikki soat oldin yengil gazak — tvorogli non, banan, bir hovuch yong'oq. Bu bir soatlik mashg'ulotga yetadi.",
              "The working pattern is simple: a proper lunch at 13:00 and a light snack an hour and a half to two hours before — flatbread with curd, a banana, a handful of nuts. That is enough for an hour of training.",
            ),
            L(
              "Плов, шашлык и всё жирное перед залом лучше не есть: жир замедляет опорожнение желудка, и через час вы почувствуете тяжесть на первом же подходе.",
              "Zaldan oldin palov, shashlik va yog'li taomlarni yemagan ma'qul: yog' oshqozonning bo'shashini sekinlashtiradi va bir soatdan keyin birinchi yondashuvdayoq og'irlik sezasiz.",
              "Avoid plov, kebabs and anything fatty before the gym: fat slows the stomach down, and an hour later you will feel it on your very first set.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "novye-stojki",
      categorySlug: "novosti-kluba",
      title: L(
        "Поставили вторую стойку для приседа и продлили вечернее время",
        "Ikkinchi cho'kkalash tayanchi o'rnatildi va kechki vaqt uzaytirildi",
        "A second squat rack, and later closing on weekdays",
      ),
      excerpt: L(
        "Очередь к стойке в 19:00 доходила до 20 минут — теперь их две, а зал работает до 23:00.",
        "19:00 da tayanchga navbat 20 daqiqagacha yetardi — endi ular ikkita, zal 23:00 gacha ishlaydi.",
        "The 19:00 queue for the rack hit twenty minutes — now there are two, and we close at 23:00.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Вечерний пик — с 19:00 до 20:30 — был единственным реальным неудобством клуба: к стойке для приседа выстраивалась очередь на 15–20 минут.",
              "Kechki gavjum vaqt — 19:00 dan 20:30 gacha — klubning yagona haqiqiy noqulayligi edi: cho'kkalash tayanchiga 15–20 daqiqalik navbat yig'ilardi.",
              "The evening peak, 19:00 to 20:30, was the club's one real annoyance: the queue for the squat rack ran to fifteen or twenty minutes.",
            ),
            L(
              "В сентябре мы поставили вторую стойку и добавили два грифа. Заодно продлили работу зала по будням до 23:00 — по опросу это попросили 64 человека из 180 ответивших.",
              "Sentabrda ikkinchi tayanchni o'rnatdik va ikkita grif qo'shdik. Shu bilan birga ish kunlari zal ish vaqtini 23:00 gacha uzaytirdik — so'rovda javob bergan 180 kishidan 64 tasi shuni so'ragan.",
              "In September we added a second rack and two more bars, and extended weekday hours to 23:00 — 64 of the 180 people who answered our survey had asked for it.",
            ),
          ),
        ),
      ],
    },
  ],
};
