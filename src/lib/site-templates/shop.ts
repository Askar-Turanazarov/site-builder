import { B, L, paragraphs, type SiteTemplate } from "./types";

/**
 * Anor — марка ухода за кожей из Ташкента: гранат, абрикосовое масло,
 * производство в Сергели, доставка по городу и в регионы.
 */
export const shopTemplate: SiteTemplate = {
  key: "shop",
  label: L("Интернет-магазин", "Onlayn do'kon", "Online store"),
  profile: L(
    "Косметика Anor, производство в Сергели",
    "Anor kosmetikasi, Sergeli ishlab chiqarishi",
    "Anor skincare, made in Sergeli",
  ),
  description: L(
    "Витрина товаров, условия доставки и оплаты, отзывы покупателей и раздел с ответами на вопросы.",
    "Mahsulotlar vitrinasi, yetkazib berish va to'lov shartlari, xaridorlar fikri va savol-javob bo'limi.",
    "A product showcase, delivery and payment terms, customer reviews and an FAQ section.",
  ),
  themeKey: "shop",
  design: { skin: "retail", fontDisplay: "Rubik", fontBody: "Nunito", radiusScale: "md" },

  settings: {
    siteName: L("Anor", "Anor", "Anor"),
    tagline: L(
      "Уход за кожей на местных маслах",
      "Mahalliy moylardan teri parvarishi",
      "Skincare made with local oils",
    ),
    contactEmail: "shop@anor.uz",
    contactPhone: "+998 71 209 77 40",
    contactAddress: L(
      "Ташкент, Сергелийский район, ул. Янги Сергели, 12 (склад и самовывоз)",
      "Toshkent, Sergeli tumani, Yangi Sergeli ko'chasi, 12 (ombor va olib ketish)",
      "Tashkent, Sergeli district, 12 Yangi Sergeli street (warehouse and pickup)",
    ),
    footerNote: L(
      "© Anor, Ташкент. Доставка по Узбекистану, оплата картой и наличными при получении.",
      "© Anor, Toshkent. O'zbekiston bo'ylab yetkazib berish, karta va qabul qilishda naqd to'lov.",
      "© Anor, Tashkent. Delivery across Uzbekistan, card payment or cash on delivery.",
    ),
  },

  categories: [
    {
      slug: "care",
      order: 1,
      name: L("Уход", "Parvarish", "Care"),
      description: L(
        "Как пользоваться средствами и подбирать их под тип кожи.",
        "Vositalardan qanday foydalanish va teri turiga qarab tanlash.",
        "How to use the products and match them to your skin type.",
      ),
    },
    {
      slug: "ingredients",
      order: 2,
      name: L("Состав", "Tarkib", "Ingredients"),
      description: L(
        "Откуда берём сырьё и что означает каждая строчка в составе.",
        "Xomashyoni qayerdan olamiz va tarkibdagi har bir satr nimani anglatadi.",
        "Where our raw materials come from and what each line on the label means.",
      ),
    },
    {
      slug: "news",
      order: 3,
      name: L("Новости", "Yangiliklar", "News"),
      description: L(
        "Новинки, партии, акции и точки продаж.",
        "Yangiliklar, partiyalar, aksiyalar va sotuv nuqtalari.",
        "New products, batches, promotions and stockists.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "catalog", order: 1, label: L("Каталог", "Katalog", "Catalogue") },
    { location: "header", linkType: "page", target: "delivery", order: 2, label: L("Доставка и оплата", "Yetkazib berish va to'lov", "Delivery and payment") },
    { location: "header", linkType: "page", target: "about", order: 3, label: L("О марке", "Brend haqida", "About") },
    { location: "header", linkType: "category", target: "care", order: 4, label: L("Блог", "Blog", "Blog") },
    { location: "header", linkType: "page", target: "contacts", order: 5, label: L("Контакты", "Kontaktlar", "Contacts") },
    { location: "footer", linkType: "page", target: "delivery", order: 1, label: L("Доставка и оплата", "Yetkazib berish va to'lov", "Delivery and payment") },
    { location: "footer", linkType: "page", target: "contacts", order: 2, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Anor — уход за кожей на гранатовом и абрикосовом масле. Производство в Ташкенте, доставка по Узбекистану.",
        "Anor — anor va o'rik moyi asosidagi teri parvarishi. Toshkentda ishlab chiqariladi, O'zbekiston bo'ylab yetkaziladi.",
        "Anor — skincare built on pomegranate and apricot oil. Made in Tashkent, delivered across Uzbekistan.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Уход, который делают здесь",
            "Shu yerda tayyorlanadigan parvarish",
            "Skincare made right here",
          ),
          subheading: L(
            "Масла холодного отжима из Ферганской долины, короткие составы и партии по 300 штук. Производим в Сергели, доставляем по всей стране.",
            "Farg'ona vodiysidan sovuq presslangan moylar, qisqa tarkiblar va 300 tadan partiyalar. Sergelida ishlab chiqaramiz, butun mamlakat bo'ylab yetkazamiz.",
            "Cold-pressed oils from the Fergana Valley, short ingredient lists and batches of 300. Made in Sergeli, shipped nationwide.",
          ),
          ctaLabel: L("В каталог", "Katalogga", "Browse the catalogue"),
          ctaLink: "/catalog",
          variant: "split",
        }),

        B.features(
          "usp",
          L("Почему Anor", "Nega Anor", "Why Anor"),
          [
            {
              icon: "spark",
              title: L("Короткий состав", "Qisqa tarkib", "Short ingredient list"),
              body: L(
                "От 7 до 12 компонентов. Всё, что есть в банке, перечислено на этикетке полностью.",
                "7 dan 12 tagacha komponent. Bankadagi hamma narsa yorliqda to'liq ko'rsatilgan.",
                "Between seven and twelve ingredients. Everything in the jar is listed in full on the label.",
              ),
            },
            {
              icon: "globe",
              title: L("Местное сырьё", "Mahalliy xomashyo", "Local raw materials"),
              body: L(
                "Гранатовое и абрикосовое масло — из Ферганской долины, розовая вода — из Кашкадарьи.",
                "Anor va o'rik moyi — Farg'ona vodiysidan, atirgul suvi — Qashqadaryodan.",
                "Pomegranate and apricot oil from the Fergana Valley, rose water from Kashkadarya.",
              ),
            },
            {
              icon: "message",
              title: L("Маленькие партии", "Kichik partiyalar", "Small batches"),
              body: L(
                "Варим по 300 банок, на каждой — дата и номер партии. Срок годности 12 месяцев.",
                "300 tadan pishiramiz, har birida — sana va partiya raqami. Yaroqlilik muddati 12 oy.",
                "We make 300 jars at a time; each carries a date and batch number. Twelve-month shelf life.",
              ),
            },
          ],
        ),

        B.pricing("bestsellers", L("Хиты продаж", "Ko'p sotiladiganlar", "Bestsellers"), [
          {
            name: L("Гранатовое масло для лица, 30 мл", "Yuz uchun anor moyi, 30 ml", "Pomegranate face oil, 30 ml"),
            price: L("149 000", "149 000", "149,000"),
            period: L("сум", "so'm", "soum"),
            features: [
              L("Для сухой и нормальной кожи", "Quruq va normal teri uchun", "For dry and normal skin"),
              L("Холодный отжим, без отдушек", "Sovuq presslangan, hidsiz", "Cold-pressed, fragrance-free"),
              L("Хватает на 2 месяца", "2 oyga yetadi", "Lasts about two months"),
            ],
            ctaLabel: L("Заказать", "Buyurtma berish", "Order"),
            ctaLink: "/contacts",
          },
          {
            name: L("Крем с абрикосовым маслом, 50 мл", "O'rik moyli krem, 50 ml", "Apricot oil cream, 50 ml"),
            price: L("189 000", "189 000", "189,000"),
            period: L("сум", "so'm", "soum"),
            features: [
              L("Дневной и ночной уход", "Kunduzgi va tungi parvarish", "Day and night use"),
              L("9 компонентов в составе", "Tarkibida 9 ta komponent", "Nine ingredients"),
              L("Подходит для чувствительной кожи", "Sezgir teri uchun mos", "Suitable for sensitive skin"),
              L("Самая частая покупка", "Eng ko'p xarid qilinadigan", "Our most-ordered item"),
            ],
            highlighted: true,
            ctaLabel: L("Заказать", "Buyurtma berish", "Order"),
            ctaLink: "/contacts",
          },
          {
            name: L("Набор «Знакомство»", "«Tanishuv» to'plami", "Starter set"),
            price: L("265 000", "265 000", "265,000"),
            period: L("сум", "so'm", "soum"),
            features: [
              L("Три средства в мини-формате", "Uchta vosita mini formatda", "Three products in travel size"),
              L("Розовый тоник, масло, крем", "Atirgul tonigi, moy, krem", "Rose toner, oil, cream"),
              L("В подарочной коробке", "Sovg'a qutisida", "In a gift box"),
            ],
            ctaLabel: L("Заказать", "Buyurtma berish", "Order"),
            ctaLink: "/contacts",
          },
        ]),

        B.testimonials(
          "reviews",
          L("Отзывы покупателей", "Xaridorlar fikri", "Customer reviews"),
          [
            {
              quote: L(
                "Беру крем третий раз. У меня кожа реагирует почти на всё, а тут ничего — и запах не мешает.",
                "Kremni uchinchi marta olyapman. Mening terim deyarli hamma narsaga ta'sirlanadi, bu yerda esa hech narsa yo'q — hidi ham xalaqit bermaydi.",
                "Third jar of the cream. My skin reacts to almost everything, but not to this — and the scent does not bother me.",
              ),
              authorName: L("Зухра Мирзаева", "Zuhra Mirzayeva", "Zuhra Mirzaeva"),
              authorRole: L("Ташкент, Чиланзар", "Toshkent, Chilonzor", "Tashkent, Chilanzar"),
            },
            {
              quote: L(
                "Заказывала в Самарканд, привезли за два дня, коробка целая. Набор брала в подарок — упаковано аккуратно.",
                "Samarqandga buyurtma berdim, ikki kunda yetkazishdi, quti but. To'plamni sovg'aga oldim — chiroyli qadoqlangan.",
                "I ordered to Samarkand and it arrived in two days, box intact. The set was a gift — neatly packed.",
              ),
              authorName: L("Дилрабо Эргашева", "Dilrabo Ergasheva", "Dilrabo Ergasheva"),
              authorRole: L("Самарканд", "Samarqand", "Samarkand"),
            },
          ],
        ),

        B.cta("cta", {
          heading: L("Не знаете, с чего начать?", "Nimadan boshlashni bilmayapsizmi?", "Not sure where to start?"),
          body: L(
            "Напишите тип кожи и что беспокоит — подберём два-три средства и объясним порядок.",
            "Teri turingizni va nima bezovta qilayotganini yozing — ikki-uchta vosita tanlab, tartibini tushuntiramiz.",
            "Tell us your skin type and concern — we will suggest two or three products and explain the order.",
          ),
          buttonLabel: L("Спросить о подборе", "Tanlash haqida so'rash", "Ask for a recommendation"),
          buttonLink: "/contacts",
        }),
      ],
    },

    {
      slug: "catalog",
      title: L("Каталог", "Katalog", "Catalogue"),
      metaDesc: L(
        "Все средства Anor: масла, кремы, тоники и наборы с ценами в сумах.",
        "Anorning barcha vositalari: moylar, kremlar, toniklar va to'plamlar — narxlari so'mda.",
        "Every Anor product: oils, creams, toners and sets with prices in soums.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Каталог", "Katalog", "Catalogue"),
          subheading: L(
            "Одиннадцать позиций. Всё, что есть на складе в Сергели, отправляем в день заказа.",
            "O'n bitta mahsulot. Sergelidagi omborda bori buyurtma kunida jo'natiladi.",
            "Eleven products. Anything in stock in Sergeli ships the same day.",
          ),
          variant: "centered",
        }),

        B.gallery(
          "grid",
          [
            L("Гранатовое масло для лица, 30 мл — 149 000", "Yuz uchun anor moyi, 30 ml — 149 000", "Pomegranate face oil, 30 ml — 149,000"),
            L("Крем с абрикосовым маслом, 50 мл — 189 000", "O'rik moyli krem, 50 ml — 189 000", "Apricot oil cream, 50 ml — 189,000"),
            L("Розовый тоник, 150 мл — 98 000", "Atirgul tonigi, 150 ml — 98 000", "Rose toner, 150 ml — 98,000"),
            L("Масло для тела, 100 мл — 165 000", "Tana uchun moy, 100 ml — 165 000", "Body oil, 100 ml — 165,000"),
            L("Бальзам для губ — 45 000", "Lab uchun balzam — 45 000", "Lip balm — 45,000"),
            L("Скраб с абрикосовой косточкой — 112 000", "O'rik danagi bilan skrab — 112 000", "Apricot kernel scrub — 112,000"),
            L("Набор «Знакомство» — 265 000", "«Tanishuv» to'plami — 265 000", "Starter set — 265,000"),
            L("Набор «Подарочный» — 420 000", "«Sovg'abop» to'plam — 420 000", "Gift set — 420,000"),
            L("Мыло ручной работы — 32 000", "Qo'lda tayyorlangan sovun — 32 000", "Handmade soap — 32,000"),
          ],
          3,
        ),

        B.faq("faq", L("Вопросы о товаре", "Mahsulot haqida savollar", "Product questions"), [
          {
            question: L("Есть ли тестеры?", "Testerlar bormi?", "Do you have testers?"),
            answer: L(
              "<p>Да, при самовывозе со склада в Сергели. При доставке кладём пробник крема в каждый заказ от 200 000 сум.</p>",
              "<p>Ha, Sergelidagi ombordan olib ketishda. Yetkazib berishda 200 000 so'mdan yuqori har bir buyurtmaga krem namunasini qo'shamiz.</p>",
              "<p>Yes, when you collect from the Sergeli warehouse. For deliveries we add a cream sample to every order over 200,000 soum.</p>",
            ),
          },
          {
            question: L("Как хранить?", "Qanday saqlash kerak?", "How should I store it?"),
            answer: L(
              "<p>При комнатной температуре, без прямого солнца. Летом масло можно держать в холодильнике — оно не портится, но становится гуще.</p>",
              "<p>Xona haroratida, to'g'ridan-to'g'ri quyoshsiz. Yozda moyni muzlatgichda saqlash mumkin — buzilmaydi, lekin quyuqlashadi.</p>",
              "<p>At room temperature, out of direct sun. In summer you can keep the oil in the fridge — it will thicken but not spoil.</p>",
            ),
          },
          {
            question: L("Тестируете ли на животных?", "Hayvonlarda sinaysizmi?", "Do you test on animals?"),
            answer: L(
              "<p>Нет. Каждая партия проходит лабораторный контроль в Ташкенте, протоколы показываем по запросу.</p>",
              "<p>Yo'q. Har bir partiya Toshkentda laboratoriya nazoratidan o'tadi, protokollarni so'rov bo'yicha ko'rsatamiz.</p>",
              "<p>No. Every batch goes through lab testing in Tashkent; we can share the reports on request.</p>",
            ),
          },
        ]),
      ],
    },

    {
      slug: "delivery",
      title: L("Доставка и оплата", "Yetkazib berish va to'lov", "Delivery and payment"),
      metaDesc: L(
        "Сроки и стоимость доставки Anor по Ташкенту и регионам, способы оплаты и возврат.",
        "Anorni Toshkent va viloyatlarga yetkazish muddati va narxi, to'lov usullari va qaytarish.",
        "Anor delivery times and prices for Tashkent and the regions, payment methods and returns.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Доставка и оплата", "Yetkazib berish va to'lov", "Delivery and payment"),
          subheading: L(
            "По Ташкенту — на следующий день, в регионы — за 2–4 дня почтой.",
            "Toshkent bo'ylab — ertasi kuni, viloyatlarga — pochta orqali 2–4 kunda.",
            "Next day in Tashkent, two to four days to the regions by post.",
          ),
          variant: "centered",
        }),

        B.features(
          "terms",
          L("Условия", "Shartlar", "Terms"),
          [
            {
              icon: "spark",
              title: L("Ташкент — 20 000 сум", "Toshkent — 20 000 so'm", "Tashkent — 20,000 soum"),
              body: L(
                "Курьер приезжает на следующий день с 10:00 до 20:00. От 400 000 сум — бесплатно.",
                "Kuryer ertasi kuni 10:00 dan 20:00 gacha keladi. 400 000 so'mdan yuqori — bepul.",
                "The courier comes the next day between 10:00 and 20:00. Free over 400,000 soum.",
              ),
            },
            {
              icon: "globe",
              title: L("Регионы — 35 000 сум", "Viloyatlar — 35 000 so'm", "Regions — 35,000 soum"),
              body: L(
                "Отправляем почтой, 2–4 дня. Трек-номер присылаем в Telegram в день отправки.",
                "Pochta orqali jo'natamiz, 2–4 kun. Trek raqamini jo'natish kuni Telegramga yuboramiz.",
                "Sent by post, two to four days. We send the tracking number on Telegram the day it ships.",
              ),
            },
            {
              icon: "message",
              title: L("Самовывоз — бесплатно", "Olib ketish — bepul", "Pickup — free"),
              body: L(
                "Склад на Янги Сергели, 12. Будни с 10:00 до 18:00, предупредите за час.",
                "Yangi Sergeli ko'chasi, 12-uydagi ombor. Ish kunlari 10:00 dan 18:00 gacha, bir soat oldin ogohlantiring.",
                "Warehouse at 12 Yangi Sergeli street. Weekdays 10:00 to 18:00; give us an hour's notice.",
              ),
            },
          ],
        ),

        B.faq("faq", L("Оплата и возврат", "To'lov va qaytarish", "Payment and returns"), [
          {
            question: L("Как можно оплатить?", "Qanday to'lash mumkin?", "How can I pay?"),
            answer: L(
              "<p>Картой Uzcard или Humo при получении, переводом на счёт для юридических лиц, наличными курьеру.</p>",
              "<p>Qabul qilishda Uzcard yoki Humo karta bilan, yuridik shaxslar uchun hisobga o'tkazma, kuryerga naqd pul.</p>",
              "<p>By Uzcard or Humo on delivery, bank transfer for companies, or cash to the courier.</p>",
            ),
          },
          {
            question: L("Можно ли вернуть?", "Qaytarish mumkinmi?", "Can I return an item?"),
            answer: L(
              "<p>Невскрытую упаковку — в течение 10 дней. Вскрытую косметику по санитарным правилам вернуть нельзя, но если средство не подошло, напишите — разберёмся.</p>",
              "<p>Ochilmagan qadoqni — 10 kun ichida. Ochilgan kosmetikani sanitariya qoidalari bo'yicha qaytarib bo'lmaydi, lekin vosita to'g'ri kelmasa, yozing — hal qilamiz.</p>",
              "<p>Unopened packaging within ten days. Opened cosmetics cannot be returned under hygiene rules, but if something did not suit you, write to us and we will sort it out.</p>",
            ),
          },
        ]),
      ],
    },

    {
      slug: "about",
      title: L("О марке", "Brend haqida", "About the brand"),
      metaDesc: L(
        "Кто делает Anor, где находится производство и как мы выбираем сырьё.",
        "Anorni kim tayyorlaydi, ishlab chiqarish qayerda va xomashyoni qanday tanlaymiz.",
        "Who makes Anor, where production sits and how we choose our raw materials.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("О марке", "Brend haqida", "About the brand"),
          subheading: L(
            "Начали на кухне в 2021 году, сейчас — цех на 60 квадратов в Сергели.",
            "2021-yilda oshxonada boshladik, hozir — Sergelida 60 kvadrat sex.",
            "We started in a kitchen in 2021; today it is a 60-square-metre workshop in Sergeli.",
          ),
          variant: "centered",
        }),

        B.richText(
          "story",
          paragraphs(
            L(
              "Anor начался с простого вопроса: почему масло из ферганского граната уезжает на экспорт, а на полках в Ташкенте стоит импортный уход втрое дороже.",
              "Anor oddiy savoldan boshlandi: nega Farg'ona anoridan olingan moy eksportga ketadi, Toshkentdagi javonlarda esa uch barobar qimmat import parvarish turadi.",
              "Anor began with a simple question: why does Fergana pomegranate oil go abroad while Tashkent shelves carry imported skincare at three times the price?",
            ),
            L(
              "Первые полгода мы варили по 40 банок в месяц на домашней кухне и раздавали знакомым. Сейчас производим до 3000 единиц в месяц и держим тот же принцип: короткий состав и понятная этикетка.",
              "Dastlabki olti oy uy oshxonasida oyiga 40 tadan pishirib, tanishlarga tarqatdik. Hozir oyiga 3000 tagacha ishlab chiqaramiz va o'sha tamoyilni saqlaymiz: qisqa tarkib va tushunarli yorliq.",
              "For the first six months we made forty jars a month in a home kitchen and gave them to friends. We now produce up to 3,000 units a month on the same principle: a short formula and a label you can read.",
            ),
          ),
        ),

        B.stats("stats", [
          { value: L("2021", "2021", "2021"), label: L("Год основания", "Tashkil etilgan yil", "Founded") },
          { value: L("11", "11", "11"), label: L("Позиций в каталоге", "Katalogdagi mahsulotlar", "Products in the catalogue") },
          { value: L("300", "300", "300"), label: L("Банок в партии", "Partiyadagi bankalar", "Jars per batch") },
          { value: L("14", "14", "14"), label: L("Точек продаж по стране", "Mamlakat bo'ylab sotuv nuqtalari", "Stockists nationwide") },
        ]),
      ],
    },

    {
      slug: "contacts",
      title: L("Контакты", "Kontaktlar", "Contacts"),
      metaDesc: L(
        "Как связаться с Anor: телефон, Telegram, склад в Сергели и форма заказа.",
        "Anor bilan qanday bog'lanish: telefon, Telegram, Sergelidagi ombor va buyurtma shakli.",
        "How to reach Anor: phone, Telegram, the Sergeli warehouse and an order form.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Связаться и заказать", "Bog'lanish va buyurtma berish", "Contact and order"),
          subheading: L(
            "Отвечаем в Telegram быстрее всего — с 9:00 до 21:00, без выходных.",
            "Telegramda eng tez javob beramiz — 9:00 dan 21:00 gacha, dam olish kunlarisiz.",
            "Telegram gets the fastest reply — 9:00 to 21:00, seven days a week.",
          ),
          variant: "centered",
        }),

        B.contactForm("form", {
          heading: L("Оформить заказ", "Buyurtma rasmiylashtirish", "Place an order"),
          submitLabel: L("Отправить заказ", "Buyurtmani yuborish", "Send the order"),
          successMessage: L(
            "Заказ принят. Свяжемся в течение часа, чтобы подтвердить состав и адрес.",
            "Buyurtma qabul qilindi. Tarkib va manzilni tasdiqlash uchun bir soat ichida bog'lanamiz.",
            "Order received. We will contact you within the hour to confirm the items and address.",
          ),
          fields: [
            { type: "text", label: L("Имя", "Ism", "Name") },
            { type: "tel", label: L("Телефон", "Telefon", "Phone") },
            { type: "text", label: L("Город и адрес доставки", "Shahar va yetkazish manzili", "City and delivery address") },
            { type: "textarea", label: L("Что заказываете", "Nima buyurtma qilyapsiz", "What you are ordering") },
          ],
        }),
      ],
    },
  ],

  posts: [
    {
      slug: "poryadok-naneseniya",
      categorySlug: "care",
      title: L(
        "В каком порядке наносить средства",
        "Vositalarni qanday tartibda surtish kerak",
        "The order to apply your products in",
      ),
      excerpt: L(
        "Тоник, масло, крем — короткое правило, которое решает большинство вопросов «почему не впитывается».",
        "Tonik, moy, krem — «nega singmayapti» degan savollarning ko'pini hal qiladigan qisqa qoida.",
        "Toner, oil, cream — a short rule that answers most 'why isn't it absorbing' questions.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Правило простое: от самого жидкого к самому плотному. Тоник — на влажную кожу, масло — через минуту, крем — последним.",
                "Qoida oddiy: eng suyuqdan eng quyuqqa. Tonik — nam teriga, moy — bir daqiqadan so'ng, krem — oxirida.",
                "The rule is simple: thinnest to thickest. Toner on damp skin, oil a minute later, cream last.",
              ),
              L(
                "Если наносить крем перед маслом, масло останется на поверхности и будет казаться липким — дело не в средстве, а в порядке.",
                "Kremni moydan oldin surtsangiz, moy yuzada qoladi va yopishqoq tuyuladi — gap vositada emas, tartibda.",
                "Apply the cream before the oil and the oil sits on top and feels sticky — that is the order, not the product.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "otkuda-granatovoe-maslo",
      categorySlug: "ingredients",
      title: L(
        "Откуда мы берём гранатовое масло",
        "Anor moyini qayerdan olamiz",
        "Where our pomegranate oil comes from",
      ),
      excerpt: L(
        "Косточка граната даёт меньше 1% масла. Рассказываем, почему оно стоит дорого и как мы выбирали поставщика.",
        "Anor danagi 1% dan kam moy beradi. Nega u qimmat va yetkazib beruvchini qanday tanlaganimizni aytamiz.",
        "Pomegranate seed yields under 1% oil. Why it is expensive and how we chose our supplier.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Мы работаем с маслобойней в Ферганской области, которая отжимает косточку холодным способом. Из тонны косточек выходит около восьми литров масла — отсюда и цена.",
                "Farg'ona viloyatidagi danakni sovuq usulda presslaydigan moy zavodi bilan ishlaymiz. Bir tonna danakdan taxminan sakkiz litr moy chiqadi — narx shundan.",
                "We work with a press in the Fergana region that extracts the seed cold. A tonne of seed yields about eight litres of oil — hence the price.",
              ),
              L(
                "Каждую партию проверяем на кислотное число: если показатель выше нормы, масло горчит и в производство не идёт.",
                "Har bir partiyani kislota soni bo'yicha tekshiramiz: ko'rsatkich normadan yuqori bo'lsa, moy achchiq bo'ladi va ishlab chiqarishga ketmaydi.",
                "We test every batch for acid value: above the threshold the oil turns bitter and does not go into production.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "novaya-tochka-samarkand",
      categorySlug: "news",
      title: L(
        "Anor теперь можно купить в Самарканде",
        "Anorni endi Samarqandda ham xarid qilish mumkin",
        "Anor is now available in Samarkand",
      ),
      excerpt: L(
        "С октября наши средства стоят в магазине на Регистанской. Полный ассортимент и те же цены, что на сайте.",
        "Oktyabrdan vositalarimiz Registon ko'chasidagi do'konda. To'liq assortiment va saytdagi kabi narxlar.",
        "From October our products are stocked on Registan street. Full range at the same prices as online.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Это наша четырнадцатая точка и первая в Самарканде. Доставку по городу это не отменяет — просто теперь можно потрогать банку перед покупкой.",
                "Bu bizning o'n to'rtinchi nuqtamiz va Samarqanddagi birinchisi. Bu shahar bo'ylab yetkazishni bekor qilmaydi — endi shunchaki xariddan oldin bankani ushlab ko'rish mumkin.",
                "This is our fourteenth stockist and the first in Samarkand. City delivery continues as before — now you can also handle the jar before buying.",
              ),
            ),
          },
        },
      ],
    },
  ],
};
