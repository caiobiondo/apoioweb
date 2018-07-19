import React from 'react';
import { shallow } from 'enzyme';
import { CourseEvaluation } from './CourseEvaluation';

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };

  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
      course: {
        id: 1,
        title: '',
        type: 'VIDEO',
        ratedByYou: 'true',
        courseContent: {
          video: '',
          videoEmbedUrl: '',
        },
        thumbnail: '',
        stoppedAt: 123,
      },
      sellerId: 1,
      evaluations: [
        {
          id: 1,
          description: 'Description',
        },
        {
          id: 2,
          description: 'Description',
        },
      ],
      mutate: jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            addCourseEvaluations: {
              status: true,
              message: 'success',
            },
          },
        }),
      ),
      onLoadFinished: jest.fn(),
      onFinish: jest.fn(),
      intl,
    },
    propOverrides,
  );

  const result = shallow(<CourseEvaluation {...props} />);

  return {
    props,
    result,
  };
};

describe('Course Evaluation', () => {
  it('renders correctly when loading', () => {
    // given
    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: true, evaluations: null });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    // given
    // when
    const { result, props } = setup({
      fetchMore: jest.fn(),
      loading: false,
    });
    result.instance().componentWillReceiveProps({ loading: false, evaluations: props.evaluations });

    // then
    expect(props.onLoadFinished).toBeCalledWith(false, false);
  });

  describe('Dialogs', () => {
    it('render evaluation dialog', () => {
      // given
      // when
      const { result } = setup({ fetchMore: jest.fn(), loading: false });

      // then
      expect(result).toMatchSnapshot();
    });

    it('renders feedback evaluation dialog', () => {
      // given
      // when
      const { result } = setup({ fetchMore: jest.fn(), loading: false });
      result.setState({ feedbackModalOpened: true });

      // then
      expect(result).toMatchSnapshot();
    });

    it('correctly call mutation', () => {
      // given
      // when
      const { result, props } = setup({ fetchMore: jest.fn(), loading: false });
      result.setState({ currentIndex: 1 });
      result.instance().handleClose(true);

      // then
      expect(props.mutate).toBeCalled();
    });
  });

  describe('when feedback modal is closed', () => {
    it('calls onFinish callback', () => {
      // given
      // when
      const { result, props } = setup({ fetchMore: jest.fn(), loading: false });
      result.instance().handleFeedbackClose();

      // then
      expect(props.onFinish).toBeCalled();
    });
  });
});
