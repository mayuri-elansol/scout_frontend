"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/app/store/slices/languageSlice";
import i18n from "@/i18n";

const supportedLanguages = new Set<string>(["en", "hi", "mr"]);

export default function LanguageInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const browserLang = i18n.language;

    const selectedLang = supportedLanguages.has(browserLang)
      ? browserLang
      : "en";

    i18n.changeLanguage(selectedLang);
    dispatch(setLanguage(selectedLang));
  }, [dispatch]);

  return null;
}
