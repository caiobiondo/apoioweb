import React, { Component } from 'react';

import Magazines from './organisms/Magazines';

export default class MagazinesWrapper extends Component {
  render() {
    return <Magazines type="natura" region="6" gv={6} />;
  }
}
