/**
 * Светлая и тёмная тема интерфейса конструктора.
 *
 * ЧТО КРАСИТ. Портал, админку, экран входа, полосу демонстрации — то есть
 * оформление самого продукта. Собранный сайт сюда НЕ входит: у него своя
 * палитра, которую владелец выбрал на экране «Дизайн сайта», и переключатель
 * гостя не вправе её ломать.
 *
 * КАК УСТРОЕНО. Значение лежит в cookie и читается на сервере, поэтому нужный
 * вариант приезжает уже в первом HTML — без мигания белым и без localStorage
 * (аудит безопасности отмечал его отсутствие как плюс; так и оставляем).
 * Атрибут `data-theme` на <html> — это контракт HeroUI v3: его тёмная тема
 * включается либо классом `.dark`, либо `[data-theme="dark"]`.
 *
 * Режим «Системная» сервер разрешить не может — он не знает настройку ОС.
 * Для него сервер не печатает атрибут вовсе, а крошечный скрипт в <head>
 * (THEME_SCRIPT) выставляет его до первой отрисовки.
 */

export const THEME_COOKIE = "sb_theme";

export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const DEFAULT_THEME: ThemeMode = "system";

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && (THEME_MODES as readonly string[]).includes(value);
}

/**
 * Скрипт для <head>. Выполняется синхронно до отрисовки тела, поэтому смены
 * цвета на глазах у посетителя не происходит.
 *
 * Работает только когда сервер атрибут не напечатал — то есть в режиме
 * «Системная». Заодно подписывается на смену системной настройки, чтобы
 * переключение темы в ОС применялось без перезагрузки страницы.
 */
export const THEME_SCRIPT = `(function(){try{
var r=document.documentElement;
if(r.getAttribute('data-theme'))return;
var m=window.matchMedia('(prefers-color-scheme: dark)');
var a=function(){r.setAttribute('data-theme',m.matches?'dark':'light')};
a();m.addEventListener('change',a);
}catch(e){}})();`;
