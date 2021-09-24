import React, { useState, useCallback, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Container, HotKey, ShortcutWrapper, List, ListItem, SongItem } from './style'
import SearchBox from '@/components/search-box'
import {
  getHotKeyWords,
  getSuggestList,
  changeEnterLoading
} from './store/actionCreators'
import { getSongDetail } from '../player/store/actionCreators'
import Scroll from '@/common/scroll'
import Loading from '@/common/loading'
import MusicNote from '@/common/music-note'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { getName } from '@/utils'

function Search(props) {
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('')
  const musicNoteRef = useRef()

  const {
    hotList,
    suggestList: immutableSuggestList,
    songsList: immutableSongsList,
    enterLoading,
    songsCount
  } = props

  const {
    getHotKeyWordsDispatch,
    getSuggestListDispatch,
    changeEnterLoadingDispatch,
    getSongDetailDispatch
  } = props

  const songsList = immutableSongsList.toJS()
  const suggestList = immutableSuggestList.toJS()

  useEffect(() => {
    setShow(true)
    if(!hotList.size) {
      getHotKeyWordsDispatch()
    }
    // eslint-disable-next-line
  }, [])

  const searchBack = useCallback(() => {
    setShow(false)
  }, [])

  const handleQuery = (q) => {
    setQuery(q)
    if(!q) return
    changeEnterLoadingDispatch(true)
    getSuggestListDispatch(q)
  }

  const selectItem = (e, id) => {
    getSongDetailDispatch(id)
    musicNoteRef.current.startAnimation({x: e.nativeEvent.clientX, y: e.nativeEvent.clientY})
  }

  const renderHotKey = () => {
    const list = hotList ? hotList.toJS() : []
    return (
      <ul>
        {
          list.map(item => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if(!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {
          albums.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => props.history.push(`/album/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                    <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">歌单: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSingers = () => {
    let singers = suggestList.artists;
    if(!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {
          singers.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="singer"/>}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">歌手: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const renderSongs = () => {
    return (
      <SongItem style={{paddingLeft: "20px"}} > 
        {
          songsList.map(item => {
            return (
              <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    { getName(item.artists) } - { item.album.name }
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    )
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => props.history.goBack()}
    >
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title"> 热门搜索 </h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading></Loading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = state => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsCount: state.getIn(['player', 'playList']).size,
  songsList: state.getIn(['search', 'songsList'])
})

const mapDispatchToProps = dispatch => ({
  getHotKeyWordsDispatch() {
    dispatch(getHotKeyWords());
  },
  changeEnterLoadingDispatch(data) {
    dispatch(changeEnterLoading(data))
  },
  getSuggestListDispatch(data) {
    dispatch(getSuggestList(data));
  },
  getSongDetailDispatch(id) {
    dispatch(getSongDetail(id));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Search))