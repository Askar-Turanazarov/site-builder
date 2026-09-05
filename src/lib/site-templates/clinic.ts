import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * Семейная клиника «Sog'lom Oila» — Чиланзарский район Ташкента.
 * Структура профиля: доверие важнее продаж, поэтому на первом экране —
 * состав врачей и запись, дальше прозрачный прайс и ответы про страховку.
 * Галереи намеренно нет: в медицине снимки кабинетов работают хуже, чем
 * фамилии врачей и понятные цены.
 */
export const clinicTemplate: SiteTemplate = {
  key: "clinic",
  label: L("Медцентр и клиника", "Tibbiyot markazi va klinika", "Medical centre and clinic"),
  profile: L(
    "Семейная клиника «Sog'lom Oila», Чиланзар",
    "«Sog'lom Oila» oilaviy klinikasi, Chilonzor",
    "Sog'lom Oila family clinic, Chilanzar",
  ),
  description: L(
    "Врачи с расписанием и стажем, прозрачный прайс на приёмы и анализы, форма записи и ответы про страховку.",
    "Jadval va tajribasi bilan shifokorlar, qabul va tahlillar uchun ochiq narxlar, navbat shakli va sug'urta bo'yicha javoblar.",
    "Doctors with real schedules, a transparent price list for visits and lab tests, a booking form and clear answers about insurance.",
  ),
  themeKey: "clinic",
  design: { skin: "care", fontDisplay: "Manrope", fontBody: "Open Sans", radiusScale: "md" },

  settings: {
    siteName: L("Sog'lom Oila", "Sog'lom Oila", "Sog'lom Oila"),
    tagline: L(
      "Семейная клиника на Чиланзаре",
      "Chilonzordagi oilaviy klinika",
      "A family clinic in Chilanzar",
    ),
    contactEmail: "reception@soglomoila.uz",
    contactPhone: "+998 71 276 40 12",
    contactAddress: L(
      "Ташкент, Чиланзарский район, ул. Бунёдкор, 41",
      "Toshkent, Chilonzor tumani, Bunyodkor ko'chasi, 41",
      "Tashkent, Chilanzar district, 41 Bunyodkor street",
    ),
    footerNote: L(
      "© Клиника «Sog'lom Oila». Лицензия № 12-04/218. Приём: пн–сб, 8:00–20:00.",
      "© «Sog'lom Oila» klinikasi. Litsenziya № 12-04/218. Qabul: du–sha, 8:00–20:00.",
      "© Sog'lom Oila clinic. Licence No. 12-04/218. Open Mon–Sat, 8:00–20:00.",
    ),
  },

  categories: [
    {
      slug: "sovety-vracha",
      order: 1,
      name: L("Советы врача", "Shifokor maslahati", "Doctor's advice"),
      description: L(
        "Короткие разборы от наших специалистов: что делать до приёма и когда идти сразу.",
        "Mutaxassislarimizdan qisqa tushuntirishlar: qabulgacha nima qilish va qachon darhol murojaat qilish kerak.",
        "Short explainers from our specialists: what to do before a visit and when to come immediately.",
      ),
    },
    {
      slug: "detskoe-zdorove",
      order: 2,
      name: L("Детское здоровье", "Bolalar salomatligi", "Children's health"),
      description: L(
        "Прививки, режим, сезонные болезни — для родителей дошкольников и школьников.",
        "Emlash, kun tartibi, mavsumiy kasalliklar — maktabgacha va maktab yoshidagi bolalar ota-onalari uchun.",
        "Vaccination, routines and seasonal illnesses — for parents of preschool and school children.",
      ),
    },
    {
      slug: "novosti-kliniki",
      order: 3,
      name: L("Новости клиники", "Klinika yangiliklari", "Clinic news"),
      description: L(
        "Новое оборудование, новые врачи и изменения в расписании.",
        "Yangi uskunalar, yangi shifokorlar va jadvaldagi o'zgarishlar.",
        "New equipment, new doctors and schedule changes.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "doctors", order: 1, label: L("Врачи", "Shifokorlar", "Doctors") },
    { location: "header", linkType: "page", target: "services", order: 2, label: L("Услуги и цены", "Xizmat va narxlar", "Services and prices") },
    { location: "header", linkType: "category", target: "sovety-vracha", order: 3, label: L("Советы врача", "Maslahatlar", "Advice") },
    { location: "header", linkType: "page", target: "contacts", order: 4, label: L("Запись", "Navbat", "Booking") },
    { location: "footer", linkType: "page", target: "services", order: 1, label: L("Прайс", "Narxlar", "Prices") },
    { location: "footer", linkType: "page", target: "doctors", order: 2, label: L("Врачи", "Shifokorlar", "Doctors") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Семейная клиника на Чиланзаре: терапевт, педиатр, УЗИ и анализы. Запись: +998 71 276 40 12.",
        "Chilonzordagi oilaviy klinika: terapevt, pediatr, UTT va tahlillar. Navbat: +998 71 276 40 12.",
        "A family clinic in Chilanzar: GP, paediatrician, ultrasound and lab tests. Book on +998 71 276 40 12.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Клиника, куда ходит вся семья",
            "Butun oila qatnaydigan klinika",
            "The clinic your whole family goes to",
          ),
          subheading: L(
            "Терапевт, педиатр, УЗИ и своя лаборатория в одном здании на Бунёдкор. Приём с 8:00, результаты анализов — в тот же день.",
            "Terapevt, pediatr, UTT va o'z laboratoriyamiz Bunyodkordagi bitta binoda. Qabul 8:00 dan, tahlil natijalari o'sha kuni.",
            "A GP, a paediatrician, ultrasound and our own lab in one building on Bunyodkor. Visits from 8:00, lab results the same day.",
          ),
          ctaLabel: L("Записаться на приём", "Navbatga yozilish", "Book a visit"),
          ctaLink: "/contacts",
          variant: "split",
        }),

        S(
          B.stats("stats", [
            { value: L("14 лет", "14 yil", "14 years"), label: L("Работаем на Чиланзаре", "Chilonzorda ishlaymiz", "In Chilanzar since 2012") },
            { value: L("11", "11", "11"), label: L("Врачей в штате", "Shtatdagi shifokorlar", "Doctors on staff") },
            { value: L("4 часа", "4 soat", "4 hours"), label: L("Готовность общего анализа", "Umumiy tahlil tayyorligi", "Turnaround for a blood count") },
            { value: L("0 сум", "0 so'm", "0 UZS"), label: L("Повторный приём за 14 дней", "14 kun ichida takroriy qabul", "Follow-up within 14 days") },
          ]),
          { bg: "surface" },
        ),

        B.features(
          "services",
          L("С чем к нам приходят", "Bizga nima bilan murojaat qilishadi", "What people come to us with"),
          [
            {
              icon: "heart",
              title: L("Терапевт", "Terapevt", "General practice"),
              body: L(
                "Первичный приём 30 минут: осмотр, разбор жалоб, план обследования. Без «зайдите завтра».",
                "Birlamchi qabul 30 daqiqa: ko'rik, shikoyat tahlili, tekshiruv rejasi. «Ertaga keling» degani yo'q.",
                "A 30-minute first visit: examination, review of symptoms, a plan for tests. No \"come back tomorrow\".",
              ),
            },
            {
              icon: "users",
              title: L("Педиатр", "Pediatr", "Paediatrics"),
              body: L(
                "Ведение с рождения до 18 лет, прививки по национальному календарю, справки в сад и школу.",
                "Tug'ilgandan 18 yoshgacha kuzatuv, milliy kalendar bo'yicha emlash, bog'cha va maktab uchun ma'lumotnomalar.",
                "Care from birth to 18, vaccination on the national schedule, certificates for kindergarten and school.",
              ),
            },
            {
              icon: "chart",
              title: L("УЗИ и ЭКГ", "UTT va ECG", "Ultrasound and ECG"),
              body: L(
                "Брюшная полость, щитовидная железа, сосуды шеи. Заключение врач выдаёт сразу после исследования.",
                "Qorin bo'shlig'i, qalqonsimon bez, bo'yin tomirlari. Xulosani shifokor tekshiruvdan keyin darhol beradi.",
                "Abdomen, thyroid, neck vessels. The doctor hands you the report right after the scan.",
              ),
            },
            {
              icon: "check",
              title: L("Лаборатория", "Laboratoriya", "Laboratory"),
              body: L(
                "Кровь, моча, гормоны, аллергопанели. Забор с 8:00 до 11:00, результат — на почту.",
                "Qon, siydik, gormonlar, allergiya panellari. Namuna 8:00–11:00, natija pochtaga keladi.",
                "Blood, urine, hormones, allergy panels. Sampling 8:00–11:00, results by email.",
              ),
            },
          ],
          4,
        ),

        S(
          B.team(
            "doctors",
            L("Кто ведёт приём", "Kim qabul qiladi", "Who sees patients"),
            [
              {
                name: L("Дилноза Ахмедова", "Dilnoza Ahmedova", "Dilnoza Akhmedova"),
                role: L("Терапевт, стаж 16 лет", "Terapevt, 16 yil tajriba", "GP, 16 years"),
                bio: L(
                  "ТашПМИ, ординатура по внутренним болезням. Ведёт пациентов с гипертонией и диабетом второго типа.",
                  "ToshPTI, ichki kasalliklar ordinaturasi. Gipertoniya va 2-tur diabetli bemorlarni kuzatadi.",
                  "Tashkent Paediatric Medical Institute, residency in internal medicine. Manages hypertension and type 2 diabetes.",
                ),
              },
              {
                name: L("Санжар Юлдашев", "Sanjar Yo'ldoshev", "Sanjar Yuldashev"),
                role: L("Педиатр, стаж 9 лет", "Pediatr, 9 yil tajriba", "Paediatrician, 9 years"),
                bio: L(
                  "Ведёт детей с рождения, отдельный приём для новорождённых по вторникам и четвергам.",
                  "Chaqaloqlardan boshlab kuzatadi, yangi tug'ilganlar uchun seshanba va payshanba alohida qabul.",
                  "Cares for children from birth; a dedicated newborn clinic on Tuesdays and Thursdays.",
                ),
              },
              {
                name: L("Малика Рахимова", "Malika Rahimova", "Malika Rakhimova"),
                role: L("Врач УЗИ, стаж 12 лет", "UTT shifokori, 12 yil tajriba", "Ultrasound specialist, 12 years"),
                bio: L(
                  "Заключение выдаёт сразу после исследования и объясняет его словами, а не терминами.",
                  "Xulosani darhol beradi va uni atamalar bilan emas, oddiy so'zlar bilan tushuntiradi.",
                  "Gives the report right after the scan and explains it in plain words, not jargon.",
                ),
              },
              {
                name: L("Отабек Каримов", "Otabek Karimov", "Otabek Karimov"),
                role: L("Кардиолог, стаж 21 год", "Kardiolog, 21 yil tajriba", "Cardiologist, 21 years"),
                bio: L(
                  "Приём по средам и субботам. Холтер и суточный мониторинг давления с выдачей прибора на дом.",
                  "Chorshanba va shanba qabul qiladi. Xolter va sutkalik bosim monitoringi uskunasi uyga beriladi.",
                  "Sees patients on Wednesdays and Saturdays. Holter and 24-hour blood pressure monitors to take home.",
                ),
              },
            ],
          ),
          { bg: "surface" },
        ),

        S(
          B.faq(
            "faq",
            L("Частые вопросы", "Ko'p beriladigan savollar", "Common questions"),
            [
              {
                question: L("Работаете со страховыми?", "Sug'urta bilan ishlaysizmi?", "Do you work with insurers?"),
                answer: L(
                  "Да, с «Gross Insurance», «Apex Insurance» и «Kafolat». Гарантийное письмо принимаем на ресепшене, доплата — только за услуги вне полиса.",
                  "Ha, «Gross Insurance», «Apex Insurance» va «Kafolat» bilan. Kafolat xatini qabulxonada olamiz, qo'shimcha to'lov faqat polis qamramagan xizmatlarga.",
                  "Yes — Gross Insurance, Apex Insurance and Kafolat. Bring the guarantee letter to reception; you only pay extra for services outside the policy.",
                ),
              },
              {
                question: L("Нужно ли записываться заранее?", "Oldindan yozilish kerakmi?", "Do I need to book in advance?"),
                answer: L(
                  "Терапевт принимает и в живой очереди до 11:00. К кардиологу и на УЗИ — только по записи, обычно на 2–3 дня вперёд.",
                  "Terapevt 11:00 gacha navbat bilan ham qabul qiladi. Kardiolog va UTT ga faqat yozilib, odatda 2–3 kun oldin.",
                  "The GP also takes walk-ins until 11:00. The cardiologist and ultrasound are by appointment, usually 2–3 days ahead.",
                ),
              },
              {
                question: L("Можно сдать анализы без приёма врача?", "Shifokorsiz tahlil topshirsa bo'ladimi?", "Can I have lab tests without seeing a doctor?"),
                answer: L(
                  "Можно. Приходите натощак с 8:00 до 11:00. Результат придёт на электронную почту в тот же день.",
                  "Bo'ladi. Och qoringa 8:00 dan 11:00 gacha keling. Natija o'sha kuni elektron pochtaga keladi.",
                  "You can. Come fasting between 8:00 and 11:00. Results arrive by email the same day.",
                ),
              },
              {
                question: L("Есть вызов врача на дом?", "Uyga shifokor chaqirish bormi?", "Do you make house calls?"),
                answer: L(
                  "Да, по Чиланзару и Учтепе — 150 000 сум, выезд в течение двух часов после звонка. За пределы этих районов не выезжаем.",
                  "Ha, Chilonzor va Uchtepa bo'ylab — 150 000 so'm, qo'ng'iroqdan keyin ikki soat ichida. Bu tumanlardan tashqariga chiqmaymiz.",
                  "Yes, in Chilanzar and Uchtepa — 150,000 UZS, within two hours of your call. We do not travel outside these districts.",
                ),
              },
            ],
          ),
          { width: "narrow" },
        ),

        S(
          B.cta("cta", {
            heading: L("Записаться проще, чем откладывать", "Yozilish kechiktirishdan osonroq", "Booking is easier than putting it off"),
            body: L(
              "Оставьте номер — администратор перезвонит в течение 15 минут в рабочее время и подберёт удобное окно.",
              "Raqamingizni qoldiring — administrator ish vaqtida 15 daqiqada qo'ng'iroq qilib, qulay vaqtni tanlaydi.",
              "Leave your number — reception calls back within 15 minutes during working hours and finds you a slot.",
            ),
            buttonLabel: L("Оставить заявку", "Ariza qoldirish", "Request a call"),
            buttonLink: "/contacts",
          }),
          { bg: "accent", align: "center" },
        ),
      ],
    },

    // --------------------------------------------------------------- врачи
    {
      slug: "doctors",
      title: L("Врачи", "Shifokorlar", "Doctors"),
      metaDesc: L(
        "Врачи клиники «Sog'lom Oila»: терапевты, педиатр, кардиолог, врач УЗИ. Стаж и дни приёма.",
        "«Sog'lom Oila» shifokorlari: terapevtlar, pediatr, kardiolog, UTT shifokori. Tajriba va qabul kunlari.",
        "Doctors at Sog'lom Oila: GPs, a paediatrician, a cardiologist and an ultrasound specialist.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "У нас нет «врачей-невидимок»: каждый специалист ведёт приём по фиксированному расписанию, и вы попадаете к тому же доктору, что и в прошлый раз.",
                "Bizda «ko'rinmas shifokorlar» yo'q: har bir mutaxassis belgilangan jadval bo'yicha qabul qiladi va siz doim o'tgan safargi shifokorga tushasiz.",
                "There are no anonymous doctors here: every specialist works to a fixed schedule, so you always see the same doctor as last time.",
              ),
              L(
                "Первичный приём — 30 минут, повторный по тому же поводу в течение двух недель — бесплатно.",
                "Birlamchi qabul — 30 daqiqa, ikki hafta ichida shu masala bo'yicha takroriy qabul — bepul.",
                "A first visit lasts 30 minutes; a follow-up on the same issue within two weeks is free.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.team(
          "team",
          L("Приём ведут", "Qabul qiladilar", "Our doctors"),
          [
            {
              name: L("Дилноза Ахмедова", "Dilnoza Ahmedova", "Dilnoza Akhmedova"),
              role: L("Терапевт · пн, вт, чт, пт · 8:00–14:00", "Terapevt · du, se, pay, ju · 8:00–14:00", "GP · Mon, Tue, Thu, Fri · 8:00–14:00"),
              bio: L(
                "Хронические заболевания, подбор терапии при гипертонии, ведение диабета второго типа.",
                "Surunkali kasalliklar, gipertoniyada davolashni tanlash, 2-tur diabetni kuzatish.",
                "Chronic conditions, treatment plans for hypertension, ongoing care for type 2 diabetes.",
              ),
            },
            {
              name: L("Азиза Норматова", "Aziza Normatova", "Aziza Normatova"),
              role: L("Терапевт · вт, ср, сб · 14:00–20:00", "Terapevt · se, chor, sha · 14:00–20:00", "GP · Tue, Wed, Sat · 14:00–20:00"),
              bio: L(
                "Вечерний приём для тех, кто работает. Профосмотры, справки для водителей и спортзалов.",
                "Ishlaydiganlar uchun kechki qabul. Profilaktik ko'riklar, haydovchi va sport zali uchun ma'lumotnomalar.",
                "Evening clinic for people who work. Check-ups, certificates for drivers and gyms.",
              ),
            },
            {
              name: L("Санжар Юлдашев", "Sanjar Yo'ldoshev", "Sanjar Yuldashev"),
              role: L("Педиатр · ежедневно · 9:00–15:00", "Pediatr · har kuni · 9:00–15:00", "Paediatrician · daily · 9:00–15:00"),
              bio: L(
                "Новорождённые по вторникам и четвергам с 9:00. Прививки по календарю, справка 063.",
                "Yangi tug'ilganlar seshanba va payshanba 9:00 dan. Kalendar bo'yicha emlash, 063-ma'lumotnoma.",
                "Newborn clinic on Tuesdays and Thursdays from 9:00. Scheduled vaccination, form 063.",
              ),
            },
            {
              name: L("Отабек Каримов", "Otabek Karimov", "Otabek Karimov"),
              role: L("Кардиолог · ср, сб · 10:00–16:00", "Kardiolog · chor, sha · 10:00–16:00", "Cardiologist · Wed, Sat · 10:00–16:00"),
              bio: L(
                "ЭКГ, ЭхоКГ, холтер. Пациенты после инфаркта и с нарушениями ритма — под наблюдением по графику.",
                "ECG, EhoKG, xolter. Infarktdan keyingi va ritm buzilishi bo'lgan bemorlar jadval bo'yicha kuzatiladi.",
                "ECG, echocardiography, Holter monitoring. Post-infarction and arrhythmia patients on scheduled follow-up.",
              ),
            },
            {
              name: L("Малика Рахимова", "Malika Rahimova", "Malika Rakhimova"),
              role: L("УЗИ-диагностика · пн–сб · 8:00–13:00", "UTT diagnostikasi · du–sha · 8:00–13:00", "Ultrasound · Mon–Sat · 8:00–13:00"),
              bio: L(
                "Брюшная полость, почки, щитовидная железа, сосуды шеи, УЗИ детям с трёх месяцев.",
                "Qorin bo'shlig'i, buyraklar, qalqonsimon bez, bo'yin tomirlari, uch oylikdan bolalarga UTT.",
                "Abdomen, kidneys, thyroid, neck vessels; ultrasound for children from three months.",
              ),
            },
            {
              name: L("Гулнора Исаева", "Gulnora Isayeva", "Gulnora Isaeva"),
              role: L("Старшая медсестра", "Katta hamshira", "Head nurse"),
              bio: L(
                "Забор крови, капельницы, перевязки. В клинике с открытия, знает пациентов по именам.",
                "Qon olish, tomchi dorilar, bog'lamlar. Ochilganidan beri klinikada, bemorlarni ismi bilan biladi.",
                "Blood draws, IV drips, dressings. Here since day one and knows patients by name.",
              ),
            },
          ],
        ),

        S(
          B.cta("cta", {
            heading: L("Не знаете, к кому записаться?", "Kimga yozilishni bilmayapsizmi?", "Not sure who to book with?"),
            body: L(
              "Опишите жалобу в заявке — администратор подскажет специалиста и не запишет вас к лишнему врачу.",
              "Arizada shikoyatingizni yozing — administrator kerakli mutaxassisni aytadi va ortiqcha shifokorga yozmaydi.",
              "Describe the problem in the form — reception will point you to the right specialist and won't book you extra visits.",
            ),
            buttonLabel: L("Написать администратору", "Administratorga yozish", "Message reception"),
            buttonLink: "/contacts",
            style: "outline",
          }),
          { bg: "surface", align: "center" },
        ),
      ],
    },

    // ---------------------------------------------------------- услуги/цены
    {
      slug: "services",
      title: L("Услуги и цены", "Xizmatlar va narxlar", "Services and prices"),
      metaDesc: L(
        "Прайс клиники «Sog'lom Oila»: приёмы врачей, УЗИ, анализы и годовое обслуживание семьи.",
        "«Sog'lom Oila» narxlari: shifokor qabullari, UTT, tahlillar va oila uchun yillik xizmat.",
        "Sog'lom Oila price list: doctor visits, ultrasound, lab tests and annual family care.",
      ),
      blocks: [
        S(
          B.richText(
            "note",
            paragraphs(
              L(
                "Цены действуют с 1 сентября 2026 года. Стоимость приёма включает осмотр, заключение и письменные рекомендации — отдельной платы за выписку нет.",
                "Narxlar 2026-yil 1-sentabrdan amal qiladi. Qabul narxiga ko'rik, xulosa va yozma tavsiyalar kiradi — ko'chirma uchun alohida to'lov yo'q.",
                "Prices are valid from 1 September 2026. A visit includes the examination, the report and written recommendations — no separate charge for paperwork.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.pricing(
          "prices",
          L("Приёмы и обслуживание", "Qabul va xizmat", "Visits and care plans"),
          [
            {
              name: L("Разовый приём", "Bir martalik qabul", "Single visit"),
              price: L("120 000 сум", "120 000 so'm", "120,000 UZS"),
              period: L("за приём", "bir qabul uchun", "per visit"),
              features: [
                L("Терапевт или педиатр, 30 минут", "Terapevt yoki pediatr, 30 daqiqa", "GP or paediatrician, 30 minutes"),
                L("Письменное заключение", "Yozma xulosa", "Written report"),
                L("Повторный приём за 14 дней — бесплатно", "14 kun ichida takroriy qabul — bepul", "Free follow-up within 14 days"),
              ],
              ctaLabel: L("Записаться", "Yozilish", "Book"),
              ctaLink: "/contacts",
            },
            {
              name: L("Семейный год", "Oilaviy yil", "Family year"),
              price: L("2 900 000 сум", "2 900 000 so'm", "2,900,000 UZS"),
              period: L("в год на семью до 4 человек", "yiliga 4 kishilik oilaga", "per year, family of up to four"),
              features: [
                L("Безлимитные приёмы терапевта и педиатра", "Terapevt va pediatr qabullari cheklanmagan", "Unlimited GP and paediatrician visits"),
                L("Два комплекса анализов в год на каждого", "Har biriga yiliga ikki marta tahlillar majmuasi", "Two full lab panels a year for each member"),
                L("УЗИ со скидкой 50%", "UTT ga 50% chegirma", "50% off ultrasound"),
                L("Вызов врача на дом — 4 раза в год", "Uyga shifokor chaqiruvi — yiliga 4 marta", "Four house calls a year"),
              ],
              highlighted: true,
              ctaLabel: L("Оформить", "Rasmiylashtirish", "Sign up"),
              ctaLink: "/contacts",
            },
            {
              name: L("Детская программа", "Bolalar dasturi", "Children's programme"),
              price: L("1 450 000 сум", "1 450 000 so'm", "1,450,000 UZS"),
              period: L("в год на ребёнка", "bir bolaga yiliga", "per child, per year"),
              features: [
                L("Плановые осмотры педиатра по возрасту", "Yosh bo'yicha rejali pediatr ko'riklari", "Scheduled paediatric check-ups by age"),
                L("Прививки по национальному календарю", "Milliy kalendar bo'yicha emlash", "National-schedule vaccinations"),
                L("Справки в сад, школу и бассейн", "Bog'cha, maktab va basseyn uchun ma'lumotnomalar", "Certificates for kindergarten, school and the pool"),
              ],
              ctaLabel: L("Записаться", "Yozilish", "Book"),
              ctaLink: "/contacts",
            },
          ],
        ),

        S(
          B.features(
            "lab",
            L("Отдельные исследования", "Alohida tekshiruvlar", "Individual tests"),
            [
              {
                icon: "chart",
                title: L("УЗИ — от 130 000 сум", "UTT — 130 000 so'mdan", "Ultrasound — from 130,000 UZS"),
                body: L(
                  "Брюшная полость 180 000, щитовидная железа 130 000, сосуды шеи 190 000. Заключение сразу.",
                  "Qorin bo'shlig'i 180 000, qalqonsimon bez 130 000, bo'yin tomirlari 190 000. Xulosa darhol.",
                  "Abdomen 180,000; thyroid 130,000; neck vessels 190,000. Report issued immediately.",
                ),
              },
              {
                icon: "check",
                title: L("Анализы — от 35 000 сум", "Tahlillar — 35 000 so'mdan", "Lab tests — from 35,000 UZS"),
                body: L(
                  "Общий анализ крови 45 000, биохимия 190 000, гормоны щитовидной железы 210 000.",
                  "Umumiy qon tahlili 45 000, biokimyo 190 000, qalqonsimon bez gormonlari 210 000.",
                  "Full blood count 45,000; biochemistry 190,000; thyroid hormones 210,000.",
                ),
              },
              {
                icon: "clock",
                title: L("ЭКГ — 90 000 сум", "ECG — 90 000 so'm", "ECG — 90,000 UZS"),
                body: L(
                  "С расшифровкой кардиолога. Суточный холтер — 450 000 сум с выдачей прибора на дом.",
                  "Kardiolog izohi bilan. Sutkalik xolter — 450 000 so'm, uskuna uyga beriladi.",
                  "Read by a cardiologist. 24-hour Holter — 450,000 UZS including the take-home device.",
                ),
              },
            ],
          ),
          { bg: "surface" },
        ),
      ],
    },

    // ------------------------------------------------------------ контакты
    {
      slug: "contacts",
      title: L("Запись и контакты", "Navbat va kontaktlar", "Booking and contacts"),
      metaDesc: L(
        "Как записаться в клинику «Sog'lom Oila»: телефон, адрес на Чиланзаре, часы приёма и форма заявки.",
        "«Sog'lom Oila»ga qanday yozilish: telefon, Chilonzordagi manzil, qabul vaqti va ariza shakli.",
        "How to book at Sog'lom Oila: phone, the Chilanzar address, opening hours and a request form.",
      ),
      blocks: [
        S(
          B.richText(
            "where",
            paragraphs(
              L(
                "Мы на Бунёдкор, 41 — отдельный вход со стороны двора, напротив 19-го квартала Чиланзара. От метро «Чиланзар» 10 минут пешком или две остановки на автобусе 89.",
                "Bunyodkor 41-uydamiz — hovli tomondan alohida kirish, Chilonzorning 19-kvartali ro'parasida. «Chilonzor» metrosidan 10 daqiqa piyoda yoki 89-avtobusda ikki bekat.",
                "We are at 41 Bunyodkor — a separate entrance from the courtyard, opposite Chilanzar quarter 19. Ten minutes on foot from Chilanzar metro, or two stops on bus 89.",
              ),
              L(
                "Приём: понедельник–суббота, 8:00–20:00. Воскресенье — дежурный терапевт с 9:00 до 13:00.",
                "Qabul: dushanba–shanba, 8:00–20:00. Yakshanba — navbatchi terapevt 9:00 dan 13:00 gacha.",
                "Open Monday to Saturday, 8:00–20:00. On Sunday the duty GP works 9:00–13:00.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Заявка на приём", "Qabulga ariza", "Appointment request"),
            submitLabel: L("Отправить заявку", "Arizani yuborish", "Send request"),
            successMessage: L(
              "Заявка принята. Администратор перезвонит в течение 15 минут в рабочее время.",
              "Ariza qabul qilindi. Administrator ish vaqtida 15 daqiqada qo'ng'iroq qiladi.",
              "Request received. Reception will call you back within 15 minutes during working hours.",
            ),
            fields: [
              { type: "text", label: L("Имя пациента", "Bemor ismi", "Patient name") },
              { type: "tel", label: L("Телефон", "Telefon", "Phone") },
              { type: "text", label: L("К какому врачу", "Qaysi shifokorga", "Which doctor"), required: false },
              { type: "textarea", label: L("Что беспокоит и удобное время", "Nima bezovta qilyapti va qulay vaqt", "Symptoms and a convenient time"), required: false },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),

        S(
          B.faq(
            "faq",
            L("Перед визитом", "Tashrifdan oldin", "Before your visit"),
            [
              {
                question: L("Что взять с собой?", "O'zingiz bilan nima olasiz?", "What should I bring?"),
                answer: L(
                  "Паспорт или свидетельство о рождении ребёнка, прошлые выписки и снимки. Полис — если приём по гарантийному письму.",
                  "Pasport yoki bolaning tug'ilganlik guvohnomasi, oldingi ko'chirma va suratlar. Polis — kafolat xati bo'yicha kelsangiz.",
                  "Your ID or the child's birth certificate, and any previous reports or scans. Bring your policy if you are coming on a guarantee letter.",
                ),
              },
              {
                question: L("Где припарковаться?", "Qayerga mashina qo'yiladi?", "Where can I park?"),
                answer: L(
                  "Во дворе клиники восемь бесплатных мест. Если занято — свободная парковка у «Korzinka» через дорогу.",
                  "Klinika hovlisida sakkizta bepul joy bor. Band bo'lsa — yo'lning narigi tomonidagi «Korzinka» yonida joy bor.",
                  "There are eight free spaces in our courtyard. If they are taken, there is open parking by the Korzinka store across the road.",
                ),
              },
            ],
          ),
          { width: "narrow" },
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "davlenie-domashnij-dnevnik",
      categorySlug: "sovety-vracha",
      title: L(
        "Домашний дневник давления: как мерить, чтобы врач вам поверил",
        "Uydagi bosim kundaligi: shifokor ishonishi uchun qanday o'lchash kerak",
        "A home blood-pressure diary: how to measure so your doctor can use it",
      ),
      excerpt: L(
        "Одно измерение в кабинете почти ничего не значит. Кардиолог Отабек Каримов объясняет, как собрать данные за неделю.",
        "Xonadagi bitta o'lchov deyarli hech narsani anglatmaydi. Kardiolog Otabek Karimov bir haftalik ma'lumotni qanday yig'ishni tushuntiradi.",
        "A single reading in the office means almost nothing. Cardiologist Otabek Karimov explains how to collect a week of data.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Давление, измеренное в кабинете врача, почти всегда выше домашнего: на приёме человек волнуется. Поэтому мы просим приносить дневник за неделю — по два измерения в день.",
              "Shifokor xonasida o'lchangan bosim deyarli har doim uydagidan yuqori: qabulda odam hayajonlanadi. Shuning uchun bir haftalik kundalikni — kuniga ikki marta — olib kelishni so'raymiz.",
              "Blood pressure measured in a doctor's office is almost always higher than at home: people are nervous during a visit. That is why we ask for a week's diary, two readings a day.",
            ),
            L(
              "Мерьте утром до завтрака и лекарств и вечером перед сном. Пять минут сидя, спина к спинке стула, манжета на уровне сердца, рука на столе.",
              "Ertalab nonushta va dorilardan oldin, kechqurun uxlashdan oldin o'lchang. Besh daqiqa o'tirib, orqa suyanchiqqa tegib, manjet yurak balandligida, qo'l stol ustida.",
              "Measure in the morning before breakfast and medication, and in the evening before bed. Sit for five minutes first, back against the chair, cuff at heart level, arm on the table.",
            ),
            L(
              "Записывайте оба числа и пульс. Не выбрасывайте «плохие» значения — именно они интересны врачу. Если верхнее выше 180 или нижнее выше 110, не ждите приёма, звоните в 103.",
              "Ikkala raqamni va pulsni yozing. «Yomon» ko'rsatkichlarni tashlamang — shifokorga aynan ular kerak. Yuqorisi 180 dan yoki pastkisi 110 dan oshsa, qabulni kutmang, 103 ga qo'ng'iroq qiling.",
              "Write down both numbers and your pulse. Do not discard the bad readings — those are exactly what the doctor needs. If the top number is above 180 or the bottom above 110, do not wait: call 103.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "privivki-pered-shkoloj",
      categorySlug: "detskoe-zdorove",
      title: L(
        "Прививки перед школой: что успеть до сентября",
        "Maktabdan oldin emlash: sentabrgacha nimani ulgurish kerak",
        "Vaccinations before school: what to finish before September",
      ),
      excerpt: L(
        "Педиатр Санжар Юлдашев разбирает национальный календарь и объясняет, какие справки просит школа.",
        "Pediatr Sanjar Yo'ldoshev milliy kalendarni tushuntiradi va maktab qanday ma'lumotnoma so'rashini aytadi.",
        "Paediatrician Sanjar Yuldashev walks through the national schedule and the certificates schools ask for.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "К шести годам ребёнок по национальному календарю должен получить ревакцинацию АКДС и полиомиелита, а также вторую дозу кори-краснухи-паротита.",
              "Olti yoshga borib bola milliy kalendar bo'yicha AKDS va poliomiyelit revaksinatsiyasini hamda qizamiq-qizilcha-tepki ikkinchi dozasini olishi kerak.",
              "By age six a child should have had the DTP and polio boosters and the second dose of measles-mumps-rubella under the national schedule.",
            ),
            L(
              "Школа просит форму 063 — выписку о прививках. Мы выдаём её в день обращения, если ребёнок наблюдается у нас; если карта в другой поликлинике, принесите копию.",
              "Maktab 063-shaklni — emlash ko'chirmasini so'raydi. Bola bizda kuzatilsa, uni murojaat kunining o'zida beramiz; karta boshqa poliklinikada bo'lsa, nusxasini olib keling.",
              "Schools ask for form 063 — the vaccination record. We issue it the same day if the child is registered with us; if the file is at another clinic, bring a copy.",
            ),
            L(
              "Если сроки пропущены, начинать заново не нужно: календарь догоняют по индивидуальному графику. Планируйте за месяц до сентября — между дозами нужны интервалы.",
              "Muddat o'tkazib yuborilgan bo'lsa, boshidan boshlash shart emas: kalendar individual jadval bo'yicha to'ldiriladi. Sentabrdan bir oy oldin rejalashtiring — dozalar orasida oraliq kerak.",
              "If doses were missed, there is no need to start over: the schedule is caught up on an individual plan. Plan a month before September — the doses need intervals between them.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "novyj-uzi-apparat",
      categorySlug: "novosti-kliniki",
      title: L(
        "Поставили новый аппарат УЗИ и добавили субботний приём",
        "Yangi UTT apparati o'rnatildi va shanba qabuli qo'shildi",
        "A new ultrasound machine and a Saturday clinic",
      ),
      excerpt: L(
        "С октября сосуды смотрим на аппарате с доплером, а очередь на УЗИ сократилась до одного дня.",
        "Oktabrdan tomirlarni dopler bilan apparatda ko'ramiz, UTT navbati bir kunga qisqardi.",
        "From October we scan vessels on a Doppler-equipped machine, and the ultrasound queue is down to one day.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "В сентябре мы заменили аппарат УЗИ: новый умеет цветное доплеровское картирование, поэтому сосуды шеи и вены ног смотрим у себя, а не отправляем в другой центр.",
              "Sentabrda UTT apparatini almashtirdik: yangisi rangli dopler kartalashni qo'llaydi, shuning uchun bo'yin tomirlari va oyoq venalarini o'zimizda ko'ramiz, boshqa markazga yubormaymiz.",
              "In September we replaced our ultrasound machine. The new one supports colour Doppler, so we scan neck vessels and leg veins here instead of referring patients elsewhere.",
            ),
            L(
              "Вместе с аппаратом добавили субботний приём Малики Рахимовой с 8:00 до 13:00. Очередь на УЗИ сократилась с четырёх дней до одного.",
              "Apparat bilan birga Malika Rahimovaning shanba qabuli 8:00 dan 13:00 gacha qo'shildi. UTT navbati to'rt kundan bir kunga qisqardi.",
              "Along with the machine we added Malika Rakhimova's Saturday clinic, 8:00 to 13:00. The wait for a scan has dropped from four days to one.",
            ),
          ),
        ),
      ],
    },
  ],
};
