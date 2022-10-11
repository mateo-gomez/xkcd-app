import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "../translations/es.json";
import en from "../translations/en.json";

const I18NContext = createContext();

const languages = { es, en };

function textTemplate(text, ...rest) {
  let template = text;
  console.log({ rest });
  rest.forEach((element, i) => {
    const order = i + 1;
    console.log({ order, i, element });
    template = template.replace(`{${order}}`, element);
  });

  return template;
}

function pluralization(text, count) {
  const plurlarOptions = text.split("|");

  if (plurlarOptions.length === 1) return text;

  return parseInt(count) === 1 ? plurlarOptions[0] : plurlarOptions[1];
}

export function I18NProvider({ children }) {
  const { locale } = useRouter();

  const trans = useCallback(
    (key, options, ...rest) => {
      let translation = languages[locale][key];

      if (options) {
        const { count } = options;

        translation = pluralization(translation, count);
      }

      if (rest.length === 0) return translation;

      return textTemplate(translation, ...rest);
    },
    [locale]
  );

  return (
    <I18NContext.Provider value={{ trans }}>{children}</I18NContext.Provider>
  );
}

export function useI18N() {
  const context = useContext(I18NContext);

  // Buena prácitca por Kent C. Dodds
  // Se muestra error para evitar que se use el custom hook sin tener el provider

  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider");
  }

  return context;
}
