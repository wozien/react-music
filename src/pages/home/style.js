import styled from 'styled-components';
import commonStyle from '../../assets/styles/common';

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${commonStyle['theme-color']};
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`;

export const Tab = styled.div`
  display: flex;
  height: 44px;
  justify-content: space-around;
  background: ${commonStyle['theme-color']};
`;

export const TabItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding: 4px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      color: #f1f1f1;
      border-bottom: 2px solid #f1f1f1;
      font-weight: 700;
    }
  }
`;
