import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { actionCreators } from './store';
import Horizen from '@/components/horizen-item';
import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '@/common/scroll';
import Loading from '@/common/loading';
import LazyLoad, { forceCheck } from 'react-lazyload';

function Singers(props) {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const { singerList, pageCount, enterLoading, pullDownLoading, pullUpLoading, songsCount } = props;
  const { getSingerListDispatch, updateDispatch, pullUpRefresh, pullDownRefresh } = props;

  let handleUpateCategory = val => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  let handleUpateAlpha = val => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  let handlePullUp = () => {
    pullUpRefresh(category, alpha, category === '', pageCount);
  };

  let handlePullDown = () => {
    pullDownRefresh(category, alpha);
  };

  let enterDetail = id => {
    props.history.push(`/singers/${id}`);
  };

  useEffect(() => {
    if (!singerList.size && !category && !alpha) {
      getSingerListDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const renderSingerList = () => {
    return (
      <List>
        {singerList.toJS().map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item.id)}>
              <div className="img-wrapper">
                <LazyLoad placeholder={<img src={require('./singer.png')} alt="" />}>
                  <img src={`${item.picUrl}?param=300x300`} alt="" />
                </LazyLoad>
              </div>
              <div className="name">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          title="分类(默认热门):"
          list={categoryTypes}
          handleClick={handleUpateCategory}
          curVal={category}
        ></Horizen>
        <Horizen
          title="首字母:"
          list={alphaTypes}
          handleClick={handleUpateAlpha}
          curVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        {enterLoading ? <Loading></Loading> : null}
      </ListContainer>
      {renderRoutes(props.route.routes)}
    </div>
  );
}

const mapState = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  pageCount: state.getIn(['singers', 'pageCount']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  songsCount: state.getIn(['player', 'playList']).size
});

const mapDispatch = dispatch => ({
  getSingerListDispatch() {
    dispatch(actionCreators.getHotSingerList());
  },
  updateDispatch(category, alpha) {
    dispatch(actionCreators.changePageCount(0));
    dispatch(actionCreators.changeEnterLoading(true));
    dispatch(actionCreators.getSingerList(category, alpha));
  },
  pullUpRefresh(category, alpha, hot, count) {
    dispatch(actionCreators.changePullUpLoading(true));
    dispatch(actionCreators.changePageCount(count + 1));
    if (hot) {
      dispatch(actionCreators.getMoreHotSingerList());
    } else {
      dispatch(actionCreators.getMoreSingerList(category, alpha));
    }
  },
  pullDownRefresh(category, alpha) {
    dispatch(actionCreators.changePullDownLoading(true));
    dispatch(actionCreators.changePageCount(0));
    if (category === '' && alpha === '') {
      dispatch(actionCreators.getHotSingerList());
    } else {
      dispatch(actionCreators.getSingerList(category, alpha));
    }
  }
});

export default connect(
  mapState,
  mapDispatch
)(React.memo(Singers));
