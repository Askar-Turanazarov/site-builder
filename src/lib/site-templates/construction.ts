import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * Ремонт квартир «под ключ» — бригада «Bunyod Remont», Юнусабадский район.
 * Структура профиля: клиент боится сорванных сроков и «плавающей» сметы,
 * поэтому главная идёт от объектов и этапов работ к фиксированным пакетам
 * за квадратный метр, а не от красивых слов о качестве.
 */
export const constructionTemplate: SiteTemplate = {
  key: "construction",
  label: L("Строительство и ремонт", "Qurilish va ta'mirlash", "Construction and renovation"),
  profile: L(
    "Ремонт квартир «Bunyod Remont», Юнусабад",
    "«Bunyod Remont» kvartira ta'miri, Yunusobod",
    "Bunyod Remont apartment renovation, Yunusabad",
  ),
  description: L(
    "Портфолио объектов, этапы работ, пакеты ремонта с ценой за квадратный метр и вызов замерщика.",
    "Obyektlar portfoliosi, ish bosqichlari, kvadrat metr narxi bilan ta'mir paketlari va o'lchovchi chaqirish.",
    "A portfolio of finished flats, the stages of work, renovation packages priced per square metre and a surveyor call-out.",
  ),
  themeKey: "construction",
  design: { skin: "industrial", fontDisplay: "Oswald", fontBody: "Roboto", radiusScale: "sm" },

  settings: {
    siteName: L("Bunyod Remont", "Bunyod Remont", "Bunyod Remont"),
    tagline: L(
      "Ремонт квартир под ключ в Ташкенте",
      "Toshkentda kvartiralarni kalit topshirish ta'miri",
      "Turnkey apartment renovation in Tashkent",
    ),
    contactEmail: "zakaz@bunyodremont.uz",
    contactPhone: "+998 90 977 15 03",
    contactAddress: L(
      "Ташкент, Юнусабадский район, ул. Амира Темура, 108, офис 2",
      "Toshkent, Yunusobod tumani, Amir Temur ko'chasi, 108, 2-ofis",
      "Tashkent, Yunusabad district, 108 Amir Temur street, office 2",
    ),
    footerNote: L(
      "© «Bunyod Remont», Ташкент. Договор, смета и гарантия 3 года на все работы.",
      "© «Bunyod Remont», Toshkent. Shartnoma, smeta va barcha ishlarga 3 yil kafolat.",
      "© Bunyod Remont, Tashkent. Written contract, itemised estimate and a 3-year guarantee on all work.",
    ),
  },

  categories: [
    {
      slug: "nashi-obekty",
      order: 1,
      name: L("Наши объекты", "Bizning obyektlar", "Our projects"),
      description: L(
        "Отчёты по сданным квартирам: сроки, бюджет и что пошло не по плану.",
        "Topshirilgan kvartiralar hisoboti: muddat, byudjet va nima reja bo'yicha ketmagani.",
        "Reports from finished flats: timelines, budgets and what did not go to plan.",
      ),
    },
    {
      slug: "sovety-po-remontu",
      order: 2,
      name: L("Советы по ремонту", "Ta'mir bo'yicha maslahatlar", "Renovation advice"),
      description: L(
        "Как готовиться к ремонту, на чём нельзя экономить и какие ошибки стоят дороже всего.",
        "Ta'mirga qanday tayyorlanish, nimada tejash mumkin emas va qaysi xatolar eng qimmatga tushadi.",
        "How to prepare, where you must not cut costs, and which mistakes cost the most.",
      ),
    },
    {
      slug: "materialy",
      order: 3,
      name: L("Материалы", "Materiallar", "Materials"),
      description: L(
        "Что мы покупаем на ташкентских рынках и почему — без рекламы брендов.",
        "Toshkent bozorlaridan nima sotib olamiz va nima uchun — brend reklamasisiz.",
        "What we buy at Tashkent markets and why — no brand promotion.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "portfolio", order: 1, label: L("Портфолио", "Portfolio", "Portfolio") },
    { location: "header", linkType: "page", target: "packages", order: 2, label: L("Пакеты и цены", "Paketlar va narx", "Packages and prices") },
    { location: "header", linkType: "category", target: "nashi-obekty", order: 3, label: L("Наши объекты", "Bizning obyektlar", "Our projects") },
    { location: "header", linkType: "page", target: "contacts", order: 4, label: L("Вызвать замерщика", "O'lchovchi chaqirish", "Book a surveyor") },
    { location: "footer", linkType: "category", target: "nashi-obekty", order: 1, label: L("Объекты", "Obyektlar", "Projects") },
    { location: "footer", linkType: "category", target: "sovety-po-remontu", order: 2, label: L("Советы", "Maslahatlar", "Advice") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Ремонт квартир под ключ в Ташкенте: фиксированная смета, договор, срок в договоре и гарантия 3 года.",
        "Toshkentda kalit topshirish ta'miri: qat'iy smeta, shartnoma, shartnomadagi muddat va 3 yil kafolat.",
        "Turnkey apartment renovation in Tashkent: a fixed estimate, a contract with a deadline and a 3-year guarantee.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Ремонт с фиксированной сметой и сроком в договоре",
            "Qat'iy smeta va shartnomadagi muddat bilan ta'mir",
            "Renovation with a fixed estimate and a deadline in writing",
          ),
          subheading: L(
            "Делаем квартиры под ключ в Ташкенте с 2014 года. Смета не растёт по ходу работ: всё, что не учли на замере, — за наш счёт.",
            "2014-yildan beri Toshkentda kvartiralarni kalit topshirish holatida ta'mirlaymiz. Smeta ish davomida oshmaydi: o'lchovda hisobga olinmagani — biz hisobimizdan.",
            "We have delivered turnkey flats in Tashkent since 2014. The estimate does not grow mid-project: anything missed at the survey is on us.",
          ),
          ctaLabel: L("Вызвать замерщика", "O'lchovchi chaqirish", "Book a surveyor"),
          ctaLink: "/contacts",
          variant: "fullBleed",
          overlayOpacity: 0.55,
        }),

        S(
          B.stats("stats", [
            { value: L("212", "212", "212"), label: L("Квартир сдано с 2014 года", "2014-yildan beri topshirilgan kvartiralar", "Flats delivered since 2014") },
            { value: L("3 года", "3 yil", "3 years"), label: L("Гарантия на работы", "Ishlarga kafolat", "Guarantee on our work") },
            { value: L("64 дня", "64 kun", "64 days"), label: L("Средний срок «двушки»", "Ikki xonali kvartira o'rtacha muddati", "Average for a two-room flat") },
            { value: L("0 сум", "0 so'm", "0 UZS"), label: L("Доплат сверх сметы", "Smetadan ortiq to'lov", "Charged above the estimate") },
          ]),
          { bg: "ink" },
        ),

      B.features(
        "stages",
        L("Как устроен процесс", "Jarayon qanday tashkil etilgan", "How the process works"),
        [
          {
            icon: "check",
            title: L("1. Замер и смета", "1. O'lchov va smeta", "1. Survey and estimate"),
            body: L(
              "Замерщик приезжает бесплатно, смета готова за два дня — постатейно, с объёмами и ценой каждой позиции.",
              "O'lchovchi bepul keladi, smeta ikki kunda tayyor — moddama-modda, hajmi va har bir pozitsiya narxi bilan.",
              "The survey is free and the estimate is ready in two days — itemised, with quantities and a price for every line.",
            ),
          },
          {
            icon: "shield",
            title: L("2. Договор и график", "2. Shartnoma va jadval", "2. Contract and schedule"),
            body: L(
              "В договоре — срок, состав работ и штраф за просрочку с нашей стороны. Оплата по этапам, а не вперёд.",
              "Shartnomada — muddat, ishlar tarkibi va bizning kechikishimiz uchun jarima. To'lov bosqichma-bosqich, oldindan emas.",
              "The contract fixes the deadline, the scope and a penalty if we run late. You pay by stage, not up front.",
            ),
          },
          {
            icon: "rocket",
            title: L("3. Черновые работы", "3. Qora ishlar", "3. Structural work"),
            body: L(
              "Демонтаж, электрика, сантехника, стяжка и штукатурка. Фотоотчёт в Telegram каждый вечер.",
              "Demontaj, elektr, santexnika, styajka va suvoq. Har kuni kechqurun Telegramda foto hisobot.",
              "Demolition, wiring, plumbing, screed and plaster. A photo report on Telegram every evening.",
            ),
          },
          {
            icon: "star",
            title: L("4. Чистовая и сдача", "4. Toza ish va topshirish", "4. Finishing and handover"),
            body: L(
              "Отделка, двери, сантехника, уборка. Сдаём по чек-листу из 74 пунктов вместе с заказчиком.",
              "Pardozlash, eshiklar, santexnika, tozalash. 74 banddan iborat ro'yxat bo'yicha buyurtmachi bilan topshiramiz.",
              "Finishes, doors, fixtures, cleaning. Handover against a 74-point checklist, walked through with you.",
            ),
          },
        ],
        4,
      ),

        S(
          B.gallery(
            "works",
            [
              L("Двушка на Юнусабаде, 62 м², 68 дней", "Yunusobodda ikki xonali, 62 m², 68 kun", "Two-room flat in Yunusabad, 62 m², 68 days"),
              L("Студия в Мирзо-Улугбеке, 38 м², 41 день", "Mirzo Ulug'bekda studiya, 38 m², 41 kun", "Studio in Mirzo Ulugbek, 38 m², 41 days"),
              L("Трёшка на Чиланзаре, 84 м², 96 дней", "Chilonzorda uch xonali, 84 m², 96 kun", "Three-room flat in Chilanzar, 84 m², 96 days"),
              L("Кухня-гостиная, объединение с балконом", "Oshxona-mehmonxona, balkon bilan birlashtirish", "Kitchen-living room merged with the balcony"),
              L("Санузел под ключ, 4,2 м²", "Kalit topshirish hammom, 4,2 m²", "Turnkey bathroom, 4.2 m²"),
              L("Детская с покраской вместо обоев", "Bolalar xonasi: oboy o'rniga bo'yoq", "Children's room, painted instead of wallpapered"),
            ],
            3,
          ),
          { bg: "surface" },
        ),

        B.testimonials(
          "reviews",
          L("Отзывы заказчиков", "Buyurtmachilar fikri", "What clients say"),
          [
            {
              quote: L(
                "Сдали на четыре дня раньше срока. Самое ценное — вечерние фотоотчёты: я живу в Самарканде и приезжала на объект всего дважды.",
                "Muddatdan to'rt kun oldin topshirdilar. Eng qadrlisi — kechki foto hisobotlar: men Samarqandda yashayman va obyektga bor-yo'g'i ikki marta keldim.",
                "They finished four days early. The best part was the evening photo reports: I live in Samarkand and only visited the flat twice.",
              ),
              authorName: L("Гулчехра Набиева", "Gulchehra Nabiyeva", "Gulchehra Nabieva"),
              authorRole: L("Двушка на Юнусабаде, 62 м²", "Yunusobodda ikki xonali, 62 m²", "Two-room flat in Yunusabad, 62 m²"),
            },
            {
              quote: L(
                "При демонтаже нашли гнилую разводку — переделали без доплаты, как и написано в договоре. Спорить не пришлось ни разу.",
                "Demontaj vaqtida chirigan quvurlarni topishdi — shartnomada yozilganidek, qo'shimcha to'lovsiz qayta qildilar. Bir marta ham bahslashishga to'g'ri kelmadi.",
                "During demolition they found rotten pipework and redid it at no extra cost, exactly as the contract said. We never had to argue once.",
              ),
              authorName: L("Рустам Юсупов", "Rustam Yusupov", "Rustam Yusupov"),
              authorRole: L("Трёшка на Чиланзаре, 84 м²", "Chilonzorda uch xonali, 84 m²", "Three-room flat in Chilanzar, 84 m²"),
            },
          ],
        ),

        S(
          B.cta("cta", {
            heading: L("Замер бесплатный, смета — за два дня", "O'lchov bepul, smeta — ikki kunda", "Free survey, estimate in two days"),
            body: L(
              "Оставьте адрес и площадь — приедем в удобное время, в том числе в выходные.",
              "Manzil va maydonni qoldiring — qulay vaqtda, shu jumladan dam olish kunlari ham boramiz.",
              "Leave the address and floor area — we come at a time that suits you, weekends included.",
            ),
            buttonLabel: L("Вызвать замерщика", "O'lchovchi chaqirish", "Book a surveyor"),
            buttonLink: "/contacts",
          }),
          { bg: "accent", align: "center" },
        ),
    ],
  },

  // ------------------------------------------------------------ портфолио
  {
    slug: "portfolio",
    title: L("Портфолио", "Portfolio", "Portfolio"),
    metaDesc: L(
      "Сданные объекты «Bunyod Remont»: площадь, срок, бюджет и что делали на каждом этапе.",
      "«Bunyod Remont» topshirgan obyektlar: maydon, muddat, byudjet va har bosqichda nima qilingani.",
      "Completed Bunyod Remont projects: area, timeline, budget and what was done at each stage.",
    ),
    blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Показываем объекты с цифрами: площадь, срок, итоговая сумма. Фотографии — без обработки и постановочной мебели, снимали на сдаче вместе с заказчиком.",
                "Obyektlarni raqamlar bilan ko'rsatamiz: maydon, muddat, yakuniy summa. Suratlar tahrirsiz va sahnalashtirilgan mebelsiz, topshirish kuni buyurtmachi bilan olingan.",
                "We show projects with numbers: area, timeline, final cost. The photos are unedited and unstaged — taken at handover with the client present.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

      B.imageText("case-1", {
        heading: L("Двушка на Юнусабаде · 62 м² · 68 дней", "Yunusobodda ikki xonali · 62 m² · 68 kun", "Two-room flat in Yunusabad · 62 m² · 68 days"),
        body: L(
          "Панельный дом 1986 года. Полностью меняли электрику и сантехнику, объединили кухню с балконом, стены под покраску. Итог — 178 млн сум вместе с материалами, без изменений сметы.",
          "1986-yilgi panelli uy. Elektr va santexnikani to'liq almashtirdik, oshxonani balkon bilan birlashtirdik, devorlar bo'yoq ostida. Natija — materiallar bilan 178 mln so'm, smeta o'zgarmadi.",
          "A 1986 panel building. Full rewiring and new plumbing, kitchen merged with the balcony, walls prepared for paint. Final cost 178 million UZS including materials, with no change to the estimate.",
        ),
        imageSide: "right",
      }),

      B.imageText("case-2", {
        heading: L("Студия в Мирзо-Улугбеке · 38 м² · 41 день", "Mirzo Ulug'bekda studiya · 38 m² · 41 kun", "Studio in Mirzo Ulugbek · 38 m² · 41 days"),
        body: L(
          "Новостройка со свободной планировкой. Возвели перегородку санузла, сделали тёплый пол в коридоре и кухне, встроенный шкаф по нашим чертежам. 96 млн сум под ключ.",
          "Erkin rejali yangi bino. Hammom devorini qurdik, koridor va oshxonaga issiq pol qildik, chizmalarimiz bo'yicha o'rnatma shkaf. Kalit topshirish 96 mln so'm.",
          "A new build with an open plan. We built the bathroom partition, laid underfloor heating in the hallway and kitchen, and fitted a wardrobe to our own drawings. 96 million UZS turnkey.",
        ),
        imageSide: "left",
      }),

      B.imageText("case-3", {
        heading: L("Трёшка на Чиланзаре · 84 м² · 96 дней", "Chilonzorda uch xonali · 84 m² · 96 kun", "Three-room flat in Chilanzar · 84 m² · 96 days"),
        body: L(
          "Самый долгий объект года: при демонтаже нашли аварийную разводку по всей квартире и меняли её за свой счёт — восемь дней сверх графика, но в рамках сметы заказчика.",
          "Yilning eng uzoq obyekti: demontajda butun kvartira bo'ylab avariyaviy quvurlar topildi va uni o'z hisobimizdan almashtirdik — jadvaldan sakkiz kun ortiq, lekin buyurtmachi smetasi doirasida.",
          "The longest project of the year: demolition revealed unsafe wiring throughout the flat, which we replaced at our own expense — eight days over schedule, but within the client's budget.",
        ),
        imageSide: "right",
      }),

        S(
          B.gallery(
            "details",
            [
              L("Разводка электрики до штукатурки", "Suvoqdan oldingi elektr o'tkazmasi", "Wiring before plastering"),
              L("Стяжка с маяками, Юнусабад", "Mayoqlar bilan styajka, Yunusobod", "Screed with levelling beacons, Yunusabad"),
              L("Санузел: гидроизоляция углов", "Hammom: burchaklar gidroizolyatsiyasi", "Bathroom: waterproofing the corners"),
              L("Финальная приёмка по чек-листу", "Ro'yxat bo'yicha yakuniy qabul", "Final handover against the checklist"),
            ],
            4,
          ),
          { bg: "surface" },
        ),
    ],
  },

  // ------------------------------------------------------- пакеты и цены
  {
    slug: "packages",
    title: L("Пакеты и цены", "Paketlar va narxlar", "Packages and prices"),
    metaDesc: L(
      "Пакеты ремонта «Bunyod Remont»: косметический, капитальный и дизайнерский. Цена за квадратный метр без материалов.",
      "«Bunyod Remont» ta'mir paketlari: kosmetik, kapital va dizaynerlik. Materialsiz kvadrat metr narxi.",
      "Bunyod Remont packages: cosmetic, full and designer renovation. Price per square metre, materials not included.",
    ),
    blocks: [
        S(
          B.richText(
            "note",
            paragraphs(
              L(
                "Цены указаны за квадратный метр площади квартиры и включают только работы. Материалы вы покупаете сами по нашему списку — так вы видите реальную стоимость и не платите нам процент сверху.",
                "Narxlar kvartira maydonining kvadrat metriga ko'rsatilgan va faqat ishlarni o'z ichiga oladi. Materiallarni ro'yxatimiz bo'yicha o'zingiz sotib olasiz — shunda haqiqiy narxni ko'rasiz va bizga ustama foiz to'lamaysiz.",
                "Prices are per square metre of floor area and cover labour only. You buy the materials yourself from our list, so you see the real cost and pay us no markup.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

      B.pricing(
        "packages",
        L("Три пакета работ", "Uchta ish paketi", "Three packages"),
        [
          {
            name: L("Косметический", "Kosmetik", "Cosmetic"),
            price: L("950 000 сум", "950 000 so'm", "950,000 UZS"),
            period: L("за м², работы", "m² uchun, ishlar", "per m², labour"),
            features: [
              L("Выравнивание стен и потолка", "Devor va shiftni tekislash", "Levelling walls and ceilings"),
              L("Покраска или обои, напольное покрытие", "Bo'yoq yoki oboy, pol qoplamasi", "Paint or wallpaper, floor covering"),
              L("Замена розеток и выключателей", "Rozetka va vyklyuchatellarni almashtirish", "New sockets and switches"),
              L("Срок для 60 м² — около 35 дней", "60 m² uchun muddat — taxminan 35 kun", "About 35 days for 60 m²"),
            ],
            ctaLabel: L("Рассчитать", "Hisoblash", "Get a quote"),
            ctaLink: "/contacts",
          },
          {
            name: L("Капитальный", "Kapital", "Full renovation"),
            price: L("1 850 000 сум", "1 850 000 so'm", "1,850,000 UZS"),
            period: L("за м², работы", "m² uchun, ishlar", "per m², labour"),
            features: [
              L("Демонтаж, новая электрика и сантехника", "Demontaj, yangi elektr va santexnika", "Demolition, new wiring and plumbing"),
              L("Стяжка, штукатурка, гидроизоляция санузла", "Styajka, suvoq, hammom gidroizolyatsiyasi", "Screed, plaster, bathroom waterproofing"),
              L("Чистовая отделка и установка дверей", "Toza pardoz va eshiklarni o'rnatish", "Finishes and door installation"),
              L("Гарантия 3 года, сдача по чек-листу", "3 yil kafolat, ro'yxat bo'yicha topshirish", "3-year guarantee, checklist handover"),
            ],
            highlighted: true,
            ctaLabel: L("Вызвать замерщика", "O'lchovchi chaqirish", "Book a surveyor"),
            ctaLink: "/contacts",
          },
          {
            name: L("С дизайн-проектом", "Dizayn-loyiha bilan", "With a design project"),
            price: L("2 400 000 сум", "2 400 000 so'm", "2,400,000 UZS"),
            period: L("за м², работы и проект", "m² uchun, ishlar va loyiha", "per m², labour and design"),
            features: [
              L("Планировочное решение и 3D-визуализация", "Rejalashtirish yechimi va 3D vizualizatsiya", "Layout plan and 3D visualisation"),
              L("Полный комплект рабочих чертежей", "To'liq ishchi chizmalar to'plami", "A complete set of working drawings"),
              L("Подбор материалов и сопровождение закупок", "Materiallarni tanlash va xarid hamrohligi", "Material selection and purchasing support"),
              L("Авторский надзор до сдачи", "Topshirishgacha mualliflik nazorati", "Designer supervision until handover"),
            ],
            ctaLabel: L("Обсудить проект", "Loyihani muhokama qilish", "Discuss the project"),
            ctaLink: "/contacts",
          },
        ],
      ),

        S(
          B.faq(
            "faq",
            L("Вопросы про смету и сроки", "Smeta va muddat haqida savollar", "Questions about estimates and timing"),
            [
              {
                question: L("Может ли смета вырасти?", "Smeta oshishi mumkinmi?", "Can the estimate go up?"),
                answer: L(
                  "Только если вы сами измените состав работ — например, решите переносить стену. Всё, что не заметил наш замерщик, делаем за свой счёт.",
                  "Faqat siz ish tarkibini o'zgartirsangiz — masalan, devorni ko'chirishga qaror qilsangiz. O'lchovchimiz sezmagan hamma narsani o'z hisobimizdan qilamiz.",
                  "Only if you change the scope yourself — say, decide to move a wall. Anything our surveyor missed is on us.",
                ),
              },
              {
                question: L("Как платить?", "Qanday to'lanadi?", "How do payments work?"),
                answer: L(
                  "Тремя этапами: 30% на старте после закупки черновых материалов, 40% после черновых работ, 30% при сдаче по чек-листу.",
                  "Uch bosqichda: 30% qora materiallar xarididan keyin boshida, 40% qora ishlardan so'ng, 30% ro'yxat bo'yicha topshirishda.",
                  "In three stages: 30% at the start after rough materials are bought, 40% after structural work, 30% at checklist handover.",
                ),
              },
              {
                question: L("Что с мусором и соседями?", "Chiqindi va qo'shnilar-chi?", "What about debris and neighbours?"),
                answer: L(
                  "Вывоз строительного мусора включён в смету. Шумные работы ведём с 9:00 до 18:00, в воскресенье не работаем — это записано в договоре.",
                  "Qurilish chiqindisini olib chiqish smetaga kiradi. Shovqinli ishlarni 9:00 dan 18:00 gacha qilamiz, yakshanba ishlamaymiz — bu shartnomada yozilgan.",
                  "Debris removal is included in the estimate. Noisy work runs 9:00–18:00 and we do not work on Sundays — it is written into the contract.",
                ),
              },
              {
                question: L("Работаете в других районах?", "Boshqa tumanlarda ishlaysizmi?", "Do you work in other districts?"),
                answer: L(
                  "По всему Ташкенту и в Зангиате. В Чирчик и Ангрен выезжаем только на объекты от 80 м².",
                  "Butun Toshkent bo'ylab va Zangiotada. Chirchiq va Angrenga faqat 80 m² dan katta obyektlarga boramiz.",
                  "Across Tashkent and in Zangiata. We take Chirchik and Angren projects only from 80 m² up.",
                ),
              },
            ],
          ),
          { bg: "surface", width: "narrow" },
        ),
    ],
  },

  // ------------------------------------------------------------ контакты
  {
    slug: "contacts",
    title: L("Вызвать замерщика", "O'lchovchi chaqirish", "Book a surveyor"),
    metaDesc: L(
      "Вызов замерщика «Bunyod Remont» по Ташкенту: бесплатно, смета за два дня. Телефон +998 90 977 15 03.",
      "Toshkent bo'ylab «Bunyod Remont» o'lchovchisini chaqirish: bepul, smeta ikki kunda. Telefon +998 90 977 15 03.",
      "Book a Bunyod Remont surveyor anywhere in Tashkent: free, estimate in two days. Call +998 90 977 15 03.",
    ),
    blocks: [
        S(
          B.richText(
            "how",
            paragraphs(
              L(
                "Замерщик приезжает бесплатно и без обязательств: измеряет квартиру, фотографирует состояние стен и коммуникаций, задаёт вопросы по пожеланиям. Занимает около часа.",
                "O'lchovchi bepul va majburiyatsiz keladi: kvartirani o'lchaydi, devorlar va kommunikatsiyalar holatini suratga oladi, istaklaringiz bo'yicha savol beradi. Taxminan bir soat oladi.",
                "The survey is free and commits you to nothing: we measure the flat, photograph the state of the walls and services, and ask about what you want. It takes about an hour.",
              ),
              L(
                "Через два дня вы получаете постатейную смету в PDF и список материалов с ориентировочными ценами по ташкентским рынкам — «Куйлюк», «Урикзор» и строительным базам на Сергели.",
                "Ikki kundan so'ng PDF formatidagi moddama-modda smeta va Toshkent bozorlari — «Quyluq», «O'rikzor» va Sergelidagi qurilish bazalari narxlari bilan materiallar ro'yxatini olasiz.",
                "Two days later you get an itemised PDF estimate and a materials list with indicative prices from Tashkent markets — Kuylyuk, Urikzor and the builders' yards in Sergeli.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Заявка на замер", "O'lchov uchun ariza", "Survey request"),
            submitLabel: L("Вызвать замерщика", "O'lchovchi chaqirish", "Book the survey"),
            successMessage: L(
              "Заявка принята. Перезвоним в течение часа и согласуем время выезда.",
              "Ariza qabul qilindi. Bir soat ichida qo'ng'iroq qilib, chiqish vaqtini kelishamiz.",
              "Request received. We will call within the hour to agree a time.",
            ),
            fields: [
              { type: "text", label: L("Имя", "Ism", "Name") },
              { type: "tel", label: L("Телефон", "Telefon", "Phone") },
              { type: "text", label: L("Адрес и площадь квартиры", "Kvartira manzili va maydoni", "Address and floor area") },
              { type: "textarea", label: L("Что нужно сделать", "Nima qilish kerak", "What needs doing"), required: false },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),

        B.features(
          "guarantees",
          L("Что вы получаете на бумаге", "Qog'ozda nima olasiz", "What you get in writing"),
          [
            {
              icon: "shield",
              title: L("Договор со сроком", "Muddatli shartnoma", "A contract with a deadline"),
              body: L(
                "Срок сдачи и штраф за просрочку с нашей стороны прописаны прямо в договоре.",
                "Topshirish muddati va kechikkanimiz uchun jarima shartnomada aniq yozilgan.",
                "The completion date and our late penalty are written directly into the contract.",
              ),
            },
            {
              icon: "check",
              title: L("Постатейная смета", "Moddama-modda smeta", "An itemised estimate"),
              body: L(
                "Каждая позиция с объёмом и ценой — видно, за что именно вы платите.",
                "Har bir pozitsiya hajmi va narxi bilan — nimaga to'layotganingiz ko'rinadi.",
                "Every line with its quantity and price — you can see exactly what you are paying for.",
              ),
            },
            {
              icon: "clock",
              title: L("Гарантия 3 года", "3 yil kafolat", "A 3-year guarantee"),
              body: L(
                "Если что-то отойдёт или потечёт — приезжаем и переделываем бесплатно.",
                "Biror narsa ko'chsa yoki oqsa — kelib, bepul qayta qilamiz.",
                "If something comes loose or leaks, we come back and redo it at no charge.",
              ),
            },
          ],
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "dvushka-yunusabad-otchet",
      categorySlug: "nashi-obekty",
      title: L(
        "Двушка на Юнусабаде: 68 дней, 178 млн сум, один сюрприз в стене",
        "Yunusobodda ikki xonali: 68 kun, 178 mln so'm, devordagi bitta syurpriz",
        "A flat in Yunusabad: 68 days, 178 million UZS and one surprise in the wall",
      ),
      excerpt: L(
        "Полный отчёт по объекту: что делали по неделям, где отстали от графика и почему всё равно сдали раньше срока.",
        "Obyekt bo'yicha to'liq hisobot: haftalar bo'yicha nima qilindi, qayerda jadvaldan orqada qoldik va nega baribir muddatdan oldin topshirdik.",
        "A full project report: what happened week by week, where we fell behind and why we still finished early.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Квартира в панельном доме 1986 года, 62 м². Заказчица живёт в Самарканде, поэтому весь контроль шёл через вечерние фотоотчёты в Telegram.",
              "1986-yilgi panelli uydagi kvartira, 62 m². Buyurtmachi Samarqandda yashaydi, shuning uchun butun nazorat Telegramdagi kechki foto hisobotlar orqali bo'ldi.",
              "A 62 m² flat in a 1986 panel building. The client lives in Samarkand, so the whole project ran through evening photo reports on Telegram.",
            ),
            L(
              "На третий день при демонтаже кухонной стены нашли старую алюминиевую разводку — такую нельзя оставлять под новой штукатуркой. Заменили на медь по всей квартире за свой счёт: два дня работы и 4,2 млн сум материалов.",
              "Uchinchi kuni oshxona devorini buzishda eski alyuminiy o'tkazmani topdik — bunday narsani yangi suvoq ostida qoldirib bo'lmaydi. Butun kvartira bo'ylab misga o'z hisobimizdan almashtirdik: ikki kunlik ish va 4,2 mln so'm material.",
              "On day three, taking down the kitchen wall, we found old aluminium wiring — the kind you cannot leave under fresh plaster. We replaced it with copper throughout at our own cost: two days of work and 4.2 million UZS of materials.",
            ),
            L(
              "Дальше шли по графику: стяжка на 12-й день, штукатурка на 20-й, чистовая с 44-го. Сдали на 68-й день вместо 72-х, потому что заказчица заранее выбрала плитку и не пришлось ждать поставку.",
              "Keyin jadval bo'yicha ketdik: 12-kuni styajka, 20-kuni suvoq, 44-kundan toza ishlar. 72 kun o'rniga 68-kuni topshirdik, chunki buyurtmachi plitkani oldindan tanlagan edi va yetkazib berishni kutish shart bo'lmadi.",
              "After that we kept to schedule: screed on day 12, plaster on day 20, finishing from day 44. We handed over on day 68 instead of 72, because the client had chosen her tiles in advance and we did not wait on delivery.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "chto-delat-do-remonta",
      categorySlug: "sovety-po-remontu",
      title: L(
        "Три вещи, которые стоит сделать до начала ремонта",
        "Ta'mirni boshlashdan oldin qilish kerak bo'lgan uchta ish",
        "Three things to do before the renovation starts",
      ),
      excerpt: L(
        "Не о материалах: про согласование перепланировки, счётчики и договорённости с соседями снизу.",
        "Materiallar haqida emas: qayta rejalashtirishni kelishish, hisoblagichlar va pastdagi qo'shnilar bilan kelishuv haqida.",
        "Not about materials: permits for layout changes, meters, and an agreement with the neighbours below.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Первое — перепланировка. Снос ненесущей перегородки согласовывать не нужно, а вот перенос кухни или объединение с балконом — нужно, иначе квартиру потом не продать без штрафа.",
              "Birinchisi — qayta rejalashtirish. Yuk ko'tarmaydigan devorni buzishni kelishish shart emas, lekin oshxonani ko'chirish yoki balkon bilan birlashtirishni kelishish kerak, aks holda keyin kvartirani jarimasiz sotib bo'lmaydi.",
              "First: layout changes. Removing a non-load-bearing partition needs no permit, but moving the kitchen or merging with the balcony does — otherwise you cannot sell the flat later without a fine.",
            ),
            L(
              "Второе — счётчики. Снимите показания воды, газа и света до начала работ и сфотографируйте. Спор о том, кто «нажёг» за два месяца ремонта, — самый частый и самый бессмысленный.",
              "Ikkinchisi — hisoblagichlar. Ish boshlanishidan oldin suv, gaz va svet ko'rsatkichlarini olib, suratga oling. Ikki oylik ta'mirda kim «sarflagani» haqidagi bahs eng ko'p uchraydigan va eng ma'nosiz bahs.",
              "Second: meters. Take water, gas and electricity readings before work starts and photograph them. The argument over who ran up two months of bills is the most common and most pointless one there is.",
            ),
            L(
              "Третье — соседи снизу. Зайдите заранее, оставьте свой номер и предупредите о сроках. Стоит десять минут, а экономит недели нервов при штроблении.",
              "Uchinchisi — pastdagi qo'shnilar. Oldindan kiring, raqamingizni qoldiring va muddatlar haqida ogohlantiring. O'n daqiqa vaqt oladi, lekin shtroblash paytida haftalab asabni tejaydi.",
              "Third: the neighbours below. Knock in advance, leave your number and tell them the timeline. It takes ten minutes and saves weeks of stress once the wall-chasing starts.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "gde-pokupaem-materialy",
      categorySlug: "materialy",
      title: L(
        "Где мы покупаем материалы в Ташкенте и на чём не экономим",
        "Toshkentda materiallarni qayerdan olamiz va nimada tejamaymiz",
        "Where we buy materials in Tashkent, and what we never skimp on",
      ),
      excerpt: L(
        "Куйлюк, Урикзор и базы на Сергели: что где дешевле и почему на гидроизоляции и подрозетниках экономить нельзя.",
        "Quyluq, O'rikzor va Sergelidagi bazalar: qayerda nima arzon va nega gidroizolyatsiya va podrozetnikda tejash mumkin emas.",
        "Kuylyuk, Urikzor and the Sergeli yards: what is cheaper where, and why waterproofing and back boxes are not the place to save.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Сыпучие материалы — цемент, штукатурку, гипс — берём на базах в Сергели: там цена ниже рыночной на 10–15%, а разница на квартиру в 60 м² выходит около 3 млн сум.",
              "Sochiluvchan materiallarni — sement, suvoq, gipsni — Sergelidagi bazalardan olamiz: u yerda narx bozordan 10–15% past, 60 m² kvartira uchun farq taxminan 3 mln so'mni tashkil qiladi.",
              "Bulk materials — cement, plaster, gypsum — we buy at the Sergeli yards: prices there are 10–15% below market, which works out around 3 million UZS on a 60 m² flat.",
            ),
            L(
              "Плитку и сантехнику лучше смотреть на Куйлюке, но ехать туда в будний день до полудня: в выходные разбирают ходовые позиции, и приходится ждать поставку неделю.",
              "Plitka va santexnikani Quyluqdan ko'rgan ma'qul, lekin u yerga ish kuni tushgacha borish kerak: dam olish kunlari ommabop mahsulotlar tugab qoladi va yetkazib berishni bir hafta kutishga to'g'ri keladi.",
              "For tiles and bathroom fittings, go to Kuylyuk — but on a weekday before noon: at weekends the popular items sell out and you end up waiting a week for delivery.",
            ),
            L(
              "Не экономим на двух вещах: гидроизоляция санузла и подрозетники. Первое переделывается только со вскрытием пола у соседей, второе горит через три года и тянет за собой всю стену.",
              "Ikki narsada tejamaymiz: hammom gidroizolyatsiyasi va podrozetniklar. Birinchisini faqat qo'shnilarning polini ochib qayta qilish mumkin, ikkinchisi uch yildan keyin kuyadi va butun devorni buzishga olib keladi.",
              "We never cut corners on two things: bathroom waterproofing and electrical back boxes. Redoing the first means opening up the neighbours' ceiling; the second burns out in three years and takes a whole wall with it.",
            ),
          ),
        ),
      ],
    },
  ],
};
