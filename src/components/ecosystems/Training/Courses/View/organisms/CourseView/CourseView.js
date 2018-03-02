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
import CourseViewHeader from '../../molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import Dialog from 'material-ui/Dialog';

import { Loading, FlatButton, Icon } from 'natura-ui';
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

  handleMyListClick = (event, child) => {
    const { formatMessage } = this.props.intl;
    const { course } = this.props;
    const valueToUpdate = this.valueToUpdateMyList();

    this.props
      .mutate({
        variables: {
          input: { action: valueToUpdate },
          sellerId: this.props.user.codigo,
          courseId: course.id,
        },
      })
      .then(response => {
        if (response.error) {
          const message =
            valueToUpdate === 'favorite'
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
            valueToUpdate === 'favorite'
              ? formatMessage({ id: 'trainingAddCourseFailure' })
              : formatMessage({ id: 'trainingRemoveCourseFailure' });
          this.setState({
            feedbackModalOpened: true,
            feedbackModalTitle: message,
          });
          // Handle not updated
          return;
        }

        // Handle update success
        this.props.refetch();
        const message =
          valueToUpdate === 'favorite'
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
          valueToUpdate === 'favorite'
            ? formatMessage({ id: 'trainingAddCourseError' })
            : formatMessage({ id: 'trainingRemoveCourseError' });
        this.setState({
          feedbackModalOpened: true,
          feedbackModalTitle: message,
        });
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
          <CourseViewHeader course={course} />
          <CourseContent />
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
          <RelatedCourses />
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
