import styled from 'styled-components';
import style from '../../assets/styles/common';

export const TopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url(${props => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, 0.2);
    }
  }
  .img-wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    .play-count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style['font-size-s']};
      line-height: 15px;
      color: ${style['font-color-light']};
      .play {
        vertical-align: top;
      }
    }
  }
  .desc-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${style['font-color-light']};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style['font-size-l']};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style['font-size-m']};
        color: ${style['font-size-font-color-desc-v2']};
      }
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin-top: -60px;
  > div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${style['font-size-s']};
    color: ${style['font-color-light']};
    z-index: 1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;
