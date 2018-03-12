import React, { Component } from 'react';
import { Paper, Icon } from 'natura-ui';
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
  ButtonWrapper,
} from './MagazinePagesViewer.styles';

import Fullscreen from 'react-full-screen';

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
  constructor(props) {
    super();

    this.state = {
      isFull: false,
      isWindow: false,
    };
  }

  changeMode = () => {
    this.setState({ isFull: !this.state.isFull });
  };

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
      centerMode: true,
      centerPadding: '0px',
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
    const iconName = this.state.isFull ? 'ico_shrink' : 'ico_expand';
    return (
      <PaperWrapper>
        <Paper>
          <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
            <Wrapper>
              <ButtonWrapper onClick={this.changeMode}>
                <Icon file={iconName} />
              </ButtonWrapper>
              <SectionTitle iconName="ico_magazine" color={orange100}>
                {magazine.title}
              </SectionTitle>
              <Slider {...settings}>
                {pageImages.map((pageImage, index) => {
                  return (
                    <MagazinePageWrapper key={index}>
                      <MagazinePage
                        src={`${magazine.pageDetails.pageImagesPath}${pageImage.pageFile}`}
                      />
                    </MagazinePageWrapper>
                  );
                })}
              </Slider>
            </Wrapper>
          </Fullscreen>
        </Paper>
      </PaperWrapper>
    );
  }
}

export default MagazinePagesViewer;
