import styled from 'styled-components';
import CommomStyle from '../../assets/styles/common';

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  overflow: hidden;
  padding: 5px;
`;

export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  width: 100%;
  bottom: 0;
  overflow: hidden;
`;

export const List = styled.div`
  overflow: hidden;
`;

export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${CommomStyle['border-color']};
  .img-wrapper {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 3px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: ${CommomStyle['font-size-m']};
    color: ${CommomStyle['font-color-desc']};
    font-weight: 500;
  }
`;
