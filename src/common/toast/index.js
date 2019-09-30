import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import CommonStyle from '../../assets/styles/common';
import { CSSTransition } from 'react-transition-group';

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  height: 60px;
  width: 100%;
  .text {
    line-height: 60px;
    text-align: center;
    font-size: ${CommonStyle['font-size-l']};
    color: #fff;
  }
  &.drop-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.drop-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 300ms;
  }
  &.drop-exit-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    transition: all 300ms;
  }
`;

const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState('');
  const { text } = props;

  useImperativeHandle(ref, () => ({
    show() {
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(
        setTimeout(() => {
          setShow(false);
        }, 3000)
      );
    }
  }));

  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  );
});

export default React.memo(Toast);
