import type { PageTemplate } from "../types";

export const restaurantHomepage: PageTemplate = {
  key: "homepage-restaurant",
  labelRu: "Кафе / Ресторан",
  labelUz: "Kafe / Restoran",
  labelEn: "Cafe / Restaurant",
  titleRu: "Главная",
  titleUz: "Bosh sahifa",
  titleEn: "Home",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Кафе «Зерно»",
        subheading: "Свежий хлеб, кофе на зерне собственной обжарки и домашняя кухня в самом центре города",
        imageMediaId: null,
        ctaLabel: "Забронировать столик",
        ctaLink: "/contact",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "about",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Готовим так, как готовили бы дома",
        body: "«Зерно» открылось в 2019 году как маленькая пекарня на углу. Сегодня это кафе полного дня: завтраки, обед по будням, кофе с собственной обжарки зёрен и десерты, которые пекут прямо здесь каждое утро.",
        imageSide: "left",
        ctaLabel: "Наша история",
        ctaLink: "/about",
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Из меню",
        items: [
          { icon: "leaf", title: "Сезонные завтраки", body: "Меню меняется раз в сезон — готовим из того, что свежее прямо сейчас" },
          { icon: "spark", title: "Кофе своей обжарки", body: "Обжариваем зёрна сами, раз в неделю — маленькими партиями" },
          { icon: "heart", title: "Домашние десерты", body: "Шарлотка, чизкейк и медовик по рецептам, которым больше 20 лет" },
        ],
        columns: 3,
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Утренний завтрак у окна" },
          { imageMediaId: null, caption: "Капучино на зерне собственной обжарки" },
          { imageMediaId: null, caption: "Домашний чизкейк" },
          { imageMediaId: null, caption: "Зал кафе в будний полдень" },
        ],
        columns: 4,
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Что говорят гости",
        items: [
          { quote: "Прихожу сюда на завтрак раз в неделю уже три года. Овсянка с печёными яблоками — то, ради чего стоит вставать пораньше.", authorName: "Елена Тарасова", authorRole: "постоянная гостья", avatarMediaId: null },
          { quote: "Лучший кофе в районе, без преувеличения. И тихо — можно поработать за ноутбуком, никто не торопит.", authorName: "Артём Быков", authorRole: "постоянный гость", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Ждём вас за столиком у окна",
        body: "Забронируйте место заранее — по выходным в кафе многолюдно",
        buttonLabel: "Забронировать столик",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],

  blocksUz: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "«Zerno» kafesi",
        subheading: "Yangi pishirilgan non, o'zi qovurgan don qahva va uy taomlari — shahar markazida",
        imageMediaId: null,
        ctaLabel: "Stol band qilish",
        ctaLink: "/contact",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "about",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Uyda pishirilgandek tayyorlaymiz",
        body: "«Zerno» 2019 yilda burchakdagi kichik novvoyxona sifatida ochilgan edi. Bugun bu — kun bo'yi ochiq kafe: nonushta, ish kunlari tushlik, o'zi qovurgan qahva va har kuni ertalab shu yerda pishiriladigan shirinliklar.",
        imageSide: "left",
        ctaLabel: "Bizning tariximiz",
        ctaLink: "/about",
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Menyudan",
        items: [
          { icon: "leaf", title: "Fasliy nonushtalar", body: "Menyu har fasl yangilanadi — hozir eng yangi bo'lgan mahsulotlardan tayyorlaymiz" },
          { icon: "spark", title: "O'zimiz qovurgan qahva", body: "Donni haftasiga bir marta, kichik partiyalarda o'zimiz qovuramiz" },
          { icon: "heart", title: "Uy shirinliklari", body: "20 yildan ortiq tarixga ega retseptlar bo'yicha sharlotka, chizkeyk va medovik" },
        ],
        columns: 3,
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Deraza oldida ertalabki nonushta" },
          { imageMediaId: null, caption: "O'zi qovurgan dondan kapuchino" },
          { imageMediaId: null, caption: "Uy chizkeyki" },
          { imageMediaId: null, caption: "Ish kuni tushida kafe zali" },
        ],
        columns: 4,
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Mehmonlarimiz fikri",
        items: [
          { quote: "Uch yildan beri haftasiga bir marta shu yerga nonushtaga kelaman. Pishirilgan olma bilan sulu bo'tqasi — erta turishga arziydi.", authorName: "Elena Tarasova", authorRole: "doimiy mehmon", avatarMediaId: null },
          { quote: "Mahalladagi eng yaxshi qahva, hech qanday bo'rttirmasdan. Va jimjit — noutbukda ishlash mumkin, hech kim shoshirmaydi.", authorName: "Artyom Bikov", authorRole: "doimiy mehmon", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Deraza oldidagi stolimizda sizni kutamiz",
        body: "Joyni oldindan band qiling — dam olish kunlari kafeda odam ko'p bo'ladi",
        buttonLabel: "Stol band qilish",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],

  blocksEn: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Zerno Café",
        subheading: "Fresh bread, coffee roasted in-house, and home-style cooking right in the city centre",
        imageMediaId: null,
        ctaLabel: "Book a table",
        ctaLink: "/contact",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "about",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "We cook the way you would at home",
        body: "Zerno opened in 2019 as a small corner bakery. Today it's an all-day café: breakfast, weekday lunch, coffee roasted on-site, and desserts baked fresh here every morning.",
        imageSide: "left",
        ctaLabel: "Our story",
        ctaLink: "/about",
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "From the menu",
        items: [
          { icon: "leaf", title: "Seasonal breakfasts", body: "The menu changes every season — we cook with what's freshest right now" },
          { icon: "spark", title: "House-roasted coffee", body: "We roast our own beans once a week, in small batches" },
          { icon: "heart", title: "Homemade desserts", body: "Apple charlotte, cheesecake and honey cake made from recipes over 20 years old" },
        ],
        columns: 3,
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Morning breakfast by the window" },
          { imageMediaId: null, caption: "Cappuccino from our own roast" },
          { imageMediaId: null, caption: "Homemade cheesecake" },
          { imageMediaId: null, caption: "The dining room on a weekday afternoon" },
        ],
        columns: 4,
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "What guests say",
        items: [
          { quote: "I've come here for breakfast once a week for three years. The baked-apple oatmeal is worth getting up early for.", authorName: "Elena Tarasova", authorRole: "regular guest", avatarMediaId: null },
          { quote: "The best coffee in the neighbourhood, no exaggeration. And it's quiet — you can work on a laptop, nobody rushes you.", authorName: "Artem Bykov", authorRole: "regular guest", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "We'll save you the table by the window",
        body: "Book ahead — weekends get busy",
        buttonLabel: "Book a table",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],
};
