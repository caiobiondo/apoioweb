import withAuthentication from './withAuthentication';
import withUserData from './withUserData';
import withAcl from './withAcl';
import withErrorHandler from './withErrorHandler';

export default (Component, resource) => {
  return withAuthentication(withUserData(withAcl(withErrorHandler(Component), resource)));
};
