import { B, L, paragraphs, type SiteTemplate } from "./types";

/**
 * «Тартиб» — digital-студия в Юнусабадском районе Ташкента: брендинг,
 * сайты и коммуникационные кампании.
 */
export const agencyTemplate: SiteTemplate = {
  key: "agency",
  label: L("Агентство и портфолио", "Agentlik va portfolio", "Agency and portfolio"),
  profile: L(
    "Студия «Тартиб», Юнусабадский район",
    "«Tartib» studiyasi, Yunusobod tumani",
    "Tartib studio, Yunusabad district",
  ),
  description: L(
    "Витрина работ, услуги с ценами, команда и брифинг-форма — для студий, бюро и фрилансеров.",
    "Ishlar vitrinasi, narxlari bilan xizmatlar, jamoa va brif shakli — studiyalar, byurolar va frilanserlar uchun.",
    "A work showcase, priced services, the team and a briefing form — for studios, bureaus and freelancers.",
  ),
  themeKey: "agency",
  design: { skin: "poster", fontDisplay: "Oswald", fontBody: "Inter", radiusScale: "none" },

  settings: {
    siteName: L("Тартиб", "Tartib", "Tartib"),
    tagline: L(
      "Дизайн-студия в Ташкенте",
      "Toshkentdagi dizayn studiyasi",
      "A design studio in Tashkent",
    ),
    contactEmail: "studio@tartib.uz",
    contactPhone: "+998 90 178 32 04",
    contactAddress: L(
      "Ташкент, Юнусабадский район, ул. Амира Темура, 108, 5 этаж",
      "Toshkent, Yunusobod tumani, Amir Temur ko'chasi, 108, 5-qavat",
      "Tashkent, Yunusabad district, 108 Amir Temur street, 5th floor",
    ),
    footerNote: L(
      "© Студия «Тартиб», Ташкент. Работаем по договору и по предоплате 50%.",
      "© «Tartib» studiyasi, Toshkent. Shartnoma asosida va 50% oldindan to'lov bilan ishlaymiz.",
      "© Tartib studio, Tashkent. We work by contract with a 50% deposit.",
    ),
  },

  categories: [
    {
      slug: "works",
      order: 1,
      name: L("Работы", "Ishlar", "Work"),
      description: L(
        "Разборы проектов: задача, решение, результат.",
        "Loyihalar tahlili: vazifa, yechim, natija.",
        "Project breakdowns: the brief, the solution, the outcome.",
      ),
    },
    {
      slug: "process",
      order: 2,
      name: L("Процесс", "Jarayon", "Process"),
      description: L(
        "Как мы работаем изнутри — от брифа до сдачи.",
        "Ichkaridan qanday ishlaymiz — brifdan topshirishgacha.",
        "How we work from the inside — brief to handover.",
      ),
    },
    {
      slug: "studio",
      order: 3,
      name: L("Студия", "Studiya", "Studio"),
      description: L(
        "Новости команды, вакансии, выступления.",
        "Jamoa yangiliklari, vakansiyalar, chiqishlar.",
        "Team news, openings and talks.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "work", order: 1, label: L("Работы", "Ishlar", "Work") },
    { location: "header", linkType: "page", target: "services", order: 2, label: L("Услуги", "Xizmatlar", "Services") },
    { location: "header", linkType: "page", target: "studio", order: 3, label: L("Студия", "Studiya", "Studio") },
    { location: "header", linkType: "category", target: "works", order: 4, label: L("Блог", "Blog", "Blog") },
    { location: "header", linkType: "page", target: "brief", order: 5, label: L("Бриф", "Brif", "Brief") },
    { location: "footer", linkType: "page", target: "services", order: 1, label: L("Услуги", "Xizmatlar", "Services") },
    { location: "footer", linkType: "page", target: "brief", order: 2, label: L("Оставить заявку", "Ariza qoldirish", "Start a project") },
  ],

  pages: [
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Студия «Тартиб»: брендинг, сайты и кампании для компаний Узбекистана.",
        "«Tartib» studiyasi: O'zbekiston kompaniyalari uchun brending, saytlar va kampaniyalar.",
        "Tartib studio: branding, websites and campaigns for companies in Uzbekistan.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Порядок вместо красивых картинок",
            "Chiroyli rasmlar o'rniga tartib",
            "Order, not just pretty pictures",
          ),
          subheading: L(
            "Брендинг, сайты и коммуникации для компаний, которые растут быстрее, чем успевают оформить это словами.",
            "O'zini so'z bilan ifodalashga ulgurmay o'sayotgan kompaniyalar uchun brending, saytlar va kommunikatsiya.",
            "Branding, websites and communications for companies growing faster than they can put into words.",
          ),
          ctaLabel: L("Смотреть работы", "Ishlarni ko'rish", "See the work"),
          ctaLink: "/work",
          variant: "fullBleed",
          overlayOpacity: 0.5,
        }),

        B.gallery(
          "works",
          [
            L(
              "Айдентика сети пекарен «Зерно»",
              "«Zerno» nonvoyxonalar tarmog'i identikasi",
              "Identity for the Zerno bakery chain",
            ),
            L(
              "Сайт и брендбук для «Ориент Консалт»",
              "«Orient Konsalt» uchun sayt va brendbuk",
              "Website and brand book for Orient Consult",
            ),
            L(
              "Упаковка линии ухода Anor",
              "Anor parvarish liniyasi qadog'i",
              "Packaging for the Anor skincare line",
            ),
            L(
              "Навигация в ТРЦ на Чиланзаре",
              "Chilonzordagi savdo markazi navigatsiyasi",
              "Wayfinding for a mall in Chilanzar",
            ),
            L(
              "Кампания для фестиваля «Тошкент овози»",
              "«Toshkent ovozi» festivali kampaniyasi",
              "Campaign for the Toshkent Ovozi festival",
            ),
            L(
              "Интерфейс приложения доставки Yetkaz",
              "Yetkaz yetkazib berish ilovasi interfeysi",
              "Interface for the Yetkaz delivery app",
            ),
          ],
          3,
        ),

        B.features(
          "services",
          L("Что мы делаем", "Nima qilamiz", "What we do"),
          [
            {
              icon: "spark",
              title: L("Брендинг", "Brending", "Branding"),
              body: L(
                "Позиционирование, название, знак, система носителей и правила — в одном брендбуке.",
                "Pozitsiyalash, nom, belgi, tashuvchilar tizimi va qoidalar — bitta brendbukda.",
                "Positioning, naming, mark, a system of applications and rules — in one brand book.",
              ),
            },
            {
              icon: "globe",
              title: L("Сайты", "Saytlar", "Websites"),
              body: L(
                "Проектирование, дизайн и вёрстка. Многоязычные сайты — наша обычная задача, а не исключение.",
                "Loyihalash, dizayn va verstka. Ko'p tilli saytlar — biz uchun odatiy vazifa, istisno emas.",
                "Structure, design and build. Multilingual sites are routine for us, not an exception.",
              ),
            },
            {
              icon: "message",
              title: L("Кампании", "Kampaniyalar", "Campaigns"),
              body: L(
                "Идея, ключевой визуал, адаптации под наружку, соцсети и видео.",
                "G'oya, asosiy vizual, tashqi reklama, ijtimoiy tarmoqlar va video uchun moslashtirishlar.",
                "The idea, a key visual, and adaptations for outdoor, social and video.",
              ),
            },
          ],
        ),

        B.stats("stats", [
          { value: L("48", "48", "48"), label: L("Проектов с 2018 года", "2018-yildan beri loyihalar", "Projects since 2018") },
          { value: L("9", "9", "9"), label: L("Человек в студии", "Studiyada odam", "People in the studio") },
          { value: L("3", "3", "3"), label: L("Языка в каждом проекте", "Har loyihada til", "Languages in every project") },
          { value: L("6", "6", "6"), label: L("Недель — средний проект", "Hafta — o'rtacha loyiha", "Weeks for a typical project") },
        ]),

        B.testimonials(
          "testimonials",
          L("Клиенты", "Mijozlar", "Clients"),
          [
            {
              quote: L(
                "Пришли за логотипом, ушли с полностью переписанным позиционированием. Оказалось, проблема была не в знаке.",
                "Logotip uchun keldik, butunlay qayta yozilgan pozitsiyalash bilan ketdik. Muammo belgida emas ekan.",
                "We came for a logo and left with our positioning rewritten. It turned out the mark was not the problem.",
              ),
              authorName: L("Дилшод Раимов", "Dilshod Raimov", "Dilshod Raimov"),
              authorRole: L("Основатель, сеть пекарен", "Asoschi, nonvoyxonalar tarmog'i", "Founder, bakery chain"),
            },
            {
              quote: L(
                "Единственная студия, которая сама предложила делать сайт сразу на трёх языках и заложила это в структуру.",
                "Saytni darrov uch tilda qilishni o'zi taklif qilgan va buni tuzilmaga kiritgan yagona studiya.",
                "The only studio that proposed a trilingual site up front and built the structure around it.",
              ),
              authorName: L("Наргиза Тураева", "Nargiza Turayeva", "Nargiza Turaeva"),
              authorRole: L("Маркетинг-директор, консалтинг", "Marketing direktori, konsalting", "Marketing director, consulting"),
            },
          ],
        ),

        B.cta("cta", {
          heading: L("Расскажите о проекте", "Loyiha haqida gapiring", "Tell us about your project"),
          body: L(
            "Заполните бриф — вернёмся с оценкой сроков и бюджета в течение двух рабочих дней.",
            "Brifni to'ldiring — ikki ish kuni ichida muddat va byudjet bahosi bilan qaytamiz.",
            "Fill in the brief and we will come back with a timeline and budget within two working days.",
          ),
          buttonLabel: L("Заполнить бриф", "Brifni to'ldirish", "Fill in the brief"),
          buttonLink: "/brief",
        }),
      ],
    },

    {
      slug: "work",
      title: L("Работы", "Ishlar", "Work"),
      metaDesc: L(
        "Портфолио студии «Тартиб»: брендинг, сайты, упаковка и навигация.",
        "«Tartib» studiyasi portfoliosi: brending, saytlar, qadoqlash va navigatsiya.",
        "The Tartib studio portfolio: branding, websites, packaging and wayfinding.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Избранные проекты", "Tanlangan loyihalar", "Selected projects"),
          subheading: L(
            "Двенадцать работ, по которым видно, как мы думаем.",
            "Qanday fikrlashimiz ko'rinadigan o'n ikkita ish.",
            "Twelve projects that show how we think.",
          ),
          variant: "centered",
        }),

        B.gallery(
          "grid",
          [
            L("«Зерно» — айдентика", "«Zerno» — identika", "Zerno — identity"),
            L("«Ориент Консалт» — сайт", "«Orient Konsalt» — sayt", "Orient Consult — website"),
            L("Anor — упаковка", "Anor — qadoqlash", "Anor — packaging"),
            L("ТРЦ на Чиланзаре — навигация", "Chilonzordagi savdo markazi — navigatsiya", "Chilanzar mall — wayfinding"),
            L("«Тошкент овози» — кампания", "«Toshkent ovozi» — kampaniya", "Toshkent Ovozi — campaign"),
            L("Yetkaz — интерфейс", "Yetkaz — interfeys", "Yetkaz — interface"),
            L("«Мехр» — фирменный стиль клиники", "«Mehr» — klinika uslubi", "Mehr — clinic identity"),
            L("Sharq Bank — годовой отчёт", "Sharq Bank — yillik hisobot", "Sharq Bank — annual report"),
            L("«Наврўз» — плакаты фестиваля", "«Navro'z» — festival plakatlari", "Navro'z — festival posters"),
          ],
          3,
        ),

        B.imageText("case", {
          heading: L(
            "Как выглядит проект изнутри",
            "Loyiha ichkaridan qanday ko'rinadi",
            "What a project looks like from the inside",
          ),
          body: paragraphs(
            L(
              "Для сети пекарен «Зерно» мы начали не с логотипа, а с двух недель на точках: считали поток, слушали, как гости называют позиции, фотографировали витрину в разное время дня.",
              "«Zerno» nonvoyxonalar tarmog'i uchun logotipdan emas, nuqtalarda o'tkazilgan ikki haftadan boshladik: oqimni sanadik, mehmonlar taomlarni qanday atashini tingladik, vitrinani kunning turli vaqtlarida suratga oldik.",
              "For the Zerno bakery chain we did not start with a logo but with two weeks in the shops: counting footfall, listening to what guests called things, photographing the counter at different hours.",
            ),
            L(
              "Выяснилось, что половина гостей не знала, что выпечка своя. Так появился главный носитель бренда — открытая пекарня за стеклом и надпись «печём с 5 утра» на каждой упаковке.",
              "Ma'lum bo'ldiki, mehmonlarning yarmi non o'zlariniki ekanini bilmagan. Shunday qilib brendning asosiy tashuvchisi paydo bo'ldi — oyna ortidagi ochiq nonvoyxona va har bir qadoqdagi «soat 5 dan yopamiz» yozuvi.",
              "It turned out half the guests did not know the baking was done in-house. That produced the main brand carrier: an open bakery behind glass and a 'baked from 5 am' line on every package.",
            ),
          ),
          imageSide: "left",
        }),
      ],
    },

    {
      slug: "services",
      title: L("Услуги", "Xizmatlar", "Services"),
      metaDesc: L(
        "Стоимость брендинга, сайтов и кампаний в студии «Тартиб».",
        "«Tartib» studiyasida brending, saytlar va kampaniyalar narxi.",
        "What branding, websites and campaigns cost at Tartib studio.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Услуги и стоимость", "Xizmatlar va narxlar", "Services and pricing"),
          subheading: L(
            "Цены ориентировочные: точная смета — после брифа и созвона.",
            "Narxlar taxminiy: aniq smeta — brif va suhbatdan keyin.",
            "These are guide prices; the exact quote follows the brief and a call.",
          ),
          variant: "centered",
        }),

        B.pricing("plans", L("Форматы", "Formatlar", "Formats"), [
          {
            name: L("Айдентика", "Identika", "Identity"),
            price: L("от 28 млн", "28 mln dan", "from 28m"),
            period: L("сум, 4–6 недель", "so'm, 4–6 hafta", "soum, 4–6 weeks"),
            features: [
              L("Исследование и позиционирование", "Tadqiqot va pozitsiyalash", "Research and positioning"),
              L("Знак и логотип", "Belgi va logotip", "Mark and logotype"),
              L("Шрифты, цвета, сетка", "Shriftlar, ranglar, to'r", "Type, colour, grid"),
              L("Брендбук на трёх языках", "Uch tilda brendbuk", "Brand book in three languages"),
            ],
            ctaLabel: L("Обсудить", "Muhokama qilish", "Discuss"),
            ctaLink: "/brief",
          },
          {
            name: L("Сайт", "Sayt", "Website"),
            price: L("от 42 млн", "42 mln dan", "from 42m"),
            period: L("сум, 6–10 недель", "so'm, 6–10 hafta", "soum, 6–10 weeks"),
            features: [
              L("Структура и прототипы", "Tuzilma va prototiplar", "Structure and prototypes"),
              L("Дизайн всех состояний", "Barcha holatlar dizayni", "Design for every state"),
              L("Вёрстка и подключение к CMS", "Verstka va CMS ga ulash", "Build and CMS integration"),
              L("Три языка и SEO-базис", "Uch til va SEO asosi", "Three languages and SEO basics"),
            ],
            highlighted: true,
            ctaLabel: L("Обсудить", "Muhokama qilish", "Discuss"),
            ctaLink: "/brief",
          },
          {
            name: L("Кампания", "Kampaniya", "Campaign"),
            price: L("от 18 млн", "18 mln dan", "from 18m"),
            period: L("сум, 3–5 недель", "so'm, 3–5 hafta", "soum, 3–5 weeks"),
            features: [
              L("Идея и ключевой визуал", "G'oya va asosiy vizual", "Idea and key visual"),
              L("Адаптации под наружку", "Tashqi reklamaga moslashtirish", "Outdoor adaptations"),
              L("Макеты для соцсетей", "Ijtimoiy tarmoqlar uchun maketlar", "Social media layouts"),
            ],
            ctaLabel: L("Обсудить", "Muhokama qilish", "Discuss"),
            ctaLink: "/brief",
          },
        ]),

        B.faq("faq", L("Как мы работаем", "Qanday ishlaymiz", "How we work"), [
          {
            question: L("Сколько правок входит в стоимость?", "Narxga nechta tuzatish kiradi?", "How many revision rounds are included?"),
            answer: L(
              "<p>Три круга правок на каждом этапе. Четвёртый и далее считаем по часовой ставке — это оговорено в договоре.</p>",
              "<p>Har bosqichda uch aylanma tuzatish. To'rtinchi va undan keyingilari soatbay hisoblanadi — bu shartnomada ko'rsatilgan.</p>",
              "<p>Three rounds at each stage. From the fourth round on we bill hourly, as set out in the contract.</p>",
            ),
          },
          {
            question: L("Кому принадлежат права?", "Huquqlar kimga tegishli?", "Who owns the rights?"),
            answer: L(
              "<p>Вам — после полной оплаты. Исходники передаём в открытых форматах, без привязки к нашей студии.</p>",
              "<p>To'liq to'lovdan keyin — sizga. Manbalarni ochiq formatlarda, studiyamizga bog'lamasdan topshiramiz.</p>",
              "<p>You do, after final payment. We hand over source files in open formats with no lock-in to our studio.</p>",
            ),
          },
          {
            question: L("Работаете ли по подписке?", "Obuna asosida ishlaysizmi?", "Do you work on retainer?"),
            answer: L(
              "<p>Да, для постоянных клиентов: фиксированное число часов в месяц на макеты, доработки и консультации.</p>",
              "<p>Ha, doimiy mijozlar uchun: maketlar, o'zgartirishlar va maslahatlar uchun oyiga belgilangan soatlar.</p>",
              "<p>Yes, for ongoing clients: a fixed number of hours per month for layouts, tweaks and advice.</p>",
            ),
          },
        ]),
      ],
    },

    {
      slug: "studio",
      title: L("Студия", "Studiya", "Studio"),
      metaDesc: L(
        "Команда студии «Тартиб» и принципы, по которым мы беремся за проекты.",
        "«Tartib» studiyasi jamoasi va loyihalarni qabul qilish tamoyillari.",
        "The Tartib team and the principles behind the projects we take on.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Девять человек на пятом этаже", "Beshinchi qavatdagi to'qqiz kishi", "Nine people on the fifth floor"),
          subheading: L(
            "Собрались в 2018 году, чтобы не объяснять клиентам, почему «просто перекрасить логотип» не работает.",
            "2018-yilda mijozlarga «logotipni shunchaki qayta bo'yash» nega ishlamasligini tushuntirmaslik uchun yig'ildik.",
            "We got together in 2018 so we would stop having to explain why 'just recolour the logo' does not work.",
          ),
          variant: "centered",
        }),

        B.team("team", L("Команда", "Jamoa", "The team"), [
          {
            name: L("Комил Юсупов", "Komil Yusupov", "Komil Yusupov"),
            role: L("Арт-директор", "Art-direktor", "Art director"),
            bio: L(
              "Собрал студию, ведёт брендинговые проекты. До этого восемь лет в рекламе.",
              "Studiyani yig'gan, brending loyihalarini boshqaradi. Undan oldin sakkiz yil reklamada.",
              "Founded the studio and leads branding projects. Eight years in advertising before that.",
            ),
          },
          {
            name: L("Севара Ниязова", "Sevara Niyozova", "Sevara Niyazova"),
            role: L("Дизайн-директор", "Dizayn direktori", "Design director"),
            bio: L(
              "Отвечает за интерфейсы и типографику. Ведёт курс по многоязычной вёрстке.",
              "Interfeys va tipografika uchun javob beradi. Ko'p tilli verstka bo'yicha kurs olib boradi.",
              "Owns interfaces and typography. Teaches a course on multilingual typesetting.",
            ),
          },
          {
            name: L("Бекзод Умаров", "Bekzod Umarov", "Bekzod Umarov"),
            role: L("Продюсер", "Prodyuser", "Producer"),
            bio: L(
              "Держит сроки и бюджеты, общается с подрядчиками и типографиями.",
              "Muddat va byudjetlarni ushlab turadi, pudratchilar va bosmaxonalar bilan ishlaydi.",
              "Keeps deadlines and budgets, and deals with contractors and printers.",
            ),
          },
          {
            name: L("Малика Юлдашева", "Malika Yo'ldasheva", "Malika Yuldasheva"),
            role: L("Копирайтер", "Kopirayter", "Copywriter"),
            bio: L(
              "Пишет на русском, узбекском и английском. Отвечает за то, чтобы три версии текста говорили одно и то же.",
              "Rus, o'zbek va ingliz tillarida yozadi. Matnning uch versiyasi bir xil ma'no berishiga javob beradi.",
              "Writes in Russian, Uzbek and English, and makes sure all three versions say the same thing.",
            ),
          },
        ]),

        B.cta("cta", {
          heading: L("Ищем младшего дизайнера", "Kichik dizayner izlaymiz", "We are hiring a junior designer"),
          body: L(
            "Полный день, офис на Амира Темура, портфолио важнее диплома.",
            "To'liq kun, Amir Temur ko'chasidagi ofis, portfolio diplomdan muhimroq.",
            "Full time, office on Amir Temur street. Portfolio matters more than a diploma.",
          ),
          buttonLabel: L("Отправить портфолио", "Portfolio yuborish", "Send your portfolio"),
          buttonLink: "/brief",
          style: "outline",
        }),
      ],
    },

    {
      slug: "brief",
      title: L("Бриф", "Brif", "Brief"),
      metaDesc: L(
        "Заполните бриф студии «Тартиб» — ответим с оценкой сроков и бюджета за два дня.",
        "«Tartib» studiyasi brifini to'ldiring — ikki kunda muddat va byudjet bahosi bilan javob beramiz.",
        "Fill in the Tartib brief — we reply with a timeline and budget within two days.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Расскажите о задаче", "Vazifa haqida gapiring", "Tell us about the task"),
          subheading: L(
            "Чем подробнее бриф, тем точнее оценка. Если проще позвонить — +998 90 178 32 04.",
            "Brif qanchalik batafsil bo'lsa, baho shunchalik aniq. Qo'ng'iroq qilish oson bo'lsa — +998 90 178 32 04.",
            "The more detail in the brief, the sharper the estimate. Prefer to call? +998 90 178 32 04.",
          ),
          variant: "centered",
        }),

        B.contactForm("form", {
          heading: L("Бриф на проект", "Loyiha brifi", "Project brief"),
          submitLabel: L("Отправить бриф", "Brifni yuborish", "Send the brief"),
          successMessage: L(
            "Бриф получен. Вернёмся с вопросами и оценкой в течение двух рабочих дней.",
            "Brif qabul qilindi. Ikki ish kuni ichida savollar va baho bilan qaytamiz.",
            "Brief received. We will come back with questions and an estimate within two working days.",
          ),
          fields: [
            { type: "text", label: L("Имя", "Ism", "Name") },
            { type: "text", label: L("Компания", "Kompaniya", "Company") },
            { type: "email", label: L("Email", "Email", "Email") },
            { type: "tel", label: L("Телефон или Telegram", "Telefon yoki Telegram", "Phone or Telegram") },
            { type: "textarea", label: L("Задача, сроки и ориентир по бюджету", "Vazifa, muddat va byudjet mo'ljali", "The task, timeline and budget range") },
          ],
        }),
      ],
    },
  ],

  posts: [
    {
      slug: "zerno-identity",
      categorySlug: "works",
      title: L(
        "«Зерно»: как открытая пекарня стала логотипом",
        "«Zerno»: ochiq nonvoyxona qanday logotipga aylandi",
        "Zerno: how an open bakery became the logo",
      ),
      excerpt: L(
        "Разбор проекта: две недели наблюдений в точках, одно наблюдение и айдентика, которая держится на нём.",
        "Loyiha tahlili: nuqtalarda ikki hafta kuzatuv, bitta kuzatuv va shunga tayangan identika.",
        "A project breakdown: two weeks of observation, one insight, and an identity built on it.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Клиент пришёл с запросом «обновить логотип, он устарел». Мы попросили две недели на наблюдение до начала эскизов — и это оказалось важнее самих эскизов.",
                "Mijoz «logotipni yangilash kerak, u eskirgan» so'rovi bilan keldi. Eskizlardan oldin ikki haftalik kuzatuv so'radik — bu eskizlardan ham muhimroq bo'lib chiqdi.",
                "The client came in asking to 'refresh the logo, it looks dated'. We asked for two weeks of observation before sketching — and that mattered more than the sketches.",
              ),
              L(
                "Главная находка: гости не связывали кафе с собственной выпечкой. Вся система строится вокруг этого — от вывески до стикера на пакете.",
                "Asosiy topilma: mehmonlar kafeni o'z noni bilan bog'lamagan. Butun tizim shu atrofida quriladi — peshtaxtadan paket stikerigacha.",
                "The key finding: guests did not connect the cafe with its own baking. The whole system is built around that, from the sign to the sticker on the bag.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "tri-yazyka-v-verstke",
      categorySlug: "process",
      title: L(
        "Три языка в вёрстке: что ломается чаще всего",
        "Verstkada uch til: nima ko'pincha buziladi",
        "Three languages in one layout: what usually breaks",
      ),
      excerpt: L(
        "Узбекский текст в среднем на 15% длиннее русского, английский — короче. Как проектировать так, чтобы это не разваливало макет.",
        "O'zbekcha matn o'rtacha ruschadan 15% uzunroq, inglizcha — qisqaroq. Maketni buzmaslik uchun qanday loyihalash kerak.",
        "Uzbek text runs about 15% longer than Russian, English shorter. How to design so that does not wreck the layout.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Самое частое — кнопки. «Подробнее» помещается, «Batafsil ma'lumot» уже нет, и дизайнер начинает подгонять размер шрифта под язык. Правильный ответ — резиновая кнопка с внутренними отступами, а не фиксированной шириной.",
                "Eng ko'p uchraydigani — tugmalar. «Подробнее» sig'adi, «Batafsil ma'lumot» endi sig'maydi va dizayner shrift o'lchamini tilga moslay boshlaydi. To'g'ri javob — belgilangan kenglik emas, ichki bo'shliqli cho'ziluvchan tugma.",
                "Buttons break first. 'More' fits, 'Batafsil ma'lumot' does not, and the designer starts tuning font size per language. The right answer is a fluid button with padding, not a fixed width.",
              ),
              L(
                "Второе — заголовки в две строки. Мы всегда проверяем макет на самом длинном из трёх вариантов, а не на том, с которого начали.",
                "Ikkinchisi — ikki qatorli sarlavhalar. Maketni doim boshlagan variantda emas, uchtasining eng uzunida tekshiramiz.",
                "Second: two-line headings. We always test the layout against the longest of the three versions, not the one we started from.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "ishem-dizaynera",
      categorySlug: "studio",
      title: L(
        "Открыта вакансия младшего дизайнера",
        "Kichik dizayner vakansiyasi ochiq",
        "Junior designer position open",
      ),
      excerpt: L(
        "Ищем человека в графическую группу: макеты, адаптации, подготовка к печати. Опыт от года, портфолио обязательно.",
        "Grafik guruhga odam izlaymiz: maketlar, moslashtirishlar, bosmaga tayyorlash. Tajriba bir yildan, portfolio shart.",
        "We are looking for someone for the graphics group: layouts, adaptations, print prep. One year of experience, portfolio required.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Полный день, офис на Амира Темура, 108. Первый месяц — испытательный, с наставником из графической группы.",
                "To'liq kun, Amir Temur ko'chasi 108-uydagi ofis. Birinchi oy — sinov muddati, grafik guruhdan murabbiy bilan.",
                "Full time, office at 108 Amir Temur street. The first month is a trial period with a mentor from the graphics group.",
              ),
              L(
                "Присылайте портфолио через форму брифа — в поле задачи напишите «вакансия».",
                "Portfolioni brif shakli orqali yuboring — vazifa maydoniga «vakansiya» deb yozing.",
                "Send your portfolio through the brief form and write 'vacancy' in the task field.",
              ),
            ),
          },
        },
      ],
    },
  ],
};
