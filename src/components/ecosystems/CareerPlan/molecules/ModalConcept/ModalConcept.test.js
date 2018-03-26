import React from 'react';
import { shallow } from 'enzyme';
import { ModalConcept } from './ModalConcept';

const setup = propOverrides => {
  const props = Object.assign(
    {
      actions: [<button>Test</button>],
    },
    propOverrides,
  );

  const result = shallow(<ModalConcept {...props} />);

  return {
    props,
    result,
  };
};

describe('Modal concept', () => {
  it('should render the modal with the correctly props', () => {
    // given
    const modalConfig = {
      title: 'Title',
      open: false,
      onClose: () => {},
      concepts: [
        { rangeStart: 0, rangeEnd: 1, value: 'Value 1' },
        { rangeStart: 1.1, rangeEnd: 2, value: 'Value 2' },
        { rangeStart: 2.1, rangeEnd: 0, value: 'Value 3' },
      ],
    };

    // when
    const { result } = setup(modalConfig);

    // then
    expect(result).toMatchSnapshot();
  });
});
