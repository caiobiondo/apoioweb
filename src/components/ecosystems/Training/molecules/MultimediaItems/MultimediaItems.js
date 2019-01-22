import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultimediaItem from 'components/ecosystems/Training/molecules/MultimediaItem';

import { List } from './MultimediaItems.styles';

export default class MultimediaItems extends Component {
  render() {
    if (!this.props.multimedias || !this.props.multimedias.length) {
      return null;
    }

    return (
      <List>
        {this.props.multimedias.map((multimedia, index) => (
          <MultimediaItem key={index} multimedia={multimedia} />
        ))}
      </List>
    );
  }
}

MultimediaItems.propTypes = {
  multimedias: PropTypes.array,
};
