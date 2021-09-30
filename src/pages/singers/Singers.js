import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {
  changeEnterLoading,
  changePullDownLoading,
  changePageCount,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  getMoreHotSingerList,
  getMoreSingerList
} from './slice';
import Horizen from '@/components/horizen-item';
import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '@/common/scroll';
import Loading from '@/common/loading';
import LazyLoad, { forceCheck } from 'react-lazyload';

function Singers(props) {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const { singerList, pageCount, enterLoading, pullDownLoading, pullUpLoading } = useSelector(state => state.singers);
  const songsCount = useSelector(state => state.player.playList.length);

  const dispatch = useDispatch();
  const history = useHistory();
  const getSingerListDispatch = () => dispatch(getHotSingerList());
  const updateDispatch = (category, alpha) => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, alpha));
  }
  const pullUpRefresh = (category, alpha, hot, count) => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if (hot) {
      dispatch(getMoreHotSingerList());
    } else {
      dispatch(getMoreSingerList(category, alpha));
    }
  }
  const pullDownRefresh = (category, alpha) => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }

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
    history.push(`/singers/${id}`);
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
        {singerList.map((item, index) => {
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

export default React.memo(Singers);
