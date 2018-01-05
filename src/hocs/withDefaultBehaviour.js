import withAuthentication from './withAuthentication';
import withUserData from './withUserData';
import withAuthErrorHandler from './withAuthErrorHandler';
import withErrorHandler from './withErrorHandler';

export default (Component, resource) => {
  return withAuthentication(withUserData(withAuthErrorHandler(withErrorHandler(Component))));
};
