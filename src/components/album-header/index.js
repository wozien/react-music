import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonStyle from '../../assets/styles/common';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${CommonStyle['font-color-light']};
  .back {
    margin-right: 7px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${CommonStyle['font-size-l']};
    font-weight: 700;
  }
`;

const AlbumHeader = React.forwardRef((props, refs) => {
  const { title, handleClick, isMarquee } = props;

  return (
    <HeaderContainer ref={refs}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <marquee>
          <h1>{title}</h1>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});

AlbumHeader.defaultProps = {
  title: '标题',
  handleClick: null
};

AlbumHeader.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func
};

export default React.memo(AlbumHeader);
