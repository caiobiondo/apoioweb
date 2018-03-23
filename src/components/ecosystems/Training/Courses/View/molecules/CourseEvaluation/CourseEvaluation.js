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
  RatingStyles,
  ContentWrapper,
  WrapperCount,
} from './CourseEvaluation.styles';

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

  handleClose = () => {
    if (this.isLastEvaluation()) {
      this.setState({ modalOpened: false });
      this.props
        .mutate({
          variables: {
            input: { action: this.state.userRates },
            sellerId: this.props.sellerId,
            courseId: this.props.courseId,
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
              value={this.findEvaluateUserRate(evaluation)}
              max={5}
              itemIconStyle={RatingStyles.itemIconStyle}
              itemStyle={RatingStyles.itemStyle}
              onChange={this.handleRate}
            />
          </RatingWrapper>
        </ContentWrapper>
        <WrapperCount>{counter}</WrapperCount>
      </Dialog>
    );
  }
}

CourseEvaluation.propTypes = {
  courseId: PropTypes.number.isRequired,
  sellerId: PropTypes.number.isRequired,
};

export const CourseEvaluationIntl = injectIntl(CourseEvaluation);

export default compose(
  graphql(CourseEvaluationQuery, CourseEvaluationQueryOptions),
  graphql(CourseAddEvaluationMutation),
)(CourseEvaluationIntl);
