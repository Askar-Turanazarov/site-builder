import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * IT-курсы «Kod Maktabi» — Мирзо-Улугбекский район Ташкента.
 * Структура профиля: решение принимают по трём вещам — программа, кто ведёт
 * и что с трудоустройством. Поэтому главная строится вокруг направлений,
 * цены вынесены на отдельную страницу с рассрочкой, а отзывы — от выпускников
 * с названием компании, куда они вышли.
 */
export const educationTemplate: SiteTemplate = {
  key: "education",
  label: L("Курсы и учебный центр", "Kurslar va o'quv markazi", "Courses and training centre"),
  profile: L(
    "IT-курсы «Kod Maktabi», Мирзо-Улугбек",
    "«Kod Maktabi» IT-kurslari, Mirzo Ulug'bek",
    "Kod Maktabi IT courses, Mirzo Ulugbek",
  ),
  description: L(
    "Направления обучения, состав преподавателей, стоимость с рассрочкой, отзывы выпускников и запись на пробное занятие.",
    "O'qish yo'nalishlari, o'qituvchilar tarkibi, bo'lib to'lash bilan narx, bitiruvchilar fikri va sinov darsiga yozilish.",
    "Course tracks, the teaching team, prices with instalments, graduate reviews and a trial-lesson sign-up.",
  ),
  themeKey: "education",
  design: { skin: "campus", fontDisplay: "Montserrat", fontBody: "Inter", radiusScale: "lg" },

  settings: {
    siteName: L("Kod Maktabi", "Kod Maktabi", "Kod Maktabi"),
    tagline: L(
      "Учебный центр программирования",
      "Dasturlash o'quv markazi",
      "A programming school",
    ),
    contactEmail: "salom@kodmaktabi.uz",
    contactPhone: "+998 90 133 27 45",
    contactAddress: L(
      "Ташкент, Мирзо-Улугбекский район, ул. Буюк Ипак Йули, 118, 3 этаж",
      "Toshkent, Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi, 118, 3-qavat",
      "Tashkent, Mirzo Ulugbek district, 118 Buyuk Ipak Yuli street, 3rd floor",
    ),
    footerNote: L(
      "© Учебный центр «Kod Maktabi», Ташкент. Занятия: пн–сб, утренние и вечерние группы.",
      "© «Kod Maktabi» o'quv markazi, Toshkent. Darslar: du–sha, ertalabki va kechki guruhlar.",
      "© Kod Maktabi training centre, Tashkent. Classes Mon–Sat, morning and evening groups.",
    ),
  },

  categories: [
    {
      slug: "istorii-vypusknikov",
      order: 1,
      name: L("Истории выпускников", "Bitiruvchilar hikoyalari", "Graduate stories"),
      description: L(
        "Куда вышли работать наши студенты и сколько времени на это ушло.",
        "Talabalarimiz qayerga ishga kirgan va bunga qancha vaqt ketgan.",
        "Where our students ended up working, and how long it took them.",
      ),
    },
    {
      slug: "uchebnye-materialy",
      order: 2,
      name: L("Учебные материалы", "O'quv materiallari", "Learning materials"),
      description: L(
        "Разборы задач, шпаргалки и разъяснения тем, которые чаще всего буксуют.",
        "Masalalar tahlili, qo'llanmalar va ko'pincha qiyin bo'ladigan mavzular izohi.",
        "Problem walkthroughs, cheat sheets and explanations of the topics people get stuck on.",
      ),
    },
    {
      slug: "novosti-centra",
      order: 3,
      name: L("Новости центра", "Markaz yangiliklari", "School news"),
      description: L(
        "Наборы в группы, открытые занятия и изменения в программе.",
        "Guruhlarga qabul, ochiq darslar va dasturdagi o'zgarishlar.",
        "Group intakes, open lessons and changes to the curriculum.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "courses", order: 1, label: L("Направления", "Yo'nalishlar", "Courses") },
    { location: "header", linkType: "page", target: "prices", order: 2, label: L("Стоимость", "Narxi", "Prices") },
    { location: "header", linkType: "page", target: "teachers", order: 3, label: L("Преподаватели", "O'qituvchilar", "Teachers") },
    { location: "header", linkType: "category", target: "istorii-vypusknikov", order: 4, label: L("Выпускники", "Bitiruvchilar", "Graduates") },
    { location: "header", linkType: "page", target: "contacts", order: 5, label: L("Пробное занятие", "Sinov darsi", "Trial lesson") },
    { location: "footer", linkType: "page", target: "courses", order: 1, label: L("Направления", "Yo'nalishlar", "Courses") },
    { location: "footer", linkType: "category", target: "uchebnye-materialy", order: 2, label: L("Материалы", "Materiallar", "Materials") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "IT-курсы в Ташкенте: фронтенд, бэкенд, тестирование и дизайн интерфейсов. Группы по 12 человек, вечерние потоки.",
        "Toshkentdagi IT-kurslar: frontend, backend, testlash va interfeys dizayni. 12 kishilik guruhlar, kechki oqimlar.",
        "IT courses in Tashkent: frontend, backend, QA and interface design. Groups of 12, evening streams.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Профессия в IT за один учебный год",
            "Bir o'quv yilida IT kasbi",
            "An IT profession in one academic year",
          ),
          subheading: L(
            "Четыре направления, группы по 12 человек, занятия три раза в неделю на Буюк Ипак Йули. Первое занятие бесплатное — приходите и решите сами.",
            "To'rt yo'nalish, 12 kishilik guruhlar, Buyuk Ipak Yo'lida haftada uch marta dars. Birinchi dars bepul — kelib, o'zingiz qaror qiling.",
            "Four tracks, groups of 12, classes three times a week on Buyuk Ipak Yuli. The first lesson is free — come and decide for yourself.",
          ),
          ctaLabel: L("Записаться на пробное", "Sinov darsiga yozilish", "Book a trial lesson"),
          ctaLink: "/contacts",
          variant: "centered",
        }),

        S(
          B.stats("stats", [
            { value: L("612", "612", "612"), label: L("Выпускников с 2019 года", "2019-yildan beri bitiruvchilar", "Graduates since 2019") },
            { value: L("71%", "71%", "71%"), label: L("Нашли работу в течение полугода", "Yarim yilda ish topganlar", "Employed within six months") },
            { value: L("12", "12", "12"), label: L("Человек в группе", "Guruhdagi talabalar", "Students per group") },
            { value: L("9 мес.", "9 oy", "9 months"), label: L("Длительность полного курса", "To'liq kurs davomiyligi", "Length of the full course") },
          ]),
          { bg: "ink" },
        ),

        B.features(
          "tracks",
          L("Направления обучения", "O'qish yo'nalishlari", "Course tracks"),
          [
            {
              icon: "rocket",
              title: L("Frontend-разработка", "Frontend dasturlash", "Frontend development"),
              body: L(
                "HTML, CSS, JavaScript, React. Четыре проекта в портфолио, последний — с реальным заказчиком из числа партнёров.",
                "HTML, CSS, JavaScript, React. Portfolioda to'rt loyiha, oxirgisi — hamkorlar orasidan haqiqiy buyurtmachi bilan.",
                "HTML, CSS, JavaScript, React. Four portfolio projects, the last one with a real client from our partner list.",
              ),
            },
            {
              icon: "shield",
              title: L("Backend на Python", "Python backend", "Backend with Python"),
              body: L(
                "Python, SQL, Django, работа с API и деплой. Курс заканчивается сервисом, который вы поднимаете сами.",
                "Python, SQL, Django, API bilan ishlash va deploy. Kurs oxirida xizmatni o'zingiz ishga tushirasiz.",
                "Python, SQL, Django, APIs and deployment. The course ends with a service you deploy yourself.",
              ),
            },
            {
              icon: "check",
              title: L("Тестирование ПО", "Dasturiy ta'minotni testlash", "Software testing"),
              body: L(
                "Ручное и автоматизированное тестирование, Postman, SQL, основы Python. Самый короткий путь в IT — пять месяцев.",
                "Qo'lda va avtomatlashtirilgan testlash, Postman, SQL, Python asoslari. IT ga eng qisqa yo'l — besh oy.",
                "Manual and automated testing, Postman, SQL, Python basics. The shortest route into IT — five months.",
              ),
            },
            {
              icon: "star",
              title: L("UX/UI-дизайн", "UX/UI dizayn", "UX/UI design"),
              body: L(
                "Figma, прототипы, дизайн-системы. Учим сдавать макеты так, чтобы разработчик не задавал вопросов.",
                "Figma, prototiplar, dizayn tizimlari. Maketlarni dasturchi savol bermaydigan qilib topshirishni o'rgatamiz.",
                "Figma, prototypes, design systems. We teach you to hand off mockups a developer won't have to ask about.",
              ),
            },
          ],
          2,
        ),

        S(
          B.testimonials(
            "reviews",
            L("Что говорят выпускники", "Bitiruvchilar nima deydi", "What graduates say"),
            [
              {
                quote: L(
                  "Пришла после декрета, боялась, что не потяну математику. Математики почти не было — была практика каждый вечер. Через месяц после защиты вышла джуном в местную продуктовую компанию.",
                  "Dekretdan keyin keldim, matematikani uddalay olmasam deb qo'rqdim. Matematika deyarli bo'lmadi — har kecha amaliyot bo'ldi. Himoyadan bir oy o'tib mahalliy kompaniyaga junior bo'lib ishga kirdim.",
                  "I came back after maternity leave, worried the maths would break me. There was almost no maths — just practice every evening. A month after the final project I joined a local product company as a junior.",
                ),
                authorName: L("Нигора Аскарова", "Nigora Asqarova", "Nigora Askarova"),
                authorRole: L("Frontend-разработчик, выпуск 2025", "Frontend dasturchi, 2025-yil bitiruvchisi", "Frontend developer, class of 2025"),
              },
              {
                quote: L(
                  "Учился вечером после работы на складе. Тяжело было первые два месяца, потом привык. Сейчас тестировщик, зарплата выросла в три раза.",
                  "Omborxonadagi ishdan keyin kechqurun o'qidim. Birinchi ikki oy qiyin bo'ldi, keyin ko'nikdim. Hozir testerman, maosh uch barobar oshdi.",
                  "I studied evenings after my warehouse shifts. The first two months were hard, then I got used to it. Now I am a tester and earn three times more.",
                ),
                authorName: L("Жасур Тошматов", "Jasur Toshmatov", "Jasur Toshmatov"),
                authorRole: L("QA-инженер, выпуск 2024", "QA muhandisi, 2024-yil bitiruvchisi", "QA engineer, class of 2024"),
              },
              {
                quote: L(
                  "Главное, что дал центр, — привычка доводить проект до конца. Диплом никто не спрашивал, спрашивали GitHub.",
                  "Markaz bergan asosiy narsa — loyihani oxiriga yetkazish odati. Diplomni hech kim so'ramadi, GitHub so'rashdi.",
                  "The main thing the school gave me was the habit of finishing a project. Nobody asked for a diploma — they asked for my GitHub.",
                ),
                authorName: L("Азиз Хамидов", "Aziz Hamidov", "Aziz Khamidov"),
                authorRole: L("Backend-разработчик, выпуск 2024", "Backend dasturchi, 2024-yil bitiruvchisi", "Backend developer, class of 2024"),
              },
            ],
          ),
          { bg: "surface" },
        ),

        S(
          B.faq(
            "faq",
            L("Вопросы перед стартом", "Boshlashdan oldingi savollar", "Questions before you start"),
            [
              {
                question: L("Нужен ли английский?", "Ingliz tili kerakmi?", "Do I need English?"),
                answer: L(
                  "На старте — нет, все занятия на русском и узбекском. С третьего месяца добавляем чтение документации, для этого хватает уровня A2.",
                  "Boshida — yo'q, barcha darslar rus va o'zbek tilida. Uchinchi oydan hujjatlarni o'qishni qo'shamiz, buning uchun A2 daraja yetadi.",
                  "Not at the start — classes are in Russian and Uzbek. From month three we add reading documentation, for which A2 is enough.",
                ),
              },
              {
                question: L("Что если пропущу занятие?", "Darsni qoldirsam-chi?", "What if I miss a class?"),
                answer: L(
                  "Все занятия записываются, запись доступна группе до конца курса. Разбор пропущенной темы — на консультации по субботам.",
                  "Barcha darslar yozib olinadi, yozuv guruhga kurs oxirigacha ochiq. Qoldirilgan mavzuni shanba kungi konsultatsiyada tahlil qilamiz.",
                  "Every class is recorded and stays available to the group until the end of the course. Missed topics are covered in Saturday consultations.",
                ),
              },
              {
                question: L("Помогаете с трудоустройством?", "Ishga joylashishga yordam berasizmi?", "Do you help with job placement?"),
                answer: L(
                  "Да: разбор резюме, тренировочное собеседование и рекомендации в 20 компаний-партнёров. Гарантий трудоустройства не даём — это было бы нечестно.",
                  "Ha: rezyume tahlili, mashq suhbati va 20 hamkor kompaniyaga tavsiya. Ishga joylashish kafolatini bermaymiz — bu halol bo'lmasdi.",
                  "Yes: CV review, a mock interview and referrals to 20 partner companies. We do not promise a job — that would be dishonest.",
                ),
              },
            ],
          ),
          { width: "narrow" },
        ),

        S(
          B.cta("cta", {
            heading: L("Ближайший набор — 15 октября", "Yaqin qabul — 15-oktabr", "Next intake: 15 October"),
            body: L(
              "В группе осталось четыре места. Пробное занятие бесплатное и ни к чему не обязывает.",
              "Guruhda to'rtta joy qoldi. Sinov darsi bepul va hech narsaga majburlamaydi.",
              "Four places left in the group. The trial lesson is free and commits you to nothing.",
            ),
            buttonLabel: L("Занять место", "Joy band qilish", "Reserve a place"),
            buttonLink: "/contacts",
          }),
          { bg: "accent", align: "center" },
        ),
      ],
    },

    // ---------------------------------------------------------- направления
    {
      slug: "courses",
      title: L("Направления", "Yo'nalishlar", "Courses"),
      metaDesc: L(
        "Программы курсов «Kod Maktabi»: фронтенд, Python-бэкенд, тестирование, UX/UI. Длительность, расписание и итоговые проекты.",
        "«Kod Maktabi» kurs dasturlari: frontend, Python backend, testlash, UX/UI. Davomiyligi, jadval va yakuniy loyihalar.",
        "Kod Maktabi curricula: frontend, Python backend, QA and UX/UI. Duration, schedule and final projects.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Все курсы устроены одинаково: две трети времени — практика, каждая тема заканчивается задачей с проверкой преподавателя, а курс — проектом, который не стыдно показать работодателю.",
                "Barcha kurslar bir xil qurilgan: vaqtning uchdan ikkisi — amaliyot, har bir mavzu o'qituvchi tekshiradigan masala bilan, kurs esa ish beruvchiga ko'rsatsa bo'ladigan loyiha bilan tugaydi.",
                "Every course works the same way: two thirds of the time is practice, each topic ends with a graded assignment, and the course ends with a project you can show an employer.",
              ),
              L(
                "Занятия три раза в неделю по два часа: утренние группы в 10:00, вечерние в 19:00. Суббота — консультации и разбор проектов.",
                "Darslar haftada uch marta, ikki soatdan: ertalabki guruhlar 10:00 da, kechkilari 19:00 da. Shanba — konsultatsiya va loyihalar tahlili.",
                "Classes run three times a week for two hours: morning groups at 10:00, evening groups at 19:00. Saturday is for consultations and project reviews.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.imageText("frontend", {
          heading: L("Frontend-разработка · 9 месяцев", "Frontend dasturlash · 9 oy", "Frontend development · 9 months"),
          body: L(
            "Вёрстка и адаптивность, JavaScript и работа с DOM, React и состояние приложения, Git и командная работа. Финальный проект — интерфейс интернет-магазина с корзиной и оплатой, который вы защищаете перед приглашённым разработчиком из компании-партнёра.",
            "Verstka va moslashuvchanlik, JavaScript va DOM bilan ishlash, React va ilova holati, Git va jamoaviy ish. Yakuniy loyiha — savat va to'lovli internet-do'kon interfeysi, uni hamkor kompaniyadan taklif qilingan dasturchi oldida himoya qilasiz.",
            "Markup and responsive layout, JavaScript and the DOM, React and application state, Git and teamwork. The final project is an online store interface with a cart and checkout, defended in front of a developer invited from a partner company.",
          ),
          imageSide: "right",
        }),

        B.imageText("backend", {
          heading: L("Backend на Python · 9 месяцев", "Python backend · 9 oy", "Backend with Python · 9 months"),
          body: L(
            "Основы Python, SQL и проектирование базы, Django и REST API, авторизация, тесты, деплой на сервер. К концу курса у студента работает собственный сервис с документацией — обычно это учёт для небольшого бизнеса.",
            "Python asoslari, SQL va bazani loyihalash, Django va REST API, avtorizatsiya, testlar, serverga deploy. Kurs oxirida talabaning hujjatlashtirilgan xizmati ishlaydi — odatda kichik biznes uchun hisob tizimi.",
            "Python fundamentals, SQL and database design, Django and REST APIs, authentication, tests and server deployment. By the end each student runs their own documented service — usually a small-business record system.",
          ),
          imageSide: "left",
        }),

        B.imageText("qa", {
          heading: L("Тестирование ПО · 5 месяцев", "Dasturiy ta'minotni testlash · 5 oy", "Software testing · 5 months"),
          body: L(
            "Виды тестирования, тест-кейсы и баг-репорты, Postman и работа с API, SQL-запросы, первые автотесты на Python. Курс короче остальных, потому что даёт одну конкретную роль в команде, а не широкий стек.",
            "Testlash turlari, test-keyslar va bag-hisobotlar, Postman va API bilan ishlash, SQL so'rovlar, Pythonda birinchi avtotestlar. Kurs qisqaroq, chunki keng stek emas, jamoadagi bitta aniq rolni beradi.",
            "Types of testing, test cases and bug reports, Postman and APIs, SQL queries, first automated tests in Python. It is shorter than the rest because it prepares you for one specific role rather than a broad stack.",
          ),
          imageSide: "right",
        }),

        B.imageText("design", {
          heading: L("UX/UI-дизайн · 7 месяцев", "UX/UI dizayn · 7 oy", "UX/UI design · 7 months"),
          body: L(
            "Исследование пользователей, прототипирование, типографика и сетки, дизайн-система и передача макетов в разработку. Три проекта в портфолио, один из них — редизайн реального сайта ташкентского бизнеса.",
            "Foydalanuvchilarni o'rganish, prototiplash, tipografika va setkalar, dizayn tizimi va maketlarni dasturchiga topshirish. Portfolioda uch loyiha, biri — toshkentlik biznes saytining redizayni.",
            "User research, prototyping, typography and grids, design systems and developer handoff. Three portfolio projects, one of them a redesign of a real Tashkent business site.",
          ),
          imageSide: "left",
        }),

        // Здесь был блок видео со ссылкой на посторонний ролик — в готовом
        // шаблоне это мусор. Ставим кадр с текстом: свою запись занятия
        // администратор добавит блоком «Видео» сам.
        S(
          B.imageText("open-lesson", {
            heading: L("Открытое занятие по субботам", "Shanba kunlari ochiq dars", "Open lesson on Saturdays"),
            body: L(
              "Раз в две недели мы проводим открытый урок: полтора часа настоящего занятия, без презентаций о том, как хорошо учиться. Приходите посмотреть на преподавателя и на группу до того, как платить за курс.",
              "Ikki haftada bir marta ochiq dars o'tkazamiz: bir yarim soat haqiqiy mashg'ulot, «qanday yaxshi o'qish kerak» degan taqdimotlarsiz. Kursga to'lashdan oldin o'qituvchi va guruhni ko'rib keting.",
              "Every other week we run an open lesson: ninety minutes of a real class, with none of the talks about how to study well. Come and look at the teacher and the group before you pay for anything.",
            ),
            imageSide: "right",
            ctaLabel: L("Записаться на открытое занятие", "Ochiq darsga yozilish", "Sign up for the open lesson"),
            ctaLink: "/contacts",
          }),
          { bg: "surface" },
        ),
      ],
    },

    // ----------------------------------------------------------- стоимость
    {
      slug: "prices",
      title: L("Стоимость", "Narxi", "Prices"),
      metaDesc: L(
        "Стоимость обучения в «Kod Maktabi»: помесячно, полный курс со скидкой и рассрочка без банка.",
        "«Kod Maktabi»da o'qish narxi: oylik, chegirmali to'liq kurs va banksiz bo'lib to'lash.",
        "Tuition at Kod Maktabi: monthly, discounted full course and instalments without a bank.",
      ),
      blocks: [
        B.pricing(
          "plans",
          L("Три способа оплатить обучение", "O'qishni to'lashning uch yo'li", "Three ways to pay for the course"),
          [
            {
              name: L("Помесячно", "Oylik", "Monthly"),
              price: L("1 200 000 сум", "1 200 000 so'm", "1,200,000 UZS"),
              period: L("в месяц", "oyiga", "per month"),
              features: [
                L("Оплата до 5 числа каждого месяца", "Har oyning 5-sanasigacha to'lov", "Paid by the 5th of each month"),
                L("Можно прервать после любого месяца", "Istalgan oydan keyin to'xtatish mumkin", "You can stop after any month"),
                L("Доступ к записям на время обучения", "O'qish davomida yozuvlarga kirish", "Access to recordings while you study"),
              ],
              ctaLabel: L("Записаться", "Yozilish", "Enrol"),
              ctaLink: "/contacts",
            },
            {
              name: L("Полный курс", "To'liq kurs", "Full course"),
              price: L("9 600 000 сум", "9 600 000 so'm", "9,600,000 UZS"),
              period: L("за 9 месяцев, скидка 11%", "9 oyga, 11% chegirma", "for 9 months, 11% off"),
              features: [
                L("Один платёж вместо девяти", "To'qqizta emas, bitta to'lov", "One payment instead of nine"),
                L("Пожизненный доступ к записям", "Yozuvlarga umrbod kirish", "Lifetime access to recordings"),
                L("Помощь с резюме и портфолио", "Rezyume va portfolioga yordam", "CV and portfolio help"),
                L("Тренировочное собеседование", "Mashq suhbati", "A mock interview"),
              ],
              highlighted: true,
              ctaLabel: L("Оплатить курс", "Kursni to'lash", "Pay for the course"),
              ctaLink: "/contacts",
            },
            {
              name: L("Рассрочка центра", "Markaz bo'lib to'lashi", "In-house instalments"),
              price: L("1 350 000 сум", "1 350 000 so'm", "1,350,000 UZS"),
              period: L("в месяц, без банка и процентов", "oyiga, banksiz va foizsiz", "per month, no bank, no interest"),
              features: [
                L("Договор напрямую с центром", "Shartnoma to'g'ridan-to'g'ri markaz bilan", "Contract directly with the school"),
                L("Первый платёж через месяц после старта", "Birinchi to'lov boshlangandan bir oy keyin", "First payment a month after you start"),
                L("Без справки о доходах", "Daromad haqida ma'lumotnomasiz", "No income certificate needed"),
              ],
              ctaLabel: L("Обсудить условия", "Shartlarni muhokama qilish", "Discuss terms"),
              ctaLink: "/contacts",
            },
          ],
        ),

        S(
          B.features(
            "included",
            L("Что входит в любую оплату", "Har qanday to'lovga nima kiradi", "Included in every option"),
            [
              {
                icon: "users",
                title: L("Группа до 12 человек", "12 kishigacha guruh", "Groups of up to 12"),
                body: L(
                  "Преподаватель успевает проверить код каждого на занятии, а не только у самых активных.",
                  "O'qituvchi darsda faqat faollarning emas, har birining kodini tekshirishga ulguradi.",
                  "The teacher gets to every student's code in class, not only the loudest ones.",
                ),
              },
              {
                icon: "message",
                title: L("Куратор в Telegram", "Telegramda kurator", "A mentor on Telegram"),
                body: L(
                  "Отвечает по будням с 9:00 до 21:00 — на вопросы по домашке не нужно ждать следующего занятия.",
                  "Ish kunlari 9:00 dan 21:00 gacha javob beradi — uy ishi bo'yicha savolga keyingi darsni kutish shart emas.",
                  "Answers on weekdays 9:00–21:00, so homework questions don't wait for the next class.",
                ),
              },
              {
                icon: "star",
                title: L("Защита проекта", "Loyiha himoyasi", "Project defence"),
                body: L(
                  "Финальный проект вы защищаете перед действующим разработчиком, а не перед своим же преподавателем.",
                  "Yakuniy loyihani o'z o'qituvchingiz oldida emas, amaldagi dasturchi oldida himoya qilasiz.",
                  "You defend your final project in front of a working developer, not your own teacher.",
                ),
              },
            ],
          ),
          { bg: "surface" },
        ),
      ],
    },

    // ------------------------------------------------------- преподаватели
    {
      slug: "teachers",
      title: L("Преподаватели", "O'qituvchilar", "Teachers"),
      metaDesc: L(
        "Преподаватели «Kod Maktabi» — практикующие разработчики, дизайнеры и тестировщики из компаний Ташкента.",
        "«Kod Maktabi» o'qituvchilari — Toshkent kompaniyalaridagi amaldagi dasturchi, dizayner va testerlar.",
        "Kod Maktabi teachers are working developers, designers and testers from Tashkent companies.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Все преподаватели продолжают работать в разработке: минимум три дня в неделю они пишут код не для учебных примеров, а для продакшена. Мы считаем это обязательным условием — иначе программа устаревает за полтора года.",
                "Barcha o'qituvchilar dasturlashda ishlashda davom etadi: haftasiga kamida uch kun ular o'quv misollari uchun emas, produkshen uchun kod yozadi. Buni majburiy shart deb bilamiz — aks holda dastur bir yarim yilda eskiradi.",
                "All our teachers still work in the industry: at least three days a week they write production code, not teaching examples. We treat this as a hard requirement — otherwise a curriculum goes stale in about eighteen months.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.team(
          "team",
          L("Кто ведёт занятия", "Kim dars beradi", "Who teaches"),
          [
            {
              name: L("Шухрат Мирзаев", "Shuhrat Mirzayev", "Shukhrat Mirzaev"),
              role: L("Frontend, 8 лет в разработке", "Frontend, dasturlashda 8 yil", "Frontend, 8 years in the industry"),
              bio: L(
                "Ведёт JavaScript и React. Работает в продуктовой команде банковского приложения, преподаёт вечерние группы.",
                "JavaScript va React dan dars beradi. Bank ilovasining mahsulot jamoasida ishlaydi, kechki guruhlarni olib boradi.",
                "Teaches JavaScript and React. Works on a banking app product team, teaches evening groups.",
              ),
            },
            {
              name: L("Камола Юсупова", "Kamola Yusupova", "Kamola Yusupova"),
              role: L("Backend, 11 лет в разработке", "Backend, dasturlashda 11 yil", "Backend, 11 years in the industry"),
              bio: L(
                "Python и базы данных. До преподавания собирала бэкенд для сервиса доставки, знает, как ломаются вещи в проде.",
                "Python va ma'lumotlar bazasi. O'qitishdan oldin yetkazib berish xizmati uchun backend qurgan, produkshenda nima buzilishini biladi.",
                "Python and databases. Before teaching she built the backend for a delivery service and knows how things break in production.",
              ),
            },
            {
              name: L("Тимур Садыков", "Timur Sodiqov", "Timur Sadykov"),
              role: L("QA, 6 лет в тестировании", "QA, testlashda 6 yil", "QA, 6 years in testing"),
              bio: L(
                "Ручное и авто-тестирование. Учит писать баг-репорты так, чтобы разработчик воспроизвёл ошибку с первого раза.",
                "Qo'lda va avtomatik testlash. Dasturchi xatoni birinchi urinishda takrorlaydigan bag-hisobot yozishni o'rgatadi.",
                "Manual and automated testing. Teaches bug reports a developer can reproduce on the first try.",
              ),
            },
            {
              name: L("Севара Абдуллаева", "Sevara Abdullayeva", "Sevara Abdullaeva"),
              role: L("UX/UI, 9 лет в дизайне", "UX/UI, dizaynda 9 yil", "UX/UI, 9 years in design"),
              bio: L(
                "Дизайн интерфейсов и исследования. Ведёт разбор чужих макетов — самое полезное занятие курса по отзывам студентов.",
                "Interfeys dizayni va tadqiqotlar. Boshqalarning maketlarini tahlil qiladi — talabalar fikricha, kursning eng foydali darsi.",
                "Interface design and research. Runs the critique sessions — students say it is the most useful class on the course.",
              ),
            },
          ],
        ),

        S(
          B.cta("cta", {
            heading: L("Хотите посмотреть, как ведут занятия?", "Darslar qanday o'tishini ko'rmoqchimisiz?", "Want to see a class first?"),
            body: L(
              "Приходите на открытое занятие в ближайшую субботу — вход свободный, регистрация по форме.",
              "Yaqin shanba kuni ochiq darsga keling — kirish bepul, ro'yxatdan o'tish shakl orqali.",
              "Come to the open lesson this Saturday — free entry, sign up through the form.",
            ),
            buttonLabel: L("Зарегистрироваться", "Ro'yxatdan o'tish", "Register"),
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
      title: L("Пробное занятие", "Sinov darsi", "Trial lesson"),
      metaDesc: L(
        "Записаться на бесплатное пробное занятие «Kod Maktabi»: адрес на Буюк Ипак Йули, телефон и форма.",
        "«Kod Maktabi» bepul sinov darsiga yozilish: Buyuk Ipak Yo'lidagi manzil, telefon va shakl.",
        "Book a free trial lesson at Kod Maktabi: the Buyuk Ipak Yuli address, phone and form.",
      ),
      blocks: [
        S(
          B.richText(
            "where",
            paragraphs(
              L(
                "Центр находится на Буюк Ипак Йули, 118, третий этаж бизнес-центра напротив ТЦ «Компас». От метро «Буюк Ипак Йули» — семь минут пешком.",
                "Markaz Buyuk Ipak Yo'li, 118-uy, «Kompas» savdo markazi ro'parasidagi biznes-markazning uchinchi qavatida. «Buyuk Ipak Yo'li» metrosidan yetti daqiqa piyoda.",
                "The school is at 118 Buyuk Ipak Yuli, third floor of the business centre opposite the Kompas mall. Seven minutes on foot from Buyuk Ipak Yuli metro.",
              ),
              L(
                "Пробное занятие проводим по средам в 19:00 и субботам в 11:00. Ноутбук приносить не нужно — в классе 14 машин.",
                "Sinov darsini chorshanba 19:00 da va shanba 11:00 da o'tkazamiz. Noutbuk olib kelish shart emas — sinfda 14 ta kompyuter bor.",
                "Trial lessons run on Wednesdays at 19:00 and Saturdays at 11:00. No need to bring a laptop — the classroom has 14 machines.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Записаться на пробное занятие", "Sinov darsiga yozilish", "Sign up for a trial lesson"),
            submitLabel: L("Записаться", "Yozilish", "Sign up"),
            successMessage: L(
              "Готово! Куратор напишет в Telegram и подтвердит день и время.",
              "Tayyor! Kurator Telegramda yozadi va kun va vaqtni tasdiqlaydi.",
              "Done. Your mentor will message you on Telegram to confirm the day and time.",
            ),
            fields: [
              { type: "text", label: L("Имя", "Ism", "Name") },
              { type: "tel", label: L("Телефон или Telegram", "Telefon yoki Telegram", "Phone or Telegram") },
              { type: "text", label: L("Какое направление интересует", "Qaysi yo'nalish qiziq", "Which track interests you") },
              { type: "textarea", label: L("Есть ли опыт в программировании", "Dasturlashda tajriba bormi", "Any programming experience?"), required: false },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "iz-buhgalterii-v-testirovanie",
      categorySlug: "istorii-vypusknikov",
      title: L(
        "Из бухгалтерии в тестирование за семь месяцев",
        "Buxgalteriyadan testlashga yetti oyda",
        "From accounting to software testing in seven months",
      ),
      excerpt: L(
        "История Дилшода: пять месяцев курса, два месяца поиска и оффер в аутсорс-компанию на Мирзо-Улугбеке.",
        "Dilshodning tarixi: besh oy kurs, ikki oy izlanish va Mirzo Ulug'bekdagi autsors kompaniyada taklif.",
        "Dilshod's story: five months of study, two months of searching and an offer from an outsourcing company.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Дилшод восемь лет работал бухгалтером в строительной фирме и пришёл к нам в 31 год — по его словам, «последний вагон». Выбрал тестирование как самый короткий путь.",
              "Dilshod qurilish firmasida sakkiz yil buxgalter bo'lib ishlagan va bizga 31 yoshida kelgan — o'z so'zi bilan «oxirgi vagon». Eng qisqa yo'l sifatida testlashni tanladi.",
              "Dilshod spent eight years as an accountant at a construction firm and came to us at 31 — his words: \"the last train\". He picked testing as the shortest route.",
            ),
            L(
              "Первые два месяца давались тяжело: SQL напоминал бухгалтерские выгрузки, но логика запросов долго не складывалась. Помогли субботние консультации и то, что в группе было ещё двое ребят старше тридцати.",
              "Birinchi ikki oy qiyin kechdi: SQL buxgalteriya yuklamalarini eslatardi, lekin so'rovlar mantig'i uzoq vaqt tushunarli bo'lmadi. Shanba konsultatsiyalari va guruhda o'ttizdan oshgan yana ikki kishi borligi yordam berdi.",
              "The first two months were hard: SQL reminded him of accounting exports, but the query logic took a long time to click. Saturday consultations helped, as did having two other students over thirty in the group.",
            ),
            L(
              "После защиты проекта он разослал 40 откликов и сходил на девять собеседований. Оффер пришёл из аутсорс-компании на Мирзо-Улугбеке: ручное тестирование мобильного приложения, зарплата на старте — 6 500 000 сум.",
              "Loyiha himoyasidan keyin u 40 ta ariza yubordi va to'qqizta suhbatda qatnashdi. Taklif Mirzo Ulug'bekdagi autsors kompaniyadan keldi: mobil ilovani qo'lda testlash, boshlang'ich maosh — 6 500 000 so'm.",
              "After defending his project he sent 40 applications and went to nine interviews. The offer came from an outsourcing company in Mirzo Ulugbek: manual testing of a mobile app, starting salary 6,500,000 UZS.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "kak-chitat-oshibki",
      categorySlug: "uchebnye-materialy",
      title: L(
        "Как читать сообщения об ошибках и не паниковать",
        "Xato xabarlarini qanday o'qish va vahima qilmaslik",
        "How to read error messages without panicking",
      ),
      excerpt: L(
        "Разбор для первых недель обучения: где в трассировке ваша строка и почему последняя ошибка редко бывает настоящей.",
        "O'qishning birinchi haftalari uchun tahlil: treysingda sizning satringiz qayerda va nega oxirgi xato kamdan-kam haqiqiy bo'ladi.",
        "A walkthrough for your first weeks: where your line is in a stack trace, and why the last error is rarely the real one.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Новички читают сообщение об ошибке снизу вверх и пугаются длинного текста. На деле трассировка — это маршрут: сверху то, что вызвали вы, снизу — где всё сломалось.",
              "Yangi boshlovchilar xato xabarini pastdan yuqoriga o'qib, uzun matndan qo'rqishadi. Aslida treysing — bu yo'nalish: yuqorida siz chaqirgan narsa, pastda esa nima buzilgani.",
              "Beginners read an error from the bottom up and panic at the length. A stack trace is really a route: the top is what you called, the bottom is where it broke.",
            ),
            L(
              "Ищите в трассировке первое упоминание файла, который написали вы. Ошибка почти всегда там, а не в библиотеке — библиотеки ломаются гораздо реже, чем кажется на второй неделе обучения.",
              "Treysingda o'zingiz yozgan fayl birinchi marta tilga olingan joyni qidiring. Xato deyarli har doim o'sha yerda, kutubxonada emas — kutubxonalar o'qishning ikkinchi haftasida ko'ringanidan ancha kam buziladi.",
              "Look for the first mention of a file you wrote yourself. The bug is almost always there, not in the library — libraries break far less often than they seem to in week two.",
            ),
            L(
              "И главное правило: сообщение об ошибке — это не оскорбление, а самая подробная подсказка, которую вам когда-либо давал компьютер. Скопируйте её целиком в поиск, прежде чем писать куратору.",
              "Va asosiy qoida: xato xabari — haqorat emas, kompyuter sizga bergan eng batafsil maslahat. Kuratorga yozishdan oldin uni to'liq nusxalab qidiruvga qo'ying.",
              "And the main rule: an error message is not an insult, it is the most detailed hint a computer will ever give you. Paste the whole thing into search before messaging your mentor.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "nabor-oktyabr",
      categorySlug: "novosti-centra",
      title: L(
        "Октябрьский набор: открыли вторую группу по фронтенду",
        "Oktabr qabuli: frontend bo'yicha ikkinchi guruh ochildi",
        "October intake: a second frontend group",
      ),
      excerpt: L(
        "Вечерняя группа заполнилась за девять дней, поэтому открываем дневную с занятиями по будням в 10:00.",
        "Kechki guruh to'qqiz kunda to'ldi, shuning uchun ish kunlari 10:00 da kunduzgi guruh ochamiz.",
        "The evening group filled up in nine days, so we are opening a daytime one on weekdays at 10:00.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Набор на фронтенд закрылся быстрее обычного: 12 мест разобрали за девять дней. Мы открываем вторую группу — занятия по понедельникам, средам и пятницам в 10:00.",
              "Frontendga qabul odatdagidan tezroq yopildi: 12 ta joy to'qqiz kunda band bo'ldi. Ikkinchi guruh ochamiz — dushanba, chorshanba va juma kunlari 10:00 da.",
              "The frontend intake closed faster than usual: twelve places went in nine days. We are opening a second group — Mondays, Wednesdays and Fridays at 10:00.",
            ),
            L(
              "Ведёт группу Шухрат Мирзаев, программа та же, что у вечернего потока. Старт — 15 октября, пробное занятие в субботу 11 октября в 11:00.",
              "Guruhni Shuhrat Mirzayev olib boradi, dastur kechki oqim bilan bir xil. Boshlanish — 15-oktabr, sinov darsi 11-oktabr shanba kuni 11:00 da.",
              "Shukhrat Mirzaev will teach it, with the same curriculum as the evening stream. Classes start on 15 October; the trial lesson is on Saturday 11 October at 11:00.",
            ),
          ),
        ),
      ],
    },
  ],
};
