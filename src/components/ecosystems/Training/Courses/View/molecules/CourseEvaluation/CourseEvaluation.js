import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Dialog, FlatButton, Rating, Loading } from 'natura-ui';
import { FormattedMessage, injectIntl } from 'react-intl';
import { translate } from 'locale';
import {
  CourseEvaluationQuery,
  CourseEvaluationQueryOptions,
  CourseAddEvaluationMutation,
} from './CourseEvaluation.data';
import {
  CourseEvaluationModalTitle,
  CourseEvaluationModalAction,
  TitleWrapper,
  RatingWrapper,
  ContentWrapper,
  WrapperCount,
} from './CourseEvaluation.styles';
import { ToggleStar, ToggleStarBorder } from 'material-ui/svg-icons';
import { red500 } from 'styles/colors';
import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';
import { getHeadersFromUser } from '../../../../../../../utils/getUserParams';

export class CourseEvaluation extends Component {
  state = {
    modalOpened: true,
    feedbackModalOpened: false,
    feedbackModalTitle: '',
    currentIndex: 0,
    userRates: [],
    nextActionDisabled: true,
  };

  componentWillReceiveProps({ loading, evaluations }) {
    this.notifyLoadFinish(loading, evaluations);
  }

  notifyLoadFinish = (loading, evaluations) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(
        this.isEmpty(loading, evaluations),
        this.isLoading(loading, evaluations),
      );
    }
  };

  isLoading = (loading, evaluations) => loading && !evaluations;

  isEmpty = (loading, evaluations) => !loading && (!evaluations || evaluations.length === 0);

  isLastEvaluation = () => this.totalOfEvaluations() - 1 === this.state.currentIndex;

  totalOfEvaluations = () => this.props.evaluations.length;

  handleFeedbackClose = () => {
    this.setState({ feedbackModalOpened: false });

    if (this.props.onFinish) this.props.onFinish();
  };

  mapUserRates = (evaluation, rate) => {
    const userRates = this.state.userRates;
    const newUserRate = { questionId: evaluation.id, rate };

    if (userRates.length === 0) return [newUserRate];
    const newUserRates = userRates.filter(userRate => userRate.questionId !== evaluation.id);
    newUserRates.push(newUserRate);

    return newUserRates;
  };

  handleRate = rate => {
    const evaluation = this.props.evaluations[this.state.currentIndex];
    this.setState({
      userRates: this.mapUserRates(evaluation, rate),
      nextActionDisabled: false,
    });
  };

  getCycleNumber = cycles => {
    return cycles.length > 0 ? cycles[0].numero : 0;
  };

  handleClose = buttonClicked => {
    if (!buttonClicked) return;

    if (this.isLastEvaluation()) {
      this.setState({ modalOpened: false });
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
            input: { action: this.state.userRates },
            sellerId: this.props.sellerId,
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
            this.handleEvaluationError();
            return;
          }

          if (!response.data.addCourseEvaluations.status) {
            this.handleEvaluationError();
            return;
          }

          const ratingAverage = this.state.userRates.reduce((sum, userRate, index, array) => {
            return sum + userRate.rate / array.length;
          }, 0);
          gtmPushDataLayerEvent({
            event: events.TRAINING_EVALUATION,
            category: categories.TRAINING,
            action: actions.EVALUATION,
            treinamento: {
              name: this.props.course.title,
              id: this.props.course.id,
              type: this.props.course.type,
              startTime: undefined,
              endTime: new Date().getTime(),
              rating: Number(ratingAverage.toFixed(2)),
            },
          });

          this.handleEvaluationSuccess();
          return;
        })
        .catch(err => {
          console.log('err', err);
          this.handleEvaluationError();
        });
      return;
    }

    if (!this.isLastEvaluation())
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        nextActionDisabled: true,
      });
  };

  handleEvaluationSuccess = () => {
    this.handleDefaultEvaluation('courseAddEvaluationSuccess');
  };

  handleEvaluationError = () => {
    this.handleDefaultEvaluation('courseAddEvaluationError');
  };

  handleDefaultEvaluation = msgId => {
    const { formatMessage } = this.props.intl;
    const message = formatMessage({ id: msgId });
    this.setState({
      modalOpened: false,
      feedbackModalOpened: true,
      feedbackModalTitle: message,
    });
  };

  handleBackModal = () => {
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  };

  defineModalActions = () => {
    const actions = [];
    const dynamicLabel = this.isLastEvaluation() ? 'courseEvaluationEnd' : 'courseEvaluationNext';
    const dynamicProps = {
      label: <FormattedMessage id={dynamicLabel} />,
      labelStyle: CourseEvaluationModalAction,
      primary: true,
      onClick: this.handleClose,
      disabled: this.state.nextActionDisabled,
    };

    if (this.state.currentIndex > 0)
      actions.push(
        <FlatButton
          label={<FormattedMessage id="courseEvaluationBack" />}
          labelStyle={CourseEvaluationModalAction}
          onClick={this.handleBackModal}
        />,
      );

    actions.push(<FlatButton {...dynamicProps} />);

    return actions;
  };

  findEvaluateUserRate = evaluation => {
    const userRate = this.state.userRates.find(userRate => {
      return userRate.questionId === evaluation.id;
    });

    return userRate ? userRate.rate : 0;
  };

  render() {
    const { evaluations } = this.props;

    if (!evaluations && this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (this.state.feedbackModalOpened) {
      const action = [
        <FlatButton
          primary
          label={<FormattedMessage id="ok" />}
          labelStyle={CourseEvaluationModalAction}
          onClick={this.handleFeedbackClose}
        />,
      ];
      return (
        <Dialog
          key="feedbackEvaluationModal"
          title={this.state.feedbackModalTitle}
          actions={action}
          modal={false}
          open={true}
          titleStyle={CourseEvaluationModalTitle}
        />
      );
    }

    const currentIndex = this.state.currentIndex;
    const counter = `${currentIndex + 1}/${this.totalOfEvaluations()}`;
    const evaluation = evaluations[currentIndex];
    const actions = this.defineModalActions();

    const ratingColorNormal = red500;

    return (
      <Dialog
        key="evaluationModal"
        title={translate('courseEvaluationTitle')}
        actions={actions}
        modal={false}
        open={this.state.modalOpened}
        titleStyle={CourseEvaluationModalTitle}
        onRequestClose={this.handleClose}
      >
        <ContentWrapper>
          <TitleWrapper>{evaluation.description}</TitleWrapper>
          <RatingWrapper>
            <Rating
              initialRating={this.findEvaluateUserRate(evaluation)}
              onChange={this.handleRate}
              emptySymbol={<ToggleStarBorder color={ratingColorNormal} />}
              fullSymbol={<ToggleStar color={ratingColorNormal} />}
            />
          </RatingWrapper>
        </ContentWrapper>
        <WrapperCount>{counter}</WrapperCount>
      </Dialog>
    );
  }
}

CourseEvaluation.propTypes = {
  course: PropTypes.object.isRequired,
  sellerId: PropTypes.number.isRequired,
  onFinish: PropTypes.func,
  user: PropTypes.object.isRequired,
  appVersion: PropTypes.string.isRequired,
  origem: PropTypes.string.isRequired,
};

export const CourseEvaluationIntl = injectIntl(CourseEvaluation);

export default compose(
  graphql(CourseEvaluationQuery, CourseEvaluationQueryOptions),
  graphql(CourseAddEvaluationMutation),
)(CourseEvaluationIntl);
