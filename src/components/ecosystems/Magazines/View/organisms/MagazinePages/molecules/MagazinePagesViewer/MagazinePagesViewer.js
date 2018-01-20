import React, { Component } from 'react';
import { Paper } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle';
import { orange100 } from 'styles/colors';
import Slider from 'react-slick';
import {
  Wrapper,
  MagazinePage,
  LeftCarouselArrow,
  RightCarouselArrow,
} from './MagazinePagesViewer.styles';

export class MagazinePagesViewer extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      draggable: false,
      lazyLoad: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      prevArrow: <LeftCarouselArrow>{'<'}</LeftCarouselArrow>,
      nextArrow: <RightCarouselArrow>{'>'}</RightCarouselArrow>,
    };
    const { magazine } = this.props;
    return (
      <Paper>
        <Wrapper>
          <SectionTitle iconName="ico_magazine" value={magazine.title} color={orange100} />
          <Slider {...settings}>
            {magazine.pageDetails.pageImages.map(pageImage => {
              return (
                <MagazinePage
                  key={pageImage.pageNumber}
                  src={`${magazine.pageDetails.pageImagesPath}${pageImage.pageFile}`}
                />
              );
            })}
          </Slider>
        </Wrapper>
      </Paper>
    );
  }
}

export default MagazinePagesViewer;
