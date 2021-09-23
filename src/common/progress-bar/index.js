import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CommonStyle from '../../assets/styles/common';
import { prefixStyle } from '@/utils';

const transform = prefixStyle('transform');

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${CommonStyle['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${CommonStyle['border-color']};
        border-radius: 50%;
        background: ${CommonStyle['theme-color']};
      }
    }
  }
`;

function ProgressBar(props) {
  const [touch, setTouch] = useState({});
  const progressBar = useRef();
  const progress = useRef();
  const progressBtn = useRef();

  const { percent, percentChange } = props;

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.init) {
      const barWidth = progressBar.current.clientWidth - 16;
      const offsetWidth = barWidth * percent;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  const _offset = offsetWidth => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0 ,0)`;
  };

  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - 16;
    const curPercent = progress.current.clientWidth / barWidth;
    percentChange(curPercent);
  };

  const progressTouchStart = e => {
    const startTouch = {};
    startTouch.init = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = e => {
    if (!touch.init) return;
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - 16;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.init = false;
    setTouch(endTouch);
    _changePercent();
  };

  const progressClick = e => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
}

export default React.memo(ProgressBar);
