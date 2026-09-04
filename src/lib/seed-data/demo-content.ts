import type { Block } from "@/blocks/types";

export interface DemoCategory {
  slug: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
  descRu: string;
  descUz: string;
  descEn: string;
  order: number;
}

export interface DemoPost {
  slug: string;
  categorySlug: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  excerptRu: string;
  excerptUz: string;
  excerptEn: string;
  blocksRu: Block[];
  blocksUz: Block[];
  blocksEn: Block[];
  publishedAt: string;
}

export const DEMO_CATEGORIES: DemoCategory[] = [
  {
    slug: "news",
    nameRu: "Новости",
    nameUz: "Yangiliklar",
    nameEn: "News",
    descRu: "Что происходит в кафе «Зерно»",
    descUz: "«Zerno» kafesida nima bo'layotgani",
    descEn: "What's happening at Zerno",
    order: 1,
  },
  {
    slug: "promo",
    nameRu: "Акции",
    nameUz: "Aksiyalar",
    nameEn: "Promotions",
    descRu: "Специальные предложения и скидки",
    descUz: "Maxsus takliflar va chegirmalar",
    descEn: "Special offers and discounts",
    order: 2,
  },
  {
    slug: "events",
    nameRu: "События",
    nameUz: "Tadbirlar",
    nameEn: "Events",
    descRu: "Дегустации, мастер-классы и встречи в кафе",
    descUz: "Kafedagi degustatsiyalar, master-klasslar va uchrashuvlar",
    descEn: "Tastings, workshops, and gatherings at the café",
    order: 3,
  },
];

function rt(html: string): Block {
  return { id: "b1", type: "richText", data: { html } };
}

export const DEMO_POSTS: DemoPost[] = [
  {
    slug: "obnovili-menu-na-zimu",
    categorySlug: "news",
    titleRu: "Мы обновили меню на зиму",
    titleUz: "Qish uchun menyuni yangiladik",
    titleEn: "We've updated the menu for winter",
    excerptRu: "Тёплые супы, сезонные десерты и согревающий чай — рассказываем, что изменилось.",
    excerptUz: "Issiq sho'rvalar, fasliy shirinliklar va isituvchi choy — nimalar o'zgarganini aytamiz.",
    excerptEn: "Warm soups, seasonal desserts, and a new tea — here's what changed.",
    publishedAt: "2026-08-18",
    blocksRu: [
      rt("<p>С понижением температуры мы обновили меню: добавили тёплые позиции на завтрак и несколько сезонных десертов, которых не было летом.</p>"),
      {
        id: "b2",
        type: "richText",
        data: {
          html:
            "<h2>Что нового</h2><ul><li>Тыквенный суп-пюре с гренками</li><li>Овсянка с печёными яблоками и корицей</li><li>Согревающий чай с имбирём и облепихой</li></ul><p>Меню уже доступно в зале — заходите попробовать.</p>",
        },
      },
    ],
    blocksUz: [
      rt("<p>Havo sovishi bilan menyuni yangiladik: yozda bo'lmagan issiq nonushta taomlari va bir nechta fasliy shirinliklar qo'shdik.</p>"),
      {
        id: "b2",
        type: "richText",
        data: {
          html:
            "<h2>Nimalar yangi</h2><ul><li>Krutonli qovoq-pyure sho'rva</li><li>Pishirilgan olma va dolchin bilan sulu bo'tqasi</li><li>Zanjabil va chakanda bilan isituvchi choy</li></ul><p>Menyu allaqachon zalda mavjud — kirib tatib ko'ring.</p>",
        },
      },
    ],
    blocksEn: [
      rt("<p>As the weather cooled down, we updated the menu: added warm breakfast options and a few seasonal desserts that weren't around in summer.</p>"),
      {
        id: "b2",
        type: "richText",
        data: {
          html:
            "<h2>What's new</h2><ul><li>Pumpkin soup with croutons</li><li>Oatmeal with baked apples and cinnamon</li><li>Warming ginger and sea-buckthorn tea</li></ul><p>The new menu is already on the floor — come try it.</p>",
        },
      },
    ],
  },
  {
    slug: "otkryty-po-voskresenyam",
    categorySlug: "news",
    titleRu: "Теперь мы открыты и по воскресеньям",
    titleUz: "Endi yakshanba kunlari ham ochig'miz",
    titleEn: "We're now open on Sundays too",
    excerptRu: "С этого месяца кафе работает семь дней в неделю, с 8:00 до 21:00.",
    excerptUz: "Shu oydan boshlab kafe haftaning yetti kuni, 8:00 dan 21:00 gacha ishlaydi.",
    excerptEn: "Starting this month, the café is open seven days a week, 8am to 9pm.",
    publishedAt: "2026-08-05",
    blocksRu: [
      rt("<p>Мы много раз слышали от гостей: «Жаль, что вы закрыты по воскресеньям». Услышали и изменили расписание.</p><p>Теперь «Зерно» работает без выходных — с 8:00 до 21:00 каждый день, включая праздники.</p>"),
    ],
    blocksUz: [
      rt("<p>Mehmonlardan ko'p marta eshitdik: «Achinarli, yakshanba kuni yopiqsizlar». Buni eshitib jadvalni o'zgartirdik.</p><p>Endi «Zerno» dam olish kunlarisiz ishlaydi — har kuni, bayramlarni ham qo'shib, 8:00 dan 21:00 gacha.</p>"),
    ],
    blocksEn: [
      rt("<p>We heard it from guests again and again: \"Too bad you're closed on Sundays.\" We listened and changed the schedule.</p><p>Zerno now runs seven days a week — 8am to 9pm, holidays included.</p>"),
    ],
  },
  {
    slug: "skidka-na-zavtraki-do-11",
    categorySlug: "promo",
    titleRu: "Скидка 20% на завтраки по будням до 11:00",
    titleUz: "Ish kunlari 11:00 gacha nonushtalarga 20% chegirma",
    titleEn: "20% off breakfast on weekdays before 11am",
    excerptRu: "Успейте позавтракать пораньше — и сэкономьте.",
    excerptUz: "Erta nonushta qiling — va tejab qoling.",
    excerptEn: "Come for an early breakfast and save.",
    publishedAt: "2026-08-25",
    blocksRu: [
      rt("<p>С понедельника по пятницу, с открытия до 11:00, все позиции завтрака — со скидкой 20%. Акция не суммируется с другими предложениями.</p>"),
      { id: "b2", type: "cta", data: { heading: "Успейте позавтракать со скидкой", body: "Действует до конца месяца, по будням до 11:00", buttonLabel: "Забронировать столик", buttonLink: "/contact", style: "outline" } },
    ],
    blocksUz: [
      rt("<p>Dushanbadan jumagacha, ochilishdan 11:00 gacha, barcha nonushta taomlariga 20% chegirma. Aksiya boshqa takliflar bilan qo'shilmaydi.</p>"),
      { id: "b2", type: "cta", data: { heading: "Chegirmali nonushtaga ulguring", body: "Oy oxirigacha amal qiladi, ish kunlari 11:00 gacha", buttonLabel: "Stol band qilish", buttonLink: "/contact", style: "outline" } },
    ],
    blocksEn: [
      rt("<p>Monday through Friday, from opening until 11am, every breakfast item is 20% off. Not combinable with other offers.</p>"),
      { id: "b2", type: "cta", data: { heading: "Catch the breakfast discount", body: "Valid through the end of the month, weekdays before 11am", buttonLabel: "Book a table", buttonLink: "/contact", style: "outline" } },
    ],
  },
  {
    slug: "privedi-druga",
    categorySlug: "promo",
    titleRu: "Приведи друга — получи десерт в подарок",
    titleUz: "Do'stingizni olib keling — shirinlik sovg'a",
    titleEn: "Bring a friend, get a free dessert",
    excerptRu: "Простая акция для тех, кто любит делиться хорошими местами.",
    excerptUz: "Yaxshi joylarni ulashishni yoqtirganlar uchun oddiy aksiya.",
    excerptEn: "A simple offer for anyone who likes sharing good places.",
    publishedAt: "2026-08-12",
    blocksRu: [
      rt("<p>Если вы пришли с другом, который ни разу у нас не был, — десерт на двоих за наш счёт. Достаточно сказать об этом при заказе.</p>"),
    ],
    blocksUz: [
      rt("<p>Agar bizga hali hech qachon kelmagan do'stingiz bilan kelsangiz — ikkalangiz uchun shirinlik biz tomondan. Buyurtma berayotganda shunchaki ayting.</p>"),
    ],
    blocksEn: [
      rt("<p>Bring a friend who's never been to Zerno before, and dessert for two is on us. Just mention it when you order.</p>"),
    ],
  },
  {
    slug: "degustatsiya-novogo-urozhaya",
    categorySlug: "events",
    titleRu: "Дегустация нового урожая кофе — суббота, 14:00",
    titleUz: "Yangi hosil qahvasi degustatsiyasi — shanba, 14:00",
    titleEn: "New-harvest coffee tasting — Saturday at 2pm",
    excerptRu: "Попробуем три новых сорта и расскажем, чем они отличаются.",
    excerptUz: "Uchta yangi navni tatib ko'ramiz va ular qanday farq qilishini aytib beramiz.",
    excerptEn: "We'll try three new beans and explain what sets them apart.",
    publishedAt: "2026-08-28",
    blocksRu: [
      rt("<p>В эту субботу в 14:00 наш бариста проведёт короткую дегустацию нового урожая — три сорта зерна, разница в обжарке и вкусе. Участие бесплатное, мест немного.</p>"),
      { id: "b2", type: "cta", data: { heading: "Хотите присоединиться?", body: "Напишите нам, чтобы забронировать место", buttonLabel: "Записаться", buttonLink: "/contact", style: "solid" } },
    ],
    blocksUz: [
      rt("<p>Shu shanba kuni soat 14:00 da bizning baristamiz yangi hosil bo'yicha qisqa degustatsiya o'tkazadi — uchta don navi, qovurish va ta'mdagi farq. Ishtirok bepul, joylar cheklangan.</p>"),
      { id: "b2", type: "cta", data: { heading: "Qatnashmoqchimisiz?", body: "Joy band qilish uchun bizga yozing", buttonLabel: "Yozilish", buttonLink: "/contact", style: "solid" } },
    ],
    blocksEn: [
      rt("<p>This Saturday at 2pm, our barista is running a short tasting of the new harvest — three beans, differences in roast and flavor. Free to join, limited spots.</p>"),
      { id: "b2", type: "cta", data: { heading: "Want to join?", body: "Message us to reserve a spot", buttonLabel: "Reserve a spot", buttonLink: "/contact", style: "solid" } },
    ],
  },
  {
    slug: "master-klass-po-vypechke-dlya-detey",
    categorySlug: "events",
    titleRu: "Мастер-класс по выпечке для детей",
    titleUz: "Bolalar uchun pishiriqlar bo'yicha master-klass",
    titleEn: "Baking workshop for kids",
    excerptRu: "Учим печь простое печенье — своими руками и с удовольствием.",
    excerptUz: "Oddiy pechenye pishirishni o'rgatamiz — o'z qo'llari bilan va zavq bilan.",
    excerptEn: "We'll teach kids to bake simple cookies — hands-on and fun.",
    publishedAt: "2026-09-01",
    blocksRu: [
      rt("<p>В следующее воскресенье наш пекарь проведёт мастер-класс для детей 6–10 лет: простое песочное печенье от замеса до готового результата. Всё оборудование и продукты — наши, нужно только желание.</p>"),
    ],
    blocksUz: [
      rt("<p>Kelasi yakshanba kuni bizning novvoyimiz 6–10 yoshli bolalar uchun master-klass o'tkazadi: xamir qorishdan tayyor natijagacha oddiy qumli pechenye. Barcha jihoz va mahsulotlar bizniki, faqat xohish kerak.</p>"),
    ],
    blocksEn: [
      rt("<p>Next Sunday, our baker is running a workshop for kids aged 6–10: simple shortbread cookies from mixing the dough to the finished batch. We provide everything — just bring the enthusiasm.</p>"),
    ],
  },
];
