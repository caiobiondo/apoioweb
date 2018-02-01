import React, { Component } from 'react';
import { Paper } from 'natura-ui';
import SectionTitle from 'components/molecules/SectionTitle';
import { orange100 } from 'styles/colors';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import {
  Wrapper,
  PaperWrapper,
  LeftCarouselArrow,
  RightCarouselArrow,
  MagazinePageWrapper,
  MagazinePageInnerWrapper,
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

const MagazinePage = ({ src }) => {
  return (
    <MagazinePageWrapper>
      <MagazinePageInnerWrapper>
        <ReactImageMagnify
          {...{
            largeImage: {
              alt: '',
              src: src,
              width: 1000,
              height: 1200,
            },
            smallImage: {
              isFluidWidth: true,
              alt: 'Wristwatch by Versace',
              src: src,
              sizes: '360px',
            },
            isHintEnabled: false,
            enlargedImagePosition: 'over',
            isActivatedOnTouch: false,
          }}
        />
      </MagazinePageInnerWrapper>
    </MagazinePageWrapper>
  );
};

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
    const { pageImages } = magazine.pageDetails;
    return (
      <PaperWrapper>
        <Paper>
          <Wrapper>
            <SectionTitle iconName="ico_magazine" value={magazine.title} color={orange100} />
            <Slider {...settings}>
              {pageImages.map((pageImage, index) => {
                return (
                  <MagazinePageWrapper>
                    <MagazinePage
                      key={index}
                      src={`${magazine.pageDetails.pageImagesPath}${pageImage.pageFile}`}
                    />
                  </MagazinePageWrapper>
                );
              })}
            </Slider>
          </Wrapper>
        </Paper>
      </PaperWrapper>
    );
  }
}

export default MagazinePagesViewer;
