import React, { Component } from 'react';
import { Wrapper, LinkWrapper, Link, ActiveLink } from './PageMenu.styles';
import { NavLink } from 'react-router-dom';
import { translate } from 'locale';
import { ROUTE_PREFIX } from 'config';
import { gtmPushDataLayerEvent, events } from 'utils/googleTagManager';

const menu = [
  { link: `${ROUTE_PREFIX}/training/recommendations`, label: translate('recommendations') },
  { link: `${ROUTE_PREFIX}/training/courses`, label: translate('courses') },
  { link: `${ROUTE_PREFIX}/training/categories`, label: translate('categories') },
  { link: `${ROUTE_PREFIX}/training/my-list`, label: translate('myList') },
  { link: `${ROUTE_PREFIX}/training/certificates`, label: translate('certificate') },
  { link: `${ROUTE_PREFIX}/training/midialibary`, label: translate('midialibary') },
];

class PageMenu extends Component {
  triggerGtmEvent = link => {
    if (window.location.pathname === link) return;

    gtmPushDataLayerEvent({
      event: events.PAGE_VIEW,
      page: {
        previousUrl: window.location.pathname,
        url: link,
        title: document.title,
      },
    });
  };

  render() {
    return (
      <Wrapper>
        {menu.map((item, key) => (
          <LinkWrapper key={item.link || key}>
            <NavLink
              to={item.link}
              exact={item.exact}
              style={Link}
              activeStyle={ActiveLink}
              onClick={() => {
                this.triggerGtmEvent(item.link);
              }}
            >
              {item.label}
            </NavLink>
          </LinkWrapper>
        ))}
      </Wrapper>
    );
  }
}

export default PageMenu;
