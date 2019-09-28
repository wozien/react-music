import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store';
import { Container, List, ListItem, SongList } from './style';
import Scroll from '../../common/scroll';
import { filterIndex, findIdx } from '../../api/utils';
import Loading from '../../common/loading';

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListDispatch } = props;

  const rankList = list ? list.toJS() : [];

  useEffect(() => {
    if (!rankList.length) {
      getRankListDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const enterDetail = name => {
    const id = findIdx(name);
    if (id === null) {
      alert('暂无相关数据');
      return;
    }
    // 后续操作
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
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
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
    <Container>
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
    </Container>
  );
}

const mapState = state => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
});

const mapDispatch = dispatch => ({
  getRankListDispatch() {
    dispatch(getRankList());
  }
});

export default connect(
  mapState,
  mapDispatch
)(React.memo(Rank));
