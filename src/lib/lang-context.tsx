import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lang } from './i18n';
import { t } from './i18n';

type LangContextType = {
    lang: Lang;
    setLang: (l: Lang) => void;
    T: typeof t.en;
};

const LangContext = createContext<LangContextType>({
    lang: 'en',
    setLang: () => {},
    T: t.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>('en');
    return (
          <LangContext.Provider value={{ lang, setLang, T: t[lang] }}>
            {children}
          </LangContext.Provider>
        );
}

export function useLang() {
    return useContext(LangContext);
}
