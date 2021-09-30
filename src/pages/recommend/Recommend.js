import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBannerList,
  getRecommendList
} from './slice';
import { renderRoutes } from 'react-router-config';
import { forceCheck } from 'react-lazyload';
import Slider from '../../components/slider/Slider';
import RecommendList from '../../components/recommend-list/RecommendList';
import Scroll from '../../common/scroll';
import { Content } from './style';
import Loading from '../../common/loading';

function Recommend(props) {
  const { bannerList, recommendList, loading } = useSelector(state => state.recommend);
  const songsCount = useSelector(state => state.player.playList.length);
  const dispatch = useDispatch();

  useEffect(() => {
    // 数据缓存
    if (!bannerList.size) {
      dispatch(getBannerList());
    }
    if (!recommendList.size) {
      dispatch(getRecommendList());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {loading ? <Loading></Loading> : null}
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

// 将 ui 组件包装成容器组件
export default React.memo(Recommend)
