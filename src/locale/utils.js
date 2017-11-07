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

export function formatDate(isoDate, intl) {
  return intl.formatDate(new Date(isoDate), { day: 'numeric', month: 'numeric', year: 'numeric' });
}

export function formatCurrency(price, intl) {
  return intl.formatNumber(price, { currency: 'BRL', style: 'currency' });
}
