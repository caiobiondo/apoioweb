import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { injectIntl, FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';

import {
  CourseViewQuery,
  CourseViewQueryOptions,
} from 'components/ecosystems/Training/data/CourseView.data';
import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
} from 'components/ecosystems/Training/data/TrainingCourses.data';

import {
  Main,
  MylistButtonWrapper,
  MylistButton,
  CourseViewFeedbackModalTitle,
  CourseViewFeedbackModalAction,
} from './CourseView.styles';

import CourseContent from '../../molecules/CourseContent';
import CourseDescription from '../../molecules/CourseDescription';
import RelatedCourses from '../../molecules/RelatedCourses';
import CourseRating from '../../molecules/CourseRating';
import CourseViewHeader from '../../molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { Loading, FlatButton, Icon, Dialog } from 'natura-ui';
import { translate } from 'locale';

export class CourseView extends Component {
  state = {
    feedbackModalOpened: false,
    feedbackModalTitle: '',
    course: {},
  };

  componentDidMount() {
    const { course } = this.props;
    if (course) this.setState({ course });
  }

  componentWillReceiveProps({ loading, course }) {
    this.notifyLoadFinish(loading, course);

    if (!this.props.course && course) {
      this.setState({ course });
    }
  }

  notifyLoadFinish = (loading, course) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, course), this.isLoading(loading, course));
    }
  };

  isLoading = (loading, course) => loading && !course;

  isEmpty = (loading, course) => !loading && !course.id;

  myListIconName = () => {
    return this.state.course.isfavorite === 'true' ? 'ico_minus' : 'ico_plus';
  };

  valueToUpdateMyList = () => {
    return this.state.course.isfavorite === 'true' ? 'unfavorite' : 'favorite';
  };

  handleMyListError = () => {
    this.handleDefaultMyList('trainingAddCourseError', 'trainingRemoveCourseError');
  };

  handleNotUpdateMyList = () => {
    this.handleDefaultMyList('trainingAddCourseFailure', 'trainingRemoveCourseFailure');
  };

  handleUpdateSuccessMyList = () => {
    this.handleDefaultMyList('trainingAddCourseSuccess', 'trainingRemoveCourseSuccess');
    const isfavorite = this.state.course.isfavorite === 'true' ? 'false' : 'true';
    this.setState({ course: { ...this.state.course, isfavorite } }, this.updateCachedList);
  };

  handleDefaultMyList = (addMsg, removeMsg) => {
    const { formatMessage } = this.props.intl;
    const message =
      this.valueToUpdateMyList() === 'favorite'
        ? formatMessage({ id: addMsg })
        : formatMessage({ id: removeMsg });

    this.setState({
      feedbackModalOpened: true,
      feedbackModalTitle: message,
    });
  };

  updateCachedList = () => {
    const { course } = this.state;
    const { client } = this.props;

    client.writeFragment({
      id: course.id,
      fragment: gql`
        fragment myCourse on Course {
          isfavorite
          status
          __typename
        }
      `,
      data: {
        isfavorite: course.isfavorite,
        status: course.status,
        __typename: 'Course',
      },
    });

    let startedCourses = null;
    try {
      startedCourses = client.readQuery({
        query: TrainingCoursesQuery,
        variables: TrainingCoursesQueryOptions.options({
          ...this.props,
          status: 'started',
        }).variables,
      });
    } catch (e) {
      // could not find cache
    }

    if (startedCourses) {
      if (this.state.course.status === 'started' && this.props.course.status === 'pending') {
        startedCourses.courses.items.push(this.state.course);
      }

      if (this.state.course.status !== 'started' && this.props.course.status === 'started') {
        startedCourses.courses.items = startedCourses.courses.items.filter(
          item => item.id !== this.state.course.id,
        );
      }

      client.writeQuery({
        query: TrainingCoursesQuery,
        variables: TrainingCoursesQueryOptions.options({
          ...this.props,
          status: 'started',
        }).variables,
        data: startedCourses,
      });
    }

    let favoritedCourses = null;
    try {
      favoritedCourses = client.readQuery({
        query: TrainingCoursesQuery,
        variables: TrainingCoursesQueryOptions.options({
          ...this.props,
          favorite: true,
        }).variables,
      });
    } catch (e) {
      // could not find cache
    }

    if (favoritedCourses) {
      if (this.state.course.isfavorite === 'true' && this.props.course.isfavorite === 'false') {
        favoritedCourses.courses.items.push(this.state.course);
      }

      if (this.state.course.isfavorite === 'false' && this.props.course.isfavorite === 'true') {
        favoritedCourses.courses.items = favoritedCourses.courses.items.filter(item => {
          return item.id !== this.state.course.id;
        });
      }

      client.writeQuery({
        query: TrainingCoursesQuery,
        variables: TrainingCoursesQueryOptions.options({
          ...this.props,
          favorite: true,
        }).variables,
        data: favoritedCourses,
      });
    }
  };

  handleMyListClick = () => {
    const { course } = this.props;
    this.props
      .mutate({
        variables: {
          input: { action: this.valueToUpdateMyList() },
          sellerId: this.props.user.codigo,
          courseId: course.id,
        },
      })
      .then(response => {
        if (response.error) {
          this.handleMyListError();
          return;
        }

        if (!response.data.updateCourse.status) {
          this.handleNotUpdateMyList();
          return;
        }

        this.handleUpdateSuccessMyList();
        return;
      })
      .catch(err => {
        console.log('err', err);

        this.handleMyListError();
      });
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
        labelStyle={CourseViewFeedbackModalAction}
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
        titleStyle={CourseViewFeedbackModalTitle}
        onRequestClose={this.handleClose}
      />
    );
  };

  render() {
    const { course } = this.props;

    if (!course && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!course.id) {
      return (
        <Main>
          <EmptyList
            icon="ico_list_add"
            titleId="myCourseEmptyList"
            descriptionId="myCourseEmptyListDescription"
          />
        </Main>
      );
    }

    return (
      <Main>
        <Grid fluid>
          <CourseViewHeader />
          <CourseContent
            course={course}
            sellerId={this.props.user.codigo}
            refetch={this.props.refetch}
          />
          <CourseDescription course={course} />
          <Row>
            <Col md={1} sm={1}>
              <MylistButtonWrapper>
                <FlatButton
                  {...MylistButton}
                  label={translate('myList')}
                  icon={<Icon file={this.myListIconName()} />}
                  onClick={this.handleMyListClick}
                />
              </MylistButtonWrapper>
            </Col>
          </Row>
          <CourseRating course={course} />
          <RelatedCourses courses={course.relatedCourses} />
        </Grid>
        {this.renderFeedbackModal()}
      </Main>
    );
  }
}

export const CourseViewWithIntl = injectIntl(CourseView);
export const CourseViewWithApollo = withApollo(CourseViewWithIntl);

export default compose(
  graphql(CourseViewQuery, CourseViewQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(CourseViewWithApollo);
