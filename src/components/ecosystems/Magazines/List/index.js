import React from 'react';

import Magazines from './organisms/Magazines';

import { getCommercialRegionIdFromUser, getSalesManagementIdFromUser } from 'utils/getUserParams';

const MagazinesWrapper = ({ user, match }) => {
  const region = getCommercialRegionIdFromUser(user);
  const gv = getSalesManagementIdFromUser(user);

  return <Magazines type={match.params.type} region={region} gv={gv} />;
};

export default MagazinesWrapper;
