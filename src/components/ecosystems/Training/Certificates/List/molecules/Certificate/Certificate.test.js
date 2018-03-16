import React from 'react';
import { shallow } from 'enzyme';
import Certificate from './Certificate';

describe('Certificate', () => {
  it('should render a certificate', () => {
    const props = {
      certificate: {
        id: 1,
        percentageOfCompletedCourse: 60,
      },
    };

    const result = shallow(<Certificate {...props} />);

    expect(result).toMatchSnapshot();
  });

  it('should call downloadCertificate and open pdfFile ', () => {
    global.open = jest.fn();

    const props = {
      certificate: {
        id: 1,
        percentageOfCompletedCourse: 60,
      },
    };

    const result = shallow(<Certificate {...props} />);
    const instance = result.instance();
    instance.downloadCertificate();

    expect(global.open).toBeCalled();
  });
});
