import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { getRankList } from './slice';
import { Container, List, ListItem, SongList } from './style';
import Scroll from '../../common/scroll';
import { filterIndex } from '@/utils';
import Loading from '../../common/loading';

function Rank(props) {
  const { rankList, loading } = useSelector(state => state.rank);
  const songsCount = useSelector(state => state.player.playList.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankList());
    }
    // eslint-disable-next-line
  }, []);

  const enterDetail = detail => {
    // 后续操作
    props.history.push(`/rank/${detail.id}`);
  };

  const renderSongList = list => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  const renderRankList = (list, global) => {
    return (
      <List global={global}>
        {list.map(item => {
          return (
            <ListItem key={item.id} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img-wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update-frequency">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  let globalStartIndex = filterIndex(rankList);
  let officalList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);
  let displayStyle = loading ? { display: 'none' } : { display: '' };

  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officalList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading></Loading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

export default React.memo(Rank);
