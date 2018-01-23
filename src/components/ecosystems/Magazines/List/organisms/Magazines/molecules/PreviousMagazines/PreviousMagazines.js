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
  MagazineCoverWrapper,
  MagazineCoverPeriod,
  MagazineCoverTitle,
  MagazineInCoverInfo,
  MagazineCoverList,
  MagazineCoverMobileInfo,
} from './PreviousMagazines.styles';

export class PreviousMagazines extends Component {
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
          <MagazineCoverList>
            <Slider {...settings}>
              {this.props.magazines.map(magazine => {
                return (
                  <MagazineCoverWrapper
                    key={magazine.id}
                    onClick={() => this.openMagazine(magazine)}
                  >
                    <MagazineInCoverInfo>
                      <MagazineCoverPeriod>
                        {translate('magazineCycle')} {magazine.period}
                      </MagazineCoverPeriod>
                      <MagazineCoverTitle>{magazine.title}</MagazineCoverTitle>
                    </MagazineInCoverInfo>
                    <MagazineCover src={magazine.thumbFile} />
                    <MagazineCoverMobileInfo>
                      {translate('magazineCycle')} {magazine.year} - {magazine.period}
                    </MagazineCoverMobileInfo>
                  </MagazineCoverWrapper>
                );
              })}
            </Slider>
          </MagazineCoverList>
        </Wrapper>
      </Paper>
    );
  }
}

export default withRouter(PreviousMagazines);
