import { useEffect, useState } from "react";
import type Translation from "../locales/types";
import enTranslation from "../locales/en/translation.json";

function useTranslation(language: string) {
    const [t, setT] = useState<Translation>(enTranslation);
      useEffect(() => {
        const fetchTranslation = async () => {
          try {
            const response = await import(`@/locales/${language}/translation.json`);
            const text = await response as Translation;
            setT(text);
          } catch (err) {
            console.error(`Error loading translation: ${err}`);
          }
        };
    
        fetchTranslation();
      }, [language]);
    return { t, setT };
}

export default useTranslation;