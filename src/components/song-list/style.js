import styled from 'styled-components';
import CommonStyle from '../../assets/styles/common';

export const ListWrapper = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  background: ${CommonStyle['highlight-background-color']};
  .first-line {
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    position: relative;
    border-bottom: 1px solid ${CommonStyle['border-color']};
    .play-all {
      display: inline-block;
      line-height: 24px;
      color: ${CommonStyle['font-color-desc']};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${CommonStyle['font-size-s']};
        color: ${CommonStyle['font-color-desc-v2']};
      }
      > span {
        vertical-align: top;
      }
    }
  }
  .add-list {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 130px;
    line-height: 34px;
    background: ${CommonStyle['theme-color']};
    color: ${CommonStyle['font-color-light']};
    border-radius: 3px;
    .iconfont {
      font-size: 10px;
      margin-right: 5px;
      margin-left: 10px;
    }
    span {
      font-size: 14px;
      line-height: 34px;
    }
  }
`;

export const List = styled.ul`
  > li {
    display: flex;
    height: 60px;
    align-items: center;
    .index {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${CommonStyle['border-color']};
      box-sizing: border-box;
      ${CommonStyle.noWrap()}
      > span {
        ${CommonStyle.noWrap()}
      }
      > span:first-child {
        color: ${CommonStyle['font-color-desc']};
      }
      > span:last-child {
        font-size: ${CommonStyle['font-size-s']};
        color: #bba8a8;
      }
    }
  }
`;
