import styled, { keyframes } from 'styled-components';
import CommonStyle from '../../../assets/styles/common';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: none;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
  background-color: ${CommonStyle['highlight-background-color']};
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all 0.4s;
  }
  .img-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    margin-left: 20px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      &.play {
        animation: ${rotate} 10s infinite;
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    line-height: 20px;
    .name {
      font-size: ${CommonStyle['font-size-m']};
      color: ${CommonStyle['font-color-desc']};
      margin-bottom: 2px;
      ${CommonStyle.noWrap()}
    }
    .desc {
      font-size: ${CommonStyle['font-size-s']};
      color: ${CommonStyle['font-color-desc-v2']};
      ${CommonStyle.noWrap()}
    }
  }
  .ctrl-btn {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont {
      font-size: 30px;
      color: ${CommonStyle['theme-color']};
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px;
      }
    }
  }
`;
