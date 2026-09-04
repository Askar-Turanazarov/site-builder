import type { PageTemplate } from "../types";

export const agencyHomepage: PageTemplate = {
  key: "homepage-agency",
  labelRu: "Агентство / Портфолио",
  labelUz: "Agentlik / Portfolio",
  labelEn: "Agency / Portfolio",
  titleRu: "Главная",
  titleUz: "Bosh sahifa",
  titleEn: "Home",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Дизайн, который выделяет бренды",
        subheading: "Студия брендинга и веб-дизайна — от айдентики до готового сайта",
        imageMediaId: null,
        ctaLabel: "Смотреть работы",
        ctaLink: "#work",
        variant: "fullBleed",
        overlayOpacity: 0.45,
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Ребрендинг сети кофеен «Лист»" },
          { imageMediaId: null, caption: "Сайт для архитектурного бюро Formа" },
          { imageMediaId: null, caption: "Айдентика для фестиваля City Sound" },
          { imageMediaId: null, caption: "Упаковка для косметической линии Nord" },
          { imageMediaId: null, caption: "Digital-кампания для банка Ready" },
          { imageMediaId: null, caption: "Приложение для сервиса доставки Loop" },
        ],
        columns: 3,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Что мы делаем",
        items: [
          { icon: "spark", title: "Брендинг", body: "Название, логотип, визуальный язык — целостная система, а не набор картинок" },
          { icon: "globe", title: "Веб-дизайн и разработка", body: "Сайты, которые хорошо выглядят и одинаково быстро работают на любом устройстве" },
          { icon: "message", title: "Digital-кампании", body: "От идеи до медиаплана — коммуникация, которую замечают" },
        ],
        columns: 3,
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "Команда",
        members: [
          { photoMediaId: null, name: "Анна Реброва", role: "Арт-директор", bio: "10 лет в брендинге, ранее — в международном агентстве" },
          { photoMediaId: null, name: "Тимур Ахметов", role: "Ведущий дизайнер", bio: "Специализируется на digital-продуктах и интерфейсах" },
          { photoMediaId: null, name: "Ксения Лаврова", role: "Продюсер проектов", bio: "Отвечает за сроки, бюджет и нервы всех участников" },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Клиенты о нас",
        items: [
          { quote: "Ребрендинг увеличил узнаваемость сети в разы. Дизайнеры предложили решение, до которого мы сами не додумались бы.", authorName: "Олег Крюков", authorRole: "Основатель сети кофеен «Лист»", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Есть проект? Расскажите о нём",
        body: "Отвечаем в течение суток и сразу предлагаем формат первой встречи",
        buttonLabel: "Начать проект",
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
        heading: "Brendlarni ajratib turadigan dizayn",
        subheading: "Brending va veb-dizayn studiyasi — identifikatsiyadan tayyor saytgacha",
        imageMediaId: null,
        ctaLabel: "Ishlarni ko'rish",
        ctaLink: "#work",
        variant: "fullBleed",
        overlayOpacity: 0.45,
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "«List» kofexonalar tarmog'ini rebrending qilish" },
          { imageMediaId: null, caption: "Forma arxitektura byurosi uchun sayt" },
          { imageMediaId: null, caption: "City Sound festivali uchun identifikatsiya" },
          { imageMediaId: null, caption: "Nord kosmetika liniyasi uchun qadoq" },
          { imageMediaId: null, caption: "Ready banki uchun digital kampaniya" },
          { imageMediaId: null, caption: "Loop yetkazib berish xizmati uchun ilova" },
        ],
        columns: 3,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Biz nima qilamiz",
        items: [
          { icon: "spark", title: "Brending", body: "Nom, logotip, vizual til — rasmlar to'plami emas, yaxlit tizim" },
          { icon: "globe", title: "Veb-dizayn va ishlab chiqish", body: "Yaxshi ko'rinadigan va istalgan qurilmada bir xil tez ishlaydigan saytlar" },
          { icon: "message", title: "Digital-kampaniyalar", body: "G'oyadan media-rejagacha — e'tiborga olinadigan kommunikatsiya" },
        ],
        columns: 3,
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "Jamoa",
        members: [
          { photoMediaId: null, name: "Anna Rebrova", role: "Art-direktor", bio: "Brendingda 10 yillik tajriba, ilgari xalqaro agentlikda ishlagan" },
          { photoMediaId: null, name: "Temur Ahmedov", role: "Yetakchi dizayner", bio: "Digital mahsulotlar va interfeyslar bo'yicha mutaxassis" },
          { photoMediaId: null, name: "Ksenya Lavrova", role: "Loyihalar prodyuseri", bio: "Muddatlar, byudjet va barcha ishtirokchilarning tinchligi uchun javobgar" },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Mijozlarimiz fikri",
        items: [
          { quote: "Rebrending tarmog'imiz taniqliligini bir necha barobar oshirdi. Dizaynerlar biz o'zimiz o'ylab topa olmaydigan yechim taklif qilishdi.", authorName: "Oleg Kryukov", authorRole: "«List» kofexonalar tarmog'i asoschisi", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Loyihangiz bormi? Bizga aytib bering",
        body: "Bir kun ichida javob beramiz va darhol birinchi uchrashuv formatini taklif qilamiz",
        buttonLabel: "Loyihani boshlash",
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
        heading: "Design that makes brands stand out",
        subheading: "A branding and web design studio — from identity to a finished site",
        imageMediaId: null,
        ctaLabel: "See the work",
        ctaLink: "#work",
        variant: "fullBleed",
        overlayOpacity: 0.45,
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Rebrand for the Leaf coffee chain" },
          { imageMediaId: null, caption: "Website for Forma architecture studio" },
          { imageMediaId: null, caption: "Identity for the City Sound festival" },
          { imageMediaId: null, caption: "Packaging for the Nord cosmetics line" },
          { imageMediaId: null, caption: "Digital campaign for Ready bank" },
          { imageMediaId: null, caption: "App for the Loop delivery service" },
        ],
        columns: 3,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "What we do",
        items: [
          { icon: "spark", title: "Branding", body: "Name, logo, visual language — a coherent system, not a set of pictures" },
          { icon: "globe", title: "Web design & development", body: "Sites that look good and load just as fast on any device" },
          { icon: "message", title: "Digital campaigns", body: "From idea to media plan — communication people actually notice" },
        ],
        columns: 3,
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "Team",
        members: [
          { photoMediaId: null, name: "Anna Rebrova", role: "Art Director", bio: "10 years in branding, previously at an international agency" },
          { photoMediaId: null, name: "Timur Akhmedov", role: "Lead Designer", bio: "Focused on digital products and interfaces" },
          { photoMediaId: null, name: "Kseniya Lavrova", role: "Project Producer", bio: "Keeps timelines, budgets, and everyone's nerves intact" },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "What clients say",
        items: [
          { quote: "The rebrand multiplied our chain's recognition. The designers proposed a solution we wouldn't have arrived at ourselves.", authorName: "Oleg Kryukov", authorRole: "Founder, Leaf coffee chain", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Have a project? Tell us about it",
        body: "We reply within a day and suggest a format for the first meeting right away",
        buttonLabel: "Start a project",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],
};
