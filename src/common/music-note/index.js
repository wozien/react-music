import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { prefixStyle } from '@/utils';
import CommonStyle from '../../assets/styles/common';

const transform = prefixStyle('transform');

const Container = styled.div`
  .icon-wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${CommonStyle['theme-color']};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(0.62, -0.1, 0.86, 0.57);
    transform: translate3d(0, 0, 0);
    > div {
      transition: transform 1s;
    }
  }
`;

const MusicNote = forwardRef((props, ref) => {
  const iconRef = useRef();

  useEffect(() => {
    let domArray = [].slice.call(iconRef.current.children);
    domArray.forEach(item => {
      item.running = false;
      item.addEventListener(
        'transitionend',
        function() {
          this.running = false;
          this.style['display'] = 'none';
          this.style[transform] = 'translate3d(0 , 0, 0)';
          let icon = this.querySelector('div');
          icon.style[transform] = 'translate3d(0 , 0, 0)';
        },
        false
      );
    });
    // eslint-disable-next-line
  }, []);

  const startAnimation = ({ x, y }) => {
    let domArray = [].slice.call(iconRef.current.children);
    for (let i = 0; i < 3; i++) {
      let item = domArray[i];
      if (item.running === false) {
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.display = 'inline-block';
        setTimeout(() => {
          item.running = true;
          item.style[transform] = `translate3d(0, 750px, 0)`;
          let icon = item.querySelector('div');
          icon.style[transform] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  };

  useImperativeHandle(ref, () => ({
    startAnimation
  }));

  return (
    <Container ref={iconRef}>
      <div className="icon-wrapper">
        <div className="iconfont">&#xe642;</div>
      </div>
      <div className="icon-wrapper">
        <div className="iconfont">&#xe642;</div>
      </div>
      <div className="icon-wrapper">
        <div className="iconfont">&#xe642;</div>
      </div>
    </Container>
  );
});

export default React.memo(MusicNote);
