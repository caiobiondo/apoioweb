import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { injectIntl, FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';

import { ActivityViewQuery, ActivityViewQueryOptions } from '../../../data/TrainingActivity.data';
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
} from './VideoActivity.styles';

import ActivityContent from '../../molecules/ActivityContent/ActivityContent';
import CourseDescription from '../../../Courses/View/molecules/CourseDescription';
import RelatedCourses from '../../../Courses/View/molecules/RelatedCourses';
import CourseRating from '../../../Courses/View/molecules/CourseRating';
import CourseViewHeader from '../../../Courses/View/molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { Loading, FlatButton, Icon, Dialog } from 'natura-ui';
import { translate } from 'locale';
import { getHeadersFromUser } from '../../../../../../utils/getUserParams';

class VideoActivity extends Component {
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
    if (!this.props.course && course) {
      this.setState({ course });
    }
  }

  isLoading = (loading, course) => loading && !course;

  isEmpty = (loading, course) => !loading && (!course || !course.id);

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

    this.handleFeedbackMessage(message);
  };

  handleFeedbackMessage = message => {
    this.setState({
      feedbackModalOpened: true,
      feedbackModalTitle: message,
    });
  };

  updateCachedList = () => {
    // const { course } = this.state;
    // const { client } = this.props;
    // client.writeFragment({
    //   id: course.id,
    //   fragment: gql`
    //     fragment myCourse on Course {
    //       isfavorite
    //       status
    //       __typename
    //     }
    //   `,
    //   data: {
    //     isfavorite: course.isfavorite,
    //     status: course.status,
    //     __typename: 'Course',
    //   },
    // });
    // let startedCourses = null;
    // try {
    //   startedCourses = client.readQuery({
    //     query: TrainingCoursesQuery,
    //     variables: TrainingCoursesQueryOptions.options({
    //       ...this.props,
    //       status: 'started',
    //     }).variables,
    //   });
    // } catch (e) {
    //   // could not find cache
    // }
    // if (startedCourses) {
    //   if (this.state.course.status === 'started' && this.props.course.status === 'pending') {
    //     startedCourses.courses.items.push(this.state.course);
    //   }
    //   if (this.state.course.status !== 'started' && this.props.course.status === 'started') {
    //     startedCourses.courses.items = startedCourses.courses.items.filter(
    //       item => item.id !== this.state.course.id,
    //     );
    //   }
    //   client.writeQuery({
    //     query: TrainingCoursesQuery,
    //     variables: TrainingCoursesQueryOptions.options({
    //       ...this.props,
    //       status: 'started',
    //     }).variables,
    //     data: startedCourses,
    //   });
    // }
    // let favoritedCourses = null;
    // try {
    //   favoritedCourses = client.readQuery({
    //     query: TrainingCoursesQuery,
    //     variables: TrainingCoursesQueryOptions.options({
    //       ...this.props,
    //       favorite: true,
    //     }).variables,
    //   });
    // } catch (e) {
    //   // could not find cache
    // }
    // if (favoritedCourses) {
    //   if (this.state.course.isfavorite === 'true' && this.props.course.isfavorite === 'false') {
    //     favoritedCourses.courses.items.push(this.state.course);
    //   }
    //   if (this.state.course.isfavorite === 'false' && this.props.course.isfavorite === 'true') {
    //     favoritedCourses.courses.items = favoritedCourses.courses.items.filter(item => {
    //       return item.id !== this.state.course.id;
    //     });
    //   }
    //   client.writeQuery({
    //     query: TrainingCoursesQuery,
    //     variables: TrainingCoursesQueryOptions.options({
    //       ...this.props,
    //       favorite: true,
    //     }).variables,
    //     data: favoritedCourses,
    //   });
    // }
  };

  handleMyListClick = () => {
    const { course } = this.props;
    const {
      ciclo,
      grupo,
      gerenciaDeVendas,
      regiao,
      setor,
      gerenciaMercado,
      papelDaConsultora,
      canal,
      origem,
    } = getHeadersFromUser(this.props.user);

    this.props
      .mutate({
        variables: {
          input: { action: this.valueToUpdateMyList() },
          sellerId: this.props.user.codigo,
          courseId: course.id,
          ciclo,
          grupo,
          gerenciaMercado,
          gerenciaDeVendas,
          regiao,
          setor,
          papelDaConsultora,
          canal,
          origem,
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
    const { activity } = this.props;
    if (!activity && this.props.loading) {
      return <Loading background="transparent" />;
    }

    return (
      <Main>
        <Grid fluid>
          <CourseViewHeader />
          <ActivityContent
            activity={this.props.activity.results[0]}
            user={this.props.user}
            refetch={this.props.refetch}
            handleFeedbackMessage={this.handleFeedbackMessage}
          />
        </Grid>
      </Main>
    );
  }
}
export const VideoActivityWithIntl = injectIntl(VideoActivity);
export const VideoActivityWithApollo = withApollo(VideoActivityWithIntl);

export default compose(graphql(ActivityViewQuery, ActivityViewQueryOptions))(
  VideoActivityWithApollo,
);
