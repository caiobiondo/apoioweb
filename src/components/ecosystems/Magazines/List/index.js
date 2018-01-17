import React, { Component } from 'react';

import Magazines from './organisms/Magazines';

export default class MagazinesWrapper extends Component {
  render() {
    const { params } = this.props.match;
    return <Magazines type={params.type} region="6" gv={185} />;
  }
}
