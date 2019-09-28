import React, { useState, useRef } from 'react';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import Scroll from '../../common/scroll';
import AlbumHeader from '../../components/album-header';
import AlbumDetail from '../../components/album-detail';
import CommonStyle from '../../assets/styles/common';

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false);

  const headerEl = useRef();

  const handleBack = () => {
    setShowStatus(false);
  };

  //mock数据
  const currentAlbum = {
    creator: {
      avatarUrl: 'http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg',
      nickname: '浪里推舟'
    },
    coverImgUrl: 'http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg',
    subscribedCount: 2010711,
    name: '听完就睡，耳机是天黑以后柔软的梦境',
    tracks: [
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      }
    ]
  };

  const handleScroll = pos => {
    let minScrollY = -45;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDOM = headerEl.current;

    if (pos.y < minScrollY) {
      headerDOM.style.backgroundColor = CommonStyle['theme-color'];
      headerDOM.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDOM.style.backgroundColor = '';
      headerDOM.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      unmountOnExit
      appear={true}
      onExited={props.history.goBack}
    >
      <Container>
        <AlbumHeader
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></AlbumHeader>
        <Scroll onScroll={handleScroll} bounceTop={false}>
          <AlbumDetail currentAlbum={currentAlbum}></AlbumDetail>
        </Scroll>
      </Container>
    </CSSTransition>
  );
}

export default Album;
