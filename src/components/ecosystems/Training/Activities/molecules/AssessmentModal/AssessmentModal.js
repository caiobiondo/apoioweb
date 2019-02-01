//react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//query
import { graphql, compose, withApollo } from 'react-apollo';
import { ActivityViewQuery, ActivityViewQueryOptions } from '../../../data/TrainingActivity.data';
import { AddActivityAnswersMutation } from '../../../data/TrainingActivityAssessment.data';

//components
import { Dialog, FlatButton, Loading } from 'natura-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Input from 'natura-ui/dist/components/Form/Input/Input';

//internationalize
import { injectIntl, FormattedMessage } from 'react-intl';

//styles
import styles, { TitleWrapper } from './AssessmentModal.styles';

//route
import { withRouter } from 'react-router-dom';
import { ROUTE_PREFIX } from 'config';
import { getHeadersFromUser } from '../../../../../../utils/getUserParams';

const INITIAL_STATE = {
  assessment: null,
  answers: [],
  selected: 1, //answer's index selected
  initialTime: null,

  errorMessage: '',
};

const QUESTION_CATEGORY = {
  MultiChoiceSingle: 'MULTI_CHOICE_SINGLE',
  MultiChoiceMultiple: 'MULTI_CHOICE_MULTIPLE',
  Text: 'TEXT',
};

class AssessmentModal extends Component {
  state = INITIAL_STATE;

  validateCurrentAnswer = callback => {
    //valid answer
    const question = this.state.assessment.questions[this.state.selected - 1];
    const answer = this.state.answers[this.state.selected - 1];

    let validate = true;

    switch (question.type) {
      case QUESTION_CATEGORY.Text:
        validate = answer.answer !== '';
        break;

      case QUESTION_CATEGORY.MultiChoiceSingle:
      case QUESTION_CATEGORY.MultiChoiceMultiple:
        validate = answer.alternativeAnswers.length > 0;
        break;
    }

    this.setState({ errorMessage: validate ? '' : 'Digite um valor válido.' }, () => {
      if (callback !== undefined) {
        callback();
      }
    });
  };

  onCancelButtonPress = () => {
    this.setState(INITIAL_STATE);
    this.props.closeModal();
  };

  onContinueButtonPress = () => {
    this.validateCurrentAnswer(this.goAhed);
  };

  goAhed = () => {
    /* submit answers */
    if (this.state.selected === this.state.answers.length) {
      if (this.state.errorMessage === '') {
        this.setState(INITIAL_STATE);
        this.props.closeModal();
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

        const timeSpentInSeconds = (new Date().getTime() - this.state.initialTime) / 1000;

        this.props
          .mutate({
            variables: {
              input: {
                id: this.props.activityId,
                timeSpentInSeconds: parseInt(timeSpentInSeconds.toFixed()),
                questions: this.state.answers,
              },
              sellerId: this.props.user.codigo,
              activityId: this.props.activityId,
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
            window.location.reload();
            if (response.error) {
              return;
            }
          })
          .catch(err => {
            console.log('err', err);
          });
      }
      return;
    }

    /* go-to next answer */
    if (this.state.selected + 1 <= this.state.answers.length) {
      if (this.state.errorMessage === '') {
        this.setState({ selected: this.state.selected + 1, errorMessage: '' });
      }
    }
  };

  onMultiChoiceValueChanged = (event, value) => {
    const answers = this.state.answers.map((answer, index) => {
      if (index === this.state.selected - 1) {
        return { ...answer, alternativeAnswers: [value] };
      } else {
        return { ...answer };
      }
    });
    this.setState({ answers });
  };

  onTextQuestionValueChanged = event => {
    const value = event.target.value;
    const answers = this.state.answers.map((answer, index) => {
      if (index === this.state.selected - 1) {
        return { ...answer, answer: value };
      } else {
        return { ...answer };
      }
    });
    this.setState({ answers });
  };

  renderContent = () => {
    /* 1. if assessment isn't requested yet.*/
    if (this.state.assessment === null || this.state.assessment === undefined) {
      return null;
    }

    /* else 1. */
    const question = this.state.assessment.questions[this.state.selected - 1];

    switch (question.type) {
      case QUESTION_CATEGORY.Text:
        return (
          <TextQuestion
            id={question.id}
            description={question.description}
            onChange={this.onTextQuestionValueChanged}
            value={this.state.answers[this.state.selected - 1].answer}
            errorMessage={this.state.errorMessage}
            validate={() => {
              this.validateCurrentAnswer();
            }}
          />
        );
        break;

      case QUESTION_CATEGORY.MultiChoiceSingle:
      case QUESTION_CATEGORY.MultiChoiceMultiple:
        return (
          <MultiChoiceQuestion
            id={question.id}
            description={question.description}
            alternatives={question.alternatives}
            onChange={this.onMultiChoiceValueChanged}
            errorMessage={this.state.errorMessage}
            validate={() => {
              this.validateCurrentAnswer();
            }}
          />
        );
        break;
    }
  };

  componentDidUpdate = () => {
    /* if apollo request activity successfully */
    if (!!this.props.activity) {
      /* if props receive an assessment with different id, then update assessment state. */
      if (
        this.state.assessment === null ||
        this.state.assessment.id !== this.props.activity.results[0].assessment.id
      ) {
        const answers = [];
        this.props.activity.results[0].assessment.questions.forEach(question => {
          switch (question.type) {
            case QUESTION_CATEGORY.Text:
              answers.push({ id: question.id, answer: '' });
              break;

            case QUESTION_CATEGORY.MultiChoiceSingle:
            case QUESTION_CATEGORY.MultiChoiceMultiple:
              answers.push({ id: question.id, alternativeAnswers: [] });
              break;
          }
        });

        this.setState({
          assessment: this.props.activity.results[0].assessment,
          answers,
          initialTime: new Date().getTime(),
        });
      }
    }
  };

  render() {
    const progress = this.state.selected + '/' + this.state.answers.length;

    const actions = [
      <FlatButton
        key="cancel"
        label={<FormattedMessage id="cancel" />}
        primary={false}
        labelStyle={styles.actions}
        onClick={this.onCancelButtonPress}
      />,
      <FlatButton
        key="go-ahead"
        label={
          <FormattedMessage
            id={this.state.selected === this.state.answers.length ? 'finish' : 'continue'}
          />
        }
        primary={true}
        labelStyle={styles.actions}
        onClick={this.onContinueButtonPress}
      />,
    ];

    return (
      <Dialog
        key={this.props.key}
        title={
          this.state.assessment === null ? null : (
            <TitleWrapper>
              <h1 style={styles.title}>{this.props.title}</h1>
              <p style={styles.progress}>{progress}</p>
            </TitleWrapper>
          )
        } // onRequestClose={this.onCloseModal}
        actions={this.state.assessment === null ? null : actions}
        modal={false}
        open={this.props.visible}
        contentStyle={styles.content}
        titleStyle={styles.title}
        bodyStyle={styles.body}
        paperProps={{ style: styles.paper }}
      >
        {this.state.assessment === null ? <Loading {...styles.loading} /> : this.renderContent()}
      </Dialog>
    );
  }
}

AssessmentModal.PropTypes = {
  //instance data
  key: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,

  //query params
  activityID: PropTypes.number,
  courseID: PropTypes.number,
  user: PropTypes.object,

  //funcs
  closeModal: PropTypes.func,
};

const AssessmentModalIntl = injectIntl(AssessmentModal);
const AssessmentModalWithApollo = withApollo(AssessmentModalIntl);

export default withRouter(
  compose(
    graphql(ActivityViewQuery, ActivityViewQueryOptions),
    graphql(AddActivityAnswersMutation),
  )(AssessmentModalWithApollo),
);

export const TextQuestion = props => (
  <div>
    <p style={styles.description}>{props.description}</p>
    <Input
      name="answer"
      type="text"
      label="Resposta:"
      onChange={props.onChange}
      value={props.value}
      onBlur={props.validate}
      placeholder="Digite aqui a resposta."
      rows={1}
      style={styles.inputTextQuestion}
      errorMessage={props.errorMessage}
    />
  </div>
);

export const MultiChoiceQuestion = props => (
  <div>
    <p style={styles.description}>{props.description}</p>
    <p style={styles.errorMessage}>{props.errorMessage}</p>
    <RadioButtonGroup name="multiChoiceQuestion" onChange={props.onChange}>
      {props.alternatives.map(alternative => (
        <RadioButton
          key={alternative.id}
          value={alternative.id}
          labelStyle={styles.radioButtonLabel}
          label={alternative.description}
          style={styles.radioButton}
        />
      ))}
    </RadioButtonGroup>
  </div>
);
