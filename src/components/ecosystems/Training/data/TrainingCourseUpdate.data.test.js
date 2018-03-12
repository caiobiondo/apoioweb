import { TrainingCourseUpdateMutation } from './TrainingCourseUpdate.data';

describe('TrainingCourseUpdateMutation', () => {
  it('should be the correct mutation', () => {
    expect(TrainingCourseUpdateMutation).toMatchSnapshot();
  });
});
