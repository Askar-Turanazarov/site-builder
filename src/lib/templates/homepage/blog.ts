import type { PageTemplate } from "../types";

export const blogHomepage: PageTemplate = {
  key: "homepage-blog",
  labelRu: "Личный блог / Крейтор",
  labelUz: "Shaxsiy blog / Kreator",
  labelEn: "Personal Blog / Creator",
  titleRu: "Главная",
  titleUz: "Bosh sahifa",
  titleEn: "Home",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Привет, я Лина",
        subheading: "Пишу про еду, дорогу и города, в которые стоит вернуться — уже седьмой год подряд",
        imageMediaId: null,
        ctaLabel: "Читать блог",
        ctaLink: "/news",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "intro",
      type: "richText",
      data: {
        html: "<p>Я начала вести этот блог в 2018 году как обычный дневник поездок — просто чтобы не забыть детали. Со временем он превратился в нечто большее: сюда я записываю рецепты, которые привожу с рынков, места, куда возвращаюсь снова, и списки, которые сама бы хотела найти перед поездкой.</p><p>Здесь нет спонсорских постов ради постов — только то, что действительно стоит времени.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "7 лет", label: "веду блог" },
          { value: "34", label: "страны в заметках" },
          { value: "120K", label: "читателей в месяц" },
          { value: "210", label: "опубликованных историй" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Новые истории — раз в неделю",
        body: "Подпишитесь на рассылку: маршруты, рецепты и места, о которых ещё нет в блоге",
        buttonLabel: "Подписаться",
        buttonLink: "/contact",
        style: "outline",
      },
    },
  ],

  blocksUz: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Salom, men Linaman",
        subheading: "Taom, yo'l va qaytib borishga arziydigan shaharlar haqida yozaman — ketma-ket yettinchi yil",
        imageMediaId: null,
        ctaLabel: "Blogni o'qish",
        ctaLink: "/news",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "intro",
      type: "richText",
      data: {
        html: "<p>Bu blogni 2018 yilda oddiy sayohat kundaligi sifatida yurita boshlagan edim — shunchaki tafsilotlarni unutmaslik uchun. Vaqt o'tishi bilan u kattaroq narsaga aylandi: bu yerga bozorlardan olib kelgan retseptlarni, qayta-qayta boradigan joylarni va sayohatdan oldin o'zim topishni xohlagan ro'yxatlarni yozaman.</p><p>Bu yerda shunchaki reklama uchun postlar yo'q — faqat vaqtga haqiqatan arzigulik narsalar.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "7 yil", label: "blog yuritaman" },
          { value: "34", label: "davlat qaydlarda" },
          { value: "120K", label: "oyiga o'quvchi" },
          { value: "210", label: "nashr etilgan hikoya" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Yangi hikoyalar — haftasiga bir marta",
        body: "Yangiliklar tarqatmasiga obuna bo'ling: marshrutlar, retseptlar va blogda hali yo'q joylar",
        buttonLabel: "Obuna bo'lish",
        buttonLink: "/contact",
        style: "outline",
      },
    },
  ],

  blocksEn: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Hi, I'm Lina",
        subheading: "Writing about food, the road, and cities worth going back to — for seven years running",
        imageMediaId: null,
        ctaLabel: "Read the blog",
        ctaLink: "/news",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "intro",
      type: "richText",
      data: {
        html: "<p>I started this blog in 2018 as a plain travel diary — just to not forget the details. Over time it turned into something bigger: a place for recipes I bring back from markets, places I keep returning to, and the lists I wish I'd had before a trip.</p><p>No sponsored posts for the sake of posts here — only what's genuinely worth your time.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "7 years", label: "writing this blog" },
          { value: "34", label: "countries in my notes" },
          { value: "120K", label: "readers a month" },
          { value: "210", label: "stories published" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "New stories, once a week",
        body: "Subscribe for routes, recipes, and places that haven't made it to the blog yet",
        buttonLabel: "Subscribe",
        buttonLink: "/contact",
        style: "outline",
      },
    },
  ],
};
