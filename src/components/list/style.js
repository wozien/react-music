import styled from 'styled-components';
import CommonStyle from '../../assets/styles/common';

export const ListWrapper = styled.div`
  .title {
    line-height: 60px;
    font-size: 14px;
    font-weight: 700;
    color: ${CommonStyle['font-color']};
    padding-left: 6px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .img-wrapper {
    position: relative;
    height: 0;
    padding-bottom: 100%;
    border-radius: 3px;
    overflow: hidden;
    img {
      width: 100%;
    }
    .play-count {
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: ${CommonStyle['font-size-s']};
      line-height: 15px;
      color: ${CommonStyle['font-color-light']};
      .play {
        vertical-align: top;
      }
    }
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
  }
  .desc {
    overflow: hidden;
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    font-size: ${CommonStyle['font-size-s']};
    line-height: 1.4;
    color: ${CommonStyle['font-color-desc']};
  }
`;
