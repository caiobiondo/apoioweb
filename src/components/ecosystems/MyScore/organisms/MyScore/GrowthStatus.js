import React from 'react';
import { FormattedMessage } from 'react-intl';

const parseLevel = level => {
  if (!level) {
    return {};
  }

  /* eslint-disable camelcase */
  const { color_r, color_g, color_b } = level;

  return {
    color: `rgb(${color_r}, ${color_g}, ${color_b})`,
    id: level.levelId,
    text: level.levelName,
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

const getPreviousLevel = (growthStatus, currentLevel) => {
  const currentLevelSequence = currentLevel.sequence;
  let previousLevelSequence;
  let previousLevel;

  for (const level of growthStatus.currentPlan.levels) {
    if (
      (!previousLevelSequence && level.levelSequence < currentLevelSequence) ||
      (level.levelSequence > previousLevelSequence && level.levelSequence < currentLevelSequence)
    ) {
      previousLevel = level;
      previousLevelSequence = level.levelSequence;
    }
  }

  return parseLevel(previousLevel);
};

const getNextLevel = (growthStatus, currentLevel) => {
  const currentLevelSequence = currentLevel.sequence;
  let nextLevelSequence;
  let nextLevel;

  for (const level of growthStatus.currentPlan.levels) {
    if (
      (!nextLevelSequence && level.levelSequence > currentLevelSequence) ||
      (level.levelSequence < nextLevelSequence && level.levelSequence > currentLevelSequence)
    ) {
      nextLevel = level;
      nextLevelSequence = level.levelSequence;
    }
  }

  return parseLevel(nextLevel);
};

const getCurrentLevel = growthStatus => {
  if (!growthStatus) {
    return {};
  }
  const { currentLevelId } = growthStatus;

  const level = growthStatus.currentPlan.levels.find(level => {
    return level.levelId === currentLevelId;
  });

  return parseLevel(level);
};

const getPointsToNextLevel = (growthStatus, currentLevel) => {
  return currentLevel.points - growthStatus.periodTotalPoints;
};

const parseAllLevels = growthStatus => {
  const levels = [];

  const numberOfLevels = growthStatus.currentPlan.levels.length;
  for (const level of growthStatus.currentPlan.levels) {
    const parsedLevel = parseLevel(level);
    if (level.levelSequence === numberOfLevels) {
      parsedLevel.pointsText = (
        <FormattedMessage
          id="pointsFrom"
          values={{
            points: level.levelPointsRangeStart,
          }}
        />
      );
    } else {
      parsedLevel.pointsText = (
        <FormattedMessage
          id="levelRange"
          values={{
            start: level.levelPointsRangeStart || 0,
            end: level.levelPointsRangeEnd,
          }}
        />
      );
    }

    levels.push(parsedLevel);
  }

  return levels;
};

export default {
  parseLevel,
  parseAllLevels,
  growthStatusHasLevelData,
  getPreviousLevel,
  getNextLevel,
  getCurrentLevel,
  getPointsToNextLevel,
};
