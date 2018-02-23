import React, { Component } from 'react';
import Search from './organisms/Search/Search';
import Tabs from './organisms/Tabs/Tabs';
import Carroussel from './organisms/Carroussel/Carroussel';
import { Main, Container } from './index.styles';

class Training extends Component {
  render() {
    return (
      <Main>
        <Container>
          <Carroussel />
        </Container>
        <Container>
          <Search />
        </Container>
        <Tabs />
      </Main>
    );
  }
}

export default Training;
