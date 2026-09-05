import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * Турагентство «Yo'l Bor» — туры по Узбекистану, офис в Мирабадском районе.
 * Структура профиля: решение принимают по маршруту и цене «под ключ», поэтому
 * туры описаны по дням, цена включает конкретный список, а блог работает как
 * путеводитель — именно он приводит поисковый трафик в этой нише.
 */
export const travelTemplate: SiteTemplate = {
  key: "travel",
  label: L("Туризм и турагентство", "Turizm va turagentlik", "Travel agency"),
  profile: L(
    "Турагентство «Yo'l Bor», Мирабад",
    "«Yo'l Bor» turagentligi, Mirobod",
    "Yo'l Bor travel agency, Mirabad",
  ),
  description: L(
    "Туры по Узбекистану с маршрутом по дням, ценой под ключ и подбором под даты, плюс блог-путеводитель.",
    "Kunlar bo'yicha yo'nalishi, kalit topshirish narxi va sanalarga moslash bilan O'zbekiston bo'ylab turlar, ustiga blog-yo'lboshchi.",
    "Tours around Uzbekistan with day-by-day itineraries, all-in prices and date matching, plus a guide-style blog.",
  ),
  themeKey: "travel",
  design: { skin: "guide", fontDisplay: "Merriweather", fontBody: "Noto Sans", radiusScale: "lg" },

  settings: {
    siteName: L("Yo'l Bor", "Yo'l Bor", "Yo'l Bor"),
    tagline: L(
      "Туры по Узбекистану из Ташкента",
      "Toshkentdan O'zbekiston bo'ylab turlar",
      "Tours around Uzbekistan, starting in Tashkent",
    ),
    contactEmail: "tour@yolbor.uz",
    contactPhone: "+998 71 202 14 09",
    contactAddress: L(
      "Ташкент, Мирабадский район, ул. Амира Темура, 41, офис 12",
      "Toshkent, Mirobod tumani, Amir Temur ko'chasi, 41, 12-ofis",
      "Tashkent, Mirabad district, 41 Amir Temur street, office 12",
    ),
    footerNote: L(
      "© Турагентство «Yo'l Bor», Ташкент. Договор, ваучеры и поддержка в поездке 24/7.",
      "© «Yo'l Bor» turagentligi, Toshkent. Shartnoma, vaucherlar va sayohatda 24/7 qo'llab-quvvatlash.",
      "© Yo'l Bor travel agency, Tashkent. Contracts, vouchers and 24/7 support while you travel.",
    ),
  },

  categories: [
    {
      slug: "napravleniya",
      order: 1,
      name: L("Направления", "Yo'nalishlar", "Destinations"),
      description: L(
        "Города и места Узбекистана: когда ехать, что смотреть и сколько это занимает.",
        "O'zbekiston shaharlari va joylari: qachon borish, nimani ko'rish va bu qancha vaqt oladi.",
        "Cities and places across Uzbekistan: when to go, what to see and how long it takes.",
      ),
    },
    {
      slug: "sovety",
      order: 2,
      name: L("Советы путешественнику", "Sayohatchiga maslahat", "Travel tips"),
      description: L(
        "Деньги, транспорт, жара, связь — практические вещи, о которых спрашивают чаще всего.",
        "Pul, transport, issiq, aloqa — eng ko'p so'raladigan amaliy narsalar.",
        "Money, transport, heat and connectivity — the practical questions we get most.",
      ),
    },
    {
      slug: "predlozheniya",
      order: 3,
      name: L("Спецпредложения", "Maxsus takliflar", "Special offers"),
      description: L(
        "Сборные группы с открытыми датами и туры с сокращённой ценой.",
        "Ochiq sanali yig'ma guruhlar va narxi tushirilgan turlar.",
        "Shared-group departures with open dates and tours at reduced prices.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "tours", order: 1, label: L("Туры", "Turlar", "Tours") },
    { location: "header", linkType: "page", target: "about", order: 2, label: L("Об агентстве", "Agentlik haqida", "About us") },
    { location: "header", linkType: "category", target: "napravleniya", order: 3, label: L("Направления", "Yo'nalishlar", "Destinations") },
    { location: "header", linkType: "category", target: "sovety", order: 4, label: L("Советы", "Maslahatlar", "Tips") },
    { location: "header", linkType: "page", target: "contacts", order: 5, label: L("Подобрать тур", "Tur tanlash", "Plan my trip") },
    { location: "footer", linkType: "page", target: "tours", order: 1, label: L("Туры", "Turlar", "Tours") },
    { location: "footer", linkType: "category", target: "predlozheniya", order: 2, label: L("Спецпредложения", "Maxsus takliflar", "Offers") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Туры по Узбекистану из Ташкента: Самарканд, Бухара, Хива, горы Чимгана. Маршруты по дням и цена под ключ.",
        "Toshkentdan O'zbekiston bo'ylab turlar: Samarqand, Buxoro, Xiva, Chimyon tog'lari. Kunlar bo'yicha yo'nalish va kalit narx.",
        "Tours around Uzbekistan from Tashkent: Samarkand, Bukhara, Khiva and the Chimgan mountains. Day-by-day routes, all-in prices.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Узбекистан без самостоятельной логистики",
            "O'zbekiston — o'zingiz logistika bilan ovora bo'lmasdan",
            "Uzbekistan without sorting the logistics yourself",
          ),
          subheading: L(
            "Собираем маршруты по стране с 2015 года: билеты на «Афросиаб», гостиницы в центре, гид и трансферы — одной ценой и одним договором.",
            "2015-yildan beri mamlakat bo'ylab yo'nalishlar tuzamiz: «Afrosiyob» chiptalari, markazdagi mehmonxonalar, gid va transferlar — bitta narx va bitta shartnoma bilan.",
            "We have been putting together routes across the country since 2015: Afrosiyob train tickets, hotels in the old centres, guides and transfers — one price, one contract.",
          ),
          ctaLabel: L("Подобрать тур", "Tur tanlash", "Plan my trip"),
          ctaLink: "/contacts",
          variant: "fullBleed",
          overlayOpacity: 0.45,
        }),

        B.features(
          "why",
          L("Как мы работаем", "Qanday ishlaymiz", "How we work"),
          [
            {
              icon: "globe",
              title: L("Маршрут по дням", "Kunlar bo'yicha yo'nalish", "A day-by-day itinerary"),
              body: L(
                "До оплаты вы видите программу по часам: во сколько выезд, что успеваете посмотреть и где будет свободное время.",
                "To'lovdan oldin dasturni soatlab ko'rasiz: qachon jo'nash, nimani ko'rishga ulgurasiz va qachon bo'sh vaqt bo'ladi.",
                "Before you pay you see the schedule hour by hour: departure times, what you will actually see, and when you have free time.",
              ),
            },
            {
              icon: "check",
              title: L("Цена под ключ", "Kalit topshirish narxi", "One all-in price"),
              body: L(
                "В стоимость входят транспорт, гостиницы, гид и входные билеты. Что не входит — написано в той же таблице.",
                "Narxga transport, mehmonxona, gid va kirish chiptalari kiradi. Nima kirmasligi shu jadvalning o'zida yozilgan.",
                "Transport, hotels, guide and entrance tickets are included. What is not included is listed in the same table.",
              ),
            },
            {
              icon: "users",
              title: L("Малые группы", "Kichik guruhlar", "Small groups"),
              body: L(
                "Сборные группы до 12 человек, индивидуальные туры — от двух. Микроавтобус, а не туристический автобус на 45 мест.",
                "Yig'ma guruhlar 12 kishigacha, individual turlar — ikki kishidan. Avtobus emas, mikroavtobus.",
                "Shared groups of up to twelve; private tours from two people. A minibus, not a 45-seat coach.",
              ),
            },
            {
              icon: "message",
              title: L("Поддержка в поездке", "Sayohatda qo'llab-quvvatlash", "Support while you travel"),
              body: L(
                "Куратор на связи круглосуточно всё время маршрута: поезд, отель, замена гида — решаем мы, а не вы.",
                "Kurator butun yo'nalish davomida kechayu kunduz aloqada: poyezd, mehmonxona, gid almashtirish — buni siz emas, biz hal qilamiz.",
                "A coordinator is on call around the clock for the whole route: trains, hotels, a guide swap — we deal with it, not you.",
              ),
            },
          ],
          2,
        ),

        S(
          B.stats("stats", [
            { value: L("11 лет", "11 yil", "11 years"), label: L("Работаем с туристами", "Sayohatchilar bilan ishlaymiz", "Working with travellers") },
            { value: L("2 400+", "2 400+", "2,400+"), label: L("Гостей за 2025 год", "2025-yildagi mehmonlar", "Guests in 2025") },
            { value: L("12", "12", "12"), label: L("Человек — максимум в группе", "Guruhdagi eng ko'p odam", "Maximum group size") },
            { value: L("24/7", "24/7", "24/7"), label: L("Поддержка на маршруте", "Yo'nalishda qo'llab-quvvatlash", "Support on the route") },
          ]),
          { bg: "surface" },
        ),

      B.pricing(
        "tours",
        L("Популярные туры", "Ommabop turlar", "Popular tours"),
        [
          {
            name: L("Самарканд, 2 дня", "Samarqand, 2 kun", "Samarkand, 2 days"),
            price: L("1 850 000 сум", "1 850 000 so'm", "1,850,000 UZS"),
            period: L("с человека, выезд по пятницам", "bir kishidan, juma kunlari jo'nash", "per person, Friday departures"),
            features: [
              L("«Афросиаб» туда и обратно", "«Afrosiyob» borish va qaytish", "Afrosiyob train both ways"),
              L("Отель в 10 минутах от Регистана", "Registondan 10 daqiqalik mehmonxona", "A hotel ten minutes from the Registan"),
              L("Гид на два дня и входные билеты", "Ikki kunga gid va kirish chiptalari", "A guide for two days and entrance tickets"),
            ],
            ctaLabel: L("Забронировать", "Band qilish", "Book"),
            ctaLink: "/contacts",
          },
          {
            name: L("Золотое кольцо, 6 дней", "Oltin halqa, 6 kun", "Golden Ring, 6 days"),
            price: L("6 400 000 сум", "6 400 000 so'm", "6,400,000 UZS"),
            period: L("с человека, группа до 12", "bir kishidan, 12 kishigacha guruh", "per person, group of up to 12"),
            features: [
              L("Самарканд, Бухара, Хива", "Samarqand, Buxoro, Xiva", "Samarkand, Bukhara, Khiva"),
              L("Поезд и перелёт Ургенч — Ташкент", "Poyezd va Urganch — Toshkent parvozi", "Train travel plus the Urgench–Tashkent flight"),
              L("Гостиницы в исторических центрах", "Tarixiy markazlardagi mehmonxonalar", "Hotels inside the historic centres"),
              L("Гид на весь маршрут и все входные билеты", "Butun yo'nalishga gid va barcha chiptalar", "A guide for the whole route and all entry tickets"),
            ],
            highlighted: true,
            ctaLabel: L("Обсудить даты", "Sanalarni muhokama qilish", "Discuss dates"),
            ctaLink: "/contacts",
          },
          {
            name: L("Чимган и Чарвак, 1 день", "Chimyon va Charvoq, 1 kun", "Chimgan and Charvak, 1 day"),
            price: L("480 000 сум", "480 000 so'm", "480,000 UZS"),
            period: L("с человека, выезд по субботам", "bir kishidan, shanba kunlari", "per person, Saturday departures"),
            features: [
              L("Микроавтобус из центра Ташкента", "Toshkent markazidan mikroavtobus", "A minibus from central Tashkent"),
              L("Канатная дорога и обед у водохранилища", "Arqonli yo'l va suv ombori bo'yida tushlik", "The cable car and lunch by the reservoir"),
              L("Возвращение в город к 19:00", "Shaharga 19:00 gacha qaytish", "Back in the city by 19:00"),
            ],
            ctaLabel: L("Поехать", "Borish", "Join"),
            ctaLink: "/contacts",
          },
        ],
      ),

        S(
          B.gallery(
            "photos",
            [
              L("Регистан рано утром, до автобусов", "Ertalab, avtobuslardan oldin Registon", "The Registan early, before the coaches"),
              L("Ляби-Хауз, Бухара, вечерний чай", "Labi Hovuz, Buxoro, kechki choy", "Lyabi-Hauz in Bukhara, evening tea"),
              L("Ичан-Кала, Хива, с крыши медресе", "Ichan Qal'a, Xiva, madrasa tomidan", "Ichan-Kala, Khiva, from a madrasa roof"),
              L("Чарвакское водохранилище в мае", "May oyida Charvoq suv ombori", "Charvak reservoir in May"),
              L("Перевал на пути в Чимган", "Chimyonga yo'ldagi dovon", "The pass on the way to Chimgan"),
              L("Сиабский базар, Самарканд", "Siyob bozori, Samarqand", "Siab bazaar, Samarkand"),
            ],
            3,
          ),
          { bg: "surface" },
        ),

        B.testimonials(
          "reviews",
          L("Отзывы путешественников", "Sayohatchilar fikri", "What travellers say"),
          [
            {
              quote: L(
                "Ехали вчетвером с детьми 6 и 9 лет. Программу перестроили под нас: убрали два музея, добавили свободное утро — дети выдержали шесть дней без капризов.",
                "6 va 9 yoshli bolalar bilan to'rt kishi bordik. Dasturni bizga moslashtirdilar: ikkita muzeyni olib tashlab, bo'sh ertalabni qo'shdilar — bolalar olti kunga injiqliksiz chidashdi.",
                "We travelled as a family of four with children aged six and nine. They reworked the programme for us: dropped two museums, added a free morning — the kids lasted six days without a meltdown.",
              ),
              authorName: L("Семья Расуловых", "Rasulovlar oilasi", "The Rasulov family"),
              authorRole: L("Золотое кольцо, апрель 2026", "Oltin halqa, 2026-yil aprel", "Golden Ring, April 2026"),
            },
            {
              quote: L(
                "В Бухаре сломался кондиционер в номере. Написала куратору в 23:40, к полуночи нас перевели в другой отель без доплаты. Это и есть разница с самостоятельной поездкой.",
                "Buxoroda xonadagi konditsioner buzildi. Kuratorga 23:40 da yozdim, yarim tunga qadar bizni qo'shimcha to'lovsiz boshqa mehmonxonaga ko'chirishdi. Mustaqil sayohatdan farqi shu.",
                "In Bukhara the air conditioning failed. I messaged the coordinator at 23:40 and by midnight we were moved to another hotel at no extra cost. That is the difference from doing it yourself.",
              ),
              authorName: L("Ирина Ковалёва", "Irina Kovalyova", "Irina Kovaleva"),
              authorRole: L("Самарканд — Бухара, июнь 2026", "Samarqand — Buxoro, 2026-yil iyun", "Samarkand–Bukhara, June 2026"),
            },
          ],
        ),

        S(
          B.cta("cta", {
            heading: L("Подберём маршрут под ваши даты", "Sanalaringizga mos yo'nalish tanlaymiz", "We'll build a route around your dates"),
            body: L(
              "Напишите, сколько у вас дней и с кем едете, — пришлём два-три варианта с ценой в течение дня.",
              "Necha kuningiz borligini va kim bilan borishingizni yozing — kun davomida narxi bilan ikki-uch variant yuboramiz.",
              "Tell us how many days you have and who is travelling — we send two or three costed options the same day.",
            ),
            buttonLabel: L("Оставить заявку", "Ariza qoldirish", "Send a request"),
            buttonLink: "/contacts",
          }),
          { bg: "accent", align: "center" },
        ),
      ],
    },

    // ---------------------------------------------------------------- туры
    {
      slug: "tours",
      title: L("Туры", "Turlar", "Tours"),
      metaDesc: L(
        "Туры «Yo'l Bor» по Узбекистану: Самарканд, Бухара, Хива, Чимган и Аральское море. Программы по дням.",
        "«Yo'l Bor» turlari: Samarqand, Buxoro, Xiva, Chimyon va Orol dengizi. Kunlar bo'yicha dasturlar.",
        "Yo'l Bor tours around Uzbekistan: Samarkand, Bukhara, Khiva, Chimgan and the Aral Sea. Day-by-day programmes.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Все программы можно менять: убрать музей, добавить свободный день, сдвинуть выезд на более раннее утро. Мы пересчитываем стоимость и присылаем новый вариант — обычно в тот же день.",
                "Barcha dasturlarni o'zgartirish mumkin: muzeyni olib tashlash, bo'sh kun qo'shish, jo'nashni erta ertalabga surish. Narxni qayta hisoblab, yangi variantni yuboramiz — odatda o'sha kuni.",
                "Every programme can be changed: drop a museum, add a free day, move the departure earlier. We recost it and send a new version, usually the same day.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.imageText("samarkand", {
          heading: L("Самарканд за два дня", "Samarqand ikki kunda", "Samarkand in two days"),
          body: L(
            "Пятница, 7:28 — «Афросиаб» из Ташкента. День первый: Регистан, Гур-Эмир, Сиабский базар, вечер свободный. День второй: Шахи-Зинда до девяти утра, пока нет групп, обсерватория Улугбека, обед в чайхане у Биби-Ханым и поезд в 17:00. Отель — в десяти минутах пешком от Регистана.",
            "Juma, 7:28 — Toshkentdan «Afrosiyob». Birinchi kun: Registon, Go'ri Amir, Siyob bozori, kechqurun bo'sh. Ikkinchi kun: guruhlar kelmasidan, to'qqizgacha Shohi Zinda, Ulug'bek rasadxonasi, Bibixonim yonidagi choyxonada tushlik va 17:00 dagi poyezd. Mehmonxona — Registondan o'n daqiqalik yo'l.",
            "Friday, 7:28 — the Afrosiyob from Tashkent. Day one: the Registan, Gur-e-Amir, Siab bazaar, evening free. Day two: Shah-i-Zinda before nine while it is still empty, Ulugbek's observatory, lunch in a chaikhana by Bibi-Khanym, and the 17:00 train back. The hotel is a ten-minute walk from the Registan.",
          ),
          imageSide: "right",
        }),

        B.imageText("golden-ring", {
          heading: L("Золотое кольцо: Самарканд — Бухара — Хива, 6 дней", "Oltin halqa: Samarqand — Buxoro — Xiva, 6 kun", "Golden Ring: Samarkand, Bukhara, Khiva, 6 days"),
          body: L(
            "Классический маршрут без спешки: два дня в Самарканде, два в Бухаре, полтора в Хиве. Между городами — поезд, обратно из Ургенча самолёт, чтобы не терять день на дорогу. В Бухаре ночуем в старом городе, в двух шагах от Ляби-Хауза.",
            "Shoshilinchsiz klassik yo'nalish: Samarqandda ikki kun, Buxoroda ikki kun, Xivada bir yarim kun. Shaharlar orasida poyezd, qaytishda kunni yo'lda yo'qotmaslik uchun Urganchdan samolyot. Buxoroda eski shaharda, Labi Hovuz yonida tunaymiz.",
            "The classic route, unhurried: two days in Samarkand, two in Bukhara, a day and a half in Khiva. Trains between the cities, and a flight home from Urgench so you do not lose a day on the road. In Bukhara you stay inside the old town, steps from Lyabi-Hauz.",
          ),
          imageSide: "left",
        }),

        B.imageText("mountains", {
          heading: L("Горы за один день: Чимган и Чарвак", "Bir kunda tog'lar: Chimyon va Charvoq", "The mountains in a day: Chimgan and Charvak"),
          body: L(
            "Выезд из центра Ташкента в 8:00, дорога через Газалкент, канатная дорога в Чимгане, обед у Чарвакского водохранилища и возвращение к 19:00. Тур для тех, у кого в Ташкенте всего один свободный день, и для семей с детьми — дорога занимает полтора часа.",
            "Toshkent markazidan 8:00 da jo'nash, G'azalkent orqali yo'l, Chimyonda arqonli yo'l, Charvoq suv ombori bo'yida tushlik va 19:00 gacha qaytish. Toshkentda bitta bo'sh kuni bor va bolali oilalar uchun — yo'l bir yarim soat.",
            "Leave central Tashkent at 8:00, drive via Gazalkent, ride the Chimgan cable car, have lunch by the Charvak reservoir and be back by 19:00. Good for anyone with a single free day in Tashkent, and for families — the drive is only ninety minutes.",
          ),
          imageSide: "right",
        }),

        S(
          B.faq(
            "faq",
            L("Что входит и что нет", "Nima kiradi va nima kirmaydi", "What is and isn't included"),
            [
              {
                question: L("Что входит в цену тура?", "Tur narxiga nima kiradi?", "What does the tour price cover?"),
                answer: L(
                  "Транспорт между городами, гостиницы с завтраками, гид, входные билеты в объекты по программе и трансферы вокзал — отель.",
                  "Shaharlararo transport, nonushtali mehmonxonalar, gid, dastur bo'yicha obyektlarga kirish chiptalari va vokzal — mehmonxona transferlari.",
                  "Transport between cities, hotels with breakfast, a guide, entrance tickets for the sites on the programme, and station-to-hotel transfers.",
                ),
              },
              {
                question: L("Что не входит?", "Nima kirmaydi?", "What is not included?"),
                answer: L(
                  "Обеды и ужины, личные расходы, съёмка внутри некоторых объектов и чаевые. Мы специально не «зашиваем» питание в цену: в Самарканде и Бухаре вкуснее есть там, где хочется, а не по расписанию.",
                  "Tushlik va kechki ovqat, shaxsiy xarajatlar, ba'zi obyektlar ichidagi suratga olish va choychaqa. Ovqatni narxga ataylab qo'shmaymiz: Samarqand va Buxoroda jadval bo'yicha emas, xohlagan joyda yegan mazaliroq.",
                  "Lunches and dinners, personal spending, photo permits at some sites, and tips. We deliberately leave meals out of the price: in Samarkand and Bukhara it is better to eat where you feel like, not on a schedule.",
                ),
              },
              {
                question: L("Когда лучше ехать?", "Qachon borish yaxshi?", "When is the best time to go?"),
                answer: L(
                  "Апрель–май и сентябрь–октябрь. Июль и август в Бухаре и Хиве — до 44 градусов, тур физически тяжёлый, и мы честно об этом предупреждаем.",
                  "Aprel–may va sentabr–oktabr. Iyul va avgustda Buxoro va Xivada 44 darajagacha issiq bo'ladi, tur jismonan og'ir — buni ochiq aytamiz.",
                  "April–May and September–October. July and August reach 44°C in Bukhara and Khiva; the tour is physically hard then, and we say so plainly.",
                ),
              },
              {
                question: L("Можно ли тур на двоих без группы?", "Guruhsiz, ikki kishilik tur bo'ladimi?", "Can we travel privately, just the two of us?"),
                answer: L(
                  "Да, индивидуальные туры — от двух человек. Цена выше сборной примерно на 35%, зато маршрут и темп полностью ваши.",
                  "Ha, individual turlar — ikki kishidan. Narx yig'ma guruhdan taxminan 35% qimmat, lekin yo'nalish va sur'at butunlay sizniki.",
                  "Yes, private tours run from two people. It costs about 35% more than a shared group, but the route and the pace are entirely yours.",
                ),
              },
            ],
          ),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },

    // ------------------------------------------------------------- об агентстве
    {
      slug: "about",
      title: L("Об агентстве", "Agentlik haqida", "About the agency"),
      metaDesc: L(
        "Турагентство «Yo'l Bor»: команда, лицензия, договор и как устроена поддержка на маршруте.",
        "«Yo'l Bor» turagentligi: jamoa, litsenziya, shartnoma va yo'nalishdagi qo'llab-quvvatlash qanday ishlaydi.",
        "Yo'l Bor travel agency: the team, our licence, the contract and how on-route support works.",
      ),
      blocks: [
        B.imageText("story", {
          heading: L("Мы начинали с одного маршрута", "Biz bitta yo'nalishdan boshlaganmiz", "We started with a single route"),
          body: L(
            "В 2015 году агентство возило одну группу в неделю по маршруту Ташкент — Самарканд. Сейчас у нас девять программ и три микроавтобуса, но принцип не изменился: маршрут собирает человек, который сам по нему проехал, а не менеджер по каталогу.",
            "2015-yilda agentlik haftasiga bitta guruhni Toshkent — Samarqand yo'nalishi bo'ylab olib borardi. Hozir to'qqizta dastur va uchta mikroavtobusimiz bor, lekin tamoyil o'zgarmadi: yo'nalishni katalog bo'yicha menejer emas, o'sha yo'ldan o'zi o'tgan odam tuzadi.",
            "In 2015 the agency ran one group a week on the Tashkent–Samarkand route. Today we have nine programmes and three minibuses, but the principle has not changed: routes are built by someone who has travelled them, not by a manager working from a catalogue.",
          ),
          imageSide: "right",
        }),

        B.team(
          "team",
          L("Кто работает с вашей поездкой", "Sayohatingiz ustida kim ishlaydi", "Who works on your trip"),
          [
            {
              name: L("Абдулла Шарипов", "Abdulla Sharipov", "Abdulla Sharipov"),
              role: L("Директор, составляет маршруты", "Direktor, yo'nalishlarni tuzadi", "Director, builds the itineraries"),
              bio: L(
                "11 лет в туризме, до этого работал гидом по Самарканду и Бухаре. Лично проверяет каждую новую гостиницу.",
                "Turizmda 11 yil, undan oldin Samarqand va Buxoroda gid bo'lgan. Har bir yangi mehmonxonani shaxsan tekshiradi.",
                "Eleven years in tourism, previously a guide in Samarkand and Bukhara. Checks every new hotel himself.",
              ),
            },
            {
              name: L("Мохира Юлдашева", "Mohira Yo'ldosheva", "Mohira Yuldasheva"),
              role: L("Куратор групп, поддержка 24/7", "Guruhlar kuratori, 24/7 qo'llab-quvvatlash", "Group coordinator, 24/7 support"),
              bio: L(
                "На связи всё время маршрута. Решает вопросы с отелями, поездами и заменой гида — обычно до того, как вы заметите проблему.",
                "Butun yo'nalish davomida aloqada. Mehmonxona, poyezd va gid almashtirish masalalarini hal qiladi — odatda siz muammoni sezmasingizdan oldin.",
                "On call for the whole route. Deals with hotels, trains and guide swaps — usually before you notice anything is wrong.",
              ),
            },
            {
              name: L("Санжар Эргашев", "Sanjar Ergashev", "Sanjar Ergashev"),
              role: L("Гид по Самарканду и Бухаре", "Samarqand va Buxoro gidi", "Guide in Samarkand and Bukhara"),
              bio: L(
                "Историк по образованию, работает на русском, узбекском и английском. Не пересказывает таблички — объясняет контекст.",
                "Ma'lumoti bo'yicha tarixchi, rus, o'zbek va ingliz tillarida ishlaydi. Lavhalarni takrorlamaydi — kontekstni tushuntiradi.",
                "A historian by training, working in Russian, Uzbek and English. He does not read the plaques aloud — he explains the context.",
              ),
            },
          ],
        ),

        S(
          B.features(
            "guarantees",
            L("Что вы получаете на бумаге", "Qog'ozda nima olasiz", "What you get in writing"),
            [
              {
                icon: "shield",
                title: L("Договор и ваучеры", "Shartnoma va vaucherlar", "A contract and vouchers"),
                body: L(
                  "Договор с программой в приложении, ваучеры на гостиницы и билеты на руках до выезда.",
                  "Ilovada dasturi bilan shartnoma, mehmonxona vaucherlari va chiptalar jo'nashdan oldin qo'lingizda.",
                  "A contract with the programme attached, plus hotel vouchers and tickets in your hands before departure.",
                ),
              },
              {
                icon: "clock",
                title: L("Возврат по правилам", "Qoidalar bo'yicha qaytarish", "Clear refund rules"),
                body: L(
                  "Отмена за 14 дней — возврат полной суммы за вычетом билетов. Условия прописаны в договоре, а не «по ситуации».",
                  "14 kun oldin bekor qilinsa — chiptalar chegirib, to'liq summa qaytariladi. Shartlar «vaziyatga qarab» emas, shartnomada yozilgan.",
                  "Cancel 14 days ahead and you get everything back except ticket costs. The terms are in the contract, not decided case by case.",
                ),
              },
              {
                icon: "globe",
                title: L("Лицензия и страховка", "Litsenziya va sug'urta", "Licence and insurance"),
                body: L(
                  "Агентство в реестре туроператоров Узбекистана, страховка путешественника оформляется по желанию.",
                  "Agentlik O'zbekiston turoperatorlari reyestrida, sayohatchi sug'urtasi xohishga ko'ra rasmiylashtiriladi.",
                  "The agency is on the Uzbek tour operator register; traveller insurance is arranged on request.",
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
      title: L("Подобрать тур", "Tur tanlash", "Plan my trip"),
      metaDesc: L(
        "Связаться с «Yo'l Bor»: офис на Амира Темура, телефон, часы работы и форма подбора тура.",
        "«Yo'l Bor» bilan bog'lanish: Amir Temur ko'chasidagi ofis, telefon, ish vaqti va tur tanlash shakli.",
        "Contact Yo'l Bor: the Amir Temur street office, phone, opening hours and a trip request form.",
      ),
      blocks: [
        S(
          B.richText(
            "where",
            paragraphs(
              L(
                "Офис — на Амира Темура, 41, двенадцатый кабинет на втором этаже, напротив сквера. Работаем с понедельника по субботу с 9:00 до 19:00, в воскресенье — только по телефону и в Telegram.",
                "Ofis — Amir Temur ko'chasi, 41-uy, ikkinchi qavatdagi 12-xona, skver ro'parasida. Dushanbadan shanbagacha 9:00 dan 19:00 gacha ishlaymiz, yakshanba — faqat telefon va Telegram orqali.",
                "Our office is at 41 Amir Temur street, room 12 on the first floor, opposite the square. Open Monday to Saturday, 9:00–19:00; on Sundays we answer by phone and Telegram only.",
              ),
              L(
                "Приезжать в офис не обязательно: договор подписываем электронно, оплату принимаем переводом или картой. Личная встреча нужна, только если вы сами хотите обсудить маршрут за картой.",
                "Ofisga kelish shart emas: shartnomani elektron imzolaymiz, to'lovni o'tkazma yoki karta orqali qabul qilamiz. Shaxsan uchrashuv faqat siz yo'nalishni xarita ustida muhokama qilmoqchi bo'lsangiz kerak.",
                "You do not have to come in: we sign contracts electronically and take payment by transfer or card. A meeting is only needed if you want to talk the route through over a map.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Заявка на подбор тура", "Tur tanlash uchun ariza", "Trip request"),
            submitLabel: L("Отправить заявку", "Arizani yuborish", "Send request"),
            successMessage: L(
              "Заявка получена. Пришлём два-три варианта маршрута с ценой в течение рабочего дня.",
              "Ariza olindi. Ish kuni davomida narxi bilan ikki-uch variant yuboramiz.",
              "Request received. We will send two or three costed route options within one working day.",
            ),
            fields: [
              { type: "text", label: L("Имя", "Ism", "Name") },
              { type: "tel", label: L("Телефон или Telegram", "Telefon yoki Telegram", "Phone or Telegram") },
              { type: "text", label: L("Даты и число путешественников", "Sanalar va sayohatchilar soni", "Dates and number of travellers") },
              { type: "textarea", label: L("Куда хотите поехать и что важно", "Qayerga bormoqchisiz va nima muhim", "Where you want to go and what matters to you"), required: false },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "buhara-za-dva-dnya",
      categorySlug: "napravleniya",
      title: L(
        "Бухара за два дня: маршрут, который не выматывает",
        "Buxoro ikki kunda: charchatmaydigan yo'nalish",
        "Bukhara in two days: a route that won't exhaust you",
      ),
      excerpt: L(
        "Что успеть в старом городе, когда лучше выходить из отеля и где обедать, чтобы не терять час.",
        "Eski shaharda nimani ulgurish, mehmonxonadan qachon chiqish va bir soatni yo'qotmaslik uchun qayerda tushlik qilish.",
        "What to see in the old town, when to leave the hotel, and where to eat without losing an hour.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Бухару принято смотреть за один день — и это ошибка. Старый город компактный, но в июле после одиннадцати утра по нему невозможно ходить, а к пяти вечера свет становится лучшим за день.",
              "Buxoroni bir kunda ko'rish odat bo'lgan — bu xato. Eski shahar ixcham, lekin iyulda soat o'ndan keyin unda yurib bo'lmaydi, kechki beshda esa yorug'lik kunning eng yaxshisi bo'ladi.",
              "People try to do Bukhara in a day, and that is a mistake. The old town is compact, but in July you cannot walk it after eleven, and by five the light is the best it gets.",
            ),
            L(
              "Рабочая схема: выходить в семь утра, к десяти закончить с Пой-Калян и Арком, вернуться в отель до трёх и выйти снова к пяти — на Чор-Минор и торговые купола. Вечером Ляби-Хауз, чай и никакой программы.",
              "Ishlaydigan sxema: yetti da chiqish, o'ngacha Poyi Kalon va Arkni tugatish, uchgacha mehmonxonaga qaytish va beshda yana chiqish — Chor Minor va savdo gumbazlariga. Kechqurun Labi Hovuz, choy va hech qanday dastur yo'q.",
              "The pattern that works: out at seven, finish Poi-Kalyan and the Ark by ten, back at the hotel before three, out again at five for Chor-Minor and the trading domes. In the evening, Lyabi-Hauz, tea and no schedule at all.",
            ),
            L(
              "Обедать лучше в чайхане у Ляби-Хауза, а не бежать к отелю: там тень, и вы не теряете час на дорогу туда-обратно в самое пекло.",
              "Tushlikni mehmonxonaga yugurgandan ko'ra Labi Hovuz yonidagi choyxonada qilgan ma'qul: u yerda soya bor va eng jaziramada borib-kelishga bir soat yo'qotmaysiz.",
              "Eat lunch at a chaikhana by Lyabi-Hauz rather than trekking back to the hotel: there is shade there, and you do not lose an hour walking both ways in the worst heat.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "kak-platit-v-uzbekistane",
      categorySlug: "sovety",
      title: L(
        "Деньги в поездке: карта, наличные и где менять",
        "Sayohatda pul: karta, naqd va qayerda almashtirish",
        "Money on the road: cards, cash and where to exchange",
      ),
      excerpt: L(
        "Практический разбор для гостей страны: где принимают карты, сколько держать наличными и что с обменом.",
        "Mamlakat mehmonlari uchun amaliy tahlil: qayerda karta qabul qilinadi, qancha naqd saqlash va almashtirish qanday.",
        "A practical guide for visitors: where cards work, how much cash to carry and how exchange works.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "В Ташкенте, Самарканде и Бухаре картой платят почти везде: отели, рестораны, музеи, супермаркеты. Проблемы начинаются на базарах, в чайханах у трассы и у частных перевозчиков.",
              "Toshkent, Samarqand va Buxoroda karta bilan deyarli hamma joyda to'lanadi: mehmonxona, restoran, muzey, supermarket. Muammo bozorlarda, trassa bo'yidagi choyxonalarda va xususiy tashuvchilarda boshlanadi.",
              "In Tashkent, Samarkand and Bukhara you can pay by card almost everywhere: hotels, restaurants, museums, supermarkets. The trouble starts at bazaars, roadside chaikhanas and with private drivers.",
            ),
            L(
              "Держите наличными примерно 500–700 тысяч сумов на день на человека — этого хватает на обеды, такси, сувениры и чаевые. Купюры в 100 тысяч на базаре разменять сложно, просите помельче.",
              "Kuniga bir kishiga taxminan 500–700 ming so'm naqd saqlang — bu tushlik, taksi, sovg'a va choychaqaga yetadi. Bozorda 100 minglik pulni maydalash qiyin, maydaroq so'rang.",
              "Carry around 500,000–700,000 UZS in cash per person per day — enough for lunches, taxis, souvenirs and tips. Breaking a 100,000 note at a bazaar is hard, so ask for smaller ones.",
            ),
            L(
              "Менять деньги — только в банках и обменных пунктах при отелях, курс там отличается незначительно. Уличный обмен запрещён, и это не формальность.",
              "Pulni faqat banklarda va mehmonxonalardagi almashtirish shoxobchalarida almashtiring, kurs farqi sezilarsiz. Ko'chada almashtirish taqiqlangan va bu shunchaki rasmiyatchilik emas.",
              "Change money only at banks or hotel exchange desks; the rates barely differ. Street exchange is illegal, and that is not a formality.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "sbornaya-gruppa-oktyabr",
      categorySlug: "predlozheniya",
      title: L(
        "Сборная группа на Золотое кольцо: выезд 12 октября",
        "Oltin halqaga yig'ma guruh: 12-oktabr jo'nash",
        "Shared group on the Golden Ring: departing 12 October",
      ),
      excerpt: L(
        "Осталось четыре места в группе из двенадцати. Шесть дней, гид на весь маршрут, цена ниже индивидуального тура на треть.",
        "O'n ikki kishilik guruhda to'rt joy qoldi. Olti kun, butun yo'nalishga gid, narx individual turdan uchdan bir arzon.",
        "Four places left in a group of twelve. Six days, a guide throughout, a third cheaper than a private tour.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Октябрь — лучшее время для Золотого кольца: днём около 24 градусов, в Хиве уже не жарко, а туристов заметно меньше, чем в мае.",
              "Oktabr — Oltin halqa uchun eng yaxshi vaqt: kunduzi 24 daraja atrofida, Xivada issiq emas, sayyohlar esa maydagiga qaraganda ancha kam.",
              "October is the best time for the Golden Ring: around 24°C in the daytime, Khiva is no longer baking, and there are noticeably fewer tourists than in May.",
            ),
            L(
              "Выезд 12 октября, возвращение 17-го. Программа стандартная: два дня Самарканд, два Бухара, полтора Хива, обратно самолётом из Ургенча. Цена — 6 400 000 сум с человека при двухместном размещении.",
              "Jo'nash 12-oktabr, qaytish 17-sida. Dastur odatdagi: ikki kun Samarqand, ikki kun Buxoro, bir yarim kun Xiva, qaytishda Urganchdan samolyot. Narx — ikki kishilik joylashuvda bir kishidan 6 400 000 so'm.",
              "Departing 12 October, back on the 17th. The standard programme: two days in Samarkand, two in Bukhara, a day and a half in Khiva, flying home from Urgench. 6,400,000 UZS per person sharing a twin room.",
            ),
            L(
              "Одноместное размещение — плюс 1 100 000 сум. Бронь держим три дня после заявки, предоплата 30%.",
              "Bir kishilik joylashuv — qo'shimcha 1 100 000 so'm. Arizadan keyin joyni uch kun ushlab turamiz, oldindan to'lov 30%.",
              "A single room costs 1,100,000 UZS more. We hold a place for three days after your request, with a 30% deposit.",
            ),
          ),
        ),
      ],
    },
  ],
};
