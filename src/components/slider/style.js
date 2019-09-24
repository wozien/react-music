import styled from 'styled-components';
import CommonStyle from '../../assets/styles/common';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  background: white;
  .before {
    position: absolute;
    top: -300px;
    width: 100%;
    height: 400px;
    z-index: 1;
    background: ${CommonStyle['theme-color']};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${CommonStyle['theme-color']};
    }
  }
`;
