import React from 'react';
import { shallow } from 'enzyme';
import { ListTable } from './ListTable';

describe('Stock Product List Table', () => {
  it('should render correctly when loading', () => {
    const result = shallow(<ListTable loading={true} />);
    expect(result).toMatchSnapshot();
  });

  it('should render correctly when the list is empty', () => {
    const result = shallow(<ListTable loading={false} stockProducts={[]} />);
    expect(result).toMatchSnapshot();
  });

  it('should render correctly when the list is not empty', () => {
    const mockProducts = [
      {
        name: 'Product 1',
      },
      {
        name: 'Product 2',
      },
      {
        name: 'Product 3',
      },
    ];

    const result = shallow(<ListTable loading={false} stockProducts={mockProducts} />);
    expect(result).toMatchSnapshot();
  });
});
