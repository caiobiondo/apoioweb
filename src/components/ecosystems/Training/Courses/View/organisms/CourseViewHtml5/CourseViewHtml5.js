import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';

import { CourseViewHtml5Query, CourseViewHtml5QueryOptions } from './CourseViewHtml5.data';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
} from 'components/ecosystems/Training/data/TrainingCourses.data';
import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';

import {
  Main,
  CourseViewFeedbackModalTitle,
  CourseViewFeedbackModalAction,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailWrapper,
  TrainingCourseThumbnailDescriptionWrapper,
  TrainingCourseActions,
  TrainingCourseActionButtonMobile,
  TrainingCourseActionButtonWrapper,
  Html5Wrapper,
  IconWrapper,
  TrainingCourseUnavailableTitle,
} from './CourseViewHtml5.styles';

import CourseViewHeader from 'components/ecosystems/Training/Courses/View/molecules/CourseViewHeader';
import CourseDescription from 'components/ecosystems/Training/Courses/View/molecules/CourseDescription';
import RelatedCourses from 'components/ecosystems/Training/Courses/View/molecules/RelatedCourses';
import CourseRating from 'components/ecosystems/Training/Courses/View/molecules/CourseRating';
import CourseEvaluation from 'components/ecosystems/Training/Courses/View/molecules/CourseEvaluation';
import Dialog from 'material-ui/Dialog';
import { translate } from 'locale';

import { Loading, FlatButton, Icon } from 'natura-ui';

export class CourseViewHtml5 extends Component {
  state = {
    feedbackModalOpened: false,
    feedbackModalTitle: '',
    showEvaluation: false,
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

  componentDidUpdate() {
    if (
      !this.props.course ||
      !this.refs.html5Iframe ||
      this.refs.html5Iframe.contentDocument.body.innerHTML
    ) {
      return;
    }

    this.refs.html5Iframe.contentDocument.open();
    this.refs.html5Iframe.contentDocument.write(this.props.course.courseContent.html5Embed);
    this.refs.html5Iframe.contentDocument.close();
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

  handleTrainingError = () => {
    const { formatMessage } = this.props.intl;

    this.setState({
      feedbackModalOpened: true,
      feedbackModalTitle: formatMessage({ id: 'trainingStatusUpdateError' }),
    });
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

  handleTrainingClick = action => event => {
    const { course } = this.props;

    this.props
      .mutate({
        variables: {
          input: { action },
          sellerId: this.props.user.codigo,
          courseId: course.id,
        },
      })
      .then(response => {
        if (response.error) {
          // handle error
          return;
        }

        if (response.data && !response.data.updateCourse.status) {
          // handle not updated
          return;
        }

        if (action === 'initialized') {
          gtmPushDataLayerEvent({
            event: events.START_TRAINING,
            category: categories.TRAINING,
            action: actions.START,
            treinamento: {
              name: course.title,
              id: course.id,
              type: course.type,
              startTime: new Date().getTime(),
              endTime: undefined,
              rating: undefined,
            },
          });

          this.setState(
            { course: { ...this.state.course, status: 'started' } },
            this.updateCachedList,
          );

          if (course.type === 'WEB') window.open(course.courseContent.web, '_blank');
          if (course.type === 'VIDEO') {
            this.props.history.push(`/training/courses/${course.id}/video`);
          }
        }

        if (action === 'terminated') {
          gtmPushDataLayerEvent({
            event: events.FINISH_TRAINING,
            category: categories.TRAINING,
            action: actions.FINISH,
            treinamento: {
              name: course.title,
              id: course.id,
              type: course.type,
              startTime: undefined,
              endTime: new Date().getTime(),
              rating: undefined,
            },
          });

          this.setState(
            {
              showEvaluation: true,
              course: { ...this.state.course, status: 'finished' },
            },
            this.updateCachedList,
          );
        }

        return;
      })
      .catch(err => {
        console.log('err', err);

        this.handleTrainingError();
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

  handleMyListClick = (event, child) => {
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

  renderActionButtons = (buttonStyle, course) => {
    const buttons = [];
    if (course.status === 'pending') {
      buttons.push(
        <TrainingCourseActionButtonWrapper key="start">
          <FlatButton
            {...buttonStyle}
            label={translate('startTraining')}
            icon={<Icon file="ico_play_circle" />}
            onClick={this.handleTrainingClick('initialized')}
          />
        </TrainingCourseActionButtonWrapper>,
      );
    }

    if (course.status === 'started' || course.status === 'paused') {
      buttons.push(
        <TrainingCourseActionButtonWrapper key="finish">
          <FlatButton
            {...buttonStyle}
            label={translate('finishTraining')}
            icon={<Icon file="ico_play_circle" />}
            onClick={this.handleTrainingClick('terminated')}
          />
        </TrainingCourseActionButtonWrapper>,
      );
    }

    return [
      ...buttons,
      <TrainingCourseActionButtonWrapper key="list">
        <FlatButton
          {...buttonStyle}
          label={translate('myList')}
          icon={<Icon file={this.myListIconName()} />}
          onClick={this.handleMyListClick}
        />
      </TrainingCourseActionButtonWrapper>,
    ];
  };

  canEvaluate = () => {
    const { course } = this.props;
    return this.state.showEvaluation && course.ratedByYou !== 'true';
  };

  isCourseAvailable = () => {
    const { course } = this.props;

    return !/.*\.zip$/i.test(course.courseContent.html5);
  };

  render() {
    const { course, loading } = this.props;

    if (!course && loading) {
      return <Loading background="transparent" />;
    }

    if (!course.id) return null;

    return (
      <Main>
        <CourseViewHeader />
        <TrainingCourseThumbnailWrapper>
          {!this.isCourseAvailable() && (
            <TrainingCourseThumbnail imageUrl={course.thumbnail}>
              <TrainingCourseThumbnailDescriptionWrapper>
                <IconWrapper>
                  <Icon file="ico_graduate_cap" />
                </IconWrapper>
                <TrainingCourseUnavailableTitle>
                  {translate('trainingCourseUnavailable')}
                </TrainingCourseUnavailableTitle>
              </TrainingCourseThumbnailDescriptionWrapper>
            </TrainingCourseThumbnail>
          )}
          {this.isCourseAvailable() && (
            <Html5Wrapper>
              <iframe
                ref="html5Iframe"
                title={course.title}
                src="about:blank"
                allowFullScreen
                frameBorder="0"
              />
            </Html5Wrapper>
          )}
        </TrainingCourseThumbnailWrapper>
        <CourseDescription course={course} />
        {this.isCourseAvailable() && (
          <TrainingCourseActions>
            {this.renderActionButtons(TrainingCourseActionButtonMobile, course)}
          </TrainingCourseActions>
        )}
        <CourseRating course={course} />
        <RelatedCourses courses={course.relatedCourses} />
        {this.isCourseAvailable() && this.renderFeedbackModal()}
        {this.isCourseAvailable() &&
          this.canEvaluate() && (
            <CourseEvaluation course={course} sellerId={this.props.user.codigo} />
          )}
      </Main>
    );
  }
}

export const CourseViewHtml5WithIntl = injectIntl(CourseViewHtml5);
export const CourseViewHtml5WithRouter = withRouter(CourseViewHtml5WithIntl);
export const CourseViewHtml5WithApollo = withApollo(CourseViewHtml5WithRouter);

export default compose(
  graphql(CourseViewHtml5Query, CourseViewHtml5QueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(CourseViewHtml5WithApollo);
