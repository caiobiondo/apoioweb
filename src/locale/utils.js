import { translate } from 'locale';

export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});
}

export function formatDate(isoDate, intl, defaultValue = null) {
  if (!isoDate) return defaultValue;

  return intl.formatDate(new Date(isoDate), { day: 'numeric', month: 'numeric', year: 'numeric' });
}

export function formatTime(isoDate, intl, defaultValue = null) {
  if (!isoDate) return defaultValue;

  return intl.formatTime(new Date(isoDate));
}

export function formatCurrency(price, intl, defaultValue = null) {
  if (!price) return defaultValue;

  return intl.formatNumber(price, { currency: 'BRL', style: 'currency' });
}

export function translateFormError(fieldTranslationName, errorType) {
  const translatedField = translate(fieldTranslationName);

  return translate(errorType, { field: translatedField });
}
