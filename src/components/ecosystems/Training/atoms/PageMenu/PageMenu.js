import React, { Component } from 'react';
import { Wrapper, LinkWrapper, Link, ActiveLink } from './PageMenu.styles';
import { NavLink } from 'react-router-dom';
import { translate } from 'locale';

const menu = [
  { link: '/training/courses', label: translate('courses') },
  { link: '/training/a', label: translate('categories') },
  { link: '/training/c', label: translate('myList') },
  { link: '/training/b', label: translate('certificate') },
];

class PageMenu extends Component {
  render() {
    return (
      <Wrapper>
        {menu.map((item, key) => (
          <LinkWrapper key={item.link || key}>
            <NavLink to={item.link} exact={item.exact} style={Link} activeStyle={ActiveLink}>
              {item.label}
            </NavLink>
          </LinkWrapper>
        ))}
      </Wrapper>
    );
  }
}

export default PageMenu;
