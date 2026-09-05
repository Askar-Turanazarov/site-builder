import { B, L, S, paragraphs, type SiteTemplate } from "./types";

/**
 * Салон красоты «Nafis» — Яккасарайский район Ташкента.
 * Структура профиля: решение принимают глазами и по мастеру, поэтому холст
 * строится вокруг работ и личных карточек мастеров, а прайс идёт сразу за
 * ними. Антиква с круглыми скруглениями отличает шаблон от строгих профилей
 * (юруслуги, строительство) даже при похожей палитре.
 */
export const beautyTemplate: SiteTemplate = {
  key: "beauty",
  label: L("Салон красоты", "Go'zallik saloni", "Beauty salon"),
  profile: L(
    "Салон «Nafis», Яккасарай",
    "«Nafis» saloni, Yakkasaroy",
    "Nafis salon, Yakkasaray",
  ),
  description: L(
    "Работы мастеров, прайс по услугам, личные карточки специалистов, отзывы и запись онлайн.",
    "Ustalar ishlari, xizmatlar narxi, mutaxassislarning shaxsiy kartalari, fikrlar va onlayn navbat.",
    "The team's work, a service price list, individual stylist profiles, reviews and online booking.",
  ),
  themeKey: "beauty",
  design: { skin: "salon", fontDisplay: "Playfair Display", fontBody: "Nunito", radiusScale: "full" },

  settings: {
    siteName: L("Nafis", "Nafis", "Nafis"),
    tagline: L(
      "Салон красоты на Шота Руставели",
      "Shota Rustaveli ko'chasidagi go'zallik saloni",
      "A beauty salon on Shota Rustaveli",
    ),
    contactEmail: "salom@nafis.uz",
    contactPhone: "+998 93 508 22 17",
    contactAddress: L(
      "Ташкент, Яккасарайский район, ул. Шота Руставели, 27",
      "Toshkent, Yakkasaroy tumani, Shota Rustaveli ko'chasi, 27",
      "Tashkent, Yakkasaray district, 27 Shota Rustaveli street",
    ),
    footerNote: L(
      "© Салон «Nafis», Ташкент. Работаем без выходных с 9:00 до 21:00, запись за 2–3 дня.",
      "© «Nafis» saloni, Toshkent. Dam olishsiz 9:00 dan 21:00 gacha, navbat 2–3 kun oldin.",
      "© Nafis salon, Tashkent. Open daily 9:00–21:00; book two to three days ahead.",
    ),
  },

  categories: [
    {
      slug: "uhod-doma",
      order: 1,
      name: L("Уход дома", "Uydagi parvarish", "Home care"),
      description: L(
        "Как сохранить результат между визитами: волосы, кожа, ногти.",
        "Tashriflar orasida natijani qanday saqlash: soch, teri, tirnoq.",
        "How to keep the result between visits: hair, skin and nails.",
      ),
    },
    {
      slug: "trendy",
      order: 2,
      name: L("Тренды сезона", "Mavsum trendlari", "Seasonal trends"),
      description: L(
        "Что просят в этом сезоне и кому это на самом деле идёт.",
        "Bu mavsumda nima so'ralmoqda va bu aslida kimga yarashadi.",
        "What people are asking for this season, and who it actually suits.",
      ),
    },
    {
      slug: "akcii",
      order: 3,
      name: L("Акции салона", "Salon aksiyalari", "Salon offers"),
      description: L(
        "Скидки, дни открытых дверей и новые услуги.",
        "Chegirmalar, ochiq eshiklar kuni va yangi xizmatlar.",
        "Discounts, open days and new services.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "page", target: "services", order: 1, label: L("Услуги и цены", "Xizmat va narxlar", "Services and prices") },
    { location: "header", linkType: "page", target: "masters", order: 2, label: L("Мастера", "Ustalar", "Stylists") },
    { location: "header", linkType: "page", target: "works", order: 3, label: L("Работы", "Ishlar", "Our work") },
    { location: "header", linkType: "category", target: "akcii", order: 4, label: L("Акции", "Aksiyalar", "Offers") },
    { location: "header", linkType: "page", target: "contacts", order: 5, label: L("Запись", "Navbat", "Booking") },
    { location: "footer", linkType: "page", target: "services", order: 1, label: L("Прайс", "Narxlar", "Prices") },
    { location: "footer", linkType: "category", target: "uhod-doma", order: 2, label: L("Уход дома", "Uydagi parvarish", "Home care") },
    { location: "footer", linkType: "page", target: "contacts", order: 3, label: L("Контакты", "Kontaktlar", "Contacts") },
  ],

  pages: [
    // -------------------------------------------------------------- главная
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Салон красоты в Яккасарае: стрижки и окрашивание, маникюр, брови и уход за лицом. Запись: +998 93 508 22 17.",
        "Yakkasaroydagi go'zallik saloni: soch olish va bo'yash, manikyur, qosh va yuz parvarishi. Navbat: +998 93 508 22 17.",
        "A beauty salon in Yakkasaray: cuts and colour, manicures, brows and facials. Book on +998 93 508 22 17.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Салон, куда возвращаются к своему мастеру",
            "O'z ustasiga qaytadigan salon",
            "A salon people come back to for their stylist",
          ),
          subheading: L(
            "Стрижки, окрашивание, маникюр и уход за лицом на Шота Руставели. Семь мастеров, у каждого своя специализация и своё расписание.",
            "Shota Rustaveli ko'chasida soch olish, bo'yash, manikyur va yuz parvarishi. Yetti usta, har birining o'z yo'nalishi va jadvali bor.",
            "Cuts, colour, manicures and facials on Shota Rustaveli. Seven stylists, each with their own speciality and schedule.",
          ),
          ctaLabel: L("Записаться", "Navbatga yozilish", "Book now"),
          ctaLink: "/contacts",
          variant: "fullBleed",
          overlayOpacity: 0.4,
        }),

        B.features(
          "services",
          L("Что мы делаем", "Biz nima qilamiz", "What we do"),
          [
            {
              icon: "star",
              title: L("Волосы", "Sochlar", "Hair"),
              body: L(
                "Стрижки, сложное окрашивание, ботокс и кератин. Перед окрашиванием — бесплатная диагностика и тест на пряди.",
                "Soch olish, murakkab bo'yash, botoks va keratin. Bo'yashdan oldin bepul diagnostika va tolalarga test.",
                "Cuts, complex colour, botox and keratin treatments. Colour starts with a free consultation and a strand test.",
              ),
            },
            {
              icon: "heart",
              title: L("Ногти", "Tirnoqlar", "Nails"),
              body: L(
                "Аппаратный маникюр, укрепление, покрытие гелем. Одноразовые пилки, стерилизация в сухожаре.",
                "Apparatli manikyur, mustahkamlash, gel qoplama. Bir martalik egovlar, quruq issiqlikda sterilizatsiya.",
                "Machine manicures, strengthening and gel finishes. Single-use files, dry-heat sterilisation.",
              ),
            },
            {
              icon: "spark",
              title: L("Брови и ресницы", "Qosh va kipriklar", "Brows and lashes"),
              body: L(
                "Коррекция формы, окрашивание, ламинирование. Подбираем форму по чертам лица, а не по трафарету.",
                "Shaklni to'g'rilash, bo'yash, laminatsiya. Shaklni trafaret bo'yicha emas, yuz qiyofasiga qarab tanlaymiz.",
                "Shaping, tinting and lamination. We choose a shape from your features, not from a stencil.",
              ),
            },
            {
              icon: "leaf",
              title: L("Уход за лицом", "Yuz parvarishi", "Facials"),
              body: L(
                "Чистка, пилинги, увлажняющие уходы. Работает косметолог с медицинским образованием.",
                "Tozalash, piling, namlantiruvchi parvarish. Tibbiy ma'lumotli kosmetolog ishlaydi.",
                "Deep cleansing, peels and hydrating treatments, performed by a cosmetologist with medical training.",
              ),
            },
          ],
          2,
        ),

        S(
          B.gallery(
            "works",
            [
              L("Шатуш на тёмных волосах, 4 часа", "Qora sochda shatush, 4 soat", "Shatush on dark hair, 4 hours"),
              L("Каре с удлинением, стрижка на сухие волосы", "Uzaytirilgan kare, quruq sochga qirqim", "Long bob, cut on dry hair"),
              L("Маникюр с укреплением, натуральная длина", "Mustahkamlash bilan manikyur, tabiiy uzunlik", "Manicure with strengthening, natural length"),
              L("Ламинирование бровей, эффект на 6 недель", "Qosh laminatsiyasi, 6 haftalik natija", "Brow lamination, lasts six weeks"),
              L("Восстановление после осветления", "Oqartirishdan keyin tiklash", "Repair after bleaching"),
              L("Вечерняя укладка, свадебная серия", "Kechki turmak, to'y turkumi", "Evening styling, bridal series"),
            ],
            3,
          ),
          { bg: "surface" },
        ),

        B.testimonials(
          "reviews",
          L("Отзывы гостей", "Mehmonlar fikri", "What our guests say"),
          [
            {
              quote: L(
                "Три года хожу к Камиле. Она единственная, кто отговорил меня от блонда и оказалась права — с моими волосами это был бы месяц восстановления.",
                "Uch yildan beri Kamilaga boraman. Meni blonddan qaytargan yagona usta va u haq edi — mening sochlarim bilan bu bir oylik tiklanish bo'lardi.",
                "I've been going to Kamila for three years. She is the only stylist who talked me out of going blonde — and she was right; with my hair it would have meant a month of repair.",
              ),
              authorName: L("Малика Р.", "Malika R.", "Malika R."),
              authorRole: L("Окрашивание и уход", "Bo'yash va parvarish", "Colour and care"),
            },
            {
              quote: L(
                "Записываюсь через Telegram, приходят напоминания за день. Ни разу не ждала дольше пяти минут — для салона это редкость.",
                "Telegram orqali yoziladi, bir kun oldin eslatma keladi. Hech qachon besh daqiqadan ortiq kutmadim — salon uchun bu kamdan-kam holat.",
                "I book through Telegram and get a reminder the day before. I have never waited more than five minutes — rare for a salon.",
              ),
              authorName: L("Дилрабо А.", "Dilrabo A.", "Dilrabo A."),
              authorRole: L("Маникюр раз в три недели", "Har uch haftada manikyur", "Manicure every three weeks"),
            },
            {
              quote: L(
                "Пришла с испорченным окрашиванием из другого салона. Не стали ругать предыдущего мастера, просто сделали план на два визита и вытянули цвет.",
                "Boshqa salonda buzilgan bo'yash bilan keldim. Oldingi ustani so'kishmadi, shunchaki ikki tashrifga reja tuzib, rangni tiklashdi.",
                "I came in with colour ruined at another salon. Nobody criticised the previous stylist — they simply made a two-visit plan and fixed the tone.",
              ),
              authorName: L("Нигора Т.", "Nigora T.", "Nigora T."),
              authorRole: L("Восстановление цвета", "Rangni tiklash", "Colour correction"),
            },
          ],
        ),

        S(
          B.cta("cta", {
            heading: L("Свободные окна — на 2–3 дня вперёд", "Bo'sh vaqtlar — 2–3 kun oldinga", "Free slots two to three days out"),
            body: L(
              "Напишите в Telegram или оставьте заявку — администратор подберёт мастера и время под ваш график.",
              "Telegramga yozing yoki ariza qoldiring — administrator jadvalingizga mos usta va vaqtni tanlaydi.",
              "Message us on Telegram or leave a request — reception will match a stylist and a time to your schedule.",
            ),
            buttonLabel: L("Записаться", "Yozilish", "Book"),
            buttonLink: "/contacts",
          }),
          { bg: "accent", align: "center" },
        ),
      ],
    },

    // ------------------------------------------------------- услуги и цены
    {
      slug: "services",
      title: L("Услуги и цены", "Xizmatlar va narxlar", "Services and prices"),
      metaDesc: L(
        "Прайс салона «Nafis»: стрижки, окрашивание, маникюр, брови, уход за лицом. Цены в сумах.",
        "«Nafis» saloni narxlari: soch olish, bo'yash, manikyur, qosh, yuz parvarishi. Narxlar so'mda.",
        "Nafis price list: cuts, colour, manicures, brows and facials, in UZS.",
      ),
      blocks: [
        S(
          B.richText(
            "note",
            paragraphs(
              L(
                "Цена окрашивания зависит от длины и расхода красителя, поэтому в прайсе указана вилка. Точную сумму мастер называет на диагностике до начала работы — не после.",
                "Bo'yash narxi soch uzunligi va bo'yoq sarfiga bog'liq, shuning uchun narxlarda oraliq ko'rsatilgan. Aniq summani usta ish boshlanishidan oldin diagnostikada aytadi — keyin emas.",
                "Colour prices depend on length and how much product is used, so the list shows a range. Your stylist gives the exact figure at the consultation, before work starts — not after.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.pricing(
          "hair",
          L("Волосы", "Sochlar", "Hair"),
          [
            {
              name: L("Стрижка", "Soch olish", "Haircut"),
              price: L("180 000 сум", "180 000 so'm", "180,000 UZS"),
              period: L("с укладкой", "turmak bilan", "with styling"),
              features: [
                L("Женская стрижка любой длины", "Istalgan uzunlikdagi ayollar sochi", "Women's cut, any length"),
                L("Мытьё и уход в подарок", "Yuvish va parvarish sovg'a", "Wash and treatment included"),
                L("Мужская стрижка — 90 000 сум", "Erkaklar sochi — 90 000 so'm", "Men's cut — 90,000 UZS"),
              ],
              ctaLabel: L("Записаться", "Yozilish", "Book"),
              ctaLink: "/contacts",
            },
            {
              name: L("Сложное окрашивание", "Murakkab bo'yash", "Complex colour"),
              price: L("650 000 – 1 400 000 сум", "650 000 – 1 400 000 so'm", "650,000 – 1,400,000 UZS"),
              period: L("зависит от длины", "uzunlikka bog'liq", "depending on length"),
              features: [
                L("Шатуш, балаяж, аиртач", "Shatush, balayaj, airtouch", "Shatush, balayage, airtouch"),
                L("Бесплатная диагностика и тест на прядь", "Bepul diagnostika va tola testi", "Free consultation and strand test"),
                L("Уход после окрашивания включён", "Bo'yashdan keyingi parvarish kiradi", "Post-colour treatment included"),
                L("Коррекция в течение 10 дней бесплатно", "10 kun ichida tuzatish bepul", "Free correction within ten days"),
              ],
              highlighted: true,
              ctaLabel: L("Записаться на диагностику", "Diagnostikaga yozilish", "Book a consultation"),
              ctaLink: "/contacts",
            },
            {
              name: L("Уход и восстановление", "Parvarish va tiklash", "Treatments"),
              price: L("от 320 000 сум", "320 000 so'mdan", "from 320,000 UZS"),
              period: L("за процедуру", "bir muolaja uchun", "per treatment"),
              features: [
                L("Кератин, ботокс, реконструкция", "Keratin, botoks, rekonstruksiya", "Keratin, botox, reconstruction"),
                L("Подбор по состоянию волос, а не по прайсу", "Narxga emas, soch holatiga qarab tanlash", "Chosen by hair condition, not by price"),
                L("Домашний уход с рекомендациями", "Tavsiyalar bilan uydagi parvarish", "Home-care advice to take away"),
              ],
              ctaLabel: L("Записаться", "Yozilish", "Book"),
              ctaLink: "/contacts",
            },
          ],
        ),

        S(
          B.features(
            "other",
            L("Ногти, брови, лицо", "Tirnoq, qosh, yuz", "Nails, brows, face"),
            [
              {
                icon: "heart",
                title: L("Маникюр — от 140 000 сум", "Manikyur — 140 000 so'mdan", "Manicure — from 140,000 UZS"),
                body: L(
                  "Аппаратный маникюр 140 000, с гель-лаком 240 000, укрепление 290 000, педикюр от 260 000.",
                  "Apparatli manikyur 140 000, gel-lak bilan 240 000, mustahkamlash 290 000, pedikyur 260 000 dan.",
                  "Machine manicure 140,000; with gel polish 240,000; strengthening 290,000; pedicure from 260,000.",
                ),
              },
              {
                icon: "spark",
                title: L("Брови и ресницы — от 90 000 сум", "Qosh va kiprik — 90 000 so'mdan", "Brows and lashes — from 90,000 UZS"),
                body: L(
                  "Коррекция 90 000, коррекция с окрашиванием 150 000, ламинирование бровей 260 000.",
                  "To'g'rilash 90 000, bo'yash bilan 150 000, qosh laminatsiyasi 260 000.",
                  "Shaping 90,000; shaping with tint 150,000; brow lamination 260,000.",
                ),
              },
              {
                icon: "leaf",
                title: L("Уход за лицом — от 380 000 сум", "Yuz parvarishi — 380 000 so'mdan", "Facials — from 380,000 UZS"),
                body: L(
                  "Комбинированная чистка 480 000, пилинг 380 000, увлажняющий уход 420 000.",
                  "Kombinatsiyalangan tozalash 480 000, piling 380 000, namlantiruvchi parvarish 420 000.",
                  "Combined cleansing 480,000; peel 380,000; hydrating facial 420,000.",
                ),
              },
            ],
          ),
          { bg: "surface" },
        ),

        S(
          B.faq(
            "faq",
            L("Частые вопросы", "Ko'p so'raladigan savollar", "Common questions"),
            [
              {
                question: L("Можно ли прийти без записи?", "Navbatsiz kelsa bo'ladimi?", "Can I come without an appointment?"),
                answer: L(
                  "На маникюр иногда получается — если есть свободное окно. На окрашивание нет: мастер закладывает под него 3–5 часов.",
                  "Manikyurga ba'zan bo'ladi — bo'sh vaqt bo'lsa. Bo'yashga yo'q: usta unga 3–5 soat ajratadi.",
                  "Sometimes for a manicure, if there is a gap. Not for colour: a stylist blocks out three to five hours for it.",
                ),
              },
              {
                question: L("Что если результат не понравится?", "Natija yoqmasa-chi?", "What if I don't like the result?"),
                answer: L(
                  "Скажите сразу, не уходя из салона. Коррекцию окрашивания и стрижки делаем бесплатно в течение десяти дней.",
                  "Salondan chiqmasdan darhol ayting. Bo'yash va soch olishni o'n kun ichida bepul tuzatamiz.",
                  "Tell us before you leave. We correct colour and cuts free of charge within ten days.",
                ),
              },
              {
                question: L("Есть ли детская стрижка?", "Bolalar sochi olinadimi?", "Do you cut children's hair?"),
                answer: L(
                  "Да, до 10 лет — 70 000 сум. Лучше приходить в первой половине дня, когда в зале тише.",
                  "Ha, 10 yoshgacha — 70 000 so'm. Zalda tinchroq bo'lgani uchun kunning birinchi yarmida kelgan ma'qul.",
                  "Yes, under-10s for 70,000 UZS. Mornings are better — the salon is quieter then.",
                ),
              },
            ],
          ),
          { width: "narrow" },
        ),
      ],
    },

    // -------------------------------------------------------------- мастера
    {
      slug: "masters",
      title: L("Мастера", "Ustalar", "Stylists"),
      metaDesc: L(
        "Мастера салона «Nafis»: специализация, опыт и дни работы. Стилисты, мастера ногтевого сервиса, косметолог.",
        "«Nafis» saloni ustalari: yo'nalishi, tajribasi va ish kunlari. Stilistlar, tirnoq ustalari, kosmetolog.",
        "The Nafis team: specialities, experience and working days. Stylists, nail technicians and a cosmetologist.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "У каждого мастера своя специализация — мы не отправляем на сложное окрашивание того, кто сегодня свободен. Если вашего мастера нет на месте, администратор предложит подождать, а не заменит без предупреждения.",
                "Har bir ustaning o'z yo'nalishi bor — murakkab bo'yashga bugun bo'sh bo'lgan ustani yubormaymiz. Ustangiz bo'lmasa, administrator ogohlantirmasdan almashtirmaydi, kutishni taklif qiladi.",
                "Every stylist has a speciality — we do not hand complex colour to whoever happens to be free. If your stylist is away, reception offers you a later slot rather than swapping them silently.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.team(
          "team",
          L("Наша команда", "Bizning jamoa", "Our team"),
          [
            {
              name: L("Камила Юсупова", "Kamila Yusupova", "Kamila Yusupova"),
              role: L("Колорист · вт–сб", "Kolorist · se–sha", "Colourist · Tue–Sat"),
              bio: L(
                "12 лет в профессии, специализация — блонд и восстановление после неудачных окрашиваний.",
                "Kasbda 12 yil, yo'nalishi — blond va muvaffaqiyatsiz bo'yashdan keyin tiklash.",
                "Twelve years in the trade; specialises in blonde work and repairing colour gone wrong.",
              ),
            },
            {
              name: L("Севинч Абдуллаева", "Sevinch Abdullayeva", "Sevinch Abdullaeva"),
              role: L("Стилист-парикмахер · пн, ср, пт, вс", "Stilist-sartarosh · du, chor, ju, ya", "Hair stylist · Mon, Wed, Fri, Sun"),
              bio: L(
                "Стрижки на кудрявые и пористые волосы, работает на сухую. Ведёт вечерние записи до 21:00.",
                "Jingalak va g'ovak sochlarga qirqim, quruq holda ishlaydi. Kechki navbatlarni 21:00 gacha oladi.",
                "Cuts curly and porous hair, works dry. Takes evening appointments until 21:00.",
              ),
            },
            {
              name: L("Дилноза Каримова", "Dilnoza Karimova", "Dilnoza Karimova"),
              role: L("Мастер ногтевого сервиса · ежедневно", "Tirnoq ustasi · har kuni", "Nail technician · daily"),
              bio: L(
                "Аппаратный маникюр и укрепление. Работает с проблемными ногтями после наращивания.",
                "Apparatli manikyur va mustahkamlash. O'stirishdan keyingi muammoli tirnoqlar bilan ishlaydi.",
                "Machine manicures and strengthening. Works with damaged nails after extensions.",
              ),
            },
            {
              name: L("Зухра Иноятова", "Zuhra Inoyatova", "Zukhra Inoyatova"),
              role: L("Бровист · вт–вс", "Qosh ustasi · se–ya", "Brow artist · Tue–Sun"),
              bio: L(
                "Форма по чертам лица, ламинирование и окрашивание. Обучает бровистов на курсах в Ташкенте.",
                "Yuz qiyofasiga qarab shakl, laminatsiya va bo'yash. Toshkentdagi kurslarda qosh ustalarini o'qitadi.",
                "Shapes to the face, does lamination and tinting. Teaches brow courses in Tashkent.",
              ),
            },
            {
              name: L("Ирода Шарипова", "Iroda Sharipova", "Iroda Sharipova"),
              role: L("Косметолог · пн, чт, сб", "Kosmetolog · du, pay, sha", "Cosmetologist · Mon, Thu, Sat"),
              bio: L(
                "Медицинское образование, ТашПМИ. Чистки, пилинги, уходовые протоколы по типу кожи.",
                "Tibbiy ma'lumot, ToshPTI. Tozalash, piling, teri turiga qarab parvarish protokollari.",
                "Medically trained at Tashkent Paediatric Medical Institute. Cleansing, peels and care protocols by skin type.",
              ),
            },
          ],
        ),
      ],
    },

    // --------------------------------------------------------------- работы
    {
      slug: "works",
      title: L("Работы мастеров", "Ustalar ishlari", "Our work"),
      metaDesc: L(
        "Фотографии работ салона «Nafis»: окрашивания, стрижки, маникюр и брови — снято в салоне без обработки.",
        "«Nafis» saloni ishlari suratlari: bo'yash, qirqim, manikyur va qosh — salonda tahrirsiz olingan.",
        "Photos of work from Nafis salon: colour, cuts, manicures and brows — shot in the salon, unretouched.",
      ),
      blocks: [
        S(
          B.richText(
            "intro",
            paragraphs(
              L(
                "Все фотографии сняты в салоне при обычном свете и без обработки цвета. Мы намеренно не выкладываем фильтрованные снимки: по ним невозможно понять, какой оттенок вы получите на самом деле.",
                "Barcha suratlar salonda oddiy yorug'likda, rangga ishlov bermasdan olingan. Filtrlangan suratlarni ataylab joylamaymiz: ulardan haqiqiy tus qanday bo'lishini tushunib bo'lmaydi.",
                "Every photo is taken in the salon under normal light with no colour editing. We deliberately avoid filtered shots: you cannot tell from them what shade you would actually get.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        B.gallery(
          "grid",
          [
            L("Аиртач на русых волосах, Камила", "Malla sochda airtouch, Kamila", "Airtouch on light brown hair, by Kamila"),
            L("Тонирование в холодный беж", "Sovuq bej tonlash", "Toning to a cool beige"),
            L("Стрижка на кудрявые волосы, сухая техника", "Jingalak sochga quruq texnikada qirqim", "Curly cut, dry technique"),
            L("Каскад с чёлкой, Севинч", "Chelka bilan kaskad, Sevinch", "Layered cut with a fringe, by Sevinch"),
            L("Маникюр с укреплением базой", "Baza bilan mustahkamlangan manikyur", "Manicure with base strengthening"),
            L("Френч в мягком нюде", "Yumshoq nyudda frantsuz manikyuri", "French manicure in soft nude"),
            L("Ламинирование бровей, до и после", "Qosh laminatsiyasi, oldin va keyin", "Brow lamination, before and after"),
            L("Уход после чистки лица", "Yuz tozalashdan keyingi parvarish", "Post-facial care"),
          ],
          4,
        ),

        S(
          B.cta("cta", {
            heading: L("Понравилась работа?", "Ish yoqdimi?", "Like something you see?"),
            body: L(
              "Скажите администратору, чью работу вы видели, — запишем к тому же мастеру.",
              "Administratorga kimning ishini ko'rganingizni ayting — o'sha ustaga yozamiz.",
              "Tell reception whose work you liked and we will book you with that stylist.",
            ),
            buttonLabel: L("Записаться", "Yozilish", "Book"),
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
      title: L("Запись", "Navbat", "Booking"),
      metaDesc: L(
        "Записаться в салон «Nafis»: адрес на Шота Руставели, телефон, Telegram и форма записи.",
        "«Nafis» saloniga yozilish: Shota Rustaveli ko'chasidagi manzil, telefon, Telegram va shakl.",
        "Book at Nafis: the Shota Rustaveli address, phone, Telegram and a booking form.",
      ),
      blocks: [
        S(
          B.richText(
            "where",
            paragraphs(
              L(
                "Мы на Шота Руставели, 27 — первый этаж жилого дома, отдельный вход с улицы, вывеска слева от аптеки. От метро «Айбек» — 12 минут пешком.",
                "Shota Rustaveli, 27-uydamiz — turar joy binosining birinchi qavati, ko'chadan alohida kirish, peshtaxta dorixonaning chap tomonida. «Oybek» metrosidan 12 daqiqa piyoda.",
                "We are at 27 Shota Rustaveli — ground floor of a residential building, its own street entrance, sign to the left of the pharmacy. Twelve minutes on foot from Aybek metro.",
              ),
              L(
                "Работаем без выходных с 9:00 до 21:00. За день до визита администратор присылает напоминание в Telegram — если планы изменились, ответьте на него, и мы освободим окно.",
                "Dam olishsiz 9:00 dan 21:00 gacha ishlaymiz. Tashrifdan bir kun oldin administrator Telegramda eslatma yuboradi — rejangiz o'zgarsa, javob yozing, vaqtni bo'shatamiz.",
                "Open daily 9:00–21:00. The day before your visit reception sends a Telegram reminder — reply to it if your plans change and we will free the slot.",
              ),
            ),
          ),
          { width: "narrow" },
        ),

        S(
          B.contactForm("form", {
            heading: L("Записаться в салон", "Salonga yozilish", "Book an appointment"),
            submitLabel: L("Записаться", "Yozilish", "Book"),
            successMessage: L(
              "Спасибо! Администратор подтвердит время в Telegram в течение получаса.",
              "Rahmat! Administrator yarim soat ichida Telegramda vaqtni tasdiqlaydi.",
              "Thank you. Reception will confirm the time on Telegram within half an hour.",
            ),
            fields: [
              { type: "text", label: L("Имя", "Ism", "Name") },
              { type: "tel", label: L("Телефон или Telegram", "Telefon yoki Telegram", "Phone or Telegram") },
              { type: "text", label: L("Услуга и мастер", "Xizmat va usta", "Service and stylist") },
              { type: "textarea", label: L("Удобные дни и время", "Qulay kun va vaqt", "Days and times that suit you"), required: false },
            ],
          }),
          { bg: "surface", width: "narrow" },
        ),
      ],
    },
  ],

  posts: [
    {
      slug: "kak-sohranit-cvet",
      categorySlug: "uhod-doma",
      title: L(
        "Как сохранить цвет после окрашивания: четыре правила",
        "Bo'yashdan keyin rangni qanday saqlash: to'rt qoida",
        "How to keep your colour after the salon: four rules",
      ),
      excerpt: L(
        "Колорист Камила объясняет, почему оттенок уходит за три недели и что с этим делать дома.",
        "Kolorist Kamila nega tus uch haftada ketishini va uyda nima qilish kerakligini tushuntiradi.",
        "Colourist Kamila explains why a shade fades in three weeks and what to do about it at home.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Первое и самое скучное: горячая вода. Пигмент вымывается тем быстрее, чем горячее вы моете голову. Тёплая вода вместо горячей продлевает цвет примерно на две недели.",
              "Birinchi va eng zerikarlisi: issiq suv. Boshni qanchalik issiq suvda yuvsangiz, pigment shunchalik tez yuviladi. Issiq o'rniga iliq suv rangni taxminan ikki haftaga uzaytiradi.",
              "First and most boring: hot water. The hotter you wash, the faster pigment leaves. Warm water instead of hot buys you about two extra weeks.",
            ),
            L(
              "Второе — шампунь без сульфатов первые десять дней. Третье — термозащита перед феном и утюжком, даже если сушите «на минималках».",
              "Ikkinchisi — birinchi o'n kun sulfatsiz shampun. Uchinchisi — fen va utikdan oldin termohimoya, hatto «past rejimda» quritsangiz ham.",
              "Second: a sulphate-free shampoo for the first ten days. Third: heat protection before the dryer or straightener, even on a low setting.",
            ),
            L(
              "Четвёртое — тонирующий уход раз в три недели. Это пять минут дома и стоит дешевле, чем повторное окрашивание в салоне через полтора месяца.",
              "To'rtinchisi — har uch haftada tonlovchi parvarish. Bu uyda besh daqiqa va bir yarim oydan keyin salonda qayta bo'yashdan arzonroq.",
              "Fourth: a toning treatment every three weeks. It takes five minutes at home and costs less than re-colouring at the salon six weeks later.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "trendy-osen",
      categorySlug: "trendy",
      title: L(
        "Осенние оттенки: кому идёт «горький шоколад», а кому нет",
        "Kuzgi tuslar: «achchiq shokolad» kimga yarashadi, kimga yo'q",
        "Autumn shades: who suits \"dark chocolate\" and who doesn't",
      ),
      excerpt: L(
        "Тёмные тёплые оттенки вернулись, но подходят они далеко не всем. Разбираем по подтону кожи.",
        "Quyuq iliq tuslar qaytdi, lekin ular hammaga ham yarashmaydi. Teri ostki tusiga qarab tahlil qilamiz.",
        "Deep warm tones are back, but they do not suit everyone. A breakdown by skin undertone.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Этой осенью в салоне чаще всего просят тёмный тёплый шоколад — оттенок из соцсетей. На тёплом подтоне кожи он действительно работает: лицо выглядит отдохнувшим.",
              "Bu kuzda salonda ko'pincha quyuq iliq shokolad — ijtimoiy tarmoqlardagi tus so'raladi. Iliq ostki tusli terida u haqiqatan ham yaxshi ko'rinadi: yuz dam olgandek ko'rinadi.",
              "This autumn the most requested shade is a deep warm chocolate — the one from social media. On warm undertones it genuinely works: the face looks rested.",
            ),
            L(
              "На холодном подтоне тот же цвет даёт обратный эффект: подчёркивает круги под глазами и делает кожу тусклой. В таком случае мы уводим оттенок в холодный каштан — визуально почти то же, а лицо не «гаснет».",
              "Sovuq ostki tusda esa xuddi shu rang teskari ta'sir beradi: ko'z ostidagi doiralarni ta'kidlaydi va terini xira ko'rsatadi. Bunday holda tusni sovuq kashtanga olib boramiz — ko'rinishi deyarli o'sha, lekin yuz «so'nmaydi».",
              "On cool undertones the same colour does the opposite: it emphasises shadows under the eyes and dulls the skin. There we shift towards a cool chestnut — visually almost identical, without draining the face.",
            ),
            L(
              "Проверить подтон можно дома: посмотрите на вены на запястье при дневном свете. Зеленоватые — тёплый подтон, синеватые — холодный.",
              "Ostki tusni uyda tekshirish mumkin: kunduzgi yorug'likda bilagingizdagi tomirlarga qarang. Yashilroq bo'lsa — iliq, ko'kroq bo'lsa — sovuq tus.",
              "You can check your undertone at home: look at the veins on your wrist in daylight. Greenish means warm, bluish means cool.",
            ),
          ),
        ),
      ],
    },
    {
      slug: "utrennie-okna",
      categorySlug: "akcii",
      title: L(
        "Утренние окна со скидкой 20% по будням",
        "Ish kunlari ertalabki vaqtlarga 20% chegirma",
        "20% off weekday morning slots",
      ),
      excerpt: L(
        "С 9:00 до 12:00 в будни маникюр, брови и уход за лицом — со скидкой. Запись за день.",
        "Ish kunlari 9:00 dan 12:00 gacha manikyur, qosh va yuz parvarishi chegirma bilan. Bir kun oldin yozilish.",
        "Weekdays 9:00–12:00: manicures, brows and facials at a discount. Book a day ahead.",
      ),
      blocks: [
        B.richText(
          "body",
          paragraphs(
            L(
              "Утро в будни — самое тихое время в салоне, и нам выгоднее заполнить его, чем держать мастеров без записи. Поэтому с понедельника по пятницу с 9:00 до 12:00 действует скидка 20%.",
              "Ish kunlari ertalab — salondagi eng tinch vaqt, va ustalarni navbatsiz ushlab turgandan ko'ra uni to'ldirish biz uchun foydaliroq. Shuning uchun dushanbadan jumagacha 9:00–12:00 da 20% chegirma amal qiladi.",
              "Weekday mornings are the quietest time in the salon, and filling them beats leaving stylists idle. So from Monday to Friday, 9:00–12:00, there is 20% off.",
            ),
            L(
              "Скидка распространяется на маникюр, педикюр, брови и уход за лицом. На сложное окрашивание не действует — эти записи и так расписаны на неделю вперёд.",
              "Chegirma manikyur, pedikyur, qosh va yuz parvarishiga tegishli. Murakkab bo'yashga amal qilmaydi — u navbatlar allaqachon bir haftaga band.",
              "The discount applies to manicures, pedicures, brows and facials. It does not cover complex colour — those slots are already booked a week out.",
            ),
          ),
        ),
      ],
    },
  ],
};
