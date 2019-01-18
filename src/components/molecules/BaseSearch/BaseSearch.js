import { Component } from 'react';

export class BaseSearch extends Component {
  state = {
    name: '',
    status: '',
  };

  handleNameChange = (event, name) => {
    this.setState({ ...this.state, name });
  };

  handleSelectChange = event => {
    this.setState({ ...this.state, status: event.target.value });
  };

  onSubmit = event => {
    event.stopPropagation();
    this.onSearch();
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  };

  onSearch = () => {
    const { name, status } = this.state;
    this.props.onSearch({ name, status });
  };
}

export default BaseSearch;
