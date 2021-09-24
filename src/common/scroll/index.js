import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo
} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';
import Loading from '../loading';
import Loading2 from '../loading-v2';
import { debounce } from '@/utils';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState(null);

  const scrollContainerRef = useRef();

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom
  } = props;

  const { onScroll, pullDown, pullUp } = props;

  let pullUpDebunce = useMemo(() => {
    return debounce(pullUp, 300);
    // eslint-disable-next-line
  }, [pullUp]);

  let pullDownDebunce = useMemo(() => {
    return debounce(pullDown, 300);
    // eslint-disable-next-line
  }, [pullDown]);

  // 在组件挂在后初始化bs实例， 传空数组只调用一次
  // 相当于ComponentDidMount
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      click: click,
      probeType: 3,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  // 绑定滚动回调
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', scroll => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  // 绑定上拉加载回调
  useEffect(() => {
    if (!pullUp || !bScroll) return;
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebunce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
    // eslint-disable-next-line
  }, [pullUp, bScroll]);

  // 绑定下拉刷新回调
  useEffect(() => {
    if (!pullDown || !bScroll) return;
    bScroll.on('touchEnd', pos => {
      if (pos.y > 50) {
        pullDownDebunce();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
    // eslint-disable-next-line
  }, [pullDown, bScroll]);

  // 每次渲染调用refresh
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 对外暴露方法
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {pullUpLoading ? (
        <PullUpLoading>
          <Loading></Loading>
        </PullUpLoading>
      ) : null}

      {pullDownLoading ? (
        <PullDownLoading>
          <Loading2></Loading2>
        </PullDownLoading>
      ) : null}
    </ScrollContainer>
  );
});

// 参数的类型
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']), // 滚动方向
  click: PropTypes.bool,
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滚动触发回调
  pullUp: PropTypes.func, // 上拉加载回调
  pullDown: PropTypes.func, // 下拉刷新回调
  pullUpLoading: PropTypes.bool, // 是否显示上拉动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉动画,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool
};

// 默认值
Scroll.defaultProps = {
  direction: 'vertical',
  refresh: true,
  click: true,
  onScroll: null,
  pullDownLoading: false,
  pullUpLoading: false,
  pullDown: null,
  pullUp: null,
  bounceTop: true,
  bounceBottom: true
};

export default Scroll;
