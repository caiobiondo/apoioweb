import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import { translate } from 'locale';
import { RobotoRegular } from 'styles/typography';
import { TrainingCourseUpdateMutation } from '../../data/TrainingCourseUpdate.data';
import { graphql } from 'react-apollo';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class TrainingCourseMenuItems extends Component {
  handleMenuItemClick = (event, child) => {
    this.props
      .mutate({
        variables: {
          input: { action: child.props.value },
          sellerId: this.props.user.codigo,
          courseId: this.props.course.id,
        },
      })
      .then(response => {
        // Handle success
      });
  };

  render() {
    const { course } = this.props;
    const style = { fontFamily: RobotoRegular };

    if (course.isfavorite === 'true') {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onItemTouchTap={this.handleMenuItemClick}
        >
          <MenuItem
            style={style}
            primaryText={translate('trainingRemoveCourseMyList')}
            value="unfavorite"
          />
        </IconMenu>
      );
    }

    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onItemTouchTap={this.handleMenuItemClick}
      >
        <MenuItem
          style={style}
          primaryText={translate('trainingAddCourseMyList')}
          value="favorite"
        />
      </IconMenu>
    );
  }
}

TrainingCourseMenuItems.propTypes = {
  user: PropTypes.object,
  course: PropTypes.object,
};

export default graphql(TrainingCourseUpdateMutation)(TrainingCourseMenuItems);
