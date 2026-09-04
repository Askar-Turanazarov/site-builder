import type { PageTemplate } from "../types";

export const shopHomepage: PageTemplate = {
  key: "homepage-shop",
  labelRu: "Интернет-магазин",
  labelUz: "Onlayn-do'kon",
  labelEn: "Online Store",
  titleRu: "Главная",
  titleUz: "Bosh sahifa",
  titleEn: "Home",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Уход за кожей без лишнего",
        subheading: "Nordika — косметика из 5–7 ингредиентов на этикетке. Без отдушек, без спирта, без обещаний, которые не работают",
        imageMediaId: null,
        ctaLabel: "Смотреть каталог",
        ctaLink: "/pricing",
        variant: "split",
        overlayOpacity: 0.35,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Почему Nordika",
        items: [
          { icon: "leaf", title: "Короткий состав", body: "В среднем 6 ингредиентов на продукт — каждый выполняет понятную задачу" },
          { icon: "shield", title: "Без спорных компонентов", body: "Не используем отдушки, спирт и силиконы в базовых формулах" },
          { icon: "gift", title: "Доставка за 2 дня", body: "Отправляем заказы каждый день, доставка по стране — 1–2 дня" },
        ],
        columns: 3,
      },
    },
    {
      id: "pricing",
      type: "pricing",
      data: {
        heading: "Наборы для старта",
        plans: [
          {
            name: "Базовый уход",
            price: "890 ₽",
            period: "набор",
            features: ["Гель для умывания, 150 мл", "Увлажняющий крем, 50 мл", "Инструкция по уходу"],
            highlighted: false,
            ctaLabel: "В корзину",
            ctaLink: "#",
          },
          {
            name: "Полный уход",
            price: "1 690 ₽",
            period: "набор",
            features: ["Всё из базового набора", "Сыворотка с ниацинамидом", "Крем для глаз", "Подарок — мини-версия SPF"],
            highlighted: true,
            ctaLabel: "В корзину",
            ctaLink: "#",
          },
          {
            name: "Для чувствительной кожи",
            price: "1 190 ₽",
            period: "набор",
            features: ["Мягкая пенка без сульфатов", "Крем с пантенолом", "Гидролат для снятия раздражения"],
            highlighted: false,
            ctaLabel: "В корзину",
            ctaLink: "#",
          },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Отзывы покупателей",
        items: [
          { quote: "Кожа перестала краснеть уже через две недели использования сыворотки. Раньше пробовала много всего — это первое, что реально сработало.", authorName: "Виктория Немцова", authorRole: "покупательница", avatarMediaId: null },
          { quote: "Нравится, что состав можно прочитать и понять. Не покупаю уже ничего другого для базового ухода.", authorName: "Дарья Орлова", authorRole: "покупательница", avatarMediaId: null },
        ],
      },
    },
    {
      id: "faq",
      type: "faq",
      data: {
        heading: "Частые вопросы",
        items: [
          { question: "Подходит ли уход для чувствительной кожи?", answer: "<p>Да, у нас есть отдельная линейка без отдушек и спирта — «Для чувствительной кожи». Она разработана вместе с дерматологом.</p>" },
          { question: "Как быстро приходит заказ?", answer: "<p>Обычно 1–2 дня по крупным городам, до 5 дней — в отдалённые регионы. Трек-номер приходит в день отправки.</p>" },
          { question: "Можно ли вернуть товар?", answer: "<p>Да, в течение 14 дней, если упаковка не повреждена. Подробности — на странице доставки и возврата.</p>" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Начните с одного продукта",
        body: "Не уверены, что выбрать? Начните с базового набора — этого достаточно для первого впечатления",
        buttonLabel: "Смотреть каталог",
        buttonLink: "/pricing",
        style: "solid",
      },
    },
  ],

  blocksUz: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Ortiqchasiz teri parvarishi",
        subheading: "Nordika — etiketkasida 5–7 ta tarkibiy qismi bo'lgan kosmetika. Hidlovchi moddasiz, spirtsiz, ishlamaydigan va'dalarsiz",
        imageMediaId: null,
        ctaLabel: "Katalogni ko'rish",
        ctaLink: "/pricing",
        variant: "split",
        overlayOpacity: 0.35,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Nima uchun Nordika",
        items: [
          { icon: "leaf", title: "Qisqa tarkib", body: "Har bir mahsulotda o'rtacha 6 ta tarkibiy qism — har biri aniq vazifani bajaradi" },
          { icon: "shield", title: "Bahsli komponentlarsiz", body: "Asosiy formulalarda hidlovchi moddalar, spirt va silikonlardan foydalanmaymiz" },
          { icon: "gift", title: "2 kunda yetkazib berish", body: "Buyurtmalarni har kuni jo'natamiz, mamlakat bo'ylab yetkazib berish — 1–2 kun" },
        ],
        columns: 3,
      },
    },
    {
      id: "pricing",
      type: "pricing",
      data: {
        heading: "Boshlash uchun to'plamlar",
        plans: [
          {
            name: "Asosiy parvarish",
            price: "89 000 so'm",
            period: "to'plam",
            features: ["Yuvish geli, 150 ml", "Namlovchi krem, 50 ml", "Parvarish bo'yicha qo'llanma"],
            highlighted: false,
            ctaLabel: "Savatga qo'shish",
            ctaLink: "#",
          },
          {
            name: "To'liq parvarish",
            price: "169 000 so'm",
            period: "to'plam",
            features: ["Asosiy to'plamdagi barchasi", "Niatsinamidli serum", "Ko'z atrofi uchun krem", "Sovg'a — SPF mini-versiyasi"],
            highlighted: true,
            ctaLabel: "Savatga qo'shish",
            ctaLink: "#",
          },
          {
            name: "Sezgir teri uchun",
            price: "119 000 so'm",
            period: "to'plam",
            features: ["Sulfatsiz yumshoq ko'pik", "Pantenolli krem", "Qichishishni yumshatuvchi gidrolat"],
            highlighted: false,
            ctaLabel: "Savatga qo'shish",
            ctaLink: "#",
          },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Xaridorlar fikri",
        items: [
          { quote: "Serumni ishlata boshlaganimdan ikki hafta o'tib terim qizarishni to'xtatdi. Ilgari ko'p narsa sinab ko'rgan edim — bu haqiqatan yordam bergan birinchisi.", authorName: "Viktoriya Nemtsova", authorRole: "xaridor", avatarMediaId: null },
          { quote: "Tarkibini o'qib tushunish mumkinligi yoqadi. Asosiy parvarish uchun boshqa hech narsa sotib olmayapman.", authorName: "Darya Orlova", authorRole: "xaridor", avatarMediaId: null },
        ],
      },
    },
    {
      id: "faq",
      type: "faq",
      data: {
        heading: "Ko'p beriladigan savollar",
        items: [
          { question: "Parvarish sezgir teri uchun mos keladimi?", answer: "<p>Ha, bizda hidlovchi moddalar va spirtsiz alohida liniya bor — «Sezgir teri uchun». U dermatolog bilan birgalikda ishlab chiqilgan.</p>" },
          { question: "Buyurtma qanchalik tez yetib boradi?", answer: "<p>Odatda yirik shaharlarga 1–2 kun, uzoq hududlarga 5 kungacha. Trek-raqami jo'natilgan kuni yuboriladi.</p>" },
          { question: "Mahsulotni qaytarish mumkinmi?", answer: "<p>Ha, qadoq shikastlanmagan bo'lsa, 14 kun ichida. Batafsil ma'lumot — yetkazib berish va qaytarish sahifasida.</p>" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Bitta mahsulotdan boshlang",
        body: "Nimani tanlashni bilmayapsizmi? Asosiy to'plamdan boshlang — birinchi taassurot uchun shu yetarli",
        buttonLabel: "Katalogni ko'rish",
        buttonLink: "/pricing",
        style: "solid",
      },
    },
  ],

  blocksEn: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Skincare with nothing extra",
        subheading: "Nordika — cosmetics with 5–7 ingredients on the label. No fragrance, no alcohol, no promises that don't hold up",
        imageMediaId: null,
        ctaLabel: "Browse the catalog",
        ctaLink: "/pricing",
        variant: "split",
        overlayOpacity: 0.35,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Why Nordika",
        items: [
          { icon: "leaf", title: "Short ingredient lists", body: "6 ingredients on average per product — each doing a clear job" },
          { icon: "shield", title: "No debatable ingredients", body: "No fragrance, alcohol, or silicones in our core formulas" },
          { icon: "gift", title: "2-day delivery", body: "Orders ship every day; delivery nationwide takes 1–2 days" },
        ],
        columns: 3,
      },
    },
    {
      id: "pricing",
      type: "pricing",
      data: {
        heading: "Starter sets",
        plans: [
          {
            name: "Basic routine",
            price: "$19",
            period: "set",
            features: ["Cleansing gel, 150 ml", "Moisturizer, 50 ml", "Care guide"],
            highlighted: false,
            ctaLabel: "Add to cart",
            ctaLink: "#",
          },
          {
            name: "Complete routine",
            price: "$35",
            period: "set",
            features: ["Everything in Basic", "Niacinamide serum", "Eye cream", "Gift — mini SPF"],
            highlighted: true,
            ctaLabel: "Add to cart",
            ctaLink: "#",
          },
          {
            name: "For sensitive skin",
            price: "$25",
            period: "set",
            features: ["Sulfate-free gentle foam", "Panthenol cream", "Soothing hydrolat"],
            highlighted: false,
            ctaLabel: "Add to cart",
            ctaLink: "#",
          },
        ],
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "What customers say",
        items: [
          { quote: "My skin stopped flushing after two weeks with the serum. I'd tried a lot before — this is the first thing that actually worked.", authorName: "Victoria Nemtsova", authorRole: "customer", avatarMediaId: null },
          { quote: "I like that I can read the ingredient list and understand it. I don't buy anything else for my basic routine anymore.", authorName: "Daria Orlova", authorRole: "customer", avatarMediaId: null },
        ],
      },
    },
    {
      id: "faq",
      type: "faq",
      data: {
        heading: "Frequently asked questions",
        items: [
          { question: "Is this suitable for sensitive skin?", answer: "<p>Yes — we have a separate fragrance- and alcohol-free line, \"For sensitive skin\", developed with a dermatologist.</p>" },
          { question: "How fast does an order arrive?", answer: "<p>Usually 1–2 days to major cities, up to 5 days to remote areas. You'll get a tracking number on the day it ships.</p>" },
          { question: "Can I return a product?", answer: "<p>Yes, within 14 days if the packaging is undamaged. See the shipping and returns page for details.</p>" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Start with one product",
        body: "Not sure where to start? The basic set is enough for a first impression",
        buttonLabel: "Browse the catalog",
        buttonLink: "/pricing",
        style: "solid",
      },
    },
  ],
};
