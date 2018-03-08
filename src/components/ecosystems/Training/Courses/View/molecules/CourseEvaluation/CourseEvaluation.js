import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Dialog, FlatButton, Rating, Loading } from 'natura-ui';
import { FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { CourseEvaluationtQuery, CourseEvaluationtQueryOptions } from './CourseEvaluation.data';
import {
  CourseEvaluationModalTitle,
  CourseEvaluationModalAction,
  TittleWrapper,
  RatingWrapper,
  RatingStyles,
  ContentWrapper,
  WrapperCount,
} from './CourseEvaluation.styles';

class CourseEvaluation extends Component {
  state = {
    modalOpened: true,
    currentIndex: 0,
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

  handleClose = () => {
    if (this.isLastEvaluation()) this.setState({ modalOpened: false });
    if (!this.isLastEvaluation())
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
  };

  isLoading = (loading, evaluations) => loading && !evaluations;

  isEmpty = (loading, evaluations) => !loading && (!evaluations || evaluations.length === 0);

  isLastEvaluation = () => this.totalOfEvaluations() - 1 === this.state.currentIndex;

  totalOfEvaluations = () => this.props.evaluations.length;

  defineModalActions = () => {
    const dynamicLabel = this.isLastEvaluation() ? 'courseEvaluationEnd' : 'courseEvaluationNext';
    const dynamicProps = {
      label: <FormattedMessage id={dynamicLabel} />,
      labelStyle: CourseEvaluationModalAction,
      primary: true,
      onClick: this.handleClose,
    };

    return [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        labelStyle={CourseEvaluationModalAction}
        onClick={this.handleClose}
      />,
      <FlatButton {...dynamicProps} />,
    ];
  };

  render() {
    const { evaluations } = this.props;

    if (!evaluations && this.props.loading) {
      return <Loading background="transparent" />;
    }

    const currentIndex = this.state.currentIndex;
    const counter = `${currentIndex + 1}/${this.totalOfEvaluations()}`;
    const evaluation = evaluations[currentIndex];

    const actions = this.defineModalActions();

    return (
      <Dialog
        key="evaluationkModal"
        title={translate('courseEvaluationTitle')}
        actions={actions}
        modal={false}
        open={this.state.modalOpened}
        titleStyle={CourseEvaluationModalTitle}
        onRequestClose={this.handleClose}
      >
        <ContentWrapper>
          <TittleWrapper>{evaluation.description}</TittleWrapper>
          <RatingWrapper>
            <Rating
              value={0}
              max={5}
              itemIconStyle={RatingStyles.itemIconStyle}
              itemStyle={RatingStyles.itemStyle}
            />
          </RatingWrapper>
        </ContentWrapper>
        <WrapperCount>{counter}</WrapperCount>
      </Dialog>
    );
  }
}

export default graphql(CourseEvaluationtQuery, CourseEvaluationtQueryOptions)(CourseEvaluation);
