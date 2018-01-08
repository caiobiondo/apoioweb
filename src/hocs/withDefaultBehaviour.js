import withAuthentication from './withAuthentication';
import withUserData from './withUserData';
import withAcl from './withAcl';
import withAuthErrorHandler from './withAuthErrorHandler';
import withErrorHandler from './withErrorHandler';

export default (Component, resource) => {
  return withAuthentication(
    withUserData(withAcl(withAuthErrorHandler(withErrorHandler(Component)), resource)),
  );
};
