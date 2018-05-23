import React from 'react';
import { shallow } from 'enzyme';
import { LeftArrow, RightArrow, StartedCoursesList } from './StartedCoursesList';
import { ROUTE_PREFIX } from 'config';

describe('StartedCourses', () => {
  it('should call StartedCourse and redirect to a new router', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
      status: 'started',
      courses: [
        {
          id: '1',
          title: 'Como entender as necessidades dos clientes',
          type: 'VIDEO',
          categoryTitle: '',
          thumbnail: '',
        },
      ],
    };

    const result = shallow(<StartedCoursesList {...props} />);
    const instance = result.instance();
    instance.handleCourseClick(props.courses[0])({});

    expect(props.history.push).toBeCalledWith(`${ROUTE_PREFIX}/training/courses/1/video`);
  });

  it('should call StartedCourse and redirect to a new router and not a VIDEO', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
      status: 'started',
      courses: [
        {
          id: '1',
          title: 'Como entender as necessidades dos clientes',
          type: 'HTML5',
          categoryTitle: '',
          thumbnail: '',
        },
      ],
    };

    const result = shallow(<StartedCoursesList {...props} />);
    const instance = result.instance();
    instance.handleCourseClick(props.courses[0])({});

    expect(props.history.push).toBeCalledWith(`${ROUTE_PREFIX}/training/courses/1/html5`);
  });

  it('should render a slide with the courses', () => {
    // given
    const props = {
      status: 'started',
      courses: [
        {
          id: 1,
          title: 'Como entender as necessidades dos clientes',
          type: 'VIDEO',
          categoryTitle: '',
          thumbnail: '',
        },
      ],
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
      status: 'started',
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
