import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * Юридическое бюро «Adolat Partners» — Шайхантахурский район Ташкента.
 * Структура профиля намеренно сдержанная: никаких галерей и ярких блоков —
 * практики, партнёры с квалификацией, прозрачные тарифы и разборы дел
 * в блоге. Антиква и нулевые скругления отделяют шаблон от «маркетинговых»
 * профилей вроде агентства или салона.
 */
export const lawTemplate: SiteTemplate = {
  key: "law",
  label: L("Юридические услуги", "Yuridik xizmatlar", "Legal services"),
  profile: L(
    "Юрбюро «Adolat Partners», Шайхантахур",
    "«Adolat Partners» yuridik byurosi, Shayxontohur",
    "Adolat Partners law office, Shaykhantakhur",
  ),
  description: L(
    "Практики бюро, партнёры с квалификацией, тарифы на консультацию и абонентское обслуживание, разборы дел.",
    "Byuro amaliyotlari, malakali sheriklar, konsultatsiya va abonent xizmati tariflari, ishlar tahlili.",
    "The firm's practice areas, partners and their credentials, fees for consultations and retainers, and case notes.",
  ),
  themeKey: "law",
  design: { skin: "broadsheet", fontDisplay: "PT Serif", fontBody: "PT Sans", radiusScale: "none" },

  settings: {
    siteName: L("Adolat Partners", "Adolat Partners", "Adolat Partners"),
    tagline: L(
      "Юридическое бюро, Ташкент",
      "Yuridik byuro, Toshkent",
      "Law office, Tashkent",
    ),
    contactEmail: "office@adolatpartners.uz",
    contactPhone: "+998 71 230 55 80",
    contactAddress: L(
      "Ташкент, Шайхантахурский район, ул. Навои, 16, офис 305",
      "Toshkent, Shayxontohur tumani, Navoiy ko'chasi, 16, 305-ofis",
      "Tashkent, Shaykhantakhur district, 16 Navoi street, office 305",
    ),
    footerNote: L(
      "© Юридическое бюро «Adolat Partners». Лицензия Минюста РУз. Приём по предварительной записи, пн–пт 9:00–18:00.",
      "© «Adolat Partners» yuridik byurosi. O'zR Adliya vazirligi litsenziyasi. Qabul oldindan yozilib, du–ju 9:00–18:00.",
      "© Adolat Partners law office. Licensed by the Ministry of Justice. By appointment, Mon–Fri 9:00–18:00.",
    ),
  },

  categories: [
    {
      slug: "razbor-del",
      order: 1,
      name: L("Разбор дел", "Ishlar tahlili", "Case notes"),
      description: L(
        "Что решил суд и почему — на примерах наших завершённых дел, без имён клиентов.",
        "Sud nima hal qilgani va nima uchun — tugallangan ishlarimiz misolida, mijozlar ismisiz.",
        "What the court decided and why — from our completed cases, with client names removed.",
      ),
    },
    {
      slug: "biznesu",
      order: 2,
      name: L("Бизнесу", "Biznesga", "For business"),
      description: L(
        "Договоры, проверки, трудовые споры и налоговые риски для компаний в Узбекистане.",
        "Shartnomalar, tekshiruvlar, mehnat nizolari va O'zbekistondagi kompaniyalar uchun soliq xatarlari.",
        "Contracts, inspections, employment disputes and tax risk for companies in Uzbekistan.",
      ),
    },
    {
      slug: "izmeneniya-zakona",
      order: 3,
      name: L("Изменения в законе", "Qonundagi o'zgarishlar", "Changes in the law"),
      description: L(
        "Короткие обзоры новых норм: что меняется на практике и с какой даты.",
        "Yangi normalarning qisqa sharhi: amalda nima o'zgaradi va qaysi sanadan.",
        "Short reviews of new rules: what changes in practice, and from what date.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "practices", order: 1, label: L("Практики", "Amaliyotlar", "Practice areas") },
    { location: "header", linkType: "page", target: "team", order: 2, label: L("Партнёры", "Sheriklar", "Partners") },
    { location: "header", linkType: "category", target: "razbor-del", order: 3, label: L("Разбор дел", "Ishlar tahlili", "Case notes") },
    { location: "header", linkType: "page", target: "contacts", order: 4, label: L("Консультация", "Konsultatsiya", "Consultation") },
    { location: "footer", linkType: "page", target: "practices", order: 1, label: L("Практики", "Amaliyotlar", "Practice areas") },
    { location: "footer", linkType: "category", target: "biznesu", order: 2, label: L("Бизнесу", "Biznesga", "For business") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Юридическое бюро в Ташкенте: корпоративное право, договоры, суды, трудовые и налоговые споры.",
        "Toshkentdagi yuridik byuro: korporativ huquq, shartnomalar, sudlar, mehnat va soliq nizolari.",
        "A law office in Tashkent: corporate law, contracts, litigation, employment and tax disputes.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Юридическое бюро для бизнеса и частных лиц",
            "Biznes va jismoniy shaxslar uchun yuridik byuro",
            "A law office for businesses and individuals",
          ),
          subheading: L(
            "Работаем в Ташкенте с 2011 года. Ведём договорную работу, представляем в судах и сопровождаем сделки с недвижимостью — с письменной оценкой перспектив до подписания договора.",
            "2011-yildan beri Toshkentda ishlaymiz. Shartnomaviy ish yuritamiz, sudlarda vakillik qilamiz va ko'chmas mulk bitimlarini kuzatib boramiz — shartnoma imzolanishidan oldin istiqbolni yozma baholaymiz.",
            "Practising in Tashkent since 2011. We draft and review contracts, represent clients in court and handle property transactions — with a written assessment of your prospects before you sign anything.",
          ),
          ctaLabel: L("Записаться на консультацию", "Konsultatsiyaga yozilish", "Book a consultation"),
          ctaLink: "/contacts",
          variant: "split",
        }),

        B.features(
          "practices",
          L("Основные практики", "Asosiy amaliyotlar", "Core practice areas"),
          [
            {
              icon: "shield",
              title: L("Корпоративное право", "Korporativ huquq", "Corporate law"),
              body: L(
                "Регистрация и реорганизация компаний, уставы, доли участников, корпоративные конфликты.",
                "Kompaniyalarni ro'yxatdan o'tkazish va qayta tashkil etish, ustavlar, ishtirokchilar ulushi, korporativ nizolar.",
                "Company formation and restructuring, charters, shareholdings and corporate disputes.",
              ),
            },
            {
              icon: "check",
              title: L("Договорная работа", "Shartnomaviy ish", "Contracts"),
              body: L(
                "Разработка и правовая экспертиза договоров: поставка, подряд, аренда, внешнеэкономические контракты.",
                "Shartnomalarni ishlab chiqish va huquqiy ekspertiza: yetkazib berish, pudrat, ijara, tashqi iqtisodiy shartnomalar.",
                "Drafting and reviewing contracts: supply, works, lease and cross-border agreements.",
              ),
            },
            {
              icon: "users",
              title: L("Трудовые споры", "Mehnat nizolari", "Employment disputes"),
              body: L(
                "Увольнения, взыскание зарплаты, восстановление на работе. Представляем и работников, и работодателей.",
                "Ishdan bo'shatish, ish haqini undirish, ishga tiklash. Ham xodimlar, ham ish beruvchilar nomidan chiqamiz.",
                "Dismissals, unpaid wages, reinstatement. We act for employees and for employers.",
              ),
            },
            {
              icon: "chart",
              title: L("Налоговые проверки", "Soliq tekshiruvlari", "Tax audits"),
              body: L(
                "Сопровождение проверок, возражения на акт, обжалование доначислений в суде.",
                "Tekshiruvlarni kuzatish, dalolatnomaga e'tiroz, qo'shimcha hisoblashlarni sudda shikoyat qilish.",
                "Support during audits, formal objections to findings, appeals against assessments in court.",
              ),
            },
            {
              icon: "globe",
              title: L("Недвижимость", "Ko'chmas mulk", "Real estate"),
              body: L(
                "Проверка объекта, сопровождение сделки, споры о правах на квартиру или нежилое помещение.",
                "Obyektni tekshirish, bitimni kuzatish, kvartira yoki noturar joyga bo'lgan huquq bo'yicha nizolar.",
                "Title checks, transaction support, disputes over rights to flats and commercial premises.",
              ),
            },
            {
              icon: "message",
              title: L("Семейные дела", "Oilaviy ishlar", "Family matters"),
              body: L(
                "Раздел имущества, алименты, определение места жительства ребёнка. Ведём в том числе без участия клиента в заседаниях.",
                "Mol-mulkni bo'lish, aliment, bolaning yashash joyini belgilash. Mijoz majlislarda qatnashmasdan ham olib boramiz.",
                "Division of property, maintenance, residence arrangements for children — including without the client attending hearings.",
              ),
            },
          ],
          3,
        ),

        S(
          B.stats("stats", [
            { value: L("15 лет", "15 yil", "15 years"), label: L("Практики в Ташкенте", "Toshkentdagi amaliyot", "Of practice in Tashkent") },
            { value: L("340+", "340+", "340+"), label: L("Дел в судах всех инстанций", "Barcha instansiya sudlaridagi ishlar", "Cases in courts at every level") },
            { value: L("48 часов", "48 soat", "48 hours"), label: L("Срок письменного заключения", "Yozma xulosa muddati", "Turnaround for a written opinion") },
            { value: L("22", "22", "22"), label: L("Компаний на абонентском обслуживании", "Abonent xizmatidagi kompaniyalar", "Companies on retainer") },
          ]),
          { bg: "surface" },
        ),

        S(
          B.testimonials(
            "reviews",
            L("Отзывы доверителей", "Ishonch bildiruvchilar fikri", "Client feedback"),
            [
              {
                quote: L(
                  "Пришли с налоговой проверкой и доначислением на 800 млн сум. Бюро подготовило возражения, в суде сумму снизили до 60 млн. Работали спокойно и без обещаний «решить вопрос».",
                  "Soliq tekshiruvi va 800 mln so'mlik qo'shimcha hisoblash bilan keldik. Byuro e'tiroz tayyorladi, sudda summa 60 mln so'mgacha tushirildi. «Masalani hal qilamiz» degan va'dasiz, xotirjam ishlashdi.",
                  "We came in with a tax audit and an 800 million UZS assessment. The firm filed objections and the court cut it to 60 million. They worked calmly, with none of the \"we'll sort it out\" talk.",
                ),
                authorName: L("Фаррух Ибрагимов", "Farrux Ibragimov", "Farrukh Ibragimov"),
                authorRole: L("Директор производственной компании", "Ishlab chiqarish kompaniyasi direktori", "Director of a manufacturing company"),
              },
              {
                quote: L(
                  "Сопровождали покупку помещения под кафе. Нашли обременение, о котором продавец «забыл», — сделку переиграли на других условиях и сэкономили нам полтора года судов.",
                  "Kafe uchun joy sotib olishni kuzatib bordilar. Sotuvchi «unutgan» cheklovni topishdi — bitim boshqa shartlarda qayta tuzildi va bizga bir yarim yillik suddan qutuldik.",
                  "They handled our purchase of a café unit and found an encumbrance the seller had \"forgotten\" — the deal was renegotiated and we were spared eighteen months of litigation.",
                ),
                authorName: L("Мадина Салимова", "Madina Salimova", "Madina Salimova"),
                authorRole: L("Владелица сети кофеен", "Qahvaxonalar tarmog'i egasi", "Owner of a coffee-shop chain"),
              },
            ],
          ),
          { width: "narrow" },
        ),

        S(
          B.cta("cta", {
            heading: L("Первая консультация — 30 минут", "Birinchi konsultatsiya — 30 daqiqa", "A first consultation lasts 30 minutes"),
            body: L(
              "На ней мы честно говорим, есть ли у дела перспектива. Если перспективы нет — так и скажем, это дешевле для вас.",
              "Unda ishning istiqboli bor-yo'qligini ochiq aytamiz. Istiqbol bo'lmasa — shundayligicha aytamiz, bu siz uchun arzonroq.",
              "In it we tell you honestly whether the case has prospects. If it does not, we say so — that is cheaper for you.",
            ),
            buttonLabel: L("Записаться", "Yozilish", "Book"),
            buttonLink: "/contacts",
            style: "outline",
          }),
          { bg: "ink", align: "center" },
        ),
      ],
    },

    // ------------------------------------------------------------- практики
    {
      slug: "practices",
      title: L("Практики и тарифы", "Amaliyotlar va tariflar", "Practice areas and fees"),
      metaDesc: L(
        "Практики бюро «Adolat Partners» и стоимость работы: консультация, ведение дела, абонентское обслуживание.",
        "«Adolat Partners» byurosi amaliyotlari va ish narxi: konsultatsiya, ishni olib borish, abonent xizmati.",
        "Adolat Partners practice areas and fees: consultations, case handling and retainers.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Мы не берёмся за всё подряд. Бюро сосредоточено на пяти направлениях, где у партнёров есть собственная судебная практика: корпоративные споры, договоры, трудовые дела, налоговые проверки и недвижимость.",
                "Biz hamma ishni olmaymiz. Byuro sheriklarning shaxsiy sud amaliyoti bor beshta yo'nalishga jamlangan: korporativ nizolar, shartnomalar, mehnat ishlari, soliq tekshiruvlari va ko'chmas mulk.",
                "We do not take on everything. The firm concentrates on five areas where the partners have their own courtroom record: corporate disputes, contracts, employment, tax audits and real estate.",
              ),
              L(
                "Если дело выходит за эти рамки — уголовное преследование, миграционные вопросы, интеллектуальная собственность — мы говорим об этом на первой встрече и рекомендуем коллег, а не пробуем разобраться по ходу.",
                "Ish shu doiradan chiqsa — jinoiy ta'qib, migratsiya masalalari, intellektual mulk — buni birinchi uchrashuvda aytamiz va hamkasblarni tavsiya qilamiz, yo'l-yo'lakay o'rganishga urinmaymiz.",
                "If a matter falls outside that — criminal proceedings, immigration, intellectual property — we say so at the first meeting and refer you to colleagues rather than learning on your case.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.pricing(
          "fees",
          L("Стоимость работы", "Ish narxi", "Fees"),
          [
            {
              name: L("Консультация", "Konsultatsiya", "Consultation"),
              price: L("450 000 сум", "450 000 so'm", "450,000 UZS"),
              period: L("за час, в офисе или онлайн", "bir soat uchun, ofisda yoki onlayn", "per hour, in person or online"),
              features: [
                L("Правовая оценка ситуации", "Vaziyatni huquqiy baholash", "A legal assessment of your situation"),
                L("Перечень документов и следующих шагов", "Hujjatlar va keyingi qadamlar ro'yxati", "A list of documents and next steps"),
                L("Стоимость засчитывается, если берём дело", "Ishni olsak, narx hisobga olinadi", "Credited against the fee if we take the case"),
              ],
              ctaLabel: L("Записаться", "Yozilish", "Book"),
              ctaLink: "/contacts",
            },
            {
              name: L("Ведение дела", "Ishni olib borish", "Case handling"),
              price: L("от 12 000 000 сум", "12 000 000 so'mdan", "from 12,000,000 UZS"),
              period: L("за инстанцию, фиксированно", "instansiya uchun, qat'iy", "per instance, fixed"),
              features: [
                L("Письменная оценка перспектив до договора", "Shartnomagacha istiqbolning yozma bahosi", "A written assessment of prospects before the contract"),
                L("Все процессуальные документы и заседания", "Barcha protsessual hujjatlar va majlislar", "All filings and hearings"),
                L("Отчёт после каждого заседания", "Har bir majlisdan keyin hisobot", "A report after every hearing"),
                L("Гонорар успеха — по отдельной договорённости", "Muvaffaqiyat gonorari — alohida kelishuv bo'yicha", "Success fees by separate agreement"),
              ],
              highlighted: true,
              ctaLabel: L("Обсудить дело", "Ishni muhokama qilish", "Discuss the case"),
              ctaLink: "/contacts",
            },
            {
              name: L("Абонентское обслуживание", "Abonent xizmati", "Retainer"),
              price: L("6 500 000 сум", "6 500 000 so'm", "6,500,000 UZS"),
              period: L("в месяц для компании", "kompaniya uchun oyiga", "per month for a company"),
              features: [
                L("До 20 часов работы юриста в месяц", "Oyiga 20 soatgacha yurist ishi", "Up to 20 lawyer-hours a month"),
                L("Проверка договоров в течение суток", "Shartnomalarni bir kun ichida tekshirish", "Contract review within 24 hours"),
                L("Сопровождение проверок без доплаты", "Tekshiruvlarni qo'shimcha to'lovsiz kuzatish", "Audit support at no extra charge"),
                L("Выделенный юрист и его прямой номер", "Alohida yurist va uning to'g'ridan-to'g'ri raqami", "A named lawyer and their direct line"),
              ],
              ctaLabel: L("Запросить условия", "Shartlarni so'rash", "Request terms"),
              ctaLink: "/contacts",
            },
          ],
        ),

        S(
          B.faq(
            "faq",
            L("Вопросы о работе бюро", "Byuro ishi haqida savollar", "Questions about how we work"),
            [
              {
                question: L("Даёте ли гарантию выигрыша?", "Yutuq kafolatini berasizmi?", "Do you guarantee a win?"),
                answer: L(
                  "Нет, и никто не вправе её давать. Мы даём письменную оценку перспектив с ссылками на нормы и практику — по ней видно, на чём строится позиция.",
                  "Yo'q, va uni berishga hech kimning haqi yo'q. Biz normalar va amaliyotga havolalar bilan istiqbolning yozma bahosini beramiz — undan pozitsiya nimaga asoslangani ko'rinadi.",
                  "No, and nobody is entitled to. We give a written assessment of prospects with references to the law and case practice, so you can see what the position rests on.",
                ),
              },
              {
                question: L("Что входит в фиксированную стоимость?", "Qat'iy narxga nima kiradi?", "What does the fixed fee cover?"),
                answer: L(
                  "Подготовка иска или отзыва, все заседания в одной инстанции, ходатайства и переписка. Госпошлина, экспертизы и нотариус оплачиваются отдельно.",
                  "Da'vo yoki javob tayyorlash, bitta instansiyadagi barcha majlislar, iltimosnomalar va yozishmalar. Davlat boji, ekspertiza va notarius alohida to'lanadi.",
                  "Drafting the claim or defence, all hearings in one instance, motions and correspondence. Court fees, expert reports and notary costs are billed separately.",
                ),
              },
              {
                question: L("Можно ли не ходить в суд лично?", "Sudga shaxsan bormaslik mumkinmi?", "Can I avoid attending court myself?"),
                answer: L(
                  "В большинстве гражданских и хозяйственных дел — да, по доверенности. Личное участие обязательно в отдельных семейных делах, об этом предупредим заранее.",
                  "Ko'pchilik fuqarolik va xo'jalik ishlarida — ha, ishonchnoma bo'yicha. Ayrim oilaviy ishlarda shaxsan qatnashish shart, bu haqda oldindan ogohlantiramiz.",
                  "In most civil and commercial cases, yes — by power of attorney. Personal attendance is required in certain family matters, and we tell you in advance.",
                ),
              },
            ],
          ),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },

    // ------------------------------------------------------------ партнёры
    {
      slug: "team",
      title: L("Партнёры и юристы", "Sheriklar va yuristlar", "Partners and lawyers"),
      metaDesc: L(
        "Команда бюро «Adolat Partners»: партнёры, их специализация, образование и судебная практика.",
        "«Adolat Partners» jamoasi: sheriklar, ularning ixtisosligi, ta'limi va sud amaliyoti.",
        "The Adolat Partners team: partners, their specialisations, education and courtroom record.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Дело ведёт тот юрист, с которым вы говорили на консультации. Передача дела внутри бюро возможна только с вашего письменного согласия — это условие мы включаем в договор.",
                "Ishni siz konsultatsiyada gaplashgan yurist olib boradi. Ishni byuro ichida boshqasiga topshirish faqat sizning yozma roziligingiz bilan — bu shartni shartnomaga kiritamiz.",
                "Your case is handled by the lawyer you met at the consultation. Reassigning it inside the firm requires your written consent — a clause we put in the contract.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.team(
          "partners",
          L("Состав бюро", "Byuro tarkibi", "The firm"),
          [
            {
              name: L("Бахтиёр Рахмонов", "Baxtiyor Rahmonov", "Bakhtiyor Rakhmonov"),
              role: L("Управляющий партнёр · корпоративное право", "Boshqaruvchi sherik · korporativ huquq", "Managing partner · corporate law"),
              bio: L(
                "ТГЮУ, магистратура по хозяйственному праву. 19 лет практики, из них 6 — юрисконсультом промышленного холдинга.",
                "TDYU, xo'jalik huquqi magistraturasi. 19 yillik amaliyot, shundan 6 yili sanoat xoldingida yuriskonsult.",
                "Tashkent State University of Law, master's in commercial law. Nineteen years in practice, six of them as in-house counsel at an industrial group.",
              ),
            },
            {
              name: L("Нилуфар Хакимова", "Nilufar Hakimova", "Nilufar Khakimova"),
              role: L("Партнёр · налоговые споры", "Sherik · soliq nizolari", "Partner · tax disputes"),
              bio: L(
                "Специализируется на обжаловании доначислений и сопровождении налоговых проверок. Вела дела в кассационной инстанции.",
                "Qo'shimcha hisoblashlarni shikoyat qilish va soliq tekshiruvlarini kuzatishga ixtisoslashgan. Kassatsiya instansiyasida ishlar olib borgan.",
                "Specialises in challenging tax assessments and supporting audits. Has argued cases at cassation level.",
              ),
            },
            {
              name: L("Улугбек Тураев", "Ulug'bek Turayev", "Ulugbek Turaev"),
              role: L("Старший юрист · трудовые и семейные дела", "Katta yurist · mehnat va oilaviy ishlar", "Senior lawyer · employment and family"),
              bio: L(
                "Более 90 трудовых споров, представляет как работников, так и компании. Ведёт приём по субботам.",
                "90 dan ortiq mehnat nizosi, ham xodimlar, ham kompaniyalar nomidan chiqadi. Shanba kunlari qabul qiladi.",
                "More than ninety employment disputes, acting for both employees and companies. Sees clients on Saturdays.",
              ),
            },
            {
              name: L("Зарина Мирзаева", "Zarina Mirzayeva", "Zarina Mirzaeva"),
              role: L("Юрист · недвижимость и договоры", "Yurist · ko'chmas mulk va shartnomalar", "Lawyer · real estate and contracts"),
              bio: L(
                "Проверка объектов перед покупкой, сопровождение сделок, споры о правах на нежилые помещения.",
                "Sotib olishdan oldin obyektlarni tekshirish, bitimlarni kuzatish, noturar joylar huquqi bo'yicha nizolar.",
                "Pre-purchase title checks, transaction support and disputes over commercial premises.",
              ),
            },
          ],
        ),
      ],
    },

    // ------------------------------------------------------------ контакты
    {
      slug: "contacts",
      title: L("Записаться на консультацию", "Konsultatsiyaga yozilish", "Book a consultation"),
      metaDesc: L(
        "Контакты бюро «Adolat Partners»: адрес на Навои, телефон, часы приёма и форма записи на консультацию.",
        "«Adolat Partners» kontaktlari: Navoiy ko'chasidagi manzil, telefon, qabul vaqti va konsultatsiyaga yozilish shakli.",
        "Adolat Partners contacts: the Navoi street address, phone, office hours and a consultation request form.",
      ),
      blocks: [
        S(
          B.richText(
            "where",
            paragraphs(
              L(
                "Офис — на улице Навои, 16, третий этаж, кабинет 305. Вход со стороны сквера, на первом этаже нотариальная контора. От метро «Алишер Навоий» пять минут пешком.",
                "Ofis — Navoiy ko'chasi, 16-uy, uchinchi qavat, 305-xona. Kirish skver tomonidan, birinchi qavatda notarial idora. «Alisher Navoiy» metrosidan besh daqiqa piyoda.",
                "Our office is at 16 Navoi street, third floor, room 305. The entrance faces the square; there is a notary's office on the ground floor. Five minutes' walk from Alisher Navoi metro.",
              ),
              L(
                "Приём только по предварительной записи, будни с 9:00 до 18:00. По субботам с 10:00 до 14:00 принимает Улугбек Тураев — трудовые и семейные дела.",
                "Qabul faqat oldindan yozilib, ish kunlari 9:00 dan 18:00 gacha. Shanba kunlari 10:00 dan 14:00 gacha Ulug'bek Turayev — mehnat va oilaviy ishlar bo'yicha qabul qiladi.",
                "By appointment only, weekdays 9:00–18:00. On Saturdays, Ulugbek Turaev sees clients 10:00–14:00 for employment and family matters.",
              ),
              L(
                "Что взять с собой: документы по делу — договор, переписку, решения или требования, если они уже есть. Чем полнее комплект, тем точнее оценка на первой встрече.",
                "O'zingiz bilan nima olish kerak: ish bo'yicha hujjatlar — shartnoma, yozishmalar, qaror yoki talablar bo'lsa. To'plam qanchalik to'liq bo'lsa, birinchi uchrashuvdagi baho shunchalik aniq bo'ladi.",
                "What to bring: the documents in the matter — the contract, correspondence, any decisions or demands you already have. The fuller the set, the more precise the first assessment.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Заявка на консультацию", "Konsultatsiyaga ariza", "Consultation request"),
            submitLabel: L("Отправить", "Yuborish", "Send"),
            successMessage: L(
              "Заявка получена. Юрист перезвонит в рабочее время и предложит время встречи.",
              "Ariza olindi. Yurist ish vaqtida qo'ng'iroq qilib, uchrashuv vaqtini taklif qiladi.",
              "Request received. A lawyer will call during office hours and propose a time.",
            ),
            fields: [
              { type: "text", label: L("Имя", "Ism", "Name") },
              { type: "tel", label: L("Телефон", "Telefon", "Phone") },
              { type: "email", label: L("Электронная почта", "Elektron pochta", "Email"), required: false },
              { type: "textarea", label: L("Кратко о ситуации", "Vaziyat haqida qisqacha", "Briefly, what the matter is about") },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "spor-o-nezhilom-pomeshchenii",
      categorySlug: "razbor-del",
      title: L(
        "Спор о нежилом помещении: как обременение всплыло за неделю до сделки",
        "Noturar joy bo'yicha nizo: cheklov bitimdan bir hafta oldin qanday ma'lum bo'ldi",
        "A commercial premises dispute: how an encumbrance surfaced a week before completion",
      ),
      excerpt: L(
        "Разбор дела о покупке помещения под кафе: что показала проверка кадастра и почему сделку переиграли.",
        "Kafe uchun joy sotib olish ishi tahlili: kadastr tekshiruvi nimani ko'rsatdi va nega bitim qayta tuzildi.",
        "A case note on buying a café unit: what the cadastre check revealed and why the deal was renegotiated.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Клиент подобрал помещение на первом этаже жилого дома и был готов подписывать договор. Мы запросили выписку и увидели действующий залог по кредиту, о котором продавец не упомянул.",
              "Mijoz turar joy binosining birinchi qavatidan joy tanlagan va shartnoma imzolashga tayyor edi. Biz ko'chirma so'radik va sotuvchi tilga olmagan amaldagi kredit garovini ko'rdik.",
              "The client had found a unit on the ground floor of a residential building and was ready to sign. We requested an extract and found an active mortgage the seller had not mentioned.",
            ),
            L(
              "Второй вопрос был серьёзнее: помещение числилось жилым, а под кафе требовался перевод в нежилой фонд. Процедура занимает от четырёх месяцев и не гарантирует результата при возражениях жильцов.",
              "Ikkinchi masala jiddiyroq edi: joy turar joy sifatida hisoblanardi, kafe uchun esa uni noturar fondga o'tkazish kerak edi. Bu jarayon kamida to'rt oy oladi va uy aholisi e'tiroz bildirsa, natija kafolatlanmaydi.",
              "The second issue was more serious: the unit was registered as residential, and a café required conversion to commercial use — a process that takes at least four months and is not guaranteed if residents object.",
            ),
            L(
              "Сделку переиграли: цену снизили на сумму погашения залога, а расчёт разбили на два этапа — второй после регистрации перевода. Клиент открыл кафе на семь месяцев позже плана, но без судебного спора.",
              "Bitim qayta tuzildi: narx garovni to'lash summasiga kamaytirildi, hisob-kitob ikki bosqichga bo'lindi — ikkinchisi o'tkazish ro'yxatdan o'tgandan keyin. Mijoz kafeni rejadan yetti oy kech ochdi, lekin sudsiz.",
              "The deal was restructured: the price was reduced by the amount needed to clear the mortgage, and payment was split into two stages, the second after the change of use was registered. The client opened seven months later than planned — but without litigation.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "proverka-nalogovoj-chto-delat",
      categorySlug: "biznesu",
      title: L(
        "Пришла налоговая проверка: что делать в первый день",
        "Soliq tekshiruvi keldi: birinchi kuni nima qilish kerak",
        "A tax audit has started: what to do on day one",
      ),
      excerpt: L(
        "Пять шагов для директора: какие документы вправе требовать, что подписывать и чего делать точно не стоит.",
        "Direktor uchun besh qadam: qanday hujjatlarni talab qilishga haqli, nimani imzolash va nima qilmaslik kerak.",
        "Five steps for a director: what inspectors may demand, what to sign, and what not to do.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Первое: попросите приказ о назначении проверки и служебные удостоверения. В приказе должны быть период, предмет и состав проверяющих — за эти рамки выходить нельзя.",
              "Birinchi: tekshiruvni tayinlash haqidagi buyruq va xizmat guvohnomalarini so'rang. Buyruqda davr, predmet va tekshiruvchilar tarkibi bo'lishi kerak — bu doiradan chiqib bo'lmaydi.",
              "First: ask for the order appointing the audit and for the inspectors' credentials. The order must state the period, the scope and the inspectors — nothing outside that is permitted.",
            ),
            L(
              "Второе: назначьте одного человека для передачи документов и ведите реестр — что, когда и кому передали. Хаотичная передача копий потом мешает оспаривать выводы.",
              "Ikkinchi: hujjatlarni topshirish uchun bitta odamni tayinlang va reyestr yuriting — nima, qachon va kimga berilgani. Nusxalarni tartibsiz topshirish keyinchalik xulosalarni bahslashishga xalaqit beradi.",
              "Second: appoint one person to hand over documents and keep a register of what went out, when and to whom. Handing over copies chaotically makes it harder to challenge the findings later.",
            ),
            L(
              "Третье: не подписывайте акт «чтобы отстали». Возражения подаются в установленный срок, и именно они, а не устные споры на месте, работают в суде.",
              "Uchinchi: «qutulish uchun» dalolatnomani imzolamang. E'tirozlar belgilangan muddatda beriladi va sudda joyidagi og'zaki bahs emas, aynan ular ishlaydi.",
              "Third: do not sign the report just to make it stop. Objections are filed within a set deadline, and it is those — not arguments on the spot — that count in court.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "izmeneniya-v-trudovom-kodekse",
      categorySlug: "izmeneniya-zakona",
      title: L(
        "Что меняется в оформлении дистанционных работников",
        "Masofaviy xodimlarni rasmiylashtirishda nima o'zgaradi",
        "What is changing in how remote employees are documented",
      ),
      excerpt: L(
        "Короткий разбор: какие условия теперь обязательно прописывать в трудовом договоре и с какой даты.",
        "Qisqa tahlil: mehnat shartnomasida endi qanday shartlarni majburiy yozish kerak va qaysi sanadan.",
        "A short review: which terms must now appear in the employment contract, and from what date.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Компании всё чаще нанимают сотрудников, которые не приходят в офис. Практика показывает: спор возникает не о зарплате, а о том, считался ли человек на работе в конкретный день.",
              "Kompaniyalar ofisga kelmaydigan xodimlarni tobora ko'proq yollamoqda. Amaliyot shuni ko'rsatadiki, nizo maosh haqida emas, balki odam muayyan kunda ishda hisoblanganmi degan savol atrofida chiqadi.",
              "Companies increasingly hire people who never come to the office. In practice, disputes are rarely about pay — they are about whether the person was considered at work on a given day.",
            ),
            L(
              "Поэтому в договоре с дистанционным работником стоит прямо описать: режим доступности, способ обмена документами, порядок учёта рабочего времени и то, чьё оборудование используется.",
              "Shuning uchun masofaviy xodim bilan shartnomada bevosita yozish kerak: mavjudlik rejimi, hujjat almashish usuli, ish vaqtini hisobga olish tartibi va kimning uskunasi ishlatilishi.",
              "So a remote-work contract should state plainly: availability hours, how documents are exchanged, how working time is recorded, and whose equipment is used.",
            ),
            L(
              "Отдельно рекомендуем закрепить порядок вызова в офис: сколько дней предупреждения и за чей счёт дорога, если сотрудник живёт в другом городе.",
              "Alohida tavsiya: ofisga chaqirish tartibini belgilang — necha kun oldin ogohlantirish va xodim boshqa shaharda yashasa, yo'l kimning hisobidan.",
              "We also recommend fixing the rules for calling someone into the office: how much notice, and who pays for travel if the employee lives in another city.",
            ),
          ),
        ),
      ],
    },
  ],
};
