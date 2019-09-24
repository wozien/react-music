import React from 'react';
import styled, { keyframes } from 'styled-components';
import CommonStyle from '../../assets/styles/common';

const loading = keyframes`
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const LoadingWrapper = styled.div`
  > div {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    opacity: 0.6;
    border-radius: 50%;
    background-color: ${CommonStyle['theme-color']};
    animation: ${loading} 1.4s infinite ease-in;
  }
  > div:nth-child(2) {
    animation-delay: -0.7s;
  }
`;

function Loading() {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}

export default React.memo(Loading);
