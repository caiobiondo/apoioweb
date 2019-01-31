import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { Grid } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { Icon, FormButton, Dialog, Loading, FlatButton } from 'natura-ui';
import { RobotoRegular } from 'styles/typography';

import gql from 'graphql-tag';

import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { TrainingActivityUpdateMutation } from '../../../data/TrainingActivityUpdate.data';
import { ActivityViewQuery, ActivityViewQueryOptions } from '../../../data/TrainingActivity.data';

import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';

import {
  Main,
  CourseViewFeedbackModalTitle,
  CourseViewFeedbackModalAction,
  TrainingCourseActionButtonWrapper,
  ContentWrapper,
  FinishModalTitle,
} from './Html5Activity.styles';

import ActivityHtmlContent from '../../molecules/ActivityHtmlContent/ActivityHtmlContent';

import CourseViewHeader from 'components/ecosystems/Training/Courses/View/molecules/CourseViewHeader';

import { translate } from 'locale';
import { ROUTE_PREFIX, Origem } from '../../../../../../config';
import { getHeadersFromUser } from '../../../../../../utils/getUserParams';

export class Html5Activity extends Component {
  state = {
    feedbackModalOpened: false,
    feedbackModalTitle: '',
    showEvaluation: false,
    course: {},
    initialized: false,
    terminated: false,
    finishModal: false,
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

    if (this.state[action]) return;

    if (this.state[action]) return;

    this.props
      .mutate({
        query: TrainingCourseUpdateMutation,
        variables: {
          input: { action },
          sellerId: this.props.user.codigo,
          courseId: course.id,
          ciclo,
          grupo,
          gerenciaDeVendas,
          regiao,
          setor,
          gerenciaMercado,
          papelDaConsultora,
          canal,
          origem,
        },
      })
      .then(response => {
        if (response.error) {
          // handle error
          return;
        }

        this.setState({ [action]: true });

        if (response.data && !response.data.updateCourse.status) {
          // handle not updated

          if (
            response.data.updateCourse.message &&
            response.data.updateCourse.message === 'Este curso ja está finalizado.'
          ) {
            if (action === 'initialized') {
              gtmPushDataLayerEvent({
                event: events.RESTART_TRAINING,
                category: categories.TRAINING,
                action: actions.RESTART,
                treinamento: {
                  name: course.title,
                  id: course.id,
                  type: course.type,
                  startTime: new Date().getTime(),
                  endTime: undefined,
                  rating: undefined,
                },
              });
              return;
            }

            if (action === 'terminated') {
              gtmPushDataLayerEvent({
                event: events.REFINISH_TRAINING,
                category: categories.TRAINING,
                action: actions.REFINISH,
                treinamento: {
                  name: course.title,
                  id: course.id,
                  type: course.type,
                  startTime: undefined,
                  endTime: new Date().getTime(),
                  rating: undefined,
                },
              });
              return;
            }
          }

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
            this.props.history.push(`${ROUTE_PREFIX}/training/courses/${course.id}/video`);
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

  handleMyListClick = (event, child) => {
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
          gerenciaDeVendas,
          regiao,
          setor,
          gerenciaMercado,
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
    this.setState({ finishModal: false });
    this.handleFeedbackMessage();
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

  goBack = () => this.props.history.goBack();

  handleFeedbackMessage = () => {
    if (this.props.activity.finished) {
      return;
    }

    this.setState({ finishModal: true });
  };

  handleYes = () => {
    const { activityId } = this.props;

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
        query: TrainingActivityUpdateMutation,
        variables: {
          sellerId: this.props.user.codigo,
          activityId: activityId,
          input: { action: 'terminated', stopedAt: 0 },
          ciclo: ciclo,
          grupo,
          gerenciaMercado,
          gerenciaDeVendas,
          canal,
          papelDaConsultora,
          regiao,
          setor,
          origem,
          roleId: this.props.user.cdPapelAtivo,
        },
      })
      .then(response => {
        //Apresentar o modal de avaliacao
      })
      .catch(error => {
        console.log('err', error);
      });

    this.goBack();
  };
  handleNo = () => {
    this.setState({ finishModal: false });
    this.goBack();
  };

  openActivityFinish = () => {
    const actions = [
      <FlatButton
        key="yes"
        label={<FormattedMessage id="trainingYes" />}
        primary={true}
        style={{ fontFamily: RobotoRegular }}
        onClick={this.handleYes}
      />,
      <FlatButton
        key="no"
        label={<FormattedMessage id="trainingNo" />}
        primary={true}
        style={{ fontFamily: RobotoRegular }}
        onClick={this.handleNo}
      />,
    ];

    const { categoryName, inputValue } = this.state;

    return (
      <Dialog
        key="activityModalFinish"
        title={translate('finishActivity')}
        actions={actions}
        modal={false}
        titleStyle={FinishModalTitle}
        open={this.state.finishModal}
        onRequestClose={this.handleClose}
      >
        <ContentWrapper>
          <FormattedHTMLMessage
            id="activityIsCompleted"
            values={{ categoryName: categoryName, inputValue: inputValue }}
          />
        </ContentWrapper>
      </Dialog>
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
          <CourseViewHeader handleBackClick={this.handleFeedbackMessage} />
          <ActivityHtmlContent
            activity={this.props.activity.results[0]}
            user={this.props.user}
            refetch={this.props.refetch}
          />
        </Grid>
        {this.openActivityFinish()}
      </Main>
    );
  }
}

export const Html5ActivityWithIntl = injectIntl(Html5Activity);
export const Html5ActivityWithRouter = withRouter(Html5ActivityWithIntl);
export const Html5ActivityWithApollo = withApollo(Html5ActivityWithRouter);

export default compose(
  graphql(ActivityViewQuery, ActivityViewQueryOptions),
  graphql(TrainingCourseUpdateMutation),
  graphql(TrainingActivityUpdateMutation),
)(Html5ActivityWithApollo);
