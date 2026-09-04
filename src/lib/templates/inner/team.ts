import type { PageTemplate } from "../types";

export const teamTemplate: PageTemplate = {
  key: "inner-team",
  labelRu: "Команда / Портфолио",
  labelUz: "Jamoa / Portfolio",
  labelEn: "Team / Portfolio",
  titleRu: "Команда",
  titleUz: "Jamoa",
  titleEn: "Team",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Команда",
        subheading: "Люди, которые делают эту работу",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "",
        members: [
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Пара предложений об опыте и зоне ответственности" },
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Пара предложений об опыте и зоне ответственности" },
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Пара предложений об опыте и зоне ответственности" },
          { photoMediaId: null, name: "Имя Фамилия", role: "Должность", bio: "Пара предложений об опыте и зоне ответственности" },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Пример работы 1" },
          { imageMediaId: null, caption: "Пример работы 2" },
          { imageMediaId: null, caption: "Пример работы 3" },
        ],
        columns: 3,
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Хотите присоединиться к команде?",
        body: "Мы всегда рады обсудить сотрудничество с сильными специалистами",
        buttonLabel: "Написать нам",
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
        heading: "Jamoa",
        subheading: "Bu ishni amalga oshiradigan odamlar",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "",
        members: [
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va mas'uliyat sohasi haqida bir necha gap" },
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va mas'uliyat sohasi haqida bir necha gap" },
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va mas'uliyat sohasi haqida bir necha gap" },
          { photoMediaId: null, name: "Ism Familiya", role: "Lavozim", bio: "Tajriba va mas'uliyat sohasi haqida bir necha gap" },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "1-ish namunasi" },
          { imageMediaId: null, caption: "2-ish namunasi" },
          { imageMediaId: null, caption: "3-ish namunasi" },
        ],
        columns: 3,
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Jamoaga qo'shilmoqchimisiz?",
        body: "Kuchli mutaxassislar bilan hamkorlikni muhokama qilishdan doim mamnunmiz",
        buttonLabel: "Bizga yozing",
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
        heading: "Team",
        subheading: "The people behind the work",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "team",
      type: "team",
      data: {
        heading: "",
        members: [
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A couple of sentences on experience and area of responsibility" },
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A couple of sentences on experience and area of responsibility" },
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A couple of sentences on experience and area of responsibility" },
          { photoMediaId: null, name: "First Last", role: "Role", bio: "A couple of sentences on experience and area of responsibility" },
        ],
      },
    },
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Work sample 1" },
          { imageMediaId: null, caption: "Work sample 2" },
          { imageMediaId: null, caption: "Work sample 3" },
        ],
        columns: 3,
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Want to join the team?",
        body: "We're always glad to talk with strong people about working together",
        buttonLabel: "Get in touch",
        buttonLink: "/contact",
        style: "outline",
      },
    },
  ],
};
