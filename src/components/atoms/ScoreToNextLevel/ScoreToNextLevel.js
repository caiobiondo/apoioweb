import styled from 'styled-components';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Wrapper, ContentWrapper } from './ScoreToNextLevel.styles';

const ScoreToNextLevel = props => {
  return (
    <Wrapper>
      <ContentWrapper>
        <FormattedMessage
          id="pointsToNextLevel"
          values={{ points: <b>{props.points}</b>, nextLevelName: props.nextLevelName }}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

export default ScoreToNextLevel;
