import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestAvailableLanguage } from 'react-native-localize';
import resources from './src/i18n/languageResources';

const fallback = { languageTag: 'en', isRTL: false };

const { languageTag } =
  findBestAvailableLanguage(Object.keys(resources)) || fallback;

const languageCode = languageTag.split('-')[0];

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: ['en', 'ko'],
});

export { i18n, languageCode };
