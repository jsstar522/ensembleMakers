import React, { Component } from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Wrapper = styled.div`
    /* 레이아웃 */
    padding: 1rem;
    position: relative;
    z-index: -1;
    overflow: hidden;
    display: flex;
    /* 색상 */
    background: ${oc.gray[0]};
    border: 1px solid ${oc.gray[2]};
    /* 애니메이션 */
    transition: all .25s;
    /* 사이 간격 */
    & + & {
        margin-top: 1rem;   
    }
    /* 커서를 올려두면 작동 */
    .actions {
        /* 레이아웃 */
        position: absolute;
        top: 0;
        right: -3rem; /* 기본적으로는 숨겨있음 */
        width: 3rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column; /* 세로로 나열 */
        /* 색상 */
        background: ${oc.gray[1]};
        border-left: 1px solid ${oc.gray[2]};
        opacity: 0; /* 기본적으론 투명함 */
        /* 애니메이션 */
        transition: all .4s;
    }
    /* 커서가 위에 있으면 */
    &:hover {
        border: 1px solid ${oc.gray[4]};
        background: white;
        /* actions 를 보여준다 */
        .actions {
            opacity: 1;
            right: 0rem;
        }
    }
`

class PostListItem extends Component {
  render(){
    const { id, title, img } = this.props;
    return(
      <Wrapper>
        id : {id} <br/>
        title : {title} <br/>
        images: {img} <br/>
        
      </Wrapper>
    )
  }
}

export default PostListItem;