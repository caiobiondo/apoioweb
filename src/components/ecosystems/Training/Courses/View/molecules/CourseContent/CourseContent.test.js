import React from 'react';
import { shallow } from 'enzyme';
import { CourseContent } from './CourseContent';

describe('CourseContent', () => {
  it('should render a slide with the courses', () => {
    // given
    const props = {
      courses: [
        {
          id: 1,
          title: 'Como entender as necessidades dos clientes',
          type: 'VIDEO',
          ratedByYou: 'true',
          courseContent: {
            video: '',
          },
        },
        {
          id: 2,
          title: 'Faça Acontecer!',
          type: 'VIDEO',
          ratedByYou: 'false',
          courseContent: {
            video: '',
          },
        },
        {
          id: 3,
          title: 'Planejamento do Ciclo',
          type: 'VIDEO',
          ratedByYou: 'true',
          courseContent: {
            video: '',
          },
        },
      ],
    };

    // when
    const result = shallow(<CourseContent {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should not render a slide when courses are null', () => {
    // given
    const props = {
      courses: null,
    };

    // when
    const result = shallow(<CourseContent {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
