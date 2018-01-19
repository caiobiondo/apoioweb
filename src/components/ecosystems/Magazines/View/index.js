import React from 'react';

import MagazinePages from './organisms/MagazinePages';

import { getCommercialRegionIdFromUser, getSalesManagementIdFromUser } from 'utils/getUserParams';

const MagazinesWrapper = ({ user, match }) => {
  const region = getCommercialRegionIdFromUser(user);
  const gv = getSalesManagementIdFromUser(user);

  return <MagazinePages type="natura" region={region} gv={gv} />;
};

export default MagazinesWrapper;
