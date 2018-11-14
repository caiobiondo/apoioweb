import React from 'react';
import { shallow } from 'enzyme';
import { CourseFormSearch } from '../CourseFormSearch/CourseFormSearch';
import toJson from 'enzyme-to-json';

const courseFormSearchProps = {
  onSearch: jest.fn(),
  searchValue: '',
  status: '',
  sectionTitle: { iconName: 'ico_add_customer', value: 'myCustomers' },
  description: 'customersSearchInfo',
  inputLabel: 'customerName',
};

describe('CourseFormSearch Organism', () => {
  it('should render input, select and submit button', () => {
    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);

    expect(toJson(result)).toMatchSnapshot();
  });

  it("should update state's name with value", () => {
    const expectedName = 'a name';

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.handleNameChange(null, expectedName);

    expect(instance.state.name).toEqual(expectedName);
  });

  it("should update state's status with value", () => {
    const value = 'finished';
    const selectInput = {
      target: { value },
    };

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.handleSelectChange(selectInput);

    expect(instance.state.status).toEqual(value);
  });

  it('should call onSearch with filter', () => {
    const event = {
      stopPropagation: jest.fn(),
    };
    const name = 'a name';
    const status = '';

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name, status });
    instance.onSubmit(event);

    expect(courseFormSearchProps.onSearch).toBeCalledWith({ name, status });
    expect(event.stopPropagation).toBeCalled();
  });

  it('should call onSearch with status', () => {
    const event = {
      stopPropagation: jest.fn(),
    };
    const name = '';
    const status = 'finished';

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name, status });
    instance.onSubmit(event);

    expect(courseFormSearchProps.onSearch).toBeCalledWith({ name, status });
    expect(event.stopPropagation).toBeCalled();
  });

  it('should call onSearch with filter and status', () => {
    const event = {
      stopPropagation: jest.fn(),
    };
    const name = 'a name';
    const status = 'finished';

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name, status });
    instance.onSubmit(event);

    expect(courseFormSearchProps.onSearch).toBeCalledWith({ name, status });
    expect(event.stopPropagation).toBeCalled();
  });

  it('should call onSearch with filter when enter is pressed', () => {
    const event = {
      key: 'Enter',
    };
    const name = 'a name';
    const status = 'finished';

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name, status });
    instance.onKeyPress(event);

    expect(courseFormSearchProps.onSearch).toBeCalledWith({ name, status });
  });

  it('should call onSearch with status when enter is pressed', () => {
    const event = {
      key: 'Enter',
    };
    const name = 'a name';
    const status = 'finished';

    const result = shallow(<CourseFormSearch {...courseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name, status });
    instance.onKeyPress(event);

    expect(courseFormSearchProps.onSearch).toBeCalledWith({ name, status });
  });

  it('should not call onSearch with filters when enter is not pressed', () => {
    const onSearch = jest.fn();
    const newCourseFormSearchProps = { ...courseFormSearchProps, onSearch };
    const event = {
      key: 'K',
    };
    const name = 'a name';

    const result = shallow(<CourseFormSearch {...newCourseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onKeyPress(event);

    expect(newCourseFormSearchProps.onSearch).not.toBeCalled();
  });
});
