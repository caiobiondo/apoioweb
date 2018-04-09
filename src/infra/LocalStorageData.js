export default class LocalStorageData {
  constructor() {
    const keys = {
      cycle: 'cycle',
      businessModel: 'businessModelNaturaWeb',
      country: 'countryNaturaWeb',
    };

    Object.keys(keys).forEach(key => {
      this[key] = localStorage.getItem(keys[key]);
    });
  }
}
