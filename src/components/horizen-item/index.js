import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Scroll from '../../common/scroll';
import styled from 'styled-components';
import CommomStyle from '../../assets/styles/common';

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  .title {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${CommomStyle['font-size-m']};
  }
`;

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${CommomStyle['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${CommomStyle['theme-color']};
    border: 1px solid ${CommomStyle['theme-color']};
    opacity: 0.8;
  }
`;

function Horizen(props) {
  const { list, title, curVal } = props;
  const { handleClick } = props;
  const horizenRef = useRef();

  // 计算内层div的宽度
  useEffect(() => {
    const innerDOM = horizenRef.current;
    let spanEle = innerDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(spanEle).forEach(el => {
      totalWidth += el.offsetWidth;
    });
    innerDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll refresh={true} direction="horizental">
      <div ref={horizenRef}>
        <List>
          <span className="title">{title}</span>
          {list.map(item => {
            return (
              <ListItem
                key={item.key}
                className={curVal === item.key ? 'selected' : ''}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
}

Horizen.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  curVal: PropTypes.string,
  handleClick: PropTypes.func
};

Horizen.defaultProps = {
  list: [],
  title: '',
  curVal: '',
  handleClick: null
};

export default React.memo(Horizen);
