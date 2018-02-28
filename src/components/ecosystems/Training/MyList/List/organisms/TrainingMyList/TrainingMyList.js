import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import TrainingCourse from 'components/ecosystems/Training/Courses/List/molecules/TrainingCourse';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { TrainingCoursesQuery, TrainingCoursesQueryOptions } from './TrainingMyList.data';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';
import { graphql, compose } from 'react-apollo';

import { translate } from 'locale';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RobotoRegular } from 'styles/typography';

import InfiniteScroll from 'react-infinite-scroller';

import { injectIntl, FormattedMessage } from 'react-intl';

import {
  TrainingMyListWrapper,
  List,
  LoadingWrapper,
  fullContainer,
  TrainingCourseFeedbackModalTitle,
  TrainingCourseFeedbackModalAction,
} from './TrainingMyList.styles';

export class TrainingMyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMoreItems: true,
      courses: [],
      feedbackModalOpened: false,
      feedbackModalTitle: '',
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
    const { formatMessage } = this.props.intl;

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
          const message =
            child.props.value === 'favorite'
              ? formatMessage({ id: 'trainingAddCourseError' })
              : formatMessage({ id: 'trainingRemoveCourseError' });
          this.setState({
            feedbackModalOpened: true,
            feedbackModalTitle: message,
          });
          // Handle error
          return;
        }

        if (!response.data.updateCourse.status) {
          const message =
            child.props.value === 'favorite'
              ? formatMessage({ id: 'trainingAddCourseFailure' })
              : formatMessage({ id: 'trainingRemoveCourseFailure' });
          this.setState({
            feedbackModalOpened: true,
            feedbackModalTitle: message,
          });
          // Handle not updated
          return;
        }
        this.props.refetch();
        const message =
          child.props.value === 'favorite'
            ? formatMessage({ id: 'trainingAddCourseSuccess' })
            : formatMessage({ id: 'trainingRemoveCourseSuccess' });

        this.setState({
          feedbackModalOpened: true,
          feedbackModalTitle: message,
        });

        return;
      })
      .catch(err => {
        console.log('err', err);
        // Handle error
        const message =
          child.props.value === 'favorite'
            ? formatMessage({ id: 'trainingAddCourseError' })
            : formatMessage({ id: 'trainingRemoveCourseError' });
        this.setState({
          feedbackModalOpened: true,
          feedbackModalTitle: message,
        });
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

  handleClose = () => {
    this.setState({ feedbackModalOpened: false });
  };

  renderFeedbackModal = () => {
    const { feedbackModalTitle } = this.state;
    const actions = [
      <FlatButton
        label={<FormattedMessage id="ok" />}
        primary={true}
        labelStyle={TrainingCourseFeedbackModalAction}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        key="feedbackModal"
        title={feedbackModalTitle}
        actions={actions}
        modal={false}
        open={this.state.feedbackModalOpened}
        titleStyle={TrainingCourseFeedbackModalTitle}
        onRequestClose={this.handleClose}
      />
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
      <TrainingMyListWrapper>
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
      </TrainingMyListWrapper>
    );
  }
}

export const TrainingMyListWithIntl = injectIntl(TrainingMyList);

export default compose(
  graphql(TrainingCoursesQuery, TrainingCoursesQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(TrainingMyListWithIntl);
