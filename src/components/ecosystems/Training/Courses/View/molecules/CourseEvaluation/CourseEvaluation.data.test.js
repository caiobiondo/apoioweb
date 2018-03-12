import {
  CourseEvaluationQuery,
  CourseEvaluationQueryOptions,
  CourseAddEvaluationMutation,
} from './CourseEvaluation.data';

describe('CourseEvaluationQuery', () => {
  it('should be the correct query', () => {
    expect(CourseEvaluationQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 } };

    const options = CourseEvaluationQueryOptions.options(props);

    expect(options).toEqual({
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        evaluations: [],
      },
    };

    const props = CourseEvaluationQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });

  describe('MutationQuery', () => {
    it('should be the correct mutation', () => {
      expect(CourseAddEvaluationMutation).toMatchSnapshot();
    });
  });
});
