import type { PageTemplate } from "../types";

export const pricingTemplate: PageTemplate = {
  key: "inner-pricing",
  labelRu: "Цены",
  labelUz: "Narxlar",
  labelEn: "Pricing",
  titleRu: "Цены",
  titleUz: "Narxlar",
  titleEn: "Pricing",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Тарифы",
        subheading: "Прозрачные цены без скрытых условий",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "pricing",
      type: "pricing",
      data: {
        heading: "Выберите тариф",
        plans: [
          {
            name: "Старт",
            price: "от 990 ₽",
            period: "мес",
            features: ["Основная функциональность", "Поддержка по email", "1 пользователь"],
            highlighted: false,
            ctaLabel: "Выбрать",
            ctaLink: "/contact",
          },
          {
            name: "Стандарт",
            price: "от 2 490 ₽",
            period: "мес",
            features: ["Всё из тарифа «Старт»", "Приоритетная поддержка", "До 5 пользователей", "Расширенная аналитика"],
            highlighted: true,
            ctaLabel: "Выбрать",
            ctaLink: "/contact",
          },
          {
            name: "Индивидуально",
            price: "по запросу",
            period: "",
            features: ["Все возможности «Стандарта»", "Персональный менеджер", "Гибкие условия", "Интеграции под задачу"],
            highlighted: false,
            ctaLabel: "Обсудить",
            ctaLink: "/contact",
          },
        ],
      },
    },
    {
      id: "faq",
      type: "faq",
      data: {
        heading: "Вопросы о тарифах",
        items: [
          { question: "Можно ли сменить тариф позже?", answer: "<p>Да, вы можете перейти на другой тариф в любой момент — изменения вступают в силу со следующего расчётного периода.</p>" },
          { question: "Есть ли пробный период?", answer: "<p>Да, на тарифе «Стандарт» доступен бесплатный пробный период — подробности уточняйте при обращении.</p>" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Не уверены, какой тариф выбрать?",
        body: "Напишите нам — поможем определиться исходя из ваших задач",
        buttonLabel: "Задать вопрос",
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
        heading: "Tariflar",
        subheading: "Yashirin shartlarsiz shaffof narxlar",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "pricing",
      type: "pricing",
      data: {
        heading: "Tarifni tanlang",
        plans: [
          {
            name: "Start",
            price: "99 000 so'mdan",
            period: "oy",
            features: ["Asosiy funksionallik", "Email orqali qo'llab-quvvatlash", "1 foydalanuvchi"],
            highlighted: false,
            ctaLabel: "Tanlash",
            ctaLink: "/contact",
          },
          {
            name: "Standart",
            price: "249 000 so'mdan",
            period: "oy",
            features: ["«Start» tarifidagi barchasi", "Ustuvor qo'llab-quvvatlash", "5 tagacha foydalanuvchi", "Kengaytirilgan tahlil"],
            highlighted: true,
            ctaLabel: "Tanlash",
            ctaLink: "/contact",
          },
          {
            name: "Individual",
            price: "so'rov asosida",
            period: "",
            features: ["«Standart»ning barcha imkoniyatlari", "Shaxsiy menejer", "Moslashuvchan shartlar", "Vazifaga mos integratsiyalar"],
            highlighted: false,
            ctaLabel: "Muhokama qilish",
            ctaLink: "/contact",
          },
        ],
      },
    },
    {
      id: "faq",
      type: "faq",
      data: {
        heading: "Tariflar bo'yicha savollar",
        items: [
          { question: "Tarifni keyinroq almashtirish mumkinmi?", answer: "<p>Ha, istalgan vaqtda boshqa tarifga o'tishingiz mumkin — o'zgarishlar keyingi hisob-kitob davridan kuchga kiradi.</p>" },
          { question: "Sinov muddati bormi?", answer: "<p>Ha, «Standart» tarifida bepul sinov muddati mavjud — batafsil ma'lumot uchun murojaat qiling.</p>" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Qaysi tarifni tanlashni bilmayapsizmi?",
        body: "Bizga yozing — vazifalaringizga qarab tanlashga yordam beramiz",
        buttonLabel: "Savol berish",
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
        heading: "Pricing",
        subheading: "Transparent pricing, no hidden terms",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "pricing",
      type: "pricing",
      data: {
        heading: "Choose a plan",
        plans: [
          {
            name: "Starter",
            price: "from $12",
            period: "mo",
            features: ["Core functionality", "Email support", "1 user"],
            highlighted: false,
            ctaLabel: "Choose",
            ctaLink: "/contact",
          },
          {
            name: "Standard",
            price: "from $29",
            period: "mo",
            features: ["Everything in Starter", "Priority support", "Up to 5 users", "Advanced analytics"],
            highlighted: true,
            ctaLabel: "Choose",
            ctaLink: "/contact",
          },
          {
            name: "Custom",
            price: "on request",
            period: "",
            features: ["Everything in Standard", "Dedicated manager", "Flexible terms", "Task-specific integrations"],
            highlighted: false,
            ctaLabel: "Talk to us",
            ctaLink: "/contact",
          },
        ],
      },
    },
    {
      id: "faq",
      type: "faq",
      data: {
        heading: "Pricing questions",
        items: [
          { question: "Can I switch plans later?", answer: "<p>Yes — you can switch plans at any time; changes take effect from the next billing period.</p>" },
          { question: "Is there a trial?", answer: "<p>Yes, a free trial is available on the Standard plan — ask us for details.</p>" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Not sure which plan fits?",
        body: "Message us — we'll help you decide based on what you actually need",
        buttonLabel: "Ask a question",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],
};
