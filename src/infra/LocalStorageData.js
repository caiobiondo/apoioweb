export default class LocalStorageData {
  constructor() {
    const keys = {
      cycle: 'cycleNaturaWeb',
      businessModel: 'businessModelNaturaWeb',
      country: 'countryNaturaWeb',
    };

    Object.keys(keys).forEach(key => {
      this[key] = localStorage.getItem(keys[key]);
    });
  }
}
