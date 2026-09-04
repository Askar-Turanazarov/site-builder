import type { PageTemplate } from "../types";

export const contactTemplate: PageTemplate = {
  key: "inner-contact",
  labelRu: "Контакты",
  labelUz: "Aloqa",
  labelEn: "Contact",
  titleRu: "Контакты",
  titleUz: "Aloqa",
  titleEn: "Contact",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Свяжитесь с нами",
        subheading: "Ответим в течение одного рабочего дня",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "info",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Как нас найти",
        body: "Адрес: укажите ваш адрес здесь.\nТелефон: укажите номер телефона.\nEmail: укажите почту для связи.\nЧасы работы: пн–пт, 9:00–18:00.",
        imageSide: "left",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "form",
      type: "contactForm",
      data: {
        heading: "Напишите нам",
        fields: [
          { type: "text", label: "Имя", required: true },
          { type: "email", label: "Email", required: true },
          { type: "tel", label: "Телефон", required: false },
          { type: "textarea", label: "Сообщение", required: true },
        ],
        submitLabel: "Отправить",
        successMessage: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      },
    },
  ],

  blocksUz: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Biz bilan bog'laning",
        subheading: "Bir ish kuni ichida javob beramiz",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "info",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "Bizni qanday topish mumkin",
        body: "Manzil: manzilingizni shu yerga kiriting.\nTelefon: telefon raqamingizni kiriting.\nEmail: aloqa uchun pochtangizni kiriting.\nIsh vaqti: dush–juma, 9:00–18:00.",
        imageSide: "left",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "form",
      type: "contactForm",
      data: {
        heading: "Bizga yozing",
        fields: [
          { type: "text", label: "Ism", required: true },
          { type: "email", label: "Email", required: true },
          { type: "tel", label: "Telefon", required: false },
          { type: "textarea", label: "Xabar", required: true },
        ],
        submitLabel: "Yuborish",
        successMessage: "Rahmat! Tez orada siz bilan bog'lanamiz.",
      },
    },
  ],

  blocksEn: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Get in touch",
        subheading: "We reply within one business day",
        imageMediaId: null,
        ctaLabel: "",
        ctaLink: "",
        variant: "centered",
        overlayOpacity: 0.3,
      },
    },
    {
      id: "info",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "How to find us",
        body: "Address: add your address here.\nPhone: add your phone number.\nEmail: add your contact email.\nHours: Mon–Fri, 9am–6pm.",
        imageSide: "left",
        ctaLabel: "",
        ctaLink: "",
      },
    },
    {
      id: "form",
      type: "contactForm",
      data: {
        heading: "Send us a message",
        fields: [
          { type: "text", label: "Name", required: true },
          { type: "email", label: "Email", required: true },
          { type: "tel", label: "Phone", required: false },
          { type: "textarea", label: "Message", required: true },
        ],
        submitLabel: "Send",
        successMessage: "Thank you! We'll be in touch shortly.",
      },
    },
  ],
};
