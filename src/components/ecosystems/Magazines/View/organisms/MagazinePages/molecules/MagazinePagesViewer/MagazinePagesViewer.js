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
  MagazinePageWhite,
} from './MagazinePagesViewer.styles';

class LeftArrow extends Component {
  render() {
    const { onClick, currentSlide } = this.props;
    if (currentSlide === 0) {
      return null;
    }
    return <LeftCarouselArrow onClick={onClick}>{'<'}</LeftCarouselArrow>;
  }
}

class RightArrow extends Component {
  render() {
    const { onClick, currentSlide, slideCount, slidesToScroll } = this.props;
    if (currentSlide + slidesToScroll >= slideCount) {
      return null;
    }
    return <RightCarouselArrow onClick={onClick}>{'>'}</RightCarouselArrow>;
  }
}

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
            prevArrow: <LeftArrow />,
            nextArrow: <RightArrow slidesToScroll={1} />,
          },
        },
      ],
      prevArrow: <LeftArrow />,
      nextArrow: <RightArrow slidesToScroll={2} />,
    };
    const { magazine } = this.props;
    const pageImages = magazine.pageDetails.pageImages;
    return (
      <Paper>
        <Wrapper>
          <SectionTitle iconName="ico_magazine" value={magazine.title} color={orange100} />
          <div>
            <Slider {...settings}>
              {pageImages.map((pageImage, index) => {
                return (
                  <MagazinePage
                    key={pageImage.pageNumber}
                    src={`${magazine.pageDetails.pageImagesPath}${pageImage.pageFile}`}
                  />
                );
              })}
            </Slider>
          </div>
        </Wrapper>
      </Paper>
    );
  }
}

export default MagazinePagesViewer;
