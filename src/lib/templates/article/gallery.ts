import type { PageTemplate } from "../types";

export const galleryArticleTemplate: PageTemplate = {
  key: "article-gallery",
  labelRu: "С галереей",
  labelUz: "Galereya bilan",
  labelEn: "Gallery-led",
  titleRu: "Заголовок статьи",
  titleUz: "Maqola sarlavhasi",
  titleEn: "Article title",

  blocksRu: [
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Подпись к фото 1" },
          { imageMediaId: null, caption: "Подпись к фото 2" },
          { imageMediaId: null, caption: "Подпись к фото 3" },
        ],
        columns: 3,
      },
    },
    {
      id: "body",
      type: "richText",
      data: {
        html: "<p>Расскажите историю, стоящую за фотографиями выше — контекст, детали, то, что не видно на кадрах.</p>",
      },
    },
  ],

  blocksUz: [
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "1-rasm sarlavhasi" },
          { imageMediaId: null, caption: "2-rasm sarlavhasi" },
          { imageMediaId: null, caption: "3-rasm sarlavhasi" },
        ],
        columns: 3,
      },
    },
    {
      id: "body",
      type: "richText",
      data: {
        html: "<p>Yuqoridagi suratlar ortidagi hikoyani so'zlab bering — kontekst, detallar, kadrlarda ko'rinmaydigan narsalar.</p>",
      },
    },
  ],

  blocksEn: [
    {
      id: "gallery",
      type: "gallery",
      data: {
        items: [
          { imageMediaId: null, caption: "Caption for photo 1" },
          { imageMediaId: null, caption: "Caption for photo 2" },
          { imageMediaId: null, caption: "Caption for photo 3" },
        ],
        columns: 3,
      },
    },
    {
      id: "body",
      type: "richText",
      data: {
        html: "<p>Tell the story behind the photos above — context, detail, the things the frame doesn't show.</p>",
      },
    },
  ],
};
