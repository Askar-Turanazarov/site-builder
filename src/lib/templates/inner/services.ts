import type { PageTemplate } from "../types";

export const servicesTemplate: PageTemplate = {
  key: "inner-services",
  labelRu: "Услуги",
  labelUz: "Xizmatlar",
  labelEn: "Services",
  titleRu: "Услуги",
  titleUz: "Xizmatlar",
  titleEn: "Services",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Услуги",
        subheading: "Чем мы можем быть полезны и как строится работа",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Направления",
        items: [
          { icon: "spark", title: "Название услуги 1", body: "Короткое описание того, что входит в услугу и для кого она подходит" },
          { icon: "chart", title: "Название услуги 2", body: "Короткое описание того, что входит в услугу и для кого она подходит" },
          { icon: "shield", title: "Название услуги 3", body: "Короткое описание того, что входит в услугу и для кого она подходит" },
        ],
        columns: 3,
      },
    },
    {
      id: "process",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Как строится работа",
        body: "Начинаем с короткой встречи, чтобы понять задачу. Дальше — предложение с конкретными шагами и сроками. Работаем поэтапно, с промежуточными результатами, чтобы вы видели прогресс, а не ждали финального результата вслепую.",
        imageSide: "right",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Отзывы",
        items: [
          { quote: "Здесь будет отзыв клиента о работе с вами — конкретный, с деталями, которые вызывают доверие.", authorName: "Имя Фамилия", authorRole: "должность, компания", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Обсудим вашу задачу?",
        body: "Расскажите, что нужно сделать — предложим формат и сроки",
        buttonLabel: "Оставить заявку",
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
        heading: "Xizmatlar",
        subheading: "Sizga qanday foyda bera olamiz va ish qanday tashkil etiladi",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Yo'nalishlar",
        items: [
          { icon: "spark", title: "1-xizmat nomi", body: "Xizmat nimadan iboratligi va kimga mos kelishi haqida qisqacha" },
          { icon: "chart", title: "2-xizmat nomi", body: "Xizmat nimadan iboratligi va kimga mos kelishi haqida qisqacha" },
          { icon: "shield", title: "3-xizmat nomi", body: "Xizmat nimadan iboratligi va kimga mos kelishi haqida qisqacha" },
        ],
        columns: 3,
      },
    },
    {
      id: "process",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Ish qanday tashkil etiladi",
        body: "Vazifani tushunish uchun qisqa uchrashuvdan boshlaymiz. Keyin — aniq qadamlar va muddatlar bilan taklif. Bosqichma-bosqich ishlaymiz, oraliq natijalar bilan — shunda siz jarayonni ko'rib turasiz, yakuniy natijani ko'r-ko'rona kutmaysiz.",
        imageSide: "right",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Fikrlar",
        items: [
          { quote: "Bu yerda mijozning siz bilan ishlash haqidagi fikri bo'ladi — ishonch uyg'otadigan aniq tafsilotlar bilan.", authorName: "Ism Familiya", authorRole: "lavozim, kompaniya", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Vazifangizni muhokama qilamizmi?",
        body: "Nima qilish kerakligini ayting — format va muddatlarni taklif qilamiz",
        buttonLabel: "Ariza qoldirish",
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
        heading: "Services",
        subheading: "How we can help, and how the work is structured",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "What we offer",
        items: [
          { icon: "spark", title: "Service name 1", body: "A short description of what's included and who it's for" },
          { icon: "chart", title: "Service name 2", body: "A short description of what's included and who it's for" },
          { icon: "shield", title: "Service name 3", body: "A short description of what's included and who it's for" },
        ],
        columns: 3,
      },
    },
    {
      id: "process",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "How the work is structured",
        body: "We start with a short call to understand the task. Next comes a proposal with concrete steps and timelines. We work in stages, with interim results, so you see progress instead of waiting blindly for a final outcome.",
        imageSide: "right",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Testimonials",
        items: [
          { quote: "A client testimonial about working with you goes here — specific, with details that build trust.", authorName: "First Last", authorRole: "role, company", avatarMediaId: null },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Let's talk about your task",
        body: "Tell us what needs to get done — we'll suggest a format and timeline",
        buttonLabel: "Get in touch",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],
};
