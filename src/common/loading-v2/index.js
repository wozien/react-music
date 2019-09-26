import React from 'react';
import styled, { keyframes } from 'styled-components';
import CommonStyle from '../../assets/styles/common';

const dace = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
    transform-origin: center 100%;
  }
  20% {
    transform: scaleY(1);
  }
`;

const Loading = styled.div`
  height: 10px;
  width: 100%;
  margin: auto;
  text-align: center;
  font-size: 10px;
  > div {
    display: inline-block;
    width: 1px;
    height: 100%;
    background: ${CommonStyle['theme-color']};
    margin-right: 2px;
    animation: ${dace} 1s infinite;
  }
  > div:nth-child(2) {
    animation-delay: -0.4s;
  }
  > div:nth-child(3) {
    animation-delay: -0.6s;
  }
  > div:nth-child(4) {
    animation-delay: -0.5s;
  }
  > div:nth-child(5) {
    animation-delay: -0.2s;
  }
`;

function LoadingV2() {
  return (
    <Loading>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </Loading>
  );
}

export default React.memo(LoadingV2);
