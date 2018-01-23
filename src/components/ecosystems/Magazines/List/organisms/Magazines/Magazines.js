import React, { Component } from 'react';
import { MagazinesQuery, MagazinesQueryOptions } from './Magazines.data';
import { graphql } from 'react-apollo';
import { Loading } from 'natura-ui';

import CurrentMagazine from './molecules/CurrentMagazine';
import PreviousMagazines from './molecules/PreviousMagazines';

export class Magazines extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <Loading background="transparent" />;
    }

    return (
      <div>
        <CurrentMagazine magazine={data.magazines[0]} />
        <PreviousMagazines magazines={data.magazines.slice(1, data.magazines.length)} />
      </div>
    );
  }
}

export default graphql(MagazinesQuery, MagazinesQueryOptions)(Magazines);
