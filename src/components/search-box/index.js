import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import CommonStyle from '@/assets/styles/common'
import { debounce } from '@/utils'

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${CommonStyle["theme-color"]};
  .icon-back{
    font-size: 24px;
    color: ${CommonStyle["font-color-light"]};
  }
  .box{
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${CommonStyle["theme-color"]};
    color: ${CommonStyle["highlight-background-color"]};
    font-size: ${CommonStyle["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${CommonStyle["border-color"]};
    &::placeholder{
      color: ${CommonStyle["font-color-light"]};
    }
  }
  .icon-delete{
    font-size: 16px;
    color: ${CommonStyle["background-color"]};
  }
`

function SearchBox(props) {
  const [query, setQuery] = useState('')
  const queryRef = useRef()
  const { newQuery, handleQuery } = props
  
  const displayStyle = query ? {display: 'block'}: {display: 'none'}

  useEffect(() => {
    queryRef.current.focus()
  }, [])

  useEffect(() => {
    handleQueryDebounce(query)
    // eslint-disable-next-line
  }, [query])

  useEffect(() => {
    if(newQuery !== query) {
      setQuery(newQuery)
    }
    // eslint-disable-next-line
  }, [newQuery])
  
  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500)
  }, [handleQuery])

  const handleChange = (e) => {
    setQuery(e.currentTarget.value)
  }

  const clearQuery = () => {
    setQuery('')
    queryRef.current.focus()
  }

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
}

export default React.memo(SearchBox)