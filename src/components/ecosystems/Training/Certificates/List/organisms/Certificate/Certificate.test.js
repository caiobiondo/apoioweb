import React from 'react';
import { shallow } from 'enzyme';
import { Certificate } from './Certificate';

describe('Certificate', () => {
  it('should render a certificate', () => {
    const props = {
      certificate: {
        id: 1,
        percentageOfCompletedCourse: 60,
      },
      user: {
        codigo: 1234,
        estrutura: {
          codigo: 1,
          ciclo: {
            numero: 201801,
          },
          gerenciaMercado: {
            codigo: 2,
          },
          regiaoEstrategica: {
            codigo: 3,
          },
          gerenciaVenda: {
            codigo: 4,
          },
          setor: {
            codigo: 5,
          },
          cdPapelAtivo: 2,
          cdCanalCaptacao: 1,
        },
      },
      client: {
        query: jest.fn().mockReturnValue(
          Promise.resolve({
            data: {
              trainingCertificateDownload: {
                categoryId: 1,
                downloadUrl: 'download url',
              },
            },
          }),
        ),
      },
    };

    const result = shallow(<Certificate {...props} />);

    expect(result).toMatchSnapshot();
  });

  it('should call downloadCertificate and open pdfFile ', async () => {
    global.open = jest.fn();

    const props = {
      certificate: {
        id: 1,
        percentageOfCompletedCourse: 60,
      },
      user: {
        codigo: 1234,
        estrutura: {
          codigo: 1,
          ciclo: {
            numero: 201801,
          },
          gerenciaMercado: {
            codigo: 2,
          },
          regiaoEstrategica: {
            codigo: 3,
          },
          gerenciaVenda: {
            codigo: 4,
          },
          setor: {
            codigo: 5,
          },
          cdPapelAtivo: 2,
          cdCanalCaptacao: 1,
        },
      },
      client: {
        query: jest.fn().mockReturnValue(
          Promise.resolve({
            data: {
              trainingCertificateDownload: {
                categoryId: 1,
                downloadUrl: 'download url',
              },
            },
          }),
        ),
      },
    };

    const result = shallow(<Certificate {...props} />);
    const instance = result.instance();
    instance.downloadCertificate();

    expect(props.client.query).toBeCalled();
  });
});
