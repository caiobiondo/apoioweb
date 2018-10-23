import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrainingCourse from 'components/ecosystems/Training/molecules/TrainingCourse';

import { List } from './TrainingCourses.styles';

export default class TrainingCourses extends Component {
  // 19-10-18 Luiz Júnior
  // renderListNoFinished = courses => {
  //   return courses.map((course, index) => {
  //     if (course.status !== 'finished') {
  //       return (
  //         <TrainingCourse key={index} course={course}>
  //           {this.props.renderMenuItems(course)}
  //         </TrainingCourse>
  //       );
  //     }
  //   });
  // };
  // 19-10-18 Luiz Júnior
  renderCompletedEnd = courses => {
    const obj = [...courses];
    /* necessário validar os 3 status por que caso validar para ordenar apenas os cursos finalizados para o final da lista, ocorrerá 
     uma divergência de ordem no menu de 'categorias' por causa dos tipos de cursos, por ex: VIDEO, HTML, WEB e etc. */
    obj.sort((item1, item2) => {
      if (item1.status === 'pending') return -1;
      if (item1.status === 'started') return -1;
      if (item1.status === 'finished') return 1;
    });
    return obj.map((course, index) => {
      return (
        <TrainingCourse key={index} course={course}>
          {this.props.renderMenuItems(course)}
        </TrainingCourse>
      );
    });
  };

  render() {
    if (!this.props.courses || !this.props.courses.length) {
      return null;
    }
    // console.log(this.props.courses);
    return (
      <List>
        {this.renderCompletedEnd(this.props.courses)}
        {/* {this.props.courses.map((course, index) => (
          <TrainingCourse key={index} course={course}>
            {this.props.renderMenuItems(course)}
          </TrainingCourse>
        ))} */}
      </List>
    );
  }
}

TrainingCourses.propTypes = {
  renderMenuItems: PropTypes.func,
  courses: PropTypes.array,
};
