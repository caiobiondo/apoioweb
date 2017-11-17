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

const getLastLevel = (growthStatus, currentLevel) => {
  const currentLevelSequence = currentLevel.sequence;
  let lastLevelSequence;
  let lastLevel;

  for (const level of growthStatus.currentPlan.levels) {
    if (
      (!lastLevelSequence && level.levelSequence < currentLevelSequence) ||
      (level.levelSequence > lastLevelSequence && level.levelSequence < currentLevelSequence)
    ) {
      lastLevel = level;
      lastLevelSequence = level.levelSequence;
    }
  }

  return parseLevel(lastLevel);
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

export default {
  parseLevel,
  growthStatusHasLevelData,
  getLastLevel,
  getNextLevel,
  getCurrentLevel,
  getPointsToNextLevel,
};
