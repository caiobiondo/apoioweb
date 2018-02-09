import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import { Paper } from 'natura-ui';
import Slider from 'react-slick';
import {
  Header,
  PaperWrapper,
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

import ImageWithFallback from 'components/molecules/ImageWithFallback';

export class PreviousMagazines extends Component {
  openMagazine = magazine => {
    const { type } = this.props;
    this.props.history.push(`/magazines/view/${type}/${magazine.id}`);
  };

  render() {
    const settings = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 5000,
      draggable: false,
      responsive: [
        { breakpoint: 768, settings: 'unslick' },
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 1280, settings: { slidesToShow: 3 } },
        { breakpoint: 1500, settings: { slidesToShow: 4 } },
        { breakpoint: 1800, settings: { slidesToShow: 5 } },
        { breakpoint: 10000, settings: { slidesToShow: 5 } },
      ],
      prevArrow: <LeftCarouselArrow>{'<'}</LeftCarouselArrow>,
      nextArrow: <RightCarouselArrow>{'>'}</RightCarouselArrow>,
    };
    const { magazines } = this.props;

    if (!magazines) return null;

    return (
      <PaperWrapper>
        <Paper>
          <Wrapper>
            <Header>{translate('previousMagazines')}</Header>
            <MagazineCoverList>
              <Slider {...settings}>
                {magazines.map(magazine => {
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
                      <MagazineCover>
                        <ImageWithFallback imageUrl={magazine.thumbFile} />
                      </MagazineCover>
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
      </PaperWrapper>
    );
  }
}

export default withRouter(PreviousMagazines);
