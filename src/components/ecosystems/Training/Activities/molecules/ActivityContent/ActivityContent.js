import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ContentWrapper,
  TrainingCourseThumbnail,
  TrainingCourseThumbnailDescriptionWrapper,
  TrainingCourseTitle,
  IconWrapper,
  PlayerWrapper,
} from './ActivityContent.styles';

import { ROUTE_PREFIX } from 'config';

import { TrainingCourseUpdateMutation } from 'components/ecosystems/Training/data/TrainingCourseUpdate.data';
import { TrainingActivityUpdateMutation } from 'components/ecosystems/Training/data/TrainingActivityUpdate.data';
import { graphql, compose, withApollo } from 'react-apollo';
import { Icon } from 'natura-ui';
import Player from '@vimeo/player';
import { translate } from 'locale';

import { withRouter } from 'react-router-dom';

import { getHeadersFromUser } from '../../../../../../utils/getUserParams';

export class ActivityContent extends Component {
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
    const { activity } = this.props;

    if (!activity.courseContent.video || !this.playerRef) {
      return;
    }

    const player = new Player(this.playerRef);

    player.setCurrentTime(0).then(() => {
      player.pause().then(() => {
        this.playerEventListeners(player);
      });
    });
  }

  componentWillReceiveProps({ loading, activity }) {
    if (!this.props.activity && activity) {
      this.setState({
        activity,
      });
    }
  }

  onEnded = () => {
    const { activity, course } = this.props;

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
          activityId: activity.id,
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
        const pathname = `${ROUTE_PREFIX}/training/courses/${course.id}/module`;
        this.props.history.push({
          pathname: pathname,
          search: '?hasfinished',
          state: { hasfinished: true },
        });
      })
      .catch(error => {
        console.log('err', error);
      });
  };

  playerEventListeners = player => {
    if (!player) return;

    player.on('ended', this.onEnded);

    player.on('play', () => {});

    player.on('pause', ({ seconds }) => {});
  };

  defineVideoCourseStatus = () => {
    if (this.state[this.state.mutationStatus] > 1) return;

    this.mutateVideoCourseStatus(this.state.mutationStatus);
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
    const { activity } = this.props;

    return (
      <ContentWrapper>
        {!activity.courseContent.video && (
          <TrainingCourseThumbnail imageUrl={activity.thumbnail}>
            <TrainingCourseThumbnailDescriptionWrapper>
              <IconWrapper>
                <Icon file="ico_warning_info" />
              </IconWrapper>
              <TrainingCourseTitle>{translate('trainingVideoNotFound')}</TrainingCourseTitle>
            </TrainingCourseThumbnailDescriptionWrapper>
          </TrainingCourseThumbnail>
        )}

        {!!activity.courseContent.video && (
          <PlayerWrapper>
            <iframe
              key={activity.id}
              ref={this.setPlayerRef}
              src={activity.courseContent.video}
              width="480"
              height="270"
              title={activity.name}
              frameBorder="0"
              allowFullScreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
            />
          </PlayerWrapper>
        )}
      </ContentWrapper>
    );
  }
}

ActivityContent.propTypes = {
  activity: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  handleFeedbackMessage: PropTypes.func.isRequired,
};

export const ActivityContentWithApollo = withApollo(ActivityContent);
export const ActivityContentWithRouter = withRouter(ActivityContentWithApollo);

export default compose(
  graphql(TrainingCourseUpdateMutation),
  graphql(TrainingActivityUpdateMutation),
)(ActivityContentWithRouter);
