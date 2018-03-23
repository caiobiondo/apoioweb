import React from 'react';
import { shallow } from 'enzyme';
import { LeftArrow, RightArrow, StartedCoursesList } from './StartedCoursesList';

describe('StartedCourses', () => {
  it('should call StartedCourse and redirect to a new router', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
      courses: [
        {
          id: '1',
          title: 'Como entender as necessidades dos clientes',
          type: 'VIDEO',
          categoryTitle: '',
          thumbnail: '',
        },
      ],
      user: {},
      status: 'start',
    };

    const result = shallow(<StartedCoursesList {...props} />);
    const instance = result.instance();
    instance.handleCourseClick(props.courses[0])({});

    expect(props.history.push).toBeCalledWith(`/training/courses/1`);
  });

  it('should call StartedCourse and redirect to a new router and not a VIDEO', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
      courses: [
        {
          id: '1',
          title: 'Como entender as necessidades dos clientes',
          type: 'HTML5',
          categoryTitle: '',
          thumbnail: '',
        },
      ],
      user: {},
      status: 'start',
    };

    const result = shallow(<StartedCoursesList {...props} />);
    const instance = result.instance();
    instance.handleCourseClick(props.courses[0])({});

    expect(props.history.push).toBeCalledWith(`/training/courses/1/start`);
  });

  it('should render a slide with the courses', () => {
    // given
    const props = {
      courses: [
        {
          id: 1,
          title: 'Como entender as necessidades dos clientes',
          type: 'VIDEO',
          categoryTitle: '',
          thumbnail: '',
        },
      ],
      user: {},
      status: 'start',
    };

    // when
    const result = shallow(<StartedCoursesList {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should not render a slide when courses are null', () => {
    // given
    const props = {
      courses: null,
    };

    // when
    const result = shallow(<StartedCoursesList {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});

describe('LeftArrow', () => {
  it('should render null', () => {
    // given
    const props = {
      onClick: () => {},
      currentSlide: 0,
    };

    // when
    const result = shallow(<LeftArrow {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should render a left arrow', () => {
    // given
    const props = {
      onClick: () => {},
      currentSlide: 1,
    };

    // when
    const result = shallow(<LeftArrow {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});

describe('RightArrow', () => {
  it('when right arrow is null', () => {
    // given
    const props = {
      onClick: () => {},
      currentSlide: 0,
      slideCount: 0,
      slidesToScroll: 0,
    };
    // when
    const result = shallow(<RightArrow {...props} />);
    // then
    expect(result).toMatchSnapshot();
  });
  it('should render a right arrow', () => {
    // given
    const props = {
      onClick: () => {},
      currentSlide: 2,
      slideCount: 5,
      slidesToScroll: 2,
    };

    // when
    const result = shallow(<RightArrow {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
