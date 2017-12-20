import removeTypename from './removeTypename';

describe('removeTypename', () => {
  it('should remove the typename key from simple objects without mutating the original', () => {
    const object = {
      key: 'value',
      __typename: 'Test',
    };

    expect(removeTypename(object)).toEqual({
      key: 'value',
    });

    expect(object).toEqual({
      key: 'value',
      __typename: 'Test',
    });
  });

  it('should remove the typename key from objects with nested objects without mutating the originals', () => {
    const object = {
      key: 'value',
      nested: {
        __typename: 'Test',
        key: 'Test',
        anotherLevel: {
          value: 'test',
          __typename: 'Test',
        },
      },
      __typename: 'Test',
    };

    expect(removeTypename(object)).toEqual({
      key: 'value',
      nested: {
        key: 'Test',
        anotherLevel: {
          value: 'test',
        },
      },
    });

    expect(object).toEqual({
      key: 'value',
      nested: {
        __typename: 'Test',
        key: 'Test',
        anotherLevel: {
          value: 'test',
          __typename: 'Test',
        },
      },
      __typename: 'Test',
    });
  });

  it('should remove the typename key from objects with array of objects without mutating the originals', () => {
    const object = {
      key: 'value',
      array: [
        {},
        { simple: 'object' },
        {
          simple: 'object',
          __typename: 'Test',
        },
        {
          complex: 'object',
          nested: {
            __typename: 'Test',
            anotherArray: [{}, { value: 'test', __typename: 'Test' }],
          },
        },
      ],
      __typename: 'Test',
    };

    expect(removeTypename(object)).toEqual({
      key: 'value',
      array: [
        {},
        { simple: 'object' },
        { simple: 'object' },
        {
          complex: 'object',
          nested: {
            anotherArray: [{}, { value: 'test' }],
          },
        },
      ],
    });

    expect(object).toEqual({
      key: 'value',
      array: [
        {},
        { simple: 'object' },
        {
          simple: 'object',
          __typename: 'Test',
        },
        {
          complex: 'object',
          nested: {
            __typename: 'Test',
            anotherArray: [{}, { value: 'test', __typename: 'Test' }],
          },
        },
      ],
      __typename: 'Test',
    });
  });

  it('should remove the typename key from array of arrays of objects without mutating the originals', () => {
    const object = {
      array: [
        {},
        null,
        [{ simple: 'object' }],
        {
          simple: 'object',
          __typename: 'Test',
        },
        [
          {
            simple: 'object',
            __typename: 'Test',
          },
          null,
          3,
        ],
        {
          complex: 'object',
          nested: {
            __typename: 'Test',
            anotherArray: [{}, { value: 'test', __typename: 'Test' }],
          },
        },
      ],
      __typename: 'Test',
    };

    expect(removeTypename(object)).toEqual({
      array: [
        {},
        null,
        [{ simple: 'object' }],
        {
          simple: 'object',
        },
        [
          {
            simple: 'object',
          },
          null,
          3,
        ],
        {
          complex: 'object',
          nested: {
            anotherArray: [{}, { value: 'test' }],
          },
        },
      ],
    });

    expect(object).toEqual({
      array: [
        {},
        null,
        [{ simple: 'object' }],
        {
          simple: 'object',
          __typename: 'Test',
        },
        [
          {
            simple: 'object',
            __typename: 'Test',
          },
          null,
          3,
        ],
        {
          complex: 'object',
          nested: {
            __typename: 'Test',
            anotherArray: [{}, { value: 'test', __typename: 'Test' }],
          },
        },
      ],
      __typename: 'Test',
    });
  });
});
