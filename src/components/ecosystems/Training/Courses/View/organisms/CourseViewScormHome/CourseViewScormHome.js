import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { ROUTE_PREFIX, PUBLIC_URL } from 'config';

import {
  CourseViewQuery,
  CourseViewQueryOptions,
} from 'components/ecosystems/Training/data/CourseView.data';

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
  TrainingCourseDescription,
  TrainingCourseTitle,
  TrainingCourseActions,
  TrainingCourseActionButton,
  TrainingCourseActionButtonMobile,
  TrainingCourseActionButtonWrapper,
  TrainingCourseFooterWrapper,
} from './CourseViewScormHome.style';

import staticCourses from 'components/ecosystems/Training/enums/staticCourses.enum';
import RelatedCourses from 'components/ecosystems/Training/Courses/View/molecules/RelatedCourses';
import CourseEvaluation from 'components/ecosystems/Training/Courses/View/molecules/CourseEvaluation';
import CourseViewHeader from 'components/ecosystems/Training/Courses/View/molecules/CourseViewHeader';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import CourseScormFooter from '../../molecules/CourseScormFooter/CourseScormFooter';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import Dialog from 'material-ui/Dialog';

import { Loading, FlatButton, Icon } from 'natura-ui';
import { translate } from 'locale';

import MediaQuery from 'react-responsive';
import { getHeadersFromUser } from '../../../../../../../utils/getUserParams';
import { Origem } from '../../../../../../../config';

export class CourseViewScormHome extends Component {
  state = {
    feedbackModalOpened: false,
    feedbackModalTitle: '',
    showEvaluation: false,
    showStaticCourse: false,
    course: {},
    initialized: false,
    terminated: false,
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
    console.log('notifyLoadFinish', loading);
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

    this.props
      .mutate({
        variables: {
          input: { action },
          sellerId: this.props.user.codigo,
          courseId: course.id,
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
        if (response.error) {
          // handle error
          this.handleFeedbackMessage(translate('trainingUpdateError'));
          return;
        }

        this.setState({ [action]: true });

        if (response.data && !response.data.updateCourse.status) {
          console.log('response', response);
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
            }
          }

          if (action === 'initialized') {
            if (course.type === 'SCORM') {
              this.props.history.push(
                // `${ROUTE_PREFIX}/training/courses/${course.id}/scorm/${course.courseContent.scorm}`,
                `${ROUTE_PREFIX}/training/courses/${course.id}/#`,
              );
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

          if (course.type === 'SCORM') {
            this.props.history.push(
              // `${ROUTE_PREFIX}/training/courses/${course.id}/scorm/${course.courseContent.scorm}`,
              `${ROUTE_PREFIX}/training/courses/${course.id}`,
            );
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

  hasFinishingTrigger = () => {
    const { id } = this.props.course;
    const staticCoursesIds = Object.values(staticCourses);
    return staticCoursesIds.includes(id);
  };

  openWebCourse = () => {
    const { courseContent } = this.props.course;
    const hasFinishingTrigger = this.hasFinishingTrigger();

    if (!hasFinishingTrigger) {
      return window.open(courseContent.web, '_blank');
    }

    const afterSetState = () => {
      console.log('showStaticCourse -> afterSetState');
      const courseIframe = document.querySelector(`iframe[title=${this.getStaticCourseName()}]`);
      const courseWindow = courseIframe.contentWindow;
      this.checkCourseFinished(courseWindow);
    };

    this.setState({ showStaticCourse: true }, afterSetState);
  };

  checkCourseFinished = courseWindow => {
    const timerId = setInterval(() => {
      if (courseWindow.location.hash === '#finish') {
        clearInterval(timerId);
        this.handleTrainingClick('terminated')();
      }
    }, 1000);
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
          gerenciaMercado,
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

  renderActionButtons = (buttonStyle, course) => {
    const { showStaticCourse } = this.state;
    const buttons = [];

    const isPending = course.status === 'pending';
    const isStarted = course.status === 'started';
    const isPaused = course.status === 'paused';

    if (isPending) {
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

    if ((isStarted || isPaused) && !showStaticCourse) {
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
    return course.status === 'finished' && course.ratedByYou !== 'true';
  };

  setStaticCourseRef = ref => {
    this.staticCourseIframe = ref;
  };

  getStaticCourseName = () => {
    const { id } = this.props.course;
    return Object.keys(staticCourses).find(key => staticCourses[key] === id);
  };

  renderStaticCourse = () => {
    const { showStaticCourse } = this.state;
    const courseName = this.getStaticCourseName();
    const courseUrl = `${PUBLIC_URL}trainingCourses/${courseName}/`;

    if (!showStaticCourse) {
      return;
    }

    return (
      <iframe
        ref={this.setStaticCourseRef}
        title={courseName}
        src={courseUrl}
        allow="autoplay"
        height={600}
        frameborder="0"
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
              {this.renderActionButtons(TrainingCourseActionButtonMobile, course)}
            </TrainingCourseActions>
            <TrainingCourseFooterWrapper>
              <CourseScormFooter course={course} />
            </TrainingCourseFooterWrapper>
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

            <TrainingCourseFooterWrapper>
              <CourseScormFooter course={course} />
            </TrainingCourseFooterWrapper>
          </TrainingCourseThumbnailWrapper>
        </MediaQuery>
        <RelatedCourses courses={course.relatedCourses} />
        {this.renderFeedbackModal()}
        {this.canEvaluate() && (
          <CourseEvaluation
            course={course}
            sellerId={this.props.user.codigo}
            origem={Origem}
            user={this.props.user}
          />
        )}
        {this.renderStaticCourse()}
      </Main>
    );
  }
}

export const CourseViewScormHomeIntl = injectIntl(CourseViewScormHome);
export const CourseViewScormHomeRouter = withRouter(CourseViewScormHomeIntl);
export const CourseViewScormHomeWithApollo = withApollo(CourseViewScormHomeRouter);

export default compose(
  graphql(CourseViewQuery, CourseViewQueryOptions),
  graphql(TrainingCourseUpdateMutation),
)(CourseViewScormHomeWithApollo);
