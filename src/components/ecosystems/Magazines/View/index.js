import React from 'react';

import MagazinePages from './organisms/MagazinePages';

import { getCommercialRegionIdFromUser, getSalesManagementIdFromUser } from 'utils/getUserParams';

const MagazinesWrapper = ({ user, match }) => {
  const type = match.params.type;
  const region = getCommercialRegionIdFromUser(user);
  const gv = getSalesManagementIdFromUser(user);
  const id = match.params.id;

  return <MagazinePages type={type} region={region} gv={gv} id={id} />;
};

export default MagazinesWrapper;
