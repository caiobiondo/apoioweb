const TYPENAME_KEY = '__typename';

const omitDeepArrayWalk = (array, key) => {
  return array.map(value => {
    if (Array.isArray(value)) {
      return omitDeepArrayWalk(value, key);
    }

    if (typeof value === 'object') {
      return omitDeep(value, key);
    }

    return value;
  });
};

export const omitDeep = (obj, keyToRemove) => {
  const keys = Object.keys(obj);

  return keys.reduce((filtered, key) => {
    if (key === keyToRemove) {
      return filtered;
    }

    const value = obj[key];

    if (Array.isArray(value)) {
      filtered[key] = omitDeepArrayWalk(value, keyToRemove);
      return filtered;
    }

    if (value !== null && typeof value === 'object') {
      filtered[key] = omitDeep(value, keyToRemove);
      return filtered;
    }

    filtered[key] = value;
    return filtered;
  }, {});
};

export default obj => omitDeep(obj, TYPENAME_KEY);
