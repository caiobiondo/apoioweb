import React from 'react';
import { shallow } from 'enzyme';
import { RelatedCourses } from './RelatedCourses';

describe('RelatedCourses', () => {
  it('should render a slide with the courses', () => {
    // given
    const props = {
      courses: [
        {
          id: 1,
          title: 'Como entender as necessidades dos clientes',
          type: 'VIDEO',
        },
        {
          id: 2,
          title: 'Faça Acontecer!',
          type: 'VIDEO',
        },
        {
          id: 3,
          title: 'Planejamento do Ciclo',
          type: 'VIDEO',
        },
      ],
    };

    // when
    const result = shallow(<RelatedCourses {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should not render a slide when courses are null', () => {
    // given
    const props = {
      courses: [],
    };

    // when
    const result = shallow(<RelatedCourses {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
