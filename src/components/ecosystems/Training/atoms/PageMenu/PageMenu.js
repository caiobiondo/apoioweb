import React, { Component } from 'react';
import { Wrapper, LinkWrapper, Link, ActiveLink } from './PageMenu.styles';
import { NavLink } from 'react-router-dom';
import { translate } from 'locale';
import { ROUTE_PREFIX } from 'config';
import { gtmPushDataLayerEvent, events } from 'utils/googleTagManager';

// let menu = [
//   { link: `${ROUTE_PREFIX}/training/courses`, label: translate('courses') },
//   { link: `${ROUTE_PREFIX}/training/categories`, label: translate('categories') },
//   { link: `${ROUTE_PREFIX}/training/my-list`, label: translate('myList') },
//   { link: `${ROUTE_PREFIX}/training/medialibrary`, label: translate('medialibrary') },
//   { link: `${ROUTE_PREFIX}/training/certificates`, label: translate('certificate') },
// ];

const menuItemRecommendation = {
  link: `${ROUTE_PREFIX}/training/recommendations`,
  label: translate('recommendations'),
};

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

  getMenus = recommended => {
    let menu = [
      { link: `${ROUTE_PREFIX}/training/courses`, label: translate('courses') },
      { link: `${ROUTE_PREFIX}/training/categories`, label: translate('categories') },
      { link: `${ROUTE_PREFIX}/training/my-list`, label: translate('myList') },
      { link: `${ROUTE_PREFIX}/training/medialibrary`, label: translate('medialibrary') },
      { link: `${ROUTE_PREFIX}/training/certificates`, label: translate('certificate') },
    ];

    if (recommended && recommended.length > 0) {
      menu = [menuItemRecommendation, ...menu];
    }

    return menu;
  };

  render() {
    console.log('props on pagemenu', this.props);
    const { recommended } = this.props;
    return (
      <Wrapper>
        {this.getMenus(recommended).map((item, key) => (
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
