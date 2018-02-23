import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import TrainingCourse from 'components/ecosystems/Training/Courses/List/molecules/TrainingCourse';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { TrainingCoursesQuery, TrainingCoursesQueryOptions } from './TrainingCoursesList.data';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';
import { graphql, compose } from 'react-apollo';

import { translate } from 'locale';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { RobotoRegular } from 'styles/typography';

import InfiniteScroll from 'react-infinite-scroller';

import {
  TrainingCoursesListWrapper,
  List,
  LoadingWrapper,
  fullContainer,
} from './TrainingCoursesList.styles';

export class TrainingCoursesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMoreItems: true,
      courses: [],
    };
  }

  componentWillReceiveProps({ loading, courses }) {
    this.notifyLoadFinish(loading, courses);
    this.checkIfHasMoreItems(loading, courses);

    this.setState({ courses });
  }

  notifyLoadFinish = (loading, courses) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, courses), this.isLoading(loading, courses));
    }
  };

  checkIfHasMoreItems = (loading, courses) => {
    if (this.props.loading === loading || !courses) {
      return;
    }

    const hasMoreItems =
      (courses && !this.state.courses) || courses.length !== this.state.courses.length;
    this.setState({ hasMoreItems });
  };

  isLoading = (loading, courses) => {
    return loading && !courses;
  };

  isEmpty = (loading, courses) => {
    return !loading && (!courses || courses.length === 0);
  };

  handleMenuItemClick = (event, child) => {
    this.props
      .mutate({
        variables: {
          input: { action: child.props.value },
          sellerId: this.props.user.codigo,
          courseId: child.props.course.id,
        },
      })
      .then(response => {
        if (response.error) {
          // Handle error
          return;
        }

        if (!response.data.updateCourse.status) {
          // Handle not updated
          return;
        }

        // Handle update success
        const courses = this.state.courses.map(c => {
          const course = { ...c };

          if (course.id === child.props.course.id) {
            if (course.isfavorite === 'true') {
              course.isfavorite = 'false';
            } else {
              course.isfavorite = 'true';
            }
          }

          return course;
        });

        this.setState({ courses });

        return;
      })
      .catch(err => {
        console.log('err', err);
        // Handle error
      });
  };

  renderMenuItems = course => {
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
            course={course}
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
          course={course}
        />
      </IconMenu>
    );
  };

  render() {
    if (!this.state.courses && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!this.state.courses || !this.state.courses.length) {
      return (
        <Paper style={fullContainer}>
          <PageMenu />
          <EmptyList
            icon="ico_list_add"
            titleId="coursesEmptyList"
            descriptionId="coursesEmptyListDescription"
          />
        </Paper>
      );
    }

    return (
      <TrainingCoursesListWrapper>
        <PageMenu />
        <InfiniteScroll
          loadMore={this.props.fetchMore}
          hasMore={this.props.hasMultiplePages && this.state.hasMoreItems}
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
          }
        >
          <List>
            {this.state.courses.map((course, index) => (
              <TrainingCourse key={index} course={course}>
                {this.renderMenuItems(course)}
              </TrainingCourse>
            ))}
          </List>
        </InfiniteScroll>
      </TrainingCoursesListWrapper>
    );
  }
}

export default compose(
  graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(TrainingCoursesList);
