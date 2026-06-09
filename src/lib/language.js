const LANG_COOKIE = 'lang';
const DEFAULT_LANG = 'ENG';

export function getLanguageFromCookie() {
  if (typeof document === 'undefined') return DEFAULT_LANG;
  const match = document.cookie.match(new RegExp(`(^| )${LANG_COOKIE}=([^;]+)`));
  return match ? match[2] : DEFAULT_LANG;
}

export function setLanguageCookie(lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
}

export { LANG_COOKIE, DEFAULT_LANG };
