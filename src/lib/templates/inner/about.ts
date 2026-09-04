import type { PageTemplate } from "../types";

export const aboutTemplate: PageTemplate = {
  key: "inner-about",
  labelRu: "О нас",
  labelUz: "Biz haqimizda",
  labelEn: "About",
  titleRu: "О нас",
  titleUz: "Biz haqimizda",
  titleEn: "About",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "О нас",
        subheading: "Немного истории и то, во что мы верим",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "story",
      type: "richText",
      data: {
        html: "<p>Мы начинали с малого — команда из нескольких человек и одна простая идея: делать свою работу так, чтобы результат хотелось показать другим. Со временем команда выросла, а подход остался прежним.</p><p>Мы не гонимся за количеством проектов ради количества. Вместо этого стараемся хорошо понимать задачу клиента, прежде чем предлагать решение — даже если это означает больше вопросов на старте.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "8 лет", label: "на рынке" },
          { value: "50+", label: "довольных клиентов" },
          { value: "12", label: "человек в команде" },
        ],
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "Команда",
        members: [
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Короткое описание опыта и роли в команде" },
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Короткое описание опыта и роли в команде" },
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Короткое описание опыта и роли в команде" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Есть вопрос? Напишите нам",
        body: "Отвечаем в течение одного рабочего дня",
        buttonLabel: "Связаться с нами",
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
        heading: "Biz haqimizda",
        subheading: "Bir oz tarix va biz ishonadigan narsalar",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "story",
      type: "richText",
      data: {
        html: "<p>Biz kichikdan boshladik — bir nechta odamdan iborat jamoa va bitta oddiy g'oya: ishimizni shunday qilishki, natijani boshqalarga ko'rsatgingiz kelsin. Vaqt o'tishi bilan jamoa o'sdi, ammo yondashuv o'zgarmadi.</p><p>Biz son uchun ko'p loyiha qilishga intilmaymiz. Buning o'rniga, hatto boshida ko'proq savol berishga to'g'ri kelsa ham, yechim taklif qilishdan oldin mijozning vazifasini yaxshi tushunishga harakat qilamiz.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "8 yil", label: "bozorda" },
          { value: "50+", label: "mamnun mijoz" },
          { value: "12", label: "jamoa a'zosi" },
        ],
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "Jamoa",
        members: [
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va jamoadagi roli haqida qisqacha" },
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va jamoadagi roli haqida qisqacha" },
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va jamoadagi roli haqida qisqacha" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Savolingiz bormi? Bizga yozing",
        body: "Bir ish kuni ichida javob beramiz",
        buttonLabel: "Biz bilan bog'laning",
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
        heading: "About us",
        subheading: "A little history, and what we believe in",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "story",
      type: "richText",
      data: {
        html: "<p>We started small — a handful of people and one simple idea: do the work in a way you'd actually want to show other people. The team has grown since, but the approach hasn't changed.</p><p>We don't chase project count for its own sake. Instead we try to genuinely understand a client's problem before proposing a solution, even if that means more questions up front.</p>",
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "8 years", label: "in business" },
          { value: "50+", label: "happy clients" },
          { value: "12", label: "people on the team" },
        ],
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "Team",
        members: [
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A short note on experience and role on the team" },
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A short note on experience and role on the team" },
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A short note on experience and role on the team" },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Got a question? Reach out",
        body: "We reply within one business day",
        buttonLabel: "Contact us",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],
};
