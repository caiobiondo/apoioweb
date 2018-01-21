import React from 'react';

import Magazines from './organisms/Magazines';

import {
  getCommercialRegionIdFromUser,
  getSalesManagementIdFromUser,
  getCycleIdFromUser,
} from 'utils/getUserParams';

const MagazinesWrapper = ({ user, match }) => {
  const type = match.params.type;
  const region = getCommercialRegionIdFromUser(user);
  const gv = getSalesManagementIdFromUser(user);
  const cycle = getCycleIdFromUser(user);

  return <Magazines type={type} region={region} gv={gv} cycle={cycle} />;
};

export default MagazinesWrapper;
