import styled from 'styled-components';
import CommonStyle from '@/assets/styles/common';

export const PlayListWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${CommonStyle["background-color-shadow"]};
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${CommonStyle["highlight-background-color"]};
    transform: translate3d (0, 0, 0);
    .list_close {
      text-align: center;
      line-height: 50px;
      background: ${CommonStyle["background-color"]};
      font-size: ${CommonStyle["font-size-l"]};
      color: ${CommonStyle["font-color-desc"]};
    }
  }
  /* 下面是动画部分的代码 */
  &.list-fade-enter {
    opacity: 0;
  }
  &.list-fade-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
`;
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;

export const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px 10px 20px;
  .title {
    display: flex;
    align-items: center;
    >div {
      flex:1;
      .text {
        flex: 1;
        font-size: ${CommonStyle["font-size-m"]};
        color: ${CommonStyle["font-color-desc"]};
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: ${CommonStyle["font-size-ll"]};
      color: ${CommonStyle["theme-color"]};
    }
    .clear {
      ${CommonStyle.extendClick()}
      font-size: ${CommonStyle["font-size-l"]};
    }
  }
`;


export const ListContent = styled.div`
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
    .current {
      flex: 0 0 20px;
      width: 20px;
      font-size: ${CommonStyle["font-size-s"]};
      color: ${CommonStyle["theme-color"]};
    }
    .text {
      flex: 1;
      ${CommonStyle.noWrap()}
      font-size: ${CommonStyle["font-size-m"]};
      color: ${CommonStyle["font-color-desc-v2"]};
      .icon-favorite {
        color: ${CommonStyle["theme-color"]};
      }
    }
    .like {
      ${CommonStyle.extendClick()}
      margin-right: 15px;
      font-size: ${CommonStyle["font-size-m"]};
      color: ${CommonStyle["theme-color"]};
    }
    .delete {
      ${CommonStyle.extendClick()}
      font-size: ${CommonStyle["font-size-s"]};
      color: ${CommonStyle["theme-color"]};
    }
  }
`;