import React, { Component } from 'react';
import { MagazinePagesQuery, MagazinePagesQueryOptions } from './MagazinePages.data';
import { graphql } from 'react-apollo';
import { Loading } from 'natura-ui';

import MagazinePagesViewer from './molecules/MagazinePagesViewer';

export class MagazinePages extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <Loading background="transparent" />;
    }

    return <MagazinePagesViewer magazine={data.magazine} />;
  }
}

export default graphql(MagazinePagesQuery, MagazinePagesQueryOptions)(MagazinePages);
