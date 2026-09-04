export interface DictionarySeedEntry {
  key: string;
  group: "nav" | "buttons" | "forms" | "footer" | "messages";
  valueRu: string;
  valueUz: string;
  valueEn: string;
}

export const DICTIONARY_SEED: DictionarySeedEntry[] = [
  // nav
  { key: "nav.home", group: "nav", valueRu: "Главная", valueUz: "Bosh sahifa", valueEn: "Home" },
  { key: "nav.about", group: "nav", valueRu: "О нас", valueUz: "Biz haqimizda", valueEn: "About" },
  { key: "nav.services", group: "nav", valueRu: "Услуги", valueUz: "Xizmatlar", valueEn: "Services" },
  { key: "nav.contact", group: "nav", valueRu: "Контакты", valueUz: "Aloqa", valueEn: "Contact" },
  { key: "nav.news", group: "nav", valueRu: "Новости", valueUz: "Yangiliklar", valueEn: "News" },
  { key: "nav.pricing", group: "nav", valueRu: "Цены", valueUz: "Narxlar", valueEn: "Pricing" },
  { key: "nav.team", group: "nav", valueRu: "Команда", valueUz: "Jamoa", valueEn: "Team" },

  // buttons
  { key: "button.readMore", group: "buttons", valueRu: "Читать далее", valueUz: "Batafsil", valueEn: "Read more" },
  { key: "button.learnMore", group: "buttons", valueRu: "Узнать больше", valueUz: "Ko'proq bilish", valueEn: "Learn more" },
  { key: "button.send", group: "buttons", valueRu: "Отправить", valueUz: "Yuborish", valueEn: "Send" },
  { key: "button.subscribe", group: "buttons", valueRu: "Подписаться", valueUz: "Obuna bo'lish", valueEn: "Subscribe" },
  { key: "button.viewAll", group: "buttons", valueRu: "Смотреть все", valueUz: "Barchasini ko'rish", valueEn: "View all" },
  { key: "button.getStarted", group: "buttons", valueRu: "Начать", valueUz: "Boshlash", valueEn: "Get started" },
  { key: "button.bookTable", group: "buttons", valueRu: "Забронировать столик", valueUz: "Stol band qilish", valueEn: "Book a table" },
  { key: "button.orderNow", group: "buttons", valueRu: "Заказать сейчас", valueUz: "Hozir buyurtma bering", valueEn: "Order now" },

  // forms
  { key: "form.name", group: "forms", valueRu: "Имя", valueUz: "Ism", valueEn: "Name" },
  { key: "form.email", group: "forms", valueRu: "Email", valueUz: "Elektron pochta", valueEn: "Email" },
  { key: "form.phone", group: "forms", valueRu: "Телефон", valueUz: "Telefon", valueEn: "Phone" },
  { key: "form.message", group: "forms", valueRu: "Сообщение", valueUz: "Xabar", valueEn: "Message" },
  { key: "form.required", group: "forms", valueRu: "Обязательное поле", valueUz: "Majburiy maydon", valueEn: "Required field" },
  { key: "form.success", group: "forms", valueRu: "Спасибо! Мы скоро свяжемся с вами.", valueUz: "Rahmat! Tez orada siz bilan bog'lanamiz.", valueEn: "Thank you! We'll be in touch soon." },
  { key: "form.error", group: "forms", valueRu: "Что-то пошло не так. Попробуйте ещё раз.", valueUz: "Nimadir xato ketdi. Qaytadan urinib ko'ring.", valueEn: "Something went wrong. Please try again." },

  // footer
  { key: "footer.rights", group: "footer", valueRu: "Все права защищены.", valueUz: "Barcha huquqlar himoyalangan.", valueEn: "All rights reserved." },
  { key: "footer.followUs", group: "footer", valueRu: "Мы в соцсетях", valueUz: "Ijtimoiy tarmoqlarda", valueEn: "Follow us" },

  // messages
  { key: "messages.notFoundTitle", group: "messages", valueRu: "Страница не найдена", valueUz: "Sahifa topilmadi", valueEn: "Page not found" },
  { key: "messages.notFoundBody", group: "messages", valueRu: "Возможно, она была перемещена или удалена.", valueUz: "Ehtimol, u ko'chirilgan yoki o'chirilgan.", valueEn: "It may have been moved or removed." },
  { key: "messages.emptyNews", group: "messages", valueRu: "Пока нет опубликованных материалов.", valueUz: "Hozircha nashr qilingan material yo'q.", valueEn: "No published articles yet." },
  { key: "pricing.recommended", group: "messages", valueRu: "Рекомендуем", valueUz: "Tavsiya etamiz", valueEn: "Recommended" },
];
