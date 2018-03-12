import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { injectIntl, FormattedMessage } from 'react-intl';

import { CourseViewQuery, CourseViewQueryOptions } from './CourseView.data';
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
    isFavorite: false,
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

  componentWillMount() {
    const { course } = this.props;
    if (course) this.state({ isFavorite: course.isfavorite });
  }

  isLoading = (loading, course) => loading && !course;

  isEmpty = (loading, course) => !loading && !course.id;

  myListIconName = course => {
    return this.state.isFavorite === 'true' ? 'ico_minus' : 'ico_plus';
  };

  valueToUpdateMyList = () => {
    return this.state.isFavorite === 'true' ? 'unfavorite' : 'favorite';
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
          <CourseContent course={course} sellerId={this.props.user.codigo} />
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

export default compose(
  graphql(CourseViewQuery, CourseViewQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(CourseViewWithIntl);
