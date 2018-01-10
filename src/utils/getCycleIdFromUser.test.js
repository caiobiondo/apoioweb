import getCycleIdFromUser from './getCycleIdFromUser';

const user = {
  estrutura: {
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
