import React from 'react';
import { shallow } from 'enzyme';
import Category from './CategoryCourse';

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);

  const result = shallow(<Category {...props} />);

  return {
    props,
    result,
  };
};

describe('Category course', () => {
  it('render correct then the course type is video and there is duration information', () => {
    // given
    const course = {
      id: 1,
      title: 'Test',
      type: 'VIDEO',
      duration: 3600,
    };

    // when
    const { result } = setup({ course });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should get the correct icon when the course type is video', () => {
    // given
    const expectedIcon = 'ico_film_stock';
    const course = {
      id: 1,
      title: 'Test',
      type: 'VIDEO',
    };

    // when
    const { result } = setup({ course });

    const icon = result.find('Icon');

    // then
    expect(icon.props().file).toEqual(expectedIcon);
  });

  it('should get the correct icon when the course type is not video', () => {
    // given
    const expectedIcon = 'ico_file';
    const course = {
      id: 1,
      title: 'Test',
      type: 'HTML',
    };

    // when
    const { result } = setup({ course });

    const icon = result.find('Icon');

    // then
    expect(icon.props().file).toEqual(expectedIcon);
  });

  it('should parse the duration in seconds to minutes correctly', () => {
    // given
    const expectedMinutes = '60:00min';
    const course = {
      id: 1,
      title: 'Test',
      type: 'HTML',
      durationInSeconds: 3600,
    };

    // when
    const { result } = setup({ course });

    // then
    expect(result.html().indexOf(expectedMinutes)).not.toEqual(-1);
  });

  it('should truncate the title when it is bigger than 30 characters', () => {
    // given
    const expectedTitle = 'Lorem ipsum dolor sit amet scu...';
    const course = {
      id: 1,
      title: 'Lorem ipsum dolor sit amet scunds mort atei gravida',
      type: 'HTML',
      durationInSeconds: 3600,
    };

    // when
    const { result } = setup({ course });

    // then
    expect(result.html().indexOf(expectedTitle)).not.toEqual(-1);
  });
});
