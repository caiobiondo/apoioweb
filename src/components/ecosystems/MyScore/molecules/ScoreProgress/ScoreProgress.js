import React from 'react';
import PropTypes from 'prop-types';
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
  const { currentLevel, previousLevel, nextLevel, currentPoints, isOnLastLevel } = props;

  if (isOnLastLevel) {
    currentLevel.points = null;
  }

  return (
    <LevelProgressBar
      currentLevel={currentLevel}
      previousLevel={previousLevel}
      nextLevel={nextLevel}
      sliderText={getSliderText(currentPoints)}
      sliderTextColor={'#fff'}
      value={getCurrentPointsPercentage(currentPoints, currentLevel)}
    />
  );
};

ScoreProgress.propTypes = {
  currentLevel: PropTypes.object,
  previousLevel: PropTypes.object,
  nextLevel: PropTypes.object,
  currentPoints: PropTypes.number,
  isOnLastLevel: PropTypes.bool,
};

export default ScoreProgress;
