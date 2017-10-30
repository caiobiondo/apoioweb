import 'url-search-params-polyfill';
import { addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';

const currentLocale = () => {
  const params = new URLSearchParams(document.location.search.substring(1));
  return params.get('lang') || 'pt-BR';
};

addLocaleData([...en, ...pt]);

export const locale = currentLocale();
export const messages = require('./messages').default;
export const flattenMessages = require('./utils').flattenMessages;
