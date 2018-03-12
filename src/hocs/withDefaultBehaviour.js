import withAuthentication from './withAuthentication';
import withUserData from './withUserData';
import withAcl from './withAcl';
import withErrorHandler from './withErrorHandler';
import withLoadable from './withLoadable';

/* eslint-disable prettier/prettier */

export default (Component, resource) => {
  return withAuthentication(
    withUserData(withAcl(withErrorHandler(withLoadable(Component)), resource)),
  );
};
