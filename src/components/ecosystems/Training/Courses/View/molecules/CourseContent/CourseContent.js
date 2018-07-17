import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ContentWrapper,
  TrainingNextCourseThumbnail,
  TrainingNextCourseIconWrapper,
  TrainingNextCourseDescription,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailDescriptionWrapper,
  TrainingCourseTitle,
  TrainingNextCourseSubtitle,
  IconWrapper,
  PlayerWrapper,
} from './CourseContent.styles';
import CourseEvaluation from '../CourseEvaluation/CourseEvaluation';
import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { graphql, withApollo } from 'react-apollo';
import { Icon } from 'natura-ui';
import Player from '@vimeo/player';
import { translate } from 'locale';
import gql from 'graphql-tag';
import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';
import { ROUTE_PREFIX } from 'config';
import { withRouter } from 'react-router-dom';
import Timer from 'components/ecosystems/Training/Courses/View/molecules/Timer/Timer';
import { getHeadersFromUser } from '../../../../../../../utils/getUserParams';
import { APP_VERSION, Origem } from '../../../../../../../config';

export class CourseContent extends Component {
  constructor(props) {
    super(props);

    this.playerRef = null;
    this.setPlayerRef = element => {
      this.playerRef = element;
    };
  }
  state = {
    course: {},
    ended: false,
    initialized: 0,
    terminated: 0,
    initialCourse: {},
    showNext: false,
    startTimer: false,
  };

  componentDidMount() {
    const { course } = this.props;
    if (course) {
      this.setState({
        course,
        initialCourse: {
          ...course,
          stoppedAt: course.stoppedAt,
        },
      });
    }

    if (!course.courseContent.videoEmbedUrl || !this.playerRef) {
      return;
    }

    const player = new Player(this.playerRef);

    if (course.stoppedAt <= 1) {
      this.playerEventListeners(player);
      return;
    }

    player.setCurrentTime(course.stoppedAt).then(() => {
      player.pause().then(() => {
        this.playerEventListeners(player);
      });
    });
  }

  componentWillReceiveProps({ loading, course }) {
    if (!this.props.course && course) {
      this.setState({ course });
    }
  }

  playerEventListeners = player => {
    if (!player) return;

    player.on('ended', () => {
      if (this.state.initialCourse.status === 'finished') {
        this.setState(
          {
            course: {
              ...this.state.course,
              stoppedAt: 0,
            },
            mutationStatus: 'paused',
          },
          this.defineVideoCourseStatus,
        );
      }

      this.setState(
        {
          course: { ...this.state.course, status: 'finished', stoppedAt: 0 },
          mutationStatus: 'terminated',
          terminated: this.state.terminated + 1,
          showNext: true,
          ended: true,
        },
        () => {
          this.defineVideoCourseStatus();
          this.startTimerFunction();
        },
      );
    });

    player.on('play', () => {
      this.setState(
        {
          course: { ...this.state.course, status: 'started' },
          mutationStatus: 'initialized',
          initialized: this.state.initialized + 1,
        },
        this.defineVideoCourseStatus,
      );
    });

    player.on('pause', ({ seconds }) => {
      this.setState(
        {
          course: {
            ...this.state.course,
            stoppedAt: Math.round(seconds),
          },
          mutationStatus: 'paused',
        },
        this.defineVideoCourseStatus,
      );
    });
  };

  defineVideoCourseStatus = () => {
    if (this.state[this.state.mutationStatus] > 1) return;

    this.mutateVideoCourseStatus(this.state.mutationStatus);
  };

  mutateVideoCourseStatus = (action, additional) => {
    const input = { action, stoppedAt: this.state.course.stoppedAt };
    const { course } = this.state;
    const { handleFeedbackMessage } = this.props;
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
          input,
          sellerId: this.props.user.codigo,
          courseId: this.props.course.id,
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
          handleFeedbackMessage(translate('trainingUpdateError'));
          return;
        }

        if (response.data && !response.data.updateCourse.status) {
          // handle not updated
          // Not handling when initialized
          // (initializing after a course was terminated [rewatching] will set updateCourse.status to be false)
          if (
            response.data.updateCourse.message &&
            response.data.updateCourse.message === 'Este curso ja está finalizado.'
          ) {
            if (action === 'initialized' && this.state.initialCourse.stoppedAt <= 1) {
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

          return;
        }

        if (action === 'initialized' && this.state.initialCourse.status === 'pending') {
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

          this.setState({ ended: true });
        }
        this.updateCachedList();
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  updateCachedList = () => {
    const { course } = this.state;
    const { client } = this.props;

    client.writeFragment({
      id: course.id,
      fragment: gql`
        fragment myCourse on Course {
          stoppedAt
          status
          __typename
        }
      `,
      data: {
        stoppedAt: course.stoppedAt,
        status: course.status,
        __typename: 'Course',
      },
    });
  };

  linkToNextCourse = course => event => {
    let url = `${course.id}/web`;
    if (course.type === 'VIDEO') url = `${course.id}/video`;
    if (course.type === 'HTML5') url = `${course.id}/html5`;

    gtmPushDataLayerEvent({
      event: events.PAGE_VIEW,
      page: {
        previousUrl: window.location.pathname,
        url: `${ROUTE_PREFIX}/training/courses/${url}`,
        title: document.title,
      },
    });

    this.props.history.push(`${ROUTE_PREFIX}/training/courses/${url}`);
  };

  getCycleNumber = cycles => {
    return cycles.length > 0 ? cycles[0].numero : 0;
  };

  canRenderEvaluation = () => this.props.course.ratedByYou !== 'true' && this.state.ended;

  getNextCourse = relatedCourses => {
    if (!relatedCourses || relatedCourses.length === 0) return null;

    return relatedCourses.find(currentCourse => {
      return currentCourse.status !== 'finished';
    });
  };

  startTimerFunction = () => {
    if (this.props.course.ratedByYou !== 'true') return;

    this.setState({ startTimer: true });
  };

  render() {
    const { course } = this.props;
    const nextCourse = this.getNextCourse(course.relatedCourses);

    // iframe with key prop to force a "rerender" of iframe when changing from a course to another one,
    // so it prevents iframe src change to add a browser history item
    return (
      <ContentWrapper>
        {!course.courseContent.videoEmbedUrl && (
          <TrainingCourseThumbnail imageUrl={course.thumbnail}>
            <TrainingCourseThumbnailDescriptionWrapper>
              <IconWrapper>
                <Icon file="ico_warning_info" />
              </IconWrapper>
              <TrainingCourseTitle>{translate('trainingVideoNotFound')}</TrainingCourseTitle>
            </TrainingCourseThumbnailDescriptionWrapper>
          </TrainingCourseThumbnail>
        )}
        {!!course.courseContent.videoEmbedUrl && (
          <PlayerWrapper>
            {nextCourse && (
              <TrainingNextCourseThumbnail
                imageUrl={nextCourse.thumbnail}
                showNext={this.state.showNext}
              >
                <TrainingCourseThumbnailDescriptionWrapper>
                  <TrainingNextCourseDescription onClick={this.linkToNextCourse(nextCourse)}>
                    <TrainingNextCourseSubtitle>
                      {translate('trainingCourseUpcomingVideo')}
                      <Timer
                        seconds={5}
                        start={this.state.startTimer}
                        onFinish={this.linkToNextCourse(nextCourse)}
                      />
                    </TrainingNextCourseSubtitle>
                    <TrainingCourseTitle>{nextCourse.title}</TrainingCourseTitle>
                    <TrainingNextCourseIconWrapper>
                      <Icon file="ico_play_circle" />
                    </TrainingNextCourseIconWrapper>
                  </TrainingNextCourseDescription>
                  <TrainingNextCourseSubtitle
                    onClick={() => {
                      this.setState({ showNext: false, startTimer: false });
                    }}
                  >
                    {translate('cancel')}
                  </TrainingNextCourseSubtitle>
                </TrainingCourseThumbnailDescriptionWrapper>
              </TrainingNextCourseThumbnail>
            )}
            <iframe
              key={course.id}
              ref={this.setPlayerRef}
              src={course.courseContent.videoEmbedUrl}
              width="480"
              height="270"
              title={course.title}
              frameBorder="0"
              allowFullScreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
            />
          </PlayerWrapper>
        )}
        {this.canRenderEvaluation() && (
          <CourseEvaluation
            course={course}
            sellerId={this.props.user.codigo}
            user={this.props.user}
            origem={Origem}
            onFinish={() => {
              this.setState({ startTimer: true });
            }}
          />
        )}
      </ContentWrapper>
    );
  }
}

CourseContent.propTypes = {
  course: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  handleFeedbackMessage: PropTypes.func.isRequired,
};

export const CourseContentWithApollo = withApollo(CourseContent);
export const CourseContentWithRouter = withRouter(CourseContentWithApollo);

export default graphql(TrainingCourseUpdateMutation)(CourseContentWithRouter);
