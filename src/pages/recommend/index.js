import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { forceCheck } from 'react-lazyload';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../common/scroll';
import { Content } from './style';
import Loading from '../../common/loading';

function Recommend(props) {
  const { bannerList, recommendList, loading } = props;

  const { getBannerDispath, getRecommendListDispatch } = props;

  useEffect(() => {
    // 数据缓存
    if (!bannerList.size) {
      getBannerDispath();
    }
    if (!recommendList.size) {
      getRecommendListDispatch();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {loading ? <Loading></Loading> : null}
    </Content>
  );
}

const mapState = state => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  loading: state.getIn(['recommend', 'loading'])
});

const mapDispatch = dispatch => ({
  getBannerDispath() {
    dispatch(actionCreators.getBannerList());
  },
  getRecommendListDispatch() {
    dispatch(actionCreators.getRecommendList());
  }
});

export default connect(
  mapState,
  mapDispatch
)(React.memo(Recommend));
