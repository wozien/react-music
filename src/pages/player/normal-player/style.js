import styled, { keyframes } from 'styled-components';
import CommonStyle from '../../../assets/styles/common';

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background-color: ${CommonStyle['background-color']};
  overflow: hidden;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    img {
      width: 100%;
      height: 100%;
    }
    &.layer {
      background-color: ${CommonStyle['font-color-desc']};
      opacity: 0.3;
      filter: none;
    }
  }
  &.normal-enter,
  &.normal-exit-done {
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
  &.normal-enter-active,
  &.normal-exit-active {
    .top,
    .bottom {
      transform: translate3d(0, 0, 0);
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
    opacity: 1;
    transition: all 0.4s;
  }
  &.normal-exit-active {
    opacity: 0;
  }
`;

export const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 9px;
    margin-left: 15px;
    .iconfont {
      display: block;
      font-size: 24px;
      color: ${CommonStyle['font-color-desc']};
      font-weight: bold;
      transform: rotate(90deg);
    }
  }
  .title {
    line-height: 40px;
    text-align: center;
    font-size: ${CommonStyle['font-size-l']};
    color: ${CommonStyle['font-color-desc']};
    ${CommonStyle.noWrap()};
  }
  .subtitle {
    line-height: 20px;
    text-align: center;
    font-size: ${CommonStyle['font-size-m']};
    color: ${CommonStyle['font-color-desc-v2']};
    ${CommonStyle.noWrap()};
  }
`;

export const Middle = styled.div`
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
`;

export const CDWrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 10%;
  left: 0;
  right: 0;
  width: 80%;
  box-sizing: border-box;
  height: 80vw;
  .cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    .image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
    }
    .play {
      animation: ${rotate} 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .playing_lyric {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0px;
  .time {
    flex: 0 0 30px;
    font-size: ${CommonStyle['font-size-s']};
    color: ${CommonStyle['font-color-desc']};
    line-height: 30px;
    width: 30px;
    &.time-l {
      text-align: left;
    }
    &.time-r {
      text-align: right;
    }
  }
  .progress-bar-wrapper {
    flex: 1;
  }
`;

export const Operators = styled.div`
  display: flex;
  align-items: center;
  .icon {
    font-weight: 300;
    flex: 1;
    color: ${CommonStyle['font-color-desc']};
    &.disable {
      color: ${CommonStyle['theme-color-shadow']};
    }
    i {
      font-weight: 300;
      font-size: 30px;
    }
  }
  .i-left {
    text-align: right;
  }
  .i-center {
    padding: 0 20px;
    text-align: center;
    i {
      font-size: 40px;
    }
  }
  .i-right {
    text-align: left;
  }
  .icon-favorite {
    color: ${CommonStyle['theme-color']};
  }
`;

export const LyricContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
export const LyricWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    white-space: normal;
    font-size: ${CommonStyle["font-size-l"]};
    &.current {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
    }
  }
`;