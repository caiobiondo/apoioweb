import React from 'react';
import { Avatar } from 'natura-ui';

const CustomerAvatar = ({ name, avatar, ...props }) => {
  let nameInitials;

  if (name) {
    nameInitials = name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);

    nameInitials = nameInitials ? nameInitials.join('') : '';
  } else {
    nameInitials = '';
  }

  return <Avatar {...props}>{avatar ? <img src={avatar} alt={name} /> : nameInitials}</Avatar>;
};

CustomerAvatar.defaultProps = {
  name: '',
  avatar: '',
};

export default CustomerAvatar;
