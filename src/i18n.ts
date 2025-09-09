import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "mr"],
    load: "languageOnly", // 👈 ensures "hi-IN" → "hi"
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "cookie", "navigator"],
      caches: ["cookie"], // or [] if you don’t want caching
    },
  });

export default i18n;
