import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import { Paper } from 'natura-ui';
import Slider from 'react-slick';
import {
  Header,
  Wrapper,
  MagazineCover,
  LeftCarouselArrow,
  RightCarouselArrow,
} from './PreviousMagazines.styles';

class PreviousMagazines extends Component {
  openMagazine = magazine => {
    this.props.history.push(`/magazines/view/${magazine.id}`, { magazine });
  };

  render() {
    const settings = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 5000,
      draggable: false,
      responsive: [
        { breakpoint: 768, settings: 'unslick' },
        { breakpoint: 1280, settings: { slidesToShow: 6 } },
        { breakpoint: 100000, settings: { slidesToShow: 7 } },
      ],
      prevArrow: <LeftCarouselArrow>{'<'}</LeftCarouselArrow>,
      nextArrow: <RightCarouselArrow>{'>'}</RightCarouselArrow>,
    };
    return (
      <Paper>
        <Wrapper>
          <Header>{translate('previousMagazines')}</Header>
          <Slider {...settings}>
            {this.props.magazines.map(magazine => {
              return <MagazineCover key={magazine.id} src={magazine.highlightImage} />;
            })}
          </Slider>
        </Wrapper>
      </Paper>
    );
  }
}

export default withRouter(PreviousMagazines);
