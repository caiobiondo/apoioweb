import React, { Component } from 'react';
import Certificate from 'components/ecosystems/Training/Certificates/List/molecules/Certificate';
import PageMenu from 'components/ecosystems/Training/atoms/PageMenu/PageMenu';

import { List } from './CertificateList.styles';
import { Paper } from 'natura-ui';

const certificates = [
  {
    id: 51,
    name: 'Arrase nas vendas',
    tt: 'Arrase nas vendas',
    totalOfCourses: '6',
    totalOfCoursesCompleted: '1',
    thumbnail: 'http://treinamento-api-dev.natura.com.br:7000/category/imagethumbnail/51',
    percentageOfCompletedCourse: 16,
  },
  {
    id: 67,
    name: 'TESTE',
    thumbnail: 'http://treinamento-api-dev.natura.com.br:7000/category/imagethumbnail/67',
    totalOfCourses: '1',
    totalOfCoursesCompleted: '0',
    percentageOfCompletedCourse: 0,
  },
  {
    id: 68,
    name: 'Icone teste',
    thumbnail: 'http://treinamento-api-dev.natura.com.br:7000/category/imagethumbnail/68',
    totalOfCourses: '1',
    totalOfCoursesCompleted: '0',
    percentageOfCompletedCourse: 0,
  },
];

class CertificateList extends Component {
  render() {
    return (
      <Paper>
        <PageMenu />
        <List>
          {certificates.map((certificate, index) => (
            <Certificate key={index} index={index} certificate={certificate} />
          ))}
        </List>
      </Paper>
    );
  }
}

export default CertificateList;
