import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from './getUserParams';

const user = {
  estrutura: {
    codigo: 1035,
    codigoTipo: 4,
    ciclo: [
      {
        numero: 201711,
      },
    ],
  },
};

describe('getCycleIdFromUser', () => {
  it('should return cycle id', () => {
    const cycleId = getCycleIdFromUser(user);

    expect(cycleId).toEqual('201711');
  });

  it('should return null', () => {
    const cycleId = getCycleIdFromUser(null);

    expect(cycleId).toEqual(null);
  });

  it('should return null', () => {
    const cycleId = getCycleIdFromUser({
      estrutura: null,
    });

    expect(cycleId).toEqual(null);
  });

  it('should return null', () => {
    const cycleId = getCycleIdFromUser({
      estrutura: {
        ciclo: null,
      },
    });

    expect(cycleId).toEqual(null);
  });

  it('should return null', () => {
    const cycleId = getCycleIdFromUser({
      estrutura: {
        ciclo: [
          {
            numero: null,
          },
        ],
      },
    });

    expect(cycleId).toEqual(null);
  });
});

describe('getCommercialStructureIdFromUser', () => {
  it('should return commercial structure id', () => {
    const commercialStructureId = getCommercialStructureIdFromUser(user);

    expect(commercialStructureId).toEqual(1035);
  });

  it('should return null', () => {
    const commercialStructureId = getCommercialStructureIdFromUser(null);

    expect(commercialStructureId).toEqual(null);
  });

  it('should return null', () => {
    const commercialStructureId = getCommercialStructureIdFromUser({
      estrutura: null,
    });

    expect(commercialStructureId).toEqual(null);
  });

  it('should return null', () => {
    const commercialStructureId = getCommercialStructureIdFromUser({
      estrutura: {
        codigo: null,
      },
    });

    expect(commercialStructureId).toEqual(null);
  });
});

describe('getCommercialStructureTypeIdFromUser', () => {
  it('should return commercial structure type id', () => {
    const commercialStructureTypeId = getCommercialStructureTypeIdFromUser(user);

    expect(commercialStructureTypeId).toEqual(4);
  });

  it('should return null', () => {
    const commercialStructureTypeId = getCommercialStructureTypeIdFromUser(null);

    expect(commercialStructureTypeId).toEqual(null);
  });

  it('should return null', () => {
    const commercialStructureTypeId = getCommercialStructureTypeIdFromUser({
      estrutura: null,
    });

    expect(commercialStructureTypeId).toEqual(null);
  });

  it('should return null', () => {
    const commercialStructureTypeId = getCommercialStructureTypeIdFromUser({
      estrutura: {
        codigoTipo: null,
      },
    });

    expect(commercialStructureTypeId).toEqual(null);
  });
});
