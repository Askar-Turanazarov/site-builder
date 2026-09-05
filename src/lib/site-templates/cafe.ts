import { B, L, paragraphs, type SiteTemplate } from "./types";

/**
 * Кафе-пекарня «Зерно» — Мирабадский район Ташкента, улица Ойбека.
 * Утренняя выпечка, обеденное меню, кофе на своей обжарке.
 */
export const cafeTemplate: SiteTemplate = {
  key: "cafe",
  label: L("Кафе и пекарня", "Kafe va nonvoyxona", "Cafe and bakery"),
  profile: L(
    "Кафе «Зерно», Мирабадский район",
    "«Zerno» kafesi, Mirobod tumani",
    "Zerno cafe, Mirabad district",
  ),
  description: L(
    "Меню с ценами, история заведения, форма брони столика и лента новостей о сезонных позициях.",
    "Narxlari bilan menyu, muassasa tarixi, stol band qilish shakli va mavsumiy taomlar haqidagi yangiliklar.",
    "A menu with prices, the story behind the place, a table booking form and a news feed about seasonal dishes.",
  ),
  themeKey: "restaurant",
  design: { skin: "menu", fontDisplay: "Cormorant Garamond", fontBody: "Lora", radiusScale: "lg" },

  settings: {
    siteName: L("Зерно", "Zerno", "Zerno"),
    tagline: L(
      "Пекарня и кофе на Ойбека",
      "Oybek ko'chasidagi nonvoyxona va qahva",
      "Bakery and coffee on Oybek street",
    ),
    contactEmail: "hello@zerno.uz",
    contactPhone: "+998 71 244 18 60",
    contactAddress: L(
      "Ташкент, Мирабадский район, ул. Ойбека, 24",
      "Toshkent, Mirobod tumani, Oybek ko'chasi, 24",
      "Tashkent, Mirabad district, 24 Oybek street",
    ),
    footerNote: L(
      "© Кафе «Зерно», Ташкент. Работаем ежедневно с 8:00 до 23:00.",
      "© «Zerno» kafesi, Toshkent. Har kuni 8:00 dan 23:00 gacha ishlaymiz.",
      "© Zerno cafe, Tashkent. Open daily from 8:00 to 23:00.",
    ),
  },

  categories: [
    {
      slug: "news",
      order: 1,
      name: L("Новости кафе", "Kafe yangiliklari", "Cafe news"),
      description: L(
        "Что нового в меню, зале и расписании.",
        "Menyu, zal va ish jadvalidagi yangiliklar.",
        "What is new on the menu, in the room and in our schedule.",
      ),
    },
    {
      slug: "recipes",
      order: 2,
      name: L("Рецепты", "Retseptlar", "Recipes"),
      description: L(
        "Разбираем, как устроены наши блюда и выпечка.",
        "Taomlarimiz va nonlarimiz qanday tayyorlanishini tushuntiramiz.",
        "How our dishes and pastries are actually made.",
      ),
    },
    {
      slug: "events",
      order: 3,
      name: L("События", "Tadbirlar", "Events"),
      description: L(
        "Дегустации, завтраки-встречи и мастер-классы.",
        "Degustatsiyalar, nonushta uchrashuvlari va mahorat darslari.",
        "Tastings, breakfast meetups and workshops.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "menu", order: 1, label: L("Меню", "Menyu", "Menu") },
    { location: "header", linkType: "page", target: "about", order: 2, label: L("О нас", "Biz haqimizda", "About") },
    { location: "header", linkType: "category", target: "news", order: 3, label: L("Новости", "Yangiliklar", "News") },
    { location: "header", linkType: "page", target: "contacts", order: 4, label: L("Контакты", "Kontaktlar", "Contacts") },
    { location: "footer", linkType: "page", target: "menu", order: 1, label: L("Меню", "Menyu", "Menu") },
    { location: "footer", linkType: "page", target: "delivery", order: 2, label: L("Доставка", "Yetkazib berish", "Delivery") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // ------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Кафе-пекарня «Зерно» на Ойбека: свежая выпечка с 8 утра, обеды, кофе собственной обжарки.",
        "Oybek ko'chasidagi «Zerno» kafe-nonvoyxonasi: ertalab 8 dan yangi non, tushliklar, o'z qovurilgan qahva.",
        "Zerno bakery and cafe on Oybek street: fresh pastries from 8 am, lunches, house-roasted coffee.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Хлеб с утра, кофе весь день",
            "Ertalab non, kun bo'yi qahva",
            "Bread in the morning, coffee all day",
          ),
          subheading: L(
            "Пекарня и кафе на Ойбека, 24. Печём с пяти утра, обжариваем кофе сами, столики — без предоплаты.",
            "Oybek ko'chasi, 24-uydagi nonvoyxona va kafe. Soat beshdan non yopamiz, qahvani o'zimiz qovuramiz, stollar oldindan to'lovsiz band qilinadi.",
            "A bakery and cafe at 24 Oybek street. We bake from five in the morning, roast our own coffee, and hold tables with no deposit.",
          ),
          ctaLabel: L("Посмотреть меню", "Menyuni ko'rish", "See the menu"),
          ctaLink: "/menu",
          variant: "fullBleed",
          overlayOpacity: 0.45,
        }),

        B.stats("stats", [
          {
            value: L("8:00", "8:00", "8:00"),
            label: L("Открываемся каждый день", "Har kuni ochiladi", "We open every day"),
          },
          {
            value: L("14", "14", "14"),
            label: L("Видов выпечки в витрине", "Vitrinada non turlari", "Kinds of pastry on the counter"),
          },
          {
            value: L("6", "6", "6"),
            label: L("Лет на Ойбека", "Yildan beri Oybekda", "Years on Oybek street"),
          },
          {
            value: L("40", "40", "40"),
            label: L("Мест в зале и на террасе", "Zal va terrassada joy", "Seats indoors and on the terrace"),
          },
        ]),

        B.features(
          "features",
          L("Чем мы занимаемся", "Nima bilan shug'ullanamiz", "What we do"),
          [
            {
              icon: "spark",
              title: L("Своя пекарня", "O'z nonvoyxonamiz", "Our own bakery"),
              body: L(
                "Тесто ставим вечером, печём с пяти утра. К восьми на витрине уже тёплые багеты, самса-круассан и лепёшки на закваске.",
                "Xamirni kechqurun qo'yamiz, soat beshdan non yopamiz. Sakkizga vitrinada issiq baget, somsa-kruassan va xamirturushli patir tayyor bo'ladi.",
                "We start the dough in the evening and bake from five. By eight the counter holds warm baguettes, a samsa croissant and sourdough flatbread.",
              ),
            },
            {
              icon: "globe",
              title: L("Обжарка на месте", "Joyida qovurish", "Roasted on site"),
              body: L(
                "Ростер стоит в зале: берём зерно из Эфиопии и Колумбии, обжариваем небольшими партиями раз в три дня.",
                "Roster zalda turadi: Efiopiya va Kolumbiya donini olib, har uch kunda kichik partiyalarda qovuramiz.",
                "The roaster sits right in the room: we buy Ethiopian and Colombian beans and roast small batches every three days.",
              ),
            },
            {
              icon: "message",
              title: L("Обеды с 12:00", "12:00 dan tushliklar", "Lunch from noon"),
              body: L(
                "Каждый день три горячих блюда и два супа — меню обновляем в понедельник и вешаем у входа.",
                "Har kuni uchta issiq taom va ikkita sho'rva — menyuni dushanba kuni yangilab, kirish eshigiga osamiz.",
                "Three hot dishes and two soups daily — we refresh the list on Monday and post it by the door.",
              ),
            },
          ],
        ),

        B.imageText("story", {
          heading: L(
            "Начинали с одной печи",
            "Bitta pechdan boshlaganmiz",
            "We started with a single oven",
          ),
          body: paragraphs(
            L(
              "В 2019 году «Зерно» было окном выдачи на четыре метра: одна подовая печь, две кофемашины и очередь из соседнего бизнес-центра.",
              "2019-yilda «Zerno» to'rt metrlik berish oynasi edi: bitta pech, ikkita qahva mashinasi va qo'shni biznes markazdan navbat.",
              "In 2019 Zerno was a four-metre takeaway window: one deck oven, two coffee machines and a queue from the business centre next door.",
            ),
            L(
              "Сейчас у нас зал на 28 мест, терраса во дворе и та же печь — её мы перевезли и не собираемся менять.",
              "Hozir bizda 28 o'rinli zal, hovlidagi terrassa va o'sha pech bor — uni ko'chirib keldik va almashtirmoqchi emasmiz.",
              "Today we have a 28-seat room, a courtyard terrace and the same oven — we moved it with us and have no plans to replace it.",
            ),
          ),
          imageSide: "left",
          ctaLabel: L("История кафе", "Kafe tarixi", "Our story"),
          ctaLink: "/about",
        }),

        B.testimonials(
          "testimonials",
          L("Что говорят гости", "Mehmonlar nima deydi", "What guests say"),
          [
            {
              quote: L(
                "Беру здесь завтрак перед работой почти каждый день. Кофе стабильный, а лепёшка на закваске — лучшая в районе.",
                "Deyarli har kuni ishdan oldin shu yerdan nonushta olaman. Qahva bir xil sifatli, xamirturushli patir esa tumandagi eng zo'ri.",
                "I grab breakfast here almost every workday. The coffee is consistent and the sourdough flatbread is the best around.",
              ),
              authorName: L("Дилноза Каримова", "Dilnoza Karimova", "Dilnoza Karimova"),
              authorRole: L("Гостья с 2020 года", "2020-yildan beri mehmon", "Guest since 2020"),
            },
            {
              quote: L(
                "Проводили здесь встречу команды на 15 человек: помогли составить меню и всё вынесли ровно к назначенному времени.",
                "Bu yerda 15 kishilik jamoa uchrashuvini o'tkazdik: menyu tuzishga yordam berishdi va hammasini kelishilgan vaqtda olib chiqishdi.",
                "We held a 15-person team meeting here: they helped build the menu and served everything exactly on schedule.",
              ),
              authorName: L("Рустам Юлдашев", "Rustam Yo'ldashev", "Rustam Yuldashev"),
              authorRole: L("Руководитель отдела, Ц-5", "Bo'lim boshlig'i, C-5", "Department head, C-5"),
            },
            {
              quote: L(
                "Единственное место рядом, где в восемь утра уже пахнет хлебом, а не только кофе.",
                "Atrofda soat sakkizda faqat qahva emas, non hidi ham keladigan yagona joy.",
                "The only place nearby that smells of bread at eight in the morning, not just of coffee.",
              ),
              authorName: L("Анна Ким", "Anna Kim", "Anna Kim"),
              authorRole: L("Живёт на Ойбека", "Oybek ko'chasida yashaydi", "Lives on Oybek street"),
            },
          ],
        ),

        B.cta("cta", {
          heading: L("Забронировать столик", "Stol band qilish", "Book a table"),
          body: L(
            "Брони принимаем на день вперёд с 10:00 до 21:00. На компании больше шести человек лучше позвонить.",
            "Bandlovni bir kun oldin, 10:00 dan 21:00 gacha qabul qilamiz. Olti kishidan ko'p bo'lsa, qo'ng'iroq qilgan ma'qul.",
            "We take bookings a day ahead between 10:00 and 21:00. For groups over six, please call instead.",
          ),
          buttonLabel: L("Оставить заявку", "Ariza qoldirish", "Send a request"),
          buttonLink: "/contacts",
        }),
      ],
    },

    // --------------------------------------------------------------- меню
    {
      slug: "menu",
      title: L("Меню", "Menyu", "Menu"),
      metaDesc: L(
        "Завтраки, обеды, выпечка и кофе кафе «Зерно» с ценами в сумах.",
        "«Zerno» kafesining nonushta, tushlik, non va qahvasi — narxlari so'mda.",
        "Breakfasts, lunches, pastries and coffee at Zerno, with prices in soums.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Меню", "Menyu", "Menu"),
          subheading: L(
            "Завтраки до 12:00, обеды с 12:00 до 16:00, выпечка — пока не разберут.",
            "Nonushta 12:00 gacha, tushlik 12:00 dan 16:00 gacha, non — tugaguncha.",
            "Breakfast until noon, lunch from 12:00 to 16:00, pastries until they run out.",
          ),
          variant: "centered",
        }),

        B.pricing("sets", L("Завтраки", "Nonushtalar", "Breakfasts"), [
          {
            name: L("Утренний", "Ertalabki", "Morning"),
            price: L("38 000", "38 000", "38 000"),
            period: L("сум", "so'm", "soum"),
            features: [
              L("Круассан или булочка с корицей", "Kruassan yoki dolchinli bulochka", "Croissant or cinnamon bun"),
              L("Американо или чай", "Amerikano yoki choy", "Americano or tea"),
              L("Домашнее варенье", "Uyda tayyorlangan murabbo", "House-made jam"),
            ],
            ctaLabel: L("Заказать", "Buyurtma berish", "Order"),
            ctaLink: "/contacts",
          },
          {
            name: L("Плотный", "To'yimli", "Hearty"),
            price: L("62 000", "62 000", "62 000"),
            period: L("сум", "so'm", "soum"),
            features: [
              L("Яичница с зеленью и томатами", "Ko'katli va pomidorli tuxum", "Eggs with herbs and tomatoes"),
              L("Тост на закваске", "Xamirturushli tost", "Sourdough toast"),
              L("Капучино", "Kapuchino", "Cappuccino"),
              L("Свежевыжатый сок", "Yangi siqilgan sharbat", "Fresh juice"),
            ],
            highlighted: true,
            ctaLabel: L("Заказать", "Buyurtma berish", "Order"),
            ctaLink: "/contacts",
          },
          {
            name: L("Для двоих", "Ikki kishiga", "For two"),
            price: L("115 000", "115 000", "115 000"),
            period: L("сум", "so'm", "soum"),
            features: [
              L("Корзина выпечки на выбор", "Tanlov bo'yicha non savati", "A basket of pastries of your choice"),
              L("Два кофе", "Ikkita qahva", "Two coffees"),
              L("Сырная тарелка", "Pishloq tarelkasi", "Cheese plate"),
              L("Сезонные фрукты", "Mavsumiy mevalar", "Seasonal fruit"),
            ],
            ctaLabel: L("Заказать", "Buyurtma berish", "Order"),
            ctaLink: "/contacts",
          },
        ]),

        B.features(
          "bakery",
          L("Из пекарни", "Nonvoyxonadan", "From the bakery"),
          [
            {
              icon: "spark",
              title: L("Лепёшка на закваске — 12 000", "Xamirturushli patir — 12 000", "Sourdough flatbread — 12,000"),
              body: L(
                "Двое суток холодного брожения, печём в подовой печи партиями по 20 штук.",
                "Ikki kun sovuq bijg'ish, pechda 20 tadan partiyalarda yopamiz.",
                "Two days of cold fermentation, baked in the deck oven in batches of twenty.",
              ),
            },
            {
              icon: "globe",
              title: L("Самса-круассан — 18 000", "Somsa-kruassan — 18 000", "Samsa croissant — 18,000"),
              body: L(
                "Слоёное тесто и начинка из баранины с луком — наша самая частая позиция навынос.",
                "Qatlamli xamir va qo'y go'shti bilan piyoz — eng ko'p olib ketiladigan taomimiz.",
                "Laminated dough with lamb and onion — our most popular takeaway item.",
              ),
            },
            {
              icon: "message",
              title: L("Тарт с абрикосом — 22 000", "O'rikli tart — 22 000", "Apricot tart — 22,000"),
              body: L(
                "Сезонный: делаем с июня по август из абрикосов с Кибрайского рынка.",
                "Mavsumiy: iyundan avgustgacha Qibray bozoridagi o'rikdan tayyorlaymiz.",
                "Seasonal: made from June to August with apricots from the Kibray market.",
              ),
            },
          ],
        ),

        B.faq("faq", L("Частые вопросы", "Ko'p so'raladigan savollar", "Common questions"), [
          {
            question: L(
              "Есть ли вегетарианские блюда?",
              "Vegetarian taomlar bormi?",
              "Do you have vegetarian dishes?",
            ),
            answer: L(
              "<p>Каждый день минимум один суп и одно горячее без мяса. В выпечке вегетарианских позиций больше половины.</p>",
              "<p>Har kuni kamida bitta sho'rva va bitta go'shtsiz issiq taom bo'ladi. Nonlarimizning yarmidan ko'pi vegetarian.</p>",
              "<p>Every day there is at least one soup and one hot dish without meat. More than half of the bakery counter is vegetarian.</p>",
            ),
          },
          {
            question: L("Работает ли Wi-Fi и розетки?", "Wi-Fi va rozetkalar bormi?", "Is there Wi-Fi and power?"),
            answer: L(
              "<p>Да, Wi-Fi без пароля, розетки — вдоль стены у окна и на террасе. В обед с 13:00 до 14:00 просим не занимать большие столы одному.</p>",
              "<p>Ha, Wi-Fi parolsiz, rozetkalar — deraza yonidagi devor bo'ylab va terrassada. Tushlik paytida 13:00 dan 14:00 gacha katta stollarni yolg'iz egallamaslikni so'raymiz.</p>",
              "<p>Yes — open Wi-Fi, and sockets along the window wall and on the terrace. Between 13:00 and 14:00 we ask that large tables are not taken by one person.</p>",
            ),
          },
          {
            question: L("Можно ли с собакой?", "It bilan kirish mumkinmi?", "Are dogs allowed?"),
            answer: L(
              "<p>На террасе — да, в любое время года. В зале — нет, там пекарня за стеклом.</p>",
              "<p>Terrassada — ha, yilning istalgan faslida. Zalda — yo'q, u yerda oyna ortida nonvoyxona bor.</p>",
              "<p>On the terrace, yes, all year round. Not indoors — the bakery is right behind the glass there.</p>",
            ),
          },
        ]),
      ],
    },

    // -------------------------------------------------------------- о нас
    {
      slug: "about",
      title: L("О нас", "Biz haqimizda", "About us"),
      metaDesc: L(
        "Как появилось кафе «Зерно», кто печёт хлеб и откуда мы берём продукты.",
        "«Zerno» kafesi qanday paydo bo'lgan, nonni kim yopadi va mahsulotlarni qayerdan olamiz.",
        "How Zerno started, who bakes the bread and where our produce comes from.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Кто мы", "Biz kimmiz", "Who we are"),
          subheading: L(
            "Семейная пекарня, которая случайно выросла в кафе на 40 мест.",
            "Tasodifan 40 o'rinli kafega aylangan oilaviy nonvoyxona.",
            "A family bakery that accidentally became a 40-seat cafe.",
          ),
          variant: "centered",
        }),

        B.richText(
          "story",
          paragraphs(
            L(
              "Мы открылись в марте 2019 года на первом этаже жилого дома на Ойбека. Идея была простой: печь хлеб, который хочется есть без ничего.",
              "2019-yil mart oyida Oybek ko'chasidagi turar-joy binosining birinchi qavatida ochildik. G'oya oddiy edi: hech narsasiz ham yeyish mumkin bo'lgan non yopish.",
              "We opened in March 2019 on the ground floor of a residential building on Oybek street. The idea was simple: bake bread worth eating on its own.",
            ),
            L(
              "Первый год работали втроём: Шахло ставила тесто, Фаррух стоял за кофемашиной, Азиза считала и мыла. Сейчас в команде четырнадцать человек, но тесто по-прежнему ставит Шахло.",
              "Birinchi yili uch kishi ishladik: Shahlo xamir qo'yardi, Farrux qahva mashinasida turardi, Aziza hisob-kitob qilib, idish yuvardi. Hozir jamoada o'n to'rt kishi bor, lekin xamirni hamon Shahlo qo'yadi.",
              "For the first year there were three of us: Shahlo made the dough, Farrukh worked the coffee machine, Aziza handled the till and the washing up. The team is fourteen now, but Shahlo still makes the dough.",
            ),
            L(
              "Муку берём на мельнице в Зангиате, молоко — с фермы под Паркентом, зелень и овощи — на Госпитальном рынке трижды в неделю.",
              "Unni Zangiotadagi tegirmondan, sutni Parkent yaqinidagi fermadan, ko'kat va sabzavotlarni haftasiga uch marta Госпитальный bozoridan olamiz.",
              "We take flour from a mill in Zangiata, milk from a farm near Parkent, and herbs and vegetables from the Gospitalny market three times a week.",
            ),
          ),
        ),

        B.team("team", L("Команда", "Jamoa", "The team"), [
          {
            name: L("Шахло Абдуллаева", "Shahlo Abdullayeva", "Shahlo Abdullaeva"),
            role: L("Шеф-пекарь, совладелица", "Bosh nonvoy, hammuassis", "Head baker, co-owner"),
            bio: L(
              "12 лет печёт хлеб, из них четыре — во Франции. Отвечает за закваску и всё, что выходит из печи.",
              "12 yildan beri non yopadi, shundan to'rt yili Fransiyada. Xamirturush va pechdan chiqadigan hamma narsa uchun javob beradi.",
              "Twelve years of baking, four of them in France. Responsible for the starter and everything that leaves the oven.",
            ),
          },
          {
            name: L("Фаррух Назаров", "Farrux Nazarov", "Farrukh Nazarov"),
            role: L("Обжарщик и бариста", "Qovuruvchi va barista", "Roaster and barista"),
            bio: L(
              "Ведёт обжарку и обучает смену. Считает, что фильтр-кофе к выпечке подходит лучше эспрессо.",
              "Qovurishni boshqaradi va smenani o'qitadi. Nonga espressodan ko'ra filtr qahva mos keladi, deb hisoblaydi.",
              "Runs the roasting and trains the shift. Believes filter coffee suits pastry better than espresso.",
            ),
          },
          {
            name: L("Азиза Хидоятова", "Aziza Hidoyatova", "Aziza Hidoyatova"),
            role: L("Управляющая", "Boshqaruvchi", "Manager"),
            bio: L(
              "Отвечает за закупки, брони и расписание. С ней вы говорите, когда звоните в кафе.",
              "Xaridlar, bandlovlar va jadval uchun javobgar. Kafega qo'ng'iroq qilganingizda u bilan gaplashasiz.",
              "Handles purchasing, bookings and the schedule. She is who you speak to when you call.",
            ),
          },
        ]),

        B.cta("cta", {
          heading: L("Ищем пекаря в утреннюю смену", "Ertalabki smenaga nonvoy izlaymiz", "We are hiring a morning baker"),
          body: L(
            "Смена с 5:00 до 13:00, шесть дней, обучение на месте. Опыт желателен, но не обязателен.",
            "Smena 5:00 dan 13:00 gacha, olti kun, joyida o'qitamiz. Tajriba bo'lsa yaxshi, lekin shart emas.",
            "Shift from 5:00 to 13:00, six days a week, training provided. Experience welcome but not required.",
          ),
          buttonLabel: L("Написать нам", "Bizga yozing", "Get in touch"),
          buttonLink: "/contacts",
          style: "outline",
        }),
      ],
    },

    // ---------------------------------------------------------- доставка
    {
      slug: "delivery",
      title: L("Доставка и заказ", "Yetkazib berish va buyurtma", "Delivery and orders"),
      metaDesc: L(
        "Доставка выпечки и обедов по Мирабадскому и Яккасарайскому районам Ташкента.",
        "Toshkentning Mirobod va Yakkasaroy tumanlari bo'ylab non va tushlik yetkazib berish.",
        "Pastry and lunch delivery across the Mirabad and Yakkasaray districts of Tashkent.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Доставка и заказ", "Yetkazib berish va buyurtma", "Delivery and orders"),
          subheading: L(
            "Возим по Мирабадскому и Яккасарайскому районам, принимаем заказы на завтрак в офис.",
            "Mirobod va Yakkasaroy tumanlariga yetkazamiz, ofisga nonushta buyurtmalarini qabul qilamiz.",
            "We deliver across the Mirabad and Yakkasaray districts and take office breakfast orders.",
          ),
          variant: "centered",
        }),

        B.features(
          "how",
          L("Как это работает", "Bu qanday ishlaydi", "How it works"),
          [
            {
              icon: "spark",
              title: L("Заказ до 18:00", "Buyurtma 18:00 gacha", "Order by 18:00"),
              body: L(
                "Заявку на завтрак принимаем накануне до шести вечера, привозим к 8:30.",
                "Nonushta buyurtmasini oldingi kuni soat oltigacha qabul qilamiz, 8:30 ga yetkazamiz.",
                "Breakfast orders are taken the day before until 6 pm and arrive by 8:30.",
              ),
            },
            {
              icon: "globe",
              title: L("Зона доставки", "Yetkazish hududi", "Delivery area"),
              body: L(
                "Мирабадский и Яккасарайский районы — 15 000 сум. Дальше — по договорённости.",
                "Mirobod va Yakkasaroy tumanlari — 15 000 so'm. Uzoqroqqa — kelishuv asosida.",
                "Mirabad and Yakkasaray districts — 15,000 soum. Further out by arrangement.",
              ),
            },
            {
              icon: "message",
              title: L("Офисные завтраки", "Ofis nonushtalari", "Office breakfasts"),
              body: L(
                "От 10 человек собираем корзины с выпечкой и термосы с кофе, посуду забираем сами.",
                "10 kishidan boshlab non savatlari va qahva termoslarini yig'amiz, idishlarni o'zimiz olib ketamiz.",
                "From ten people we assemble pastry baskets and coffee flasks, and collect the dishes ourselves.",
              ),
            },
          ],
        ),

        B.contactForm("order", {
          heading: L("Заказ на доставку", "Yetkazib berishga buyurtma", "Delivery order"),
          submitLabel: L("Отправить заказ", "Buyurtmani yuborish", "Send the order"),
          successMessage: L(
            "Заказ получен — перезвоним в течение часа, чтобы подтвердить время.",
            "Buyurtma qabul qilindi — vaqtni tasdiqlash uchun bir soat ichida qo'ng'iroq qilamiz.",
            "We have your order — we will call within the hour to confirm the time.",
          ),
          fields: [
            { type: "text", label: L("Имя", "Ism", "Name") },
            { type: "tel", label: L("Телефон", "Telefon", "Phone") },
            { type: "text", label: L("Адрес доставки", "Yetkazish manzili", "Delivery address") },
            {
              type: "textarea",
              label: L("Что привезти и к какому времени", "Nima va qaysi vaqtga", "What to bring and when"),
              required: false,
            },
          ],
        }),
      ],
    },

    // ---------------------------------------------------------- контакты
    {
      slug: "contacts",
      title: L("Контакты", "Kontaktlar", "Contacts"),
      metaDesc: L(
        "Адрес, телефон и часы работы кафе «Зерно» на Ойбека, 24.",
        "Oybek ko'chasi 24-uydagi «Zerno» kafesining manzili, telefoni va ish vaqti.",
        "Address, phone and opening hours of Zerno cafe at 24 Oybek street.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Как нас найти", "Bizni qanday topish mumkin", "How to find us"),
          subheading: L(
            "Ойбека, 24 — вход со двора, вывеска над террасой. Метро «Ойбек» в семи минутах пешком.",
            "Oybek ko'chasi, 24 — kirish hovlidan, peshtaxta terrassa tepasida. «Oybek» metrosi yetti daqiqalik piyoda yo'lda.",
            "24 Oybek street — entrance from the courtyard, sign above the terrace. Seven minutes on foot from Oybek metro.",
          ),
          variant: "centered",
        }),

        B.features(
          "hours",
          L("Часы работы", "Ish vaqti", "Opening hours"),
          [
            {
              icon: "spark",
              title: L("Понедельник — пятница", "Dushanba — juma", "Monday to Friday"),
              body: L("8:00 — 23:00, кухня до 22:00", "8:00 — 23:00, oshxona 22:00 gacha", "8:00 — 23:00, kitchen until 22:00"),
            },
            {
              icon: "globe",
              title: L("Суббота и воскресенье", "Shanba va yakshanba", "Saturday and Sunday"),
              body: L("9:00 — 23:00, завтраки до 14:00", "9:00 — 23:00, nonushta 14:00 gacha", "9:00 — 23:00, breakfast until 14:00"),
            },
            {
              icon: "message",
              title: L("Телефон", "Telefon", "Phone"),
              body: L("+998 71 244 18 60", "+998 71 244 18 60", "+998 71 244 18 60"),
            },
          ],
        ),

        B.contactForm("form", {
          heading: L("Бронь столика", "Stol band qilish", "Table booking"),
          submitLabel: L("Забронировать", "Band qilish", "Book"),
          successMessage: L(
            "Спасибо! Подтвердим бронь звонком в течение часа.",
            "Rahmat! Bandlovni bir soat ichida qo'ng'iroq bilan tasdiqlaymiz.",
            "Thank you. We will confirm the booking by phone within the hour.",
          ),
          fields: [
            { type: "text", label: L("Имя", "Ism", "Name") },
            { type: "tel", label: L("Телефон", "Telefon", "Phone") },
            { type: "text", label: L("Дата, время и число гостей", "Sana, vaqt va mehmonlar soni", "Date, time and party size") },
            { type: "textarea", label: L("Пожелания", "Istaklar", "Anything else"), required: false },
          ],
        }),
      ],
    },
  ],

  posts: [
    {
      slug: "letnee-menyu-2026",
      categorySlug: "news",
      title: L(
        "Летнее меню: холодный суп и абрикосовый тарт",
        "Yozgi menyu: sovuq sho'rva va o'rikli tart",
        "Summer menu: chilled soup and apricot tart",
      ),
      excerpt: L(
        "С 1 июня в обеденном меню появились две холодные позиции, а в витрине — тарт из паркентских абрикосов.",
        "1-iyundan tushlik menyusida ikkita sovuq taom, vitrinada esa Parkent o'rigidan tart paydo bo'ldi.",
        "From 1 June the lunch menu has two chilled dishes, and the counter has a tart made with Parkent apricots.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Ташкентское лето мы каждый год встречаем одинаково: убираем из меню половину горячего и добавляем то, что не хочется греть.",
                "Toshkent yozini har yili bir xil kutib olamiz: menyudan issiq taomlarning yarmini olib tashlab, isitgisi kelmaydigan taomlarni qo'shamiz.",
                "We meet the Tashkent summer the same way every year: half the hot dishes come off the menu and we add things you would rather not heat.",
              ),
              L(
                "В этом сезоне это холодный свекольник на кефире и суп-гаспачо из томатов с Госпитального рынка. Оба идут с лепёшкой на закваске.",
                "Bu mavsumda — kefirli sovuq lavlagi sho'rvasi va Госпитальный bozoridagi pomidorlardan gaspaço. Ikkalasi ham xamirturushli patir bilan beriladi.",
                "This season that means a cold beetroot soup on kefir and a gazpacho from Gospitalny market tomatoes. Both come with sourdough flatbread.",
              ),
              L(
                "Абрикосовый тарт печём каждый день по 30 штук, обычно к четырём дня их уже нет. Сезон закончится в конце августа.",
                "O'rikli tartni har kuni 30 tadan yopamiz, odatda soat to'rtga qolmaydi. Mavsum avgust oxirida tugaydi.",
                "We bake thirty apricot tarts a day and they are usually gone by four. The season ends in late August.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "kak-my-vedem-zakvasku",
      categorySlug: "recipes",
      title: L(
        "Как мы ведём закваску седьмой год",
        "Xamirturushni yetti yildan beri qanday saqlaymiz",
        "How we have kept our starter for seven years",
      ),
      excerpt: L(
        "Пшеничная закваска «Зерна» старше самого кафе. Рассказываем, как её кормят и почему хлеб зимой другой.",
        "«Zerno»ning bug'doy xamirturushi kafening o'zidan ham kattaroq. Uni qanday oziqlantirishimiz va qishda non nega boshqacha bo'lishini aytamiz.",
        "Zerno's wheat starter is older than the cafe itself. Here is how we feed it and why the bread differs in winter.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Закваску Шахло привезла из Лиона в 2018 году в стеклянной банке. С тех пор её кормят дважды в день мукой из Зангиаты и водой комнатной температуры.",
                "Xamirturushni Shahlo 2018-yilda Liondan shisha bankada olib kelgan. O'shandan beri uni kuniga ikki marta Zangiota unidan va xona haroratidagi suvdan oziqlantiramiz.",
                "Shahlo brought the starter from Lyon in a glass jar in 2018. Since then it is fed twice a day with Zangiata flour and room-temperature water.",
              ),
              L(
                "Летом в цеху 28 градусов, и тесто подходит за четыре часа. Зимой — шесть-семь, поэтому зимний хлеб кислее и с более плотным мякишем.",
                "Yozda sexda 28 daraja bo'ladi va xamir to'rt soatda ko'tariladi. Qishda — olti-yetti soat, shuning uchun qishki non nordonroq va zichroq bo'ladi.",
                "In summer the bakery sits at 28 degrees and the dough rises in four hours. In winter it takes six or seven, so winter bread is tangier with a tighter crumb.",
              ),
              L(
                "Если хотите завести свою — приходите в понедельник после двенадцати, отсыпем стартер и объясним режим кормления.",
                "O'zingizniki bo'lishini xohlasangiz — dushanba kuni o'n ikkidan keyin keling, starter berib, oziqlantirish tartibini tushuntiramiz.",
                "If you want your own, come by on Monday after noon: we will give you some starter and explain the feeding schedule.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "degustaciya-filtr-kofe",
      categorySlug: "events",
      title: L(
        "Дегустация фильтр-кофе — каждую субботу в 11:00",
        "Filtr qahva degustatsiyasi — har shanba soat 11:00 da",
        "Filter coffee tasting — every Saturday at 11:00",
      ),
      excerpt: L(
        "Сравниваем три обжарки вслепую, разбираем, чем эфиопское зерно отличается от колумбийского. Участие бесплатное.",
        "Uchta qovurishni ko'r-ko'rona solishtiramiz, efiopiya doni kolumbiyanikidan nimasi bilan farq qilishini tahlil qilamiz. Ishtirok bepul.",
        "We compare three roasts blind and unpack how Ethiopian beans differ from Colombian ones. Free to join.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Каждую субботу в 11:00 Фаррух заваривает три образца одной свежей обжарки и двух прошлых недель. Задача — на вкус определить, какой из них свежее.",
                "Har shanba soat 11:00 da Farrux bitta yangi va ikkita o'tgan haftalardagi qovurishdan namuna damlaydi. Vazifa — ta'mi bo'yicha qaysi biri yangiroq ekanini aniqlash.",
                "Every Saturday at 11:00 Farrukh brews three samples: one fresh roast and two from previous weeks. The task is to taste which is freshest.",
              ),
              L(
                "Занимает около сорока минут, мест — восемь. Записываемся по телефону или прямо у стойки.",
                "Taxminan qirq daqiqa davom etadi, joylar — sakkizta. Telefon orqali yoki peshtaxta oldida yozilamiz.",
                "It runs about forty minutes with eight seats. Sign up by phone or at the counter.",
              ),
            ),
          },
        },
      ],
    },
  ],
};
