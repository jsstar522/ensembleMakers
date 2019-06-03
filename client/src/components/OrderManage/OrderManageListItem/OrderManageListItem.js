import React, { Component } from 'react';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const Item = styled.div`
  padding: 1rem;
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: ${ props => props.selected ? oc.blue[1] : 'white'};
  border: 1px solid ${oc.gray[1]}
  cursor: pointer;

  /* 애니메이션 */
  transition: all .30s;

  &:hover {
    border: 1px solid ${oc.blue[4]};
  }

  // &:active {
  //   background-color: red;
  //   transition: all .90s;
  // }
  
`

class OrderManageListItem extends Component {
  render() {
    const { id, name, customerById } = this.props;
    const { onClick } = this.props;
    return(
      <Item
        onClick={() => onClick(id)}
        selected={id==customerById}
      >{name}
      </Item>
    )
  }
}

export default OrderManageListItem;