import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
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
  CourseViewFeedbackModalTitle,
  CourseViewFeedbackModalAction,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailWrapper,
  TrainingCourseThumbnailDescriptionWrapper,
  TrainingCourseDescription,
  TrainingCourseTitle,
  TrainingCourseActions,
  TrainingCourseActionButton,
  TrainingCourseActionButtonMobile,
  TrainingCourseActionButtonWrapper,
  TrainingCourseRatingWrapper,
} from './CourseStartView.styles';

import RelatedCourses from 'components/ecosystems/Training/Courses/View/molecules/RelatedCourses';
import CourseEvaluation from 'components/ecosystems/Training/Courses/View/molecules/CourseEvaluation';
import CourseRating from 'components/ecosystems/Training/Courses/View/molecules/CourseRating';
import CourseViewHeader from 'components/ecosystems/Training/Courses/View/molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import Dialog from 'material-ui/Dialog';

import { Loading, FlatButton, Icon } from 'natura-ui';
import { translate } from 'locale';

import MediaQuery from 'react-responsive';

export class CourseStartView extends Component {
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

    this.handleFeedbackMessage(message);
  };

  handleFeedbackMessage = message => {
    this.setState({
      feedbackModalOpened: true,
      feedbackModalTitle: message,
    });
  };

  handleTrainingClick = action => event => {
    const { course } = this.props;
    const { formatMessage } = this.props.intl;

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
          this.handleFeedbackMessage(formatMessage('TrainingUpdateError'));
          return;
        }

        if (response.data && !response.data.updateCourse.status) {
          // handle not updated
          this.handleFeedbackMessage(formatMessage('TrainingUpdateError'));
          return;
        }

        if (action === 'initialized') {
          window.dataLayer.push({
            event: 'ev-iniciar-treinamento',
            category: 'Treinamento',
            action: 'Iniciar',
            treinamento: {
              name: course.title,
              id: course.id,
              type: course.type,
              certificateName: this.props.user.nomeCompleto,
              startTime: new Date(),
            },
          });
          this.setState(
            { course: { ...this.state.course, status: 'started' } },
            this.updateCachedList,
          );

          if (course.type === 'WEB') window.open(course.courseContent.web, '_blank');
          if (course.type === 'HTML5') {
            this.props.history.push(`/training/courses/${course.id}/html5`);
          }
          if (course.type === 'VIDEO') {
            this.props.history.push(`/training/courses/${course.id}/video`);
          }
        }

        if (action === 'terminated') {
          window.dataLayer.push({
            event: 'ev-concluir-treinamento',
            category: 'Treinamento',
            action: 'Iniciar',
            treinamento: {
              name: course.title,
              id: course.id,
              type: course.type,
              certificateName: this.props.user.nomeCompleto,
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
        <TrainingCourseActionButtonWrapper key="resume">
          <FlatButton
            {...buttonStyle}
            label={translate('resumeTraining')}
            icon={<Icon file="ico_play_circle" />}
            onClick={this.handleTrainingClick('initialized')}
          />
        </TrainingCourseActionButtonWrapper>,
      );
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

    if (course.status === 'finished') {
      buttons.push(
        <TrainingCourseActionButtonWrapper key="review">
          <FlatButton
            {...buttonStyle}
            label={translate('reviewTraining')}
            icon={<Icon file="ico_play_circle" />}
            onClick={this.handleTrainingClick('initialized')}
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

  render() {
    const { course } = this.props;

    if (!course && !this.props.loading) return null;

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
        <CourseViewHeader course={course} />
        <MediaQuery maxWidth={767}>
          <TrainingCourseThumbnailWrapper>
            <TrainingCourseThumbnail imageUrl={course.thumbnail}>
              <TrainingCourseThumbnailDescriptionWrapper>
                <TrainingCourseTitle>{course.title}</TrainingCourseTitle>
                <TrainingCourseDescription>{course.description}</TrainingCourseDescription>
              </TrainingCourseThumbnailDescriptionWrapper>
            </TrainingCourseThumbnail>
            <TrainingCourseActions>
              {this.renderActionButtons(TrainingCourseActionButtonMobile, course)}
            </TrainingCourseActions>
            <TrainingCourseRatingWrapper>
              <CourseRating course={course} />
            </TrainingCourseRatingWrapper>
          </TrainingCourseThumbnailWrapper>
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <TrainingCourseThumbnailWrapper>
            <TrainingCourseThumbnail imageUrl={course.thumbnail}>
              <TrainingCourseThumbnailDescriptionWrapper>
                <TrainingCourseTitle>{course.title}</TrainingCourseTitle>
                <TrainingCourseDescription>{course.description}</TrainingCourseDescription>
                <TrainingCourseActions>
                  {this.renderActionButtons(TrainingCourseActionButton, course)}
                </TrainingCourseActions>
              </TrainingCourseThumbnailDescriptionWrapper>
            </TrainingCourseThumbnail>
            <TrainingCourseRatingWrapper>
              <CourseRating course={course} />
            </TrainingCourseRatingWrapper>
          </TrainingCourseThumbnailWrapper>
        </MediaQuery>
        <RelatedCourses courses={course.relatedCourses} />
        {this.renderFeedbackModal()}
        {this.canEvaluate() && (
          <CourseEvaluation courseId={course.id} sellerId={this.props.user.codigo} />
        )}
      </Main>
    );
  }
}

export const CourseStartViewWithIntl = injectIntl(CourseStartView);
export const CourseStartViewWithRouter = withRouter(CourseStartViewWithIntl);
export const CourseStartViewWithApollo = withApollo(CourseStartViewWithRouter);

export default compose(
  graphql(CourseViewQuery, CourseViewQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(CourseStartViewWithApollo);
