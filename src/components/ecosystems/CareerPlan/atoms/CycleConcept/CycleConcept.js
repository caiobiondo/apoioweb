import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import {
  CycleConceptWrapper,
  CycleConceptValue,
  ConceptTooltipWrapper,
} from './CycleConcept.styles';

export default class CycleConcept extends Component {
  renderTooltipContent() {
    const { concept, size } = this.props;

    return (
      <ConceptTooltipWrapper>
        <CycleConceptValue concept={concept} size={size} /> {concept}
      </ConceptTooltipWrapper>
    );
  }

  render() {
    const { concept, size } = this.props;

    return (
      <CycleConceptWrapper>
        <Tooltip
          disabled={!concept}
          position="bottom"
          className="Tooltip"
          theme="light"
          html={this.renderTooltipContent()}
        >
          <CycleConceptValue concept={concept} size={size} />
        </Tooltip>
      </CycleConceptWrapper>
    );
  }
}

CycleConcept.propTypes = {
  concept: propTypes.string.isRequired,
  size: propTypes.string,
};

CycleConcept.defaultProps = {
  size: 'normal',
};
