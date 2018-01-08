import { Component } from 'react';

export class BaseSearch extends Component {
  state = {
    name: '',
  };

  handleNameChange = (event, name) => {
    this.setState({ name });
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
    const { name } = this.state;
    this.props.onSearch({ name });
  };
}

export default BaseSearch;
