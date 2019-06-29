import React, { Component } from 'react';
import styled from 'styled-components'

import { device } from '../lib/styleUtils';

const Content = styled.div`
  text-align: center;

  @media ${device.phone} { 
    padding-top: 10rem;
    font-size: 1.2rem;
  }
  @media ${device.tablet} { 
    padding-top: 8rem;
    font-size: 1.8rem;
  }
  @media ${device.desktop} { 
    padding-top: 8rem;
    font-size: 1.8rem;
  }

`

class CustomerInfoSuccess extends Component {
  render(){
    return(
      <div>
        <Content>성공적으로 등록되었습니다.</Content>
      </div>
    )
  }
}

export default CustomerInfoSuccess;