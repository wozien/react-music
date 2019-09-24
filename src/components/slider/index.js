import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import { SliderContainer } from './style';

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: { el: '.swiper-pagination' }
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((item, index) => {
            return (
              <div className="swiper-slide" key={index}>
                <div className="slider-nav">
                  <img src={item.imgUrl} width="100%" height="100%" alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
