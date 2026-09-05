import { B, L, paragraphs, type SiteTemplate } from "./types";

/**
 * «Ориент Консалт» — консалтинговая компания в Ташкенте (Ц-5, Мирзо-Улугбекский
 * район): финансовый и налоговый консалтинг, сопровождение выхода на рынок.
 */
export const corporateTemplate: SiteTemplate = {
  key: "corporate",
  label: L("Корпоративный сайт", "Korporativ sayt", "Corporate site"),
  profile: L(
    "«Ориент Консалт», Ц-5, Мирзо-Улугбекский район",
    "«Orient Konsalt», C-5, Mirzo Ulug'bek tumani",
    "Orient Consult, C-5, Mirzo Ulugbek district",
  ),
  description: L(
    "Строгая структура: услуги, отрасли, команда, кейсы и форма запроса коммерческого предложения.",
    "Qat'iy tuzilma: xizmatlar, tarmoqlar, jamoa, keyslar va tijorat taklifi so'rovi shakli.",
    "A formal structure: services, industries, team, case studies and a proposal request form.",
  ),
  themeKey: "business",
  design: { skin: "ledger", fontDisplay: "Manrope", fontBody: "IBM Plex Sans", radiusScale: "sm" },

  settings: {
    siteName: L("Ориент Консалт", "Orient Konsalt", "Orient Consult"),
    tagline: L(
      "Финансовый и налоговый консалтинг в Узбекистане",
      "O'zbekistonda moliyaviy va soliq konsaltingi",
      "Financial and tax consulting in Uzbekistan",
    ),
    contactEmail: "office@orientconsult.uz",
    contactPhone: "+998 71 200 45 12",
    contactAddress: L(
      "Ташкент, Мирзо-Улугбекский район, массив Ц-5, дом 41, офис 302",
      "Toshkent, Mirzo Ulug'bek tumani, C-5 mavzesi, 41-uy, 302-ofis",
      "Tashkent, Mirzo Ulugbek district, C-5, building 41, office 302",
    ),
    footerNote: L(
      "© Ориент Консалт, Ташкент. Лицензия аудиторской деятельности №01248.",
      "© Orient Konsalt, Toshkent. Audit faoliyati litsenziyasi №01248.",
      "© Orient Consult, Tashkent. Audit licence No. 01248.",
    ),
  },

  categories: [
    {
      slug: "insights",
      order: 1,
      name: L("Аналитика", "Tahlil", "Insights"),
      description: L(
        "Разборы изменений в законодательстве и практике их применения.",
        "Qonunchilikdagi o'zgarishlar va ularni qo'llash amaliyoti tahlili.",
        "Analysis of regulatory changes and how they play out in practice.",
      ),
    },
    {
      slug: "cases",
      order: 2,
      name: L("Кейсы", "Keyslar", "Case studies"),
      description: L(
        "Как мы решали конкретные задачи клиентов.",
        "Mijozlarning aniq vazifalarini qanday hal qilganimiz.",
        "How we solved specific client problems.",
      ),
    },
    {
      slug: "company",
      order: 3,
      name: L("О компании", "Kompaniya haqida", "Company news"),
      description: L(
        "Назначения, партнёрства, участие в конференциях.",
        "Tayinlovlar, hamkorliklar, konferensiyalarda ishtirok.",
        "Appointments, partnerships and conference appearances.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "services", order: 1, label: L("Услуги", "Xizmatlar", "Services") },
    { location: "header", linkType: "page", target: "industries", order: 2, label: L("Отрасли", "Tarmoqlar", "Industries") },
    { location: "header", linkType: "page", target: "about", order: 3, label: L("О компании", "Kompaniya haqida", "About") },
    { location: "header", linkType: "category", target: "insights", order: 4, label: L("Аналитика", "Tahlil", "Insights") },
    { location: "header", linkType: "page", target: "contacts", order: 5, label: L("Контакты", "Kontaktlar", "Contacts") },
    { location: "footer", linkType: "page", target: "services", order: 1, label: L("Услуги", "Xizmatlar", "Services") },
    { location: "footer", linkType: "category", target: "cases", order: 2, label: L("Кейсы", "Keyslar", "Case studies") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Ориент Консалт: налоговый и финансовый консалтинг, аудит и сопровождение выхода на рынок Узбекистана.",
        "Orient Konsalt: soliq va moliya konsaltingi, audit hamda O'zbekiston bozoriga chiqishni qo'llab-quvvatlash.",
        "Orient Consult: tax and financial consulting, audit and market-entry support in Uzbekistan.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Считаем налоги так, чтобы к ним не было вопросов",
            "Soliqlarni savol tug'dirmaydigan qilib hisoblaymiz",
            "We handle taxes so that no one has questions later",
          ),
          subheading: L(
            "Консалтинговая компания в Ташкенте: налоги, финансовая отчётность, аудит и сопровождение сделок. Работаем с 2011 года.",
            "Toshkentdagi konsalting kompaniyasi: soliqlar, moliyaviy hisobot, audit va bitimlarni qo'llab-quvvatlash. 2011-yildan beri ishlaymiz.",
            "A consulting firm in Tashkent: tax, financial reporting, audit and transaction support. Operating since 2011.",
          ),
          ctaLabel: L("Запросить предложение", "Taklif so'rash", "Request a proposal"),
          ctaLink: "/contacts",
          variant: "split",
        }),

        B.stats("stats", [
          { value: L("14", "14", "14"), label: L("Лет на рынке", "Yildan beri bozorda", "Years in the market") },
          { value: L("220+", "220+", "220+"), label: L("Клиентов в Узбекистане", "O'zbekistondagi mijozlar", "Clients in Uzbekistan") },
          { value: L("31", "31", "31"), label: L("Специалистов в штате", "Shtatdagi mutaxassislar", "Specialists on staff") },
          { value: L("9", "9", "9"), label: L("Отраслевых практик", "Tarmoq amaliyotlari", "Industry practices") },
        ]),

        B.features(
          "services",
          L("Основные услуги", "Asosiy xizmatlar", "Core services"),
          [
            {
              icon: "spark",
              title: L("Налоговый консалтинг", "Soliq konsaltingi", "Tax consulting"),
              body: L(
                "Оптимизация налоговой нагрузки в рамках Налогового кодекса, подготовка к проверкам, сопровождение споров.",
                "Soliq kodeksi doirasida soliq yukini optimallashtirish, tekshiruvlarga tayyorgarlik, nizolarni qo'llab-quvvatlash.",
                "Reducing the tax burden within the Tax Code, preparing for inspections and supporting disputes.",
              ),
            },
            {
              icon: "globe",
              title: L("Финансовая отчётность", "Moliyaviy hisobot", "Financial reporting"),
              body: L(
                "Переход на МСФО, трансформация отчётности, постановка управленческого учёта с нуля.",
                "XMHS ga o'tish, hisobotni transformatsiya qilish, boshqaruv hisobini noldan yo'lga qo'yish.",
                "IFRS transition, statement transformation and building management accounting from scratch.",
              ),
            },
            {
              icon: "message",
              title: L("Выход на рынок", "Bozorga chiqish", "Market entry"),
              body: L(
                "Регистрация юрлица, выбор налогового режима, подбор бухгалтерии и первые полгода сопровождения.",
                "Yuridik shaxsni ro'yxatdan o'tkazish, soliq rejimini tanlash, buxgalteriyani tanlash va birinchi olti oy kuzatuv.",
                "Company registration, choosing a tax regime, hiring accounting staff and six months of hand-holding.",
              ),
            },
            {
              icon: "spark",
              title: L("Аудит", "Audit", "Audit"),
              body: L(
                "Обязательный и инициативный аудит по национальным стандартам и МСА.",
                "Milliy standartlar va XAS bo'yicha majburiy hamda tashabbuskor audit.",
                "Statutory and voluntary audits under national standards and ISA.",
              ),
            },
            {
              icon: "globe",
              title: L("Due diligence", "Due diligence", "Due diligence"),
              body: L(
                "Финансовая и налоговая проверка перед покупкой доли или бизнеса целиком.",
                "Ulush yoki butun biznesni sotib olishdan oldin moliyaviy va soliq tekshiruvi.",
                "Financial and tax review before buying a stake or an entire business.",
              ),
            },
            {
              icon: "message",
              title: L("Обучение бухгалтерии", "Buxgalteriyani o'qitish", "Accounting training"),
              body: L(
                "Корпоративные семинары по изменениям в НК и практике их применения.",
                "Soliq kodeksidagi o'zgarishlar va ularni qo'llash bo'yicha korporativ seminarlar.",
                "In-house seminars on Tax Code changes and how they are applied in practice.",
              ),
            },
          ],
        ),

        B.imageText("approach", {
          heading: L(
            "Сначала считаем, потом обещаем",
            "Avval hisoblaymiz, keyin va'da beramiz",
            "We calculate first and promise second",
          ),
          body: paragraphs(
            L(
              "Любую задачу начинаем с двухнедельной диагностики: смотрим учёт, договоры и отчётность за два последних года.",
              "Har qanday vazifani ikki haftalik diagnostikadan boshlaymiz: so'nggi ikki yildagi hisob, shartnomalar va hisobotni ko'rib chiqamiz.",
              "Every engagement starts with a two-week diagnostic: we review the books, contracts and reporting for the last two years.",
            ),
            L(
              "По результатам вы получаете отчёт с конкретными суммами рисков и сроками — и только после этого решаете, работать ли дальше.",
              "Natijada aniq risk summalari va muddatlari ko'rsatilgan hisobotni olasiz — shundan keyingina davom etishni hal qilasiz.",
              "You receive a report with specific risk amounts and deadlines — and only then decide whether to continue.",
            ),
          ),
          ctaLabel: L("Подробнее об услугах", "Xizmatlar haqida batafsil", "More about our services"),
          ctaLink: "/services",
        }),

        B.testimonials(
          "testimonials",
          L("Отзывы клиентов", "Mijozlar fikri", "Client feedback"),
          [
            {
              quote: L(
                "Помогли перевести отчётность на МСФО за пять месяцев — успели к требованию банка по кредитной линии.",
                "Hisobotni besh oyda XMHS ga o'tkazishga yordam berishdi — bankning kredit liniyasi talabiga ulgurdik.",
                "They moved our reporting to IFRS in five months — in time for the bank's credit line requirement.",
              ),
              authorName: L("Отабек Саидов", "Otabek Saidov", "Otabek Saidov"),
              authorRole: L("Финансовый директор, производство упаковки", "Moliya direktori, qadoqlash ishlab chiqarishi", "CFO, packaging manufacturer"),
            },
            {
              quote: L(
                "Заходили на рынок Узбекистана из Алматы. Регистрация, режим налогообложения, первые отчёты — всё вели они.",
                "O'zbekiston bozoriga Olmaotadan kirdik. Ro'yxatdan o'tkazish, soliq rejimi, birinchi hisobotlar — hammasini ular olib bordi.",
                "We entered the Uzbek market from Almaty. Registration, tax regime, first filings — they handled all of it.",
              ),
              authorName: L("Мария Тен", "Mariya Ten", "Maria Ten"),
              authorRole: L("Операционный директор, логистика", "Operatsion direktor, logistika", "COO, logistics"),
            },
          ],
        ),

        B.cta("cta", {
          heading: L("Обсудить задачу", "Vazifani muhokama qilish", "Discuss your case"),
          body: L(
            "Первая встреча — 40 минут, бесплатно. Расскажем, что можно сделать и сколько это займёт.",
            "Birinchi uchrashuv — 40 daqiqa, bepul. Nima qilish mumkinligini va qancha vaqt ketishini aytamiz.",
            "The first meeting is 40 minutes and free. We will tell you what can be done and how long it takes.",
          ),
          buttonLabel: L("Оставить запрос", "So'rov qoldirish", "Send a request"),
          buttonLink: "/contacts",
        }),
      ],
    },

    {
      slug: "services",
      title: L("Услуги", "Xizmatlar", "Services"),
      metaDesc: L(
        "Налоговый консалтинг, МСФО, аудит, due diligence и сопровождение выхода на рынок — форматы и стоимость.",
        "Soliq konsaltingi, XMHS, audit, due diligence va bozorga chiqishni qo'llab-quvvatlash — formatlar va narxlar.",
        "Tax consulting, IFRS, audit, due diligence and market entry — formats and pricing.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Услуги и форматы работы", "Xizmatlar va ish formatlari", "Services and engagement formats"),
          subheading: L(
            "Работаем по абонентскому договору, проектно или разово — в зависимости от задачи.",
            "Abonent shartnomasi, loyiha bo'yicha yoki bir martalik — vazifaga qarab ishlaymiz.",
            "We work on retainer, by project or one-off, depending on the task.",
          ),
          variant: "centered",
        }),

        B.pricing("plans", L("Форматы сотрудничества", "Hamkorlik formatlari", "Ways of working"), [
          {
            name: L("Разовая консультация", "Bir martalik maslahat", "One-off consultation"),
            price: L("1 500 000", "1 500 000", "1,500,000"),
            period: L("сум / встреча", "so'm / uchrashuv", "soum / session"),
            features: [
              L("Встреча до 2 часов", "2 soatgacha uchrashuv", "Session of up to two hours"),
              L("Письменное заключение", "Yozma xulosa", "Written opinion"),
              L("Ссылки на нормы НК", "Soliq kodeksi normalariga havolalar", "References to the Tax Code"),
            ],
            ctaLabel: L("Записаться", "Yozilish", "Book"),
            ctaLink: "/contacts",
          },
          {
            name: L("Абонентское обслуживание", "Abonent xizmati", "Retainer"),
            price: L("от 9 000 000", "9 000 000 dan", "from 9,000,000"),
            period: L("сум / месяц", "so'm / oy", "soum / month"),
            features: [
              L("Выделенный консультант", "Alohida maslahatchi", "A dedicated consultant"),
              L("Проверка договоров до подписания", "Shartnomalarni imzolashdan oldin tekshirish", "Contract review before signing"),
              L("Ежемесячный обзор изменений", "Oylik o'zgarishlar sharhi", "Monthly regulatory digest"),
              L("Сопровождение проверок", "Tekshiruvlarni qo'llab-quvvatlash", "Support during inspections"),
            ],
            highlighted: true,
            ctaLabel: L("Запросить расчёт", "Hisob so'rash", "Request a quote"),
            ctaLink: "/contacts",
          },
          {
            name: L("Проект", "Loyiha", "Project"),
            price: L("по расчёту", "hisob bo'yicha", "on request"),
            period: L("МСФО, аудит, due diligence", "XMHS, audit, due diligence", "IFRS, audit, due diligence"),
            features: [
              L("Фиксированная смета и сроки", "Belgilangan smeta va muddatlar", "Fixed budget and timeline"),
              L("Команда под задачу", "Vazifaga mos jamoa", "A team assembled for the task"),
              L("Отчёт с планом действий", "Harakatlar rejasi bilan hisobot", "A report with an action plan"),
            ],
            ctaLabel: L("Обсудить проект", "Loyihani muhokama qilish", "Discuss a project"),
            ctaLink: "/contacts",
          },
        ]),

        B.faq("faq", L("Вопросы о работе", "Ish haqida savollar", "Questions about working with us"), [
          {
            question: L("Как быстро вы начинаете?", "Qanchalik tez boshlaysiz?", "How quickly do you start?"),
            answer: L(
              "<p>По разовым консультациям — в течение трёх рабочих дней. По проектам — обычно две недели на согласование объёма и договор.</p>",
              "<p>Bir martalik maslahatlar bo'yicha — uch ish kuni ichida. Loyihalar bo'yicha — odatda hajmni kelishish va shartnoma uchun ikki hafta.</p>",
              "<p>For one-off consultations, within three working days. For projects, usually two weeks to agree scope and sign the contract.</p>",
            ),
          },
          {
            question: L(
              "Работаете ли с иностранными компаниями?",
              "Xorijiy kompaniyalar bilan ishlaysizmi?",
              "Do you work with foreign companies?",
            ),
            answer: L(
              "<p>Да, это около трети портфеля. Документы и отчёты готовим на русском и английском, при необходимости — на узбекском.</p>",
              "<p>Ha, bu portfelning uchdan bir qismi. Hujjat va hisobotlarni rus va ingliz tillarida, kerak bo'lsa o'zbek tilida tayyorlaymiz.</p>",
              "<p>Yes, about a third of our portfolio. We prepare documents and reports in Russian and English, and in Uzbek when needed.</p>",
            ),
          },
          {
            question: L("Кто именно будет вести проект?", "Loyihani aynan kim olib boradi?", "Who exactly will run the project?"),
            answer: L(
              "<p>Состав команды фиксируется в договоре поимённо. Замена возможна только с вашего письменного согласия.</p>",
              "<p>Jamoa tarkibi shartnomada ism-sharif bilan qayd etiladi. Almashtirish faqat sizning yozma roziligingiz bilan mumkin.</p>",
              "<p>The team is named in the contract. Any replacement requires your written consent.</p>",
            ),
          },
        ]),
      ],
    },

    {
      slug: "industries",
      title: L("Отрасли", "Tarmoqlar", "Industries"),
      metaDesc: L(
        "Отраслевые практики Ориент Консалт: производство, торговля, логистика, IT и строительство.",
        "Orient Konsaltning tarmoq amaliyotlari: ishlab chiqarish, savdo, logistika, IT va qurilish.",
        "Orient Consult industry practices: manufacturing, retail, logistics, IT and construction.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Отраслевые практики", "Tarmoq amaliyotlari", "Industry practices"),
          subheading: L(
            "В каждой отрасли свои типовые ошибки в учёте. Мы знаем, где искать.",
            "Har bir tarmoqda hisobdagi o'ziga xos xatolar bor. Qayerga qarashni bilamiz.",
            "Every industry has its own recurring accounting mistakes. We know where to look.",
          ),
          variant: "centered",
        }),

        B.features(
          "list",
          L("С кем мы работаем", "Kim bilan ishlaymiz", "Who we work with"),
          [
            {
              icon: "spark",
              title: L("Производство", "Ishlab chiqarish", "Manufacturing"),
              body: L(
                "Себестоимость, учёт брака, НДС при импорте оборудования, льготы для локализации.",
                "Tannarx, brak hisobi, uskuna importida QQS, lokalizatsiya imtiyozlari.",
                "Cost accounting, scrap, VAT on imported equipment and localisation incentives.",
              ),
            },
            {
              icon: "globe",
              title: L("Оптовая торговля", "Ulgurji savdo", "Wholesale"),
              body: L(
                "Маркировка, таможенная стоимость, работа с ЭСФ и возвраты.",
                "Markirovka, bojxona qiymati, EHF bilan ishlash va qaytarishlar.",
                "Product labelling, customs value, e-invoicing and returns.",
              ),
            },
            {
              icon: "message",
              title: L("Логистика", "Logistika", "Logistics"),
              body: L(
                "Международные перевозки, нулевая ставка НДС, договоры экспедирования.",
                "Xalqaro tashuvlar, nol stavkali QQS, ekspeditorlik shartnomalari.",
                "International shipping, zero-rated VAT and freight forwarding contracts.",
              ),
            },
            {
              icon: "spark",
              title: L("IT и резиденты IT Park", "IT va IT Park rezidentlari", "IT and IT Park residents"),
              body: L(
                "Льготы резидентов, экспорт услуг, валютный контроль, оформление разработчиков.",
                "Rezident imtiyozlari, xizmat eksporti, valyuta nazorati, dasturchilarni rasmiylashtirish.",
                "Resident incentives, service exports, currency control and hiring developers.",
              ),
            },
            {
              icon: "globe",
              title: L("Строительство", "Qurilish", "Construction"),
              body: L(
                "Учёт по объектам, долевое участие, субподряд и признание выручки по этапам.",
                "Obyektlar bo'yicha hisob, ulushli qurilish, subpudrat va bosqichma-bosqich daromad tan olish.",
                "Project-level accounting, shared construction, subcontracting and staged revenue recognition.",
              ),
            },
            {
              icon: "message",
              title: L("Розница и HoReCa", "Chakana savdo va HoReCa", "Retail and hospitality"),
              body: L(
                "Онлайн-ККМ, учёт списаний, зарплатные схемы для сменного персонала.",
                "Onlayn kassa, hisobdan chiqarishlar, smenali xodimlar uchun ish haqi sxemalari.",
                "Online cash registers, write-offs and payroll schemes for shift staff.",
              ),
            },
          ],
        ),

        B.cta("cta", {
          heading: L("Не нашли свою отрасль?", "O'z tarmog'ingizni topmadingizmi?", "Not seeing your industry?"),
          body: L(
            "Напишите, чем занимается компания, — подберём консультанта с релевантным опытом.",
            "Kompaniyangiz nima bilan shug'ullanishini yozing — mos tajribaga ega maslahatchi tanlaymiz.",
            "Tell us what your company does and we will assign a consultant with relevant experience.",
          ),
          buttonLabel: L("Написать нам", "Bizga yozing", "Contact us"),
          buttonLink: "/contacts",
          style: "outline",
        }),
      ],
    },

    {
      slug: "about",
      title: L("О компании", "Kompaniya haqida", "About the company"),
      metaDesc: L(
        "История, команда и принципы работы консалтинговой компании Ориент Консалт.",
        "Orient Konsalt konsalting kompaniyasining tarixi, jamoasi va ish tamoyillari.",
        "The history, team and working principles of Orient Consult.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("О компании", "Kompaniya haqida", "About the company"),
          subheading: L(
            "Основаны в 2011 году тремя аудиторами. Сегодня — 31 специалист и офис в Ц-5.",
            "2011-yilda uch auditor tomonidan tashkil etilgan. Bugun — 31 mutaxassis va C-5 dagi ofis.",
            "Founded in 2011 by three auditors. Today: 31 specialists and an office in C-5.",
          ),
          variant: "centered",
        }),

        B.richText(
          "story",
          paragraphs(
            L(
              "«Ориент Консалт» вырос из аудиторской практики. Первые пять лет мы занимались только обязательным аудитом, потом клиенты начали приходить с вопросами шире отчётности.",
              "«Orient Konsalt» audit amaliyotidan o'sib chiqqan. Dastlabki besh yil faqat majburiy audit bilan shug'ullandik, keyin mijozlar hisobotdan kengroq savollar bilan kela boshladi.",
              "Orient Consult grew out of an audit practice. For the first five years we did statutory audit only; then clients started bringing questions that went beyond reporting.",
            ),
            L(
              "Сегодня консалтинг — две трети выручки. Мы не ведём бухгалтерию за клиента: наша роль — методология, проверка и защита позиции.",
              "Bugun konsalting daromadning uchdan ikki qismini tashkil qiladi. Biz mijoz o'rniga buxgalteriya yuritmaymiz: bizning rolimiz — metodologiya, tekshiruv va pozitsiyani himoya qilish.",
              "Consulting is now two thirds of revenue. We do not keep the books for clients — our role is methodology, review and defending the position taken.",
            ),
          ),
        ),

        B.team("team", L("Партнёры", "Hamkorlar", "Partners"), [
          {
            name: L("Гульнора Ибрагимова", "Gulnora Ibragimova", "Gulnora Ibragimova"),
            role: L("Управляющий партнёр", "Boshqaruvchi hamkor", "Managing partner"),
            bio: L(
              "Аудитор с 2004 года, сертификат ACCA DipIFR. Ведёт практику МСФО и трансформации отчётности.",
              "2004-yildan beri auditor, ACCA DipIFR sertifikati. XMHS va hisobot transformatsiyasi amaliyotini boshqaradi.",
              "Auditor since 2004, ACCA DipIFR. Leads the IFRS and reporting transformation practice.",
            ),
          },
          {
            name: L("Санжар Тошматов", "Sanjar Toshmatov", "Sanjar Toshmatov"),
            role: L("Партнёр, налоговая практика", "Hamkor, soliq amaliyoti", "Partner, tax practice"),
            bio: L(
              "12 лет в налоговом консалтинге, до этого — в органах государственной налоговой службы.",
              "Soliq konsaltingida 12 yil, undan oldin — davlat soliq xizmati organlarida.",
              "Twelve years in tax consulting, previously with the state tax service.",
            ),
          },
          {
            name: L("Елена Пак", "Yelena Pak", "Elena Pak"),
            role: L("Партнёр, аудит", "Hamkor, audit", "Partner, audit"),
            bio: L(
              "Руководит аудиторскими проектами, отвечает за методологию и контроль качества.",
              "Audit loyihalarini boshqaradi, metodologiya va sifat nazorati uchun javob beradi.",
              "Runs audit engagements and owns methodology and quality control.",
            ),
          },
        ]),
      ],
    },

    {
      slug: "contacts",
      title: L("Контакты", "Kontaktlar", "Contacts"),
      metaDesc: L(
        "Адрес офиса в Ц-5, телефон, почта и форма запроса коммерческого предложения.",
        "C-5 dagi ofis manzili, telefon, pochta va tijorat taklifi so'rovi shakli.",
        "Office address in C-5, phone, email and a proposal request form.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Связаться с нами", "Biz bilan bog'lanish", "Get in touch"),
          subheading: L(
            "Ц-5, дом 41, офис 302. Приём по будням с 9:00 до 18:00, встречи — по записи.",
            "C-5, 41-uy, 302-ofis. Ish kunlari 9:00 dan 18:00 gacha, uchrashuvlar — yozilish bo'yicha.",
            "C-5, building 41, office 302. Weekdays 9:00 to 18:00, meetings by appointment.",
          ),
          variant: "centered",
        }),

        B.contactForm("form", {
          heading: L("Запрос коммерческого предложения", "Tijorat taklifi so'rovi", "Request a proposal"),
          submitLabel: L("Отправить запрос", "So'rovni yuborish", "Send request"),
          successMessage: L(
            "Запрос принят. Ответим в течение одного рабочего дня.",
            "So'rov qabul qilindi. Bir ish kuni ichida javob beramiz.",
            "Request received. We will reply within one business day.",
          ),
          fields: [
            { type: "text", label: L("Имя и должность", "Ism va lavozim", "Name and role") },
            { type: "text", label: L("Компания", "Kompaniya", "Company") },
            { type: "email", label: L("Email", "Email", "Email") },
            { type: "tel", label: L("Телефон", "Telefon", "Phone") },
            { type: "textarea", label: L("Задача", "Vazifa", "What you need") },
          ],
        }),
      ],
    },
  ],

  posts: [
    {
      slug: "izmeneniya-nk-2026",
      categorySlug: "insights",
      title: L(
        "Что меняется в Налоговом кодексе с января",
        "Yanvardan Soliq kodeksida nima o'zgaradi",
        "What changes in the Tax Code from January",
      ),
      excerpt: L(
        "Разбираем поправки, которые коснутся плательщиков НДС и резидентов IT Park, и что стоит проверить в учёте заранее.",
        "QQS to'lovchilari va IT Park rezidentlariga tegishli o'zgarishlarni hamda hisobda oldindan nimani tekshirish kerakligini tahlil qilamiz.",
        "We unpack the amendments affecting VAT payers and IT Park residents, and what to review in your books in advance.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Основные поправки касаются порядка вычета НДС и подтверждения нулевой ставки при экспорте услуг. Формально изменения точечные, но они меняют состав документов, которые придётся собирать ежемесячно.",
                "Asosiy o'zgarishlar QQS chegirmasi tartibi va xizmat eksportida nol stavkani tasdiqlashga tegishli. Rasman o'zgarishlar nuqtali, lekin ular har oy yig'ish kerak bo'lgan hujjatlar tarkibini o'zgartiradi.",
                "The main amendments concern VAT deduction rules and proving the zero rate on exported services. The changes look narrow, but they alter the set of documents you must collect every month.",
              ),
              L(
                "Мы рекомендуем до конца года провести ревизию договоров с иностранными заказчиками: в части из них формулировка предмета не позволит подтвердить экспорт услуг по новым требованиям.",
                "Yil oxirigacha xorijiy buyurtmachilar bilan tuzilgan shartnomalarni ko'rib chiqishni tavsiya qilamiz: ularning bir qismida predmet ta'rifi yangi talablar bo'yicha xizmat eksportini tasdiqlashga imkon bermaydi.",
                "We recommend reviewing contracts with foreign clients before year end: in some of them the wording of the subject matter will not support proof of service export under the new rules.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "keys-msfo-za-pyat-mesyacev",
      categorySlug: "cases",
      title: L(
        "Кейс: переход на МСФО за пять месяцев",
        "Keys: besh oyda XMHS ga o'tish",
        "Case study: IFRS transition in five months",
      ),
      excerpt: L(
        "Производственная компания с оборотом 180 млрд сум готовилась к кредитной линии. Что пришлось перестроить в учёте.",
        "Aylanmasi 180 mlrd so'm bo'lgan ishlab chiqarish kompaniyasi kredit liniyasiga tayyorlanardi. Hisobda nimalarni qayta qurishga to'g'ri keldi.",
        "A manufacturer with 180 billion soum turnover was preparing for a credit line. Here is what had to be rebuilt.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Задача звучала просто: получить отчётность по МСФО за два года к моменту подачи заявки в банк. Сложность была в учёте основных средств — часть оборудования не переоценивалась с 2016 года.",
                "Vazifa oddiy edi: bankka ariza topshirish vaqtiga ikki yillik XMHS hisobotini olish. Qiyinchilik asosiy vositalar hisobida edi — uskunaning bir qismi 2016-yildan beri qayta baholanmagan.",
                "The brief sounded simple: two years of IFRS statements by the time the bank application went in. The difficulty was fixed assets — some equipment had not been revalued since 2016.",
              ),
              L(
                "Мы провели инвентаризацию с независимым оценщиком, пересобрали регистр основных средств и заново рассчитали амортизацию. Отчётность приняли без замечаний, кредитная линия открыта.",
                "Mustaqil baholovchi bilan inventarizatsiya o'tkazdik, asosiy vositalar reyestrini qayta yig'dik va amortizatsiyani qaytadan hisobladik. Hisobot e'tirozsiz qabul qilindi, kredit liniyasi ochildi.",
                "We ran an inventory with an independent appraiser, rebuilt the fixed-asset register and recalculated depreciation. The statements were accepted without comment and the credit line was opened.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "novyj-partner-audit",
      categorySlug: "company",
      title: L(
        "Елена Пак возглавила аудиторскую практику",
        "Yelena Pak audit amaliyotini boshqardi",
        "Elena Pak takes over the audit practice",
      ),
      excerpt: L(
        "С сентября аудиторское направление ведёт партнёр с 15-летним опытом проверок в производстве и торговле.",
        "Sentyabrdan audit yo'nalishini ishlab chiqarish va savdoda 15 yillik tekshiruv tajribasiga ega hamkor boshqaradi.",
        "From September the audit line is led by a partner with fifteen years of manufacturing and retail engagements.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Елена работает в компании с 2017 года и до назначения руководила методологией. В новой роли она отвечает за контроль качества всех аудиторских заключений.",
                "Yelena kompaniyada 2017-yildan beri ishlaydi va tayinlanishidan oldin metodologiyani boshqargan. Yangi rolda u barcha audit xulosalarining sifat nazorati uchun javob beradi.",
                "Elena joined in 2017 and led methodology before the appointment. In her new role she is responsible for quality control across all audit opinions.",
              ),
            ),
          },
        },
      ],
    },
  ],
};
