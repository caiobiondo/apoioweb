import authLink from './authLink';

jest.mock('apollo-link-error');

describe('authLink', () => {
  let mockLocalStorageClear, mockLocationAssign;
  beforeEach(() => {
    mockLocalStorageClear = jest.fn();
    mockLocationAssign = jest.fn();

    global.localStorage = {
      clear: mockLocalStorageClear,
    };

    global.location.assign = mockLocationAssign;
  });

  test('redirects to login and clears local storage when the response has a 401 error', () => {
    const response = {
      errors: [
        null,
        {},
        { message: 'invalid{}JSON' },
        { message: '{ "error": { "status": 500 } }' },
        { message: '{ "error": { "status": 401 } }' },
      ],
    };

    authLink({ response });

    expect(mockLocalStorageClear.mock.calls.length).toEqual(1);
    expect(mockLocationAssign.mock.calls.length).toEqual(1);
  });

  test('redirects to login and clears local storage when the response has a #REDIRECT_TO_LOGIN# message', () => {
    const response = {
      errors: [
        null,
        {},
        { message: 'invalid{}JSON' },
        { message: '{ "error": { "status": 500 } }' },
        { message: '#REDIRECT_TO_LOGIN#' },
      ],
    };

    authLink({ response });

    expect(mockLocalStorageClear.mock.calls.length).toEqual(1);
    expect(mockLocationAssign.mock.calls.length).toEqual(1);
  });

  test('does not redirects when the response is not a 401 error', () => {
    const response = {
      errors: [
        null,
        {},
        { message: 'invalid{}JSON' },
        { message: '{ "error": { "status": 500 } }' },
      ],
    };

    authLink({ response });

    expect(mockLocalStorageClear.mock.calls.length).toEqual(0);
    expect(mockLocationAssign.mock.calls.length).toEqual(0);
  });

  test('does not redirects when the response does not have any errors', () => {
    const response = {
      errors: [],
    };

    authLink(response);

    response.errors = null;

    authLink({ response });

    expect(mockLocalStorageClear.mock.calls.length).toEqual(0);
    expect(mockLocationAssign.mock.calls.length).toEqual(0);
  });
});
