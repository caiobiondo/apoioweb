import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
  getCommercialRegionIdFromUser,
  getSalesManagementIdFromUser,
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
    regiaoEstrategica: { codigo: 2 },
    gerenciaVenda: { codigo: 185 },
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

describe('getCommercialRegionIdFromUser', () => {
  it('should return commercial region id', () => {
    const commercialRegionId = getCommercialRegionIdFromUser(user);

    expect(commercialRegionId).toEqual(2);
  });

  it('should return null', () => {
    const commercialRegionId = getCommercialRegionIdFromUser(null);

    expect(commercialRegionId).toEqual(null);
  });

  it('should return null', () => {
    const commercialRegionId = getCommercialRegionIdFromUser({
      estrutura: null,
    });

    expect(commercialRegionId).toEqual(null);
  });

  it('should return null', () => {
    const commercialRegionId = getCommercialRegionIdFromUser({
      estrutura: {
        regiaoEstrategica: null,
      },
    });

    expect(commercialRegionId).toEqual(null);
  });

  it('should return null', () => {
    const commercialRegionId = getCommercialRegionIdFromUser({
      estrutura: {
        regiaoEstrategica: {
          codigo: null,
        },
      },
    });

    expect(commercialRegionId).toEqual(null);
  });
});

describe('getSalesManagementIdFromUser', () => {
  it('should return sales management id', () => {
    const salesManagementId = getSalesManagementIdFromUser(user);

    expect(salesManagementId).toEqual(185);
  });

  it('should return null', () => {
    const salesManagementId = getSalesManagementIdFromUser(null);

    expect(salesManagementId).toEqual(null);
  });

  it('should return null', () => {
    const salesManagementId = getSalesManagementIdFromUser({
      estrutura: null,
    });

    expect(salesManagementId).toEqual(null);
  });

  it('should return null', () => {
    const salesManagementId = getSalesManagementIdFromUser({
      estrutura: {
        gerenciaVenda: null,
      },
    });

    expect(salesManagementId).toEqual(null);
  });

  it('should return null', () => {
    const salesManagementId = getSalesManagementIdFromUser({
      estrutura: {
        gerenciaVenda: {
          codigo: null,
        },
      },
    });

    expect(salesManagementId).toEqual(null);
  });
});
