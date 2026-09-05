import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Скрывает круглый индикатор Next.js Dev Tools поверх страниц в режиме
  // разработки. Ошибки сборки и рантайма по-прежнему показываются оверлеем.
  devIndicators: false,

  // Браузеры сами запрашивают /favicon.ico, даже когда в <head> объявлена
  // другая иконка. Своего .ico у проекта нет — иконка живёт в src/app/icon.svg,
  // поэтому запрос переписываем на неё, иначе каждая загрузка страницы даёт 404.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.svg" }];
  },
};

export default nextConfig;
