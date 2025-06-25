import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // 👉 เพิ่มตรงนี้
import resources from "./resources";

i18n
  .use(LanguageDetector) // 👉 ใช้ detector ก่อน
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "th",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // 👉 ระบุว่าจะใช้ localStorage เพื่อจดจำภาษา
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
