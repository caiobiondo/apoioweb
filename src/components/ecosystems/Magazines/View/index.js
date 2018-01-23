import { Component } from 'react';

export default class MagazineWrapper extends Component {
  render() {
    return JSON.stringify(this.props.location.state.magazine);
  }
}
