import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';
import { FlatButton, Dialog } from 'natura-ui';

import { PercentageFormat } from 'utils/numberFormat';

import { IndicatorConceptList, IndicatorConceptListItem } from './ModalConcept.styles';
import { CareerPlanModal } from 'components/ecosystems/CareerPlan/index.styles.js';

export class ModalConcept extends Component {
  constructor({ indicator }) {
    super();
  }

  renderConfirmationDialogContent() {
    const { concepts } = this.props;

    return (
      <IndicatorConceptList>
        {concepts.map(concept => {
          const { rangeStart, rangeEnd, value } = concept;
          let conceptRange = null;

          if (!rangeStart && rangeEnd) {
            conceptRange = (
              <span>
                <FormattedMessage
                  id="careerPlanBelowRange"
                  values={{ rangeEnd: <PercentageFormat value={rangeEnd} /> }}
                />
              </span>
            );
          }

          if (rangeStart && !rangeEnd) {
            conceptRange = (
              <span>
                <FormattedMessage
                  id="careerPlanAboveRange"
                  values={{ rangeStart: <PercentageFormat value={rangeStart} /> }}
                />
              </span>
            );
          }

          if (rangeStart && rangeEnd) {
            conceptRange = (
              <span>
                <FormattedMessage
                  id="careerPlanBetweenRange"
                  values={{
                    rangeStart: <PercentageFormat value={rangeStart} />,
                    rangeEnd: <PercentageFormat value={rangeEnd} />,
                  }}
                />
              </span>
            );
          }

          return (
            <IndicatorConceptListItem key={value} concept={concept}>
              <span>{value}</span>
              {conceptRange}
            </IndicatorConceptListItem>
          );
        })}
      </IndicatorConceptList>
    );
  }

  render() {
    const { open, onClose, title } = this.props;
    const actions = [
      <FlatButton
        label={<FormattedMessage id="close" />}
        primary={true}
        onClick={onClose}
        labelStyle={CareerPlanModal.label}
      />,
    ];

    return (
      <Dialog
        key="informationDialog"
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onClose}
        contentStyle={CareerPlanModal.content}
        bodyStyle={CareerPlanModal.body}
        titleStyle={CareerPlanModal.title}
        paperProps={{ style: CareerPlanModal.paper }}
      >
        {this.renderConfirmationDialogContent()}
      </Dialog>
    );
  }
}

ModalConcept.propTypes = {
  concepts: propTypes.array.isRequired,
  onClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
};

export const IndicatorWithIntl = injectIntl(ModalConcept);

export default IndicatorWithIntl;
