import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LevelProgressBar } from 'natura-ui';
import { Explanation } from '../PeriodScore.styles';

const parseLevel = level => {
  if (!level) {
    return {};
  }

  /* eslint-disable camelcase */
  const { color_r, color_g, color_b } = level;

  return {
    color: `rgb(${color_r}, ${color_g}, ${color_b})`,
    id: level.levelId,
    name: level.levelName,
    points: level.levelPointsRangeEnd,
    sequence: level.levelSequence,
  };
  /* eslint-enable camelcase */
};

const growthStatusHasLevelData = growthStatus => {
  return (
    growthStatus &&
    growthStatus.currentLevelId &&
    growthStatus.currentPlan &&
    growthStatus.currentPlan.levels
  );
};

const getLastLevel = (growthStatus, currentLevel) => {
  const currentLevelSequence = currentLevel.sequence;
  let lastLevelSequence = currentLevelSequence;
  let lastLevel;

  for (const level of growthStatus.currentPlan.levels) {
    if (level.levelSequence > lastLevelSequence && level.levelSequence < currentLevelSequence) {
      lastLevel = level;
      lastLevelSequence = level.levelSequence;
    }
  }

  return parseLevel(lastLevel);
};

const getNextLevel = (growthStatus, currentLevel) => {
  const currentLevelSequence = currentLevel.sequence;
  let nextLevelSequence = currentLevelSequence;
  let nextLevel;

  for (const level of growthStatus.currentPlan.levels) {
    if (level.levelSequence < nextLevelSequence && level.levelSequence > currentLevelSequence) {
      nextLevel = level;
      nextLevelSequence = level.levelSequence;
    }
  }

  return parseLevel(nextLevel);
};

const getSliderText = growthStatus => {
  return `${growthStatus.periodTotalPoints} pts`;
};

const getCurrentPointsPercentage = growthStatus => {
  return 50;
};

const Progress = props => {
  const { growthStatus } = props;
  if (!growthStatusHasLevelData(growthStatus)) {
    return (
      <Explanation>
        <FormattedMessage id="noDataToGenerateGraphExplanation" />
      </Explanation>
    );
  }

  const currentLevel = parseLevel(props.currentLevel);

  return (
    <LevelProgressBar
      currentLevel={currentLevel}
      lastLevel={getLastLevel(growthStatus, currentLevel)}
      nextLevel={getNextLevel(growthStatus, currentLevel)}
      sliderText={getSliderText(growthStatus)}
      // sliderTextColor={}
      // sliderWidth={}
      value={getCurrentPointsPercentage(growthStatus)}
    />
  );
};

Progress.propTypes = {
  growthStatus: PropTypes.object,
};

Progress.defaultProps = {
  growthStatus: {},
};

export default injectIntl(Progress);
