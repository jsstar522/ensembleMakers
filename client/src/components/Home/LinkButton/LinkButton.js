import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { shadow, device } from '../../../lib/styleUtils';

const LinkButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 35vh;

  @media ${device.phone} { 
    width: 86%;
    height: 20vh;
  }
  @media ${device.tablet} { 
    width: 75%;
    height: 25vh;
  }
  @media ${device.desktop} { 
    width: 60%;
    height: 25vh;
  }
  @media ${device.wide} { 
    width: 60%;
    height: 35vh;
  }

`;

const BorderedButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 6px 1px hsl(0, 2%, 84%);
  border-radius: 3px;
  color: ${props => props.color};
  cursor: pointer;
  text-decoration: none;
  transition: .2s all;

  &:hover {
    color: white;
    background-color: ${props => props.color};
    ${shadow(1)}
  }
  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}

  @media ${device.phone} { 
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    width: 42%;
  }
  @media ${device.tablet} { 
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    width: 40%;
  }
  @media ${device.desktop} { 
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 2px;
    width: 35%;
  }
  @media ${device.wide} { 
    font-size: 25px;
    font-weight: 800;
    letter-spacing: 2px;
    width: 35%;
  }
`;

class LinkButton extends Component {
  render() {
    const { logged, userNumber } = this.props;
    return(
      <LinkButtonWrapper>
        <BorderedButton href={logged?"/customerInfo/"+userNumber:"/login/signin"} color="#f69e53">주문받기
        </BorderedButton>
        <BorderedButton href={logged?"/orderManage":"/login/signin"} color="#4695D6">주문관리
        </BorderedButton>
      </LinkButtonWrapper>
    )
  }
}

export default LinkButton;