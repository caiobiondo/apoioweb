import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';

import {
  CourseViewQuery,
  CourseViewQueryOptions,
} from 'components/ecosystems/Training/Courses/StartView/organisms/CourseStartView/CourseView.data';
import {
  Main,
  CourseViewFeedbackModalTitle,
  CourseViewFeedbackModalAction,
} from './CourseView.styles';

import {
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
import CourseRating from 'components/ecosystems/Training/Courses/View/molecules/CourseRating';
import CourseViewHeader from 'components/ecosystems/Training/Courses/View/molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import Dialog from 'material-ui/Dialog';

import { Loading, FlatButton, Icon } from 'natura-ui';
import { translate } from 'locale';

import ImageWithFallback from 'components/molecules/ImageWithFallback/ImageWithFallback';

import MediaQuery from 'react-responsive';

export class CourseView extends Component {
  state = {
    feedbackModalOpened: false,
    feedbackModalTitle: '',
  };

  componentWillReceiveProps({ loading, course }) {
    this.notifyLoadFinish(loading, course);
  }

  notifyLoadFinish = (loading, course) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(this.isEmpty(loading, course), this.isLoading(loading, course));
    }
  };

  isLoading = (loading, course) => loading && !course;

  isEmpty = (loading, course) => !loading && !course.id;

  myListIconName = () => {
    return this.props.course.isfavorite === 'true' ? 'ico_minus' : 'ico_plus';
  };

  valueToUpdateMyList = () => {
    return this.props.course.isfavorite === 'true' ? 'unfavorite' : 'favorite';
  };

  handleMyListError = () => {
    this.handleDefaultMyList('trainingAddCourseError', 'trainingRemoveCourseError');
  };

  handleNotUpdateMyList = () => {
    this.handleDefaultMyList('trainingAddCourseFailure', 'trainingRemoveCourseFailure');
  };

  handleUpdateSuccessMyList = () => {
    this.props.refetch();
    this.handleDefaultMyList('trainingAddCourseSuccess', 'trainingRemoveCourseSuccess');
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
              <TrainingCourseActionButtonWrapper>
                <FlatButton
                  {...TrainingCourseActionButtonMobile}
                  label={translate('startTraining')}
                  icon={<Icon file="ico_play_circle" />}
                  onClick={this.handleMyListClick}
                />
              </TrainingCourseActionButtonWrapper>
              <TrainingCourseActionButtonWrapper>
                <FlatButton
                  {...TrainingCourseActionButtonMobile}
                  label={translate('myList')}
                  icon={<Icon file={this.myListIconName()} />}
                  onClick={this.handleMyListClick}
                />
              </TrainingCourseActionButtonWrapper>
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
                  <TrainingCourseActionButtonWrapper>
                    <FlatButton
                      {...TrainingCourseActionButton}
                      label={translate('startTraining')}
                      icon={<Icon file="ico_play_circle" />}
                      onClick={this.handleMyListClick}
                    />
                  </TrainingCourseActionButtonWrapper>
                  <TrainingCourseActionButtonWrapper>
                    <FlatButton
                      {...TrainingCourseActionButton}
                      label={translate('myList')}
                      icon={<Icon file={this.myListIconName()} />}
                      onClick={this.handleMyListClick}
                    />
                  </TrainingCourseActionButtonWrapper>
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
      </Main>
    );
  }
}

export const CourseViewWithIntl = injectIntl(CourseView);

export default compose(
  graphql(CourseViewQuery, CourseViewQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(CourseViewWithIntl);
