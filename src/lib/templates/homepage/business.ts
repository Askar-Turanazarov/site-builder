import type { PageTemplate } from "../types";

export const businessHomepage: PageTemplate = {
  key: "homepage-business",
  labelRu: "Бизнес / Корпоративный",
  labelUz: "Biznes / Korporativ",
  labelEn: "Business / Corporate",
  titleRu: "Главная",
  titleUz: "Bosh sahifa",
  titleEn: "Home",

  blocksRu: [
    {
      id: "hero",
      type: "hero",
      data: {
        heading: "Помогаем бизнесу расти быстрее",
        subheading:
          "Консалтинг по стратегии, операциям и цифровой трансформации — для компаний, готовых к следующему этапу",
        imageMediaId: null,
        ctaLabel: "Обсудить проект",
        ctaLink: "/contact",
        variant: "split",
        overlayOpacity: 0.35,
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "180+", label: "реализованных проектов" },
          { value: "12 лет", label: "на рынке консалтинга" },
          { value: "94%", label: "клиентов остаются с нами" },
          { value: "27", label: "стран, где мы работали" },
        ],
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Что мы делаем",
        items: [
          { icon: "chart", title: "Стратегия и рост", body: "Разрабатываем стратегию, которая опирается на данные, а не на догадки" },
          { icon: "shield", title: "Операционная эффективность", body: "Находим узкие места в процессах и убираем их без потери качества" },
          { icon: "rocket", title: "Цифровая трансформация", body: "Внедряем инструменты и меняем подходы так, чтобы команда реально их использовала" },
        ],
        columns: 3,
      },
    },
    {
      id: "imagetext",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "15 лет помогаем компаниям принимать решения увереннее",
        body: "Мы начинали с небольших локальных проектов, а сегодня работаем с командами по всему региону. Наш подход — глубокое погружение в бизнес клиента, а не типовые презентации.",
        imageSide: "right",
        ctaLabel: "О компании",
        ctaLink: "/about",
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Что говорят клиенты",
        items: [
          { quote: "Команда разобралась в нашей специфике за две недели — быстрее, чем мы ожидали. Решения оказались практичными, а не теоретическими.", authorName: "Дмитрий Волков", authorRole: "Операционный директор, логистическая компания", avatarMediaId: null },
          { quote: "После внедрения новых процессов время обработки заказов сократилось почти вдвое. Результат виден в цифрах, а не только на бумаге.", authorName: "Мария Соколова", authorRole: "CEO, розничная сеть", avatarMediaId: null },
        ],
      },
    },
    {
      id: "logos",
      type: "logosStrip",
      data: {
        heading: "Нам доверяют",
        logos: [],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Готовы обсудить вашу задачу?",
        body: "Расскажите, с чем вы работаете сейчас — мы предложим конкретные шаги уже на первой встрече",
        buttonLabel: "Написать нам",
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
        heading: "Biznesingizni tezroq o'stirishga yordam beramiz",
        subheading:
          "Strategiya, operatsion boshqaruv va raqamli transformatsiya bo'yicha konsalting — keyingi bosqichga tayyor kompaniyalar uchun",
        imageMediaId: null,
        ctaLabel: "Loyihani muhokama qilish",
        ctaLink: "/contact",
        variant: "split",
        overlayOpacity: 0.35,
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "180+", label: "amalga oshirilgan loyihalar" },
          { value: "12 yil", label: "konsalting bozorida" },
          { value: "94%", label: "mijozlar biz bilan qoladi" },
          { value: "27", label: "ishlagan davlatlarimiz" },
        ],
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "Biz nima qilamiz",
        items: [
          { icon: "chart", title: "Strategiya va o'sish", body: "Taxminlarga emas, ma'lumotlarga asoslangan strategiya ishlab chiqamiz" },
          { icon: "shield", title: "Operatsion samaradorlik", body: "Jarayonlardagi tor joylarni topib, sifatni yo'qotmasdan bartaraf etamiz" },
          { icon: "rocket", title: "Raqamli transformatsiya", body: "Vositalarni joriy etamiz va jamoa haqiqatan foydalanadigan tarzda yondashuvlarni o'zgartiramiz" },
        ],
        columns: 3,
      },
    },
    {
      id: "imagetext",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "15 yildan beri kompaniyalarga ishonchliroq qaror qabul qilishga yordam beramiz",
        body: "Biz kichik mahalliy loyihalardan boshlagan edik, bugun esa butun mintaqa bo'ylab jamoalar bilan ishlaymiz. Bizning yondashuvimiz — mijoz biznesiga chuqur kirish, andoza taqdimotlar emas.",
        imageSide: "right",
        ctaLabel: "Kompaniya haqida",
        ctaLink: "/about",
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "Mijozlarimiz fikri",
        items: [
          { quote: "Jamoa bizning ishimiz xususiyatlarini ikki haftada tushunib oldi — kutganimizdan tezroq. Yechimlar nazariy emas, amaliy bo'ldi.", authorName: "Dmitriy Volkov", authorRole: "Operatsion direktor, logistika kompaniyasi", avatarMediaId: null },
          { quote: "Yangi jarayonlarni joriy etgandan so'ng buyurtmalarni qayta ishlash vaqti deyarli ikki barobar qisqardi. Natija raqamlarda ham ko'rinadi.", authorName: "Mariya Sokolova", authorRole: "Bosh direktor, chakana savdo tarmog'i", avatarMediaId: null },
        ],
      },
    },
    {
      id: "logos",
      type: "logosStrip",
      data: {
        heading: "Bizga ishonishadi",
        logos: [],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Vazifangizni muhokama qilishga tayyormisiz?",
        body: "Hozir nima ustida ishlayotganingizni ayting — birinchi uchrashuvdayoq aniq qadamlarni taklif qilamiz",
        buttonLabel: "Bizga yozing",
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
        heading: "We help businesses grow faster",
        subheading:
          "Strategy, operations and digital-transformation consulting for companies ready for their next stage",
        imageMediaId: null,
        ctaLabel: "Discuss a project",
        ctaLink: "/contact",
        variant: "split",
        overlayOpacity: 0.35,
      },
    },
    {
      id: "stats",
      type: "stats",
      data: {
        items: [
          { value: "180+", label: "projects delivered" },
          { value: "12 years", label: "in consulting" },
          { value: "94%", label: "client retention" },
          { value: "27", label: "countries we've worked in" },
        ],
      },
    },
    {
      id: "features",
      type: "featuresGrid",
      data: {
        heading: "What we do",
        items: [
          { icon: "chart", title: "Strategy & growth", body: "We build strategy grounded in data, not guesswork" },
          { icon: "shield", title: "Operational efficiency", body: "We find bottlenecks in your processes and remove them without losing quality" },
          { icon: "rocket", title: "Digital transformation", body: "We implement tools and change ways of working so your team actually uses them" },
        ],
        columns: 3,
      },
    },
    {
      id: "imagetext",
      type: "imageText",
      data: {
        imageMediaId: null,
        heading: "15 years helping companies decide with more confidence",
        body: "We started with small local projects; today we work with teams across the region. Our approach is deep immersion in the client's business, not template presentations.",
        imageSide: "right",
        ctaLabel: "About us",
        ctaLink: "/about",
      },
    },
    {
      id: "testimonials",
      type: "testimonials",
      data: {
        heading: "What clients say",
        items: [
          { quote: "The team understood the specifics of our business within two weeks — faster than we expected. The solutions turned out practical, not theoretical.", authorName: "Dmitry Volkov", authorRole: "COO, logistics company", avatarMediaId: null },
          { quote: "After the new processes went live, order-processing time nearly halved. The result shows up in the numbers, not just on paper.", authorName: "Maria Sokolova", authorRole: "CEO, retail chain", avatarMediaId: null },
        ],
      },
    },
    {
      id: "logos",
      type: "logosStrip",
      data: {
        heading: "Trusted by",
        logos: [],
      },
    },
    {
      id: "cta",
      type: "cta",
      data: {
        heading: "Ready to talk about your challenge?",
        body: "Tell us what you're working on now — we'll suggest concrete next steps at the first meeting",
        buttonLabel: "Get in touch",
        buttonLink: "/contact",
        style: "solid",
      },
    },
  ],
};
