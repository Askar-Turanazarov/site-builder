import { B, L, paragraphs, type SiteTemplate } from "./types";

/**
 * «Пешком по Ташкенту» — личный блог: город, еда, маршруты выходного дня.
 * Автор — Камила Рахимова, живёт в Шайхантахурском районе.
 */
export const blogTemplate: SiteTemplate = {
  key: "blog",
  label: L("Личный блог", "Shaxsiy blog", "Personal blog"),
  profile: L(
    "«Пешком по Ташкенту», автор Камила Рахимова",
    "«Toshkent bo'ylab piyoda», muallif Kamila Rahimova",
    "On Foot in Tashkent, by Kamila Rakhimova",
  ),
  description: L(
    "Тексты на первом месте: лента статей, страница автора, подписка и рубрики без витрин и прайсов.",
    "Matnlar birinchi o'rinda: maqolalar lentasi, muallif sahifasi, obuna va rukmlar — vitrinasiz va narxsiz.",
    "Writing first: an article feed, an author page, a subscription block and topic sections — no shopfront, no price lists.",
  ),
  themeKey: "blog",
  design: { skin: "reading", fontDisplay: "Playfair Display", fontBody: "Lora", radiusScale: "sm" },

  settings: {
    siteName: L("Пешком по Ташкенту", "Toshkent bo'ylab piyoda", "On Foot in Tashkent"),
    tagline: L(
      "Город, еда и маршруты выходного дня",
      "Shahar, taom va dam olish kuni yo'nalishlari",
      "The city, its food and weekend routes",
    ),
    contactEmail: "kamila@peshkom.uz",
    contactPhone: "+998 93 501 22 79",
    contactAddress: L(
      "Ташкент, Шайхантахурский район",
      "Toshkent, Shayxontohur tumani",
      "Tashkent, Shaykhantakhur district",
    ),
    footerNote: L(
      "© Камила Рахимова, Ташкент. Тексты и фотографии — мои, перепечатка со ссылкой.",
      "© Kamila Rahimova, Toshkent. Matn va suratlar meniki, qayta nashr havola bilan.",
      "© Kamila Rakhimova, Tashkent. Words and photographs are mine; reprint with a link.",
    ),
  },

  categories: [
    {
      slug: "routes",
      order: 1,
      name: L("Маршруты", "Yo'nalishlar", "Routes"),
      description: L(
        "Пешие прогулки по районам: что смотреть и где сворачивать.",
        "Tumanlar bo'ylab piyoda sayrlar: nimani ko'rish va qayerga burilish kerak.",
        "Walks through the districts: what to look at and where to turn.",
      ),
    },
    {
      slug: "food",
      order: 2,
      name: L("Еда", "Taom", "Food"),
      description: L(
        "Чайханы, пекарни и рынки — без рекламы и рейтингов.",
        "Choyxonalar, nonvoyxonalar va bozorlar — reklama va reytinglarsiz.",
        "Teahouses, bakeries and markets — no ads, no rankings.",
      ),
    },
    {
      slug: "notes",
      order: 3,
      name: L("Заметки", "Qaydlar", "Notes"),
      description: L(
        "Короткое: наблюдения, находки, вопросы без ответа.",
        "Qisqa: kuzatuvlar, topilmalar, javobsiz savollar.",
        "Short form: observations, finds and open questions.",
      ),
    },
  ],

  menu: [
    { location: "header", linkType: "category", target: "routes", order: 1, label: L("Маршруты", "Yo'nalishlar", "Routes") },
    { location: "header", linkType: "category", target: "food", order: 2, label: L("Еда", "Taom", "Food") },
    { location: "header", linkType: "category", target: "notes", order: 3, label: L("Заметки", "Qaydlar", "Notes") },
    { location: "header", linkType: "page", target: "about", order: 4, label: L("Об авторе", "Muallif haqida", "About") },
    { location: "footer", linkType: "page", target: "about", order: 1, label: L("Об авторе", "Muallif haqida", "About") },
    { location: "footer", linkType: "page", target: "contacts", order: 2, label: L("Написать", "Yozish", "Say hello") },
  ],

  pages: [
    {
      slug: "home",
      isHomepage: true,
      title: L("Главная", "Bosh sahifa", "Home"),
      metaDesc: L(
        "Блог о Ташкенте: пешие маршруты, чайханы, рынки и городские наблюдения.",
        "Toshkent haqida blog: piyoda yo'nalishlar, choyxonalar, bozorlar va shahar kuzatuvlari.",
        "A blog about Tashkent: walking routes, teahouses, markets and city observations.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L(
            "Город, который проще пройти, чем объехать",
            "Aylanib chiqishdan ko'ra piyoda yurish oson bo'lgan shahar",
            "A city easier to walk than to drive",
          ),
          subheading: L(
            "Пишу о Ташкенте четвёртый год: районы, чайханы, рынки и маршруты, которые помещаются в одно воскресенье.",
            "To'rt yildan beri Toshkent haqida yozaman: tumanlar, choyxonalar, bozorlar va bir yakshanbaga sig'adigan yo'nalishlar.",
            "I have been writing about Tashkent for four years: districts, teahouses, markets and routes that fit into a single Sunday.",
          ),
          ctaLabel: L("Читать маршруты", "Yo'nalishlarni o'qish", "Read the routes"),
          ctaLink: "/routes",
          variant: "centered",
        }),

        B.richText(
          "intro",
          paragraphs(
            L(
              "Этот блог начался как список мест, которые я скидывала друзьям в переписке. Потом список перестал помещаться в сообщение.",
              "Bu blog do'stlarimga yozishmalarda tashlab yuboradigan joylar ro'yxati sifatida boshlangan. Keyin ro'yxat xabarga sig'may qoldi.",
              "This blog began as a list of places I kept sending friends in chat. Then the list stopped fitting into a message.",
            ),
            L(
              "Здесь нет рейтингов и рекламных обзоров. Есть маршруты, которые я прошла сама, и чайханы, куда возвращаюсь.",
              "Bu yerda reyting va reklama sharhlari yo'q. O'zim yurgan yo'nalishlar va qaytib boradigan choyxonalarim bor.",
              "There are no rankings or sponsored reviews here. Just routes I have walked and teahouses I go back to.",
            ),
          ),
        ),

        B.features(
          "topics",
          L("О чём здесь пишут", "Bu yerda nima haqida yoziladi", "What I write about"),
          [
            {
              icon: "spark",
              title: L("Маршруты", "Yo'nalishlar", "Routes"),
              body: L(
                "Пешие прогулки на 2–4 часа с точками остановок, где поесть и где сесть в тень.",
                "2–4 soatlik piyoda sayrlar, to'xtash nuqtalari, qayerda ovqatlanish va soyada o'tirish mumkinligi bilan.",
                "Two-to-four-hour walks with stops, places to eat and shade to sit in.",
              ),
            },
            {
              icon: "globe",
              title: L("Еда", "Taom", "Food"),
              body: L(
                "Чайханы, пекарни, рынки. Пишу только о том, где была минимум трижды.",
                "Choyxonalar, nonvoyxonalar, bozorlar. Faqat kamida uch marta borgan joyim haqida yozaman.",
                "Teahouses, bakeries, markets. I only write about places I have visited at least three times.",
              ),
            },
            {
              icon: "message",
              title: L("Заметки", "Qaydlar", "Notes"),
              body: L(
                "Короткие тексты про детали: вывески, дворы, тень от чинар и расписание автобусов.",
                "Tafsilotlar haqida qisqa matnlar: peshtaxtalar, hovlilar, chinor soyasi va avtobus jadvali.",
                "Short pieces about details: signage, courtyards, plane-tree shade and bus timetables.",
              ),
            },
          ],
        ),

        B.cta("cta", {
          heading: L("Письмо по воскресеньям", "Yakshanba kunlari xat", "A letter on Sundays"),
          body: L(
            "Раз в неделю присылаю один маршрут и пару находок. Без рекламы, отписаться можно в одно нажатие.",
            "Haftada bir marta bitta yo'nalish va bir nechta topilma yuboraman. Reklamasiz, bir bosishda obunani bekor qilish mumkin.",
            "Once a week I send one route and a couple of finds. No ads; unsubscribe in one click.",
          ),
          buttonLabel: L("Подписаться", "Obuna bo'lish", "Subscribe"),
          buttonLink: "/contacts",
        }),
      ],
    },

    {
      slug: "routes",
      title: L("Маршруты", "Yo'nalishlar", "Routes"),
      metaDesc: L(
        "Пешие маршруты по Ташкенту: Шайхантахур, Мирабад, Чиланзар и старый город.",
        "Toshkent bo'ylab piyoda yo'nalishlar: Shayxontohur, Mirobod, Chilonzor va eski shahar.",
        "Walking routes around Tashkent: Shaykhantakhur, Mirabad, Chilanzar and the old town.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Маршруты на выходные", "Dam olish kunlari yo'nalishlari", "Weekend routes"),
          subheading: L(
            "Двенадцать прогулок, каждая — от двух до четырёх часов, все проверены пешком.",
            "O'n ikkita sayr, har biri ikki-to'rt soat, barchasi piyoda tekshirilgan.",
            "Twelve walks, two to four hours each, all tested on foot.",
          ),
          variant: "centered",
        }),

        B.features(
          "list",
          L("Куда пойти", "Qayerga borish kerak", "Where to go"),
          [
            {
              icon: "spark",
              title: L("Старый город за три часа", "Eski shahar uch soatda", "The old town in three hours"),
              body: L(
                "От Чорсу до Хазрати Имам через махалли, с остановкой на самсу у медресе.",
                "Chorsudan Hazrati Imomgacha mahallalar orqali, madrasa yonida somsaga to'xtab.",
                "From Chorsu to Hazrati Imam through the mahallas, with a samsa stop by the madrasa.",
              ),
            },
            {
              icon: "globe",
              title: L("Мирабад: сталинки и чинары", "Mirobod: stalinkalar va chinorlar", "Mirabad: post-war blocks and plane trees"),
              body: L(
                "Два часа тени в самый жаркий день, финиш у кафе на Ойбека.",
                "Eng issiq kunda ikki soat soya, marra Oybekdagi kafeda.",
                "Two hours of shade on the hottest day, finishing at a cafe on Oybek street.",
              ),
            },
            {
              icon: "message",
              title: L("Чиланзар по кварталам", "Chilonzor kvartallar bo'ylab", "Chilanzar block by block"),
              body: L(
                "Микрорайоны 60-х, дворы с виноградом и лучшая лепёшка на 9-м квартале.",
                "60-yillar mikrorayonlari, uzumzor hovlilar va 9-kvartaldagi eng zo'r patir.",
                "Sixties microdistricts, vine-covered courtyards and the best flatbread in block 9.",
              ),
            },
          ],
        ),
      ],
    },

    {
      slug: "about",
      title: L("Об авторе", "Muallif haqida", "About the author"),
      metaDesc: L(
        "Камила Рахимова — автор блога «Пешком по Ташкенту».",
        "Kamila Rahimova — «Toshkent bo'ylab piyoda» blogi muallifi.",
        "Kamila Rakhimova, author of On Foot in Tashkent.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Кто это пишет", "Buni kim yozadi", "Who writes this"),
          subheading: L(
            "Камила Рахимова. Родилась в Ташкенте, десять лет работала в архиве, теперь хожу и пишу.",
            "Kamila Rahimova. Toshkentda tug'ilganman, o'n yil arxivda ishlaganman, endi yuraman va yozaman.",
            "Kamila Rakhimova. Born in Tashkent, ten years in an archive, now I walk and write.",
          ),
          variant: "split",
        }),

        B.richText(
          "bio",
          paragraphs(
            L(
              "Я выросла в Шайхантахуре, между Чорсу и Кукчой. Десять лет работала в городском архиве — оттуда привычка проверять дату на любом здании, о котором пишу.",
              "Shayxontohurda, Chorsu bilan Ko'kcha orasida o'sganman. O'n yil shahar arxivida ishladim — yozayotgan har bir binoning sanasini tekshirish odati o'shandan.",
              "I grew up in Shaykhantakhur, between Chorsu and Kukcha. Ten years in the city archive left me with the habit of checking the date on every building I write about.",
            ),
            L(
              "Блог веду с 2022 года, все фотографии снимаю сама на плёнку и телефон. Рекламу не беру, но если вы держите чайхану, о которой стоит написать, — пишите.",
              "Blogni 2022-yildan yuritaman, barcha suratlarni o'zim plyonka va telefonda olaman. Reklama olmayman, lekin yozishga arziydigan choyxonangiz bo'lsa — yozing.",
              "I have run the blog since 2022 and take all the photographs myself, on film and phone. I do not take advertising, but if you run a teahouse worth writing about, get in touch.",
            ),
          ),
        ),

        B.stats("stats", [
          { value: L("4", "4", "4"), label: L("Года блогу", "Blogga yil", "Years of the blog") },
          { value: L("112", "112", "112"), label: L("Опубликованных текстов", "Chop etilgan matnlar", "Published pieces") },
          { value: L("12", "12", "12"), label: L("Проверенных маршрутов", "Tekshirilgan yo'nalishlar", "Tested routes") },
          { value: L("0", "0", "0"), label: L("Рекламных постов", "Reklama postlari", "Sponsored posts") },
        ]),
      ],
    },

    {
      slug: "contacts",
      title: L("Написать", "Yozish", "Say hello"),
      metaDesc: L(
        "Написать автору блога «Пешком по Ташкенту» или подписаться на воскресное письмо.",
        "«Toshkent bo'ylab piyoda» blogi muallifiga yozish yoki yakshanba xatiga obuna bo'lish.",
        "Write to the author of On Foot in Tashkent or subscribe to the Sunday letter.",
      ),
      blocks: [
        B.hero("hero", {
          heading: L("Написать мне", "Menga yozing", "Write to me"),
          subheading: L(
            "Отвечаю на письма по вечерам, обычно в течение двух-трёх дней.",
            "Xatlarga kechqurun javob beraman, odatda ikki-uch kun ichida.",
            "I answer letters in the evenings, usually within two or three days.",
          ),
          variant: "centered",
        }),

        B.contactForm("form", {
          heading: L("Письмо автору", "Muallifga xat", "A note to the author"),
          submitLabel: L("Отправить", "Yuborish", "Send"),
          successMessage: L(
            "Спасибо, письмо дошло. Отвечу в ближайшие дни.",
            "Rahmat, xat yetib bordi. Yaqin kunlarda javob beraman.",
            "Thank you, your note arrived. I will reply in the next few days.",
          ),
          fields: [
            { type: "text", label: L("Имя", "Ism", "Name") },
            { type: "email", label: L("Email", "Email", "Email") },
            { type: "textarea", label: L("Сообщение", "Xabar", "Message") },
          ],
        }),
      ],
    },
  ],

  posts: [
    {
      slug: "staryj-gorod-za-tri-chasa",
      categorySlug: "routes",
      title: L(
        "Старый город за три часа: от Чорсу до Хазрати Имам",
        "Eski shahar uch soatda: Chorsudan Hazrati Imomgacha",
        "The old town in three hours: Chorsu to Hazrati Imam",
      ),
      excerpt: L(
        "Маршрут на воскресное утро: рынок, махалли, две мечети и обязательная остановка на самсу.",
        "Yakshanba ertalabki yo'nalish: bozor, mahallalar, ikki masjid va somsaga majburiy to'xtash.",
        "A Sunday morning route: the market, the mahallas, two mosques and a mandatory samsa stop.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Начинать лучше в восемь утра: к десяти на Чорсу становится тесно, а тени в махаллях к полудню почти не остаётся.",
                "Sakkizda boshlagan ma'qul: o'nga borib Chorsu gavjum bo'ladi, mahallalarda esa tushga qolib soya deyarli qolmaydi.",
                "Start at eight: by ten Chorsu is packed, and by noon there is almost no shade left in the mahallas.",
              ),
              L(
                "От купола рынка идите через ряды с сухофруктами к улице Заркайнар — там начинаются глиняные заборы и совсем другой темп.",
                "Bozor gumbazidan quruq mevalar qatorlari orqali Zarqaynar ko'chasiga chiqing — u yerda loy devorlar va butunlay boshqa sur'at boshlanadi.",
                "From the market dome, walk past the dried-fruit rows to Zarkaynar street — that is where the clay walls and a different pace begin.",
              ),
              L(
                "Финиш — площадь Хазрати Имам. Если останутся силы, зайдите в библиотеку при комплексе: там хранится Коран Османа, и очередь по утрам минимальная.",
                "Marra — Hazrati Imom maydoni. Kuch qolsa, majmuadagi kutubxonaga kiring: u yerda Usmon Qur'oni saqlanadi, ertalab navbat kam bo'ladi.",
                "The finish is Hazrati Imam square. If you still have energy, visit the library in the complex: the Uthman Quran is kept there and the morning queue is short.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "chajhany-kotorye-rabotayut-s-shesti",
      categorySlug: "food",
      title: L(
        "Пять чайхан, которые открываются в шесть утра",
        "Ertalab oltida ochiladigan beshta choyxona",
        "Five teahouses that open at six",
      ),
      excerpt: L(
        "Для тех, кто выходит из дома до рассвета: где в Ташкенте нальют чай и дадут шурпу в шесть утра.",
        "Tong otguncha uydan chiqadiganlar uchun: Toshkentda ertalab oltida qayerda choy quyib, sho'rva berishadi.",
        "For those who leave home before dawn: where in Tashkent you can get tea and shurpa at six.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Ранние чайханы — отдельный жанр. Там нет меню на стене, а есть один суп и то, что осталось со вчера.",
                "Erta ochiladigan choyxonalar — alohida janr. U yerda devorda menyu yo'q, faqat bitta sho'rva va kechadan qolgani bor.",
                "Early teahouses are their own genre: no menu on the wall, just one soup and whatever is left from yesterday.",
              ),
              L(
                "Моя любимая — у Госпитального рынка, без вывески, вход со двора. Шурпа там варится с пяти, и к семи её уже разбирают.",
                "Menikini eng yoqtirganim — Госпитальный bozori yonida, peshtaxtasiz, kirish hovlidan. Sho'rva u yerda beshdan pishadi, yettiga borib tugaydi.",
                "My favourite is by the Gospitalny market, no sign, entrance from the courtyard. The shurpa goes on at five and is gone by seven.",
              ),
            ),
          },
        },
      ],
    },
    {
      slug: "vyveski-kotorye-ischezayut",
      categorySlug: "notes",
      title: L(
        "Вывески, которые исчезают",
        "Yo'qolib borayotgan peshtaxtalar",
        "The signs that are disappearing",
      ),
      excerpt: L(
        "Советские рукописные вывески на Чиланзаре сносят по одной. Я успела снять двадцать три.",
        "Chilonzordagi sovet davri qo'lyozma peshtaxtalari birin-ketin olib tashlanmoqda. Yigirma uchtasini suratga olishga ulgurdim.",
        "Hand-painted Soviet-era signs in Chilanzar are coming down one by one. I managed to photograph twenty-three.",
      ),
      blocks: [
        {
          id: "body",
          type: "richText",
          data: {
            html: paragraphs(
              L(
                "Их делали вручную, кистью, обычно один и тот же человек на весь квартал. Отсюда одинаковый наклон букв на «Продукты» и «Ателье» через дорогу.",
                "Ularni qo'lda, mo'yqalam bilan, odatda butun kvartalga bitta odam yasagan. Shundan «Продукты» va ro'paradagi «Ателье» harflarining bir xil qiyaligi.",
                "They were painted by hand, usually by the same person for a whole block. Hence the identical slant of the letters on 'Produkty' and on 'Atelier' across the street.",
              ),
              L(
                "Если увидите такую — снимите и пришлите мне. Собираю архив, к концу года хочу выложить всё одним альбомом.",
                "Shundayini ko'rsangiz — suratga oling va menga yuboring. Arxiv yig'yapman, yil oxirigacha hammasini bitta albom qilib qo'ymoqchiman.",
                "If you spot one, photograph it and send it to me. I am building an archive and want to publish it as one album by the end of the year.",
              ),
            ),
          },
        },
      ],
    },
  ],
};
