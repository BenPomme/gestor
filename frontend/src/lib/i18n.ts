import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../../public/locales/en/common.json';
import esCommon from '../../public/locales/es/common.json';
import caCommon from '../../public/locales/ca/common.json';

export const defaultNS = 'common';
export const resources = {
  en: { common: enCommon },
  es: { common: esCommon },
  ca: { common: caCommon },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
