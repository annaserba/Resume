import { useEffect, useState } from "react";
import { getTranslationsSync } from "../utils/contentLoader";

function useTranslation(language: string) {
    const [t, setT] = useState<Record<string, string>>({});
    
    useEffect(() => {
        const loadTranslation = () => {
          try {
            const translations = getTranslationsSync(language);
            setT(translations);
          } catch (err) {
            console.error(`Error loading translation: ${err}`);
            // Fallback к русскому языку
            const fallbackTranslations = getTranslationsSync('ru');
            setT(fallbackTranslations);
          }
        };
    
        loadTranslation();
      }, [language]);
    return { t, setT };
}

export default useTranslation;