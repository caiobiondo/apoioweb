import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { LevelProgressBar } from 'natura-ui';

const getSliderText = currentPoints => {
  return `${currentPoints} pts`;
};

const getCurrentPointsPercentage = (currentPoints, currentLevel) => {
  if (!currentLevel.points) {
    return 100;
  }

  return 100 * currentPoints / currentLevel.points;
};

const ScoreProgress = props => {
  const { currentLevel, lastLevel, nextLevel, currentPoints, isOnLastLevel } = props;

  if (isOnLastLevel) {
    currentLevel.points = null;
  }

  return (
    <LevelProgressBar
      currentLevel={currentLevel}
      lastLevel={lastLevel}
      nextLevel={nextLevel}
      sliderText={getSliderText(currentPoints)}
      sliderTextColor={'#fff'}
      value={getCurrentPointsPercentage(currentPoints, currentLevel)}
    />
  );
};

ScoreProgress.propTypes = {
  growthStatus: PropTypes.object,
};

ScoreProgress.defaultProps = {
  growthStatus: {},
};

export default injectIntl(ScoreProgress);
