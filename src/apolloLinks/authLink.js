import { onError } from 'apollo-link-error';

const LOGIN_PATH = '/login';

const redirectToLogin = () => {
  localStorage.clear();
  window.location.assign(LOGIN_PATH);
};

const checkForAuthError = error => {
  try {
    if (!error || !error.message) {
      return false;
    }

    const parsedMessage = JSON.parse(error.message);

    if (parsedMessage.error && parsedMessage.error.status === 401) {
      redirectToLogin();
      return true;
    }
  } catch (e) {}

  return false;
};

const checkResponseForAuthError = response => {
  if (!response || !response.errors || !response.errors.length) {
    return;
  }

  response.errors.some(checkForAuthError);
};

export default onError(({ response }) => {
  checkResponseForAuthError(response);
});
