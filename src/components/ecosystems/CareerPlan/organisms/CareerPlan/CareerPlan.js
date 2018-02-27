import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

export class MyScore extends Component {
  render() {
    return <div>teste</div>;
  }
}

export const MyScoreWithIntl = injectIntl(MyScore);

export default MyScoreWithIntl;
