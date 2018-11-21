import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultimediaItem from 'components/ecosystems/Training/molecules/MultimediaItem';

import { List } from './MultimediaItems.styles';

export default class MultimediaItems extends Component {
  render() {
    if (!this.props.courses || !this.props.courses.length) {
      return null;
    }

    return (
      <List>
        {this.props.courses.map((course, index) => (
          <MultimediaItem key={index} course={course}>
            {this.props.renderMenuItems(course)}
          </MultimediaItem>
        ))}
      </List>
    );
  }
}

MultimediaItems.propTypes = {
  renderMenuItems: PropTypes.func,
  multimedias: PropTypes.array,
};
