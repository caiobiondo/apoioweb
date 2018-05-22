import React, { Component } from 'react';
import { Wrapper, LinkWrapper, Link, ActiveLink } from './PageMenu.styles';
import { NavLink } from 'react-router-dom';
import { translate } from 'locale';
import { ROUTE_PREFIX } from 'config';

const menu = [
  { link: `${ROUTE_PREFIX}/training/courses`, label: translate('courses') },
  { link: `${ROUTE_PREFIX}/training/categories`, label: translate('categories') },
  { link: `${ROUTE_PREFIX}/training/my-list`, label: translate('myList') },
  { link: `${ROUTE_PREFIX}/training/certificates`, label: translate('certificate') },
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
