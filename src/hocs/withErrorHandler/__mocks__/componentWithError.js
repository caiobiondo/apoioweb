import React, { Component } from 'react';

export default class ComponentWithError extends Component {
  render() {
    throw new Error('throwing an intentional error');
    return <div />;
  }
}
