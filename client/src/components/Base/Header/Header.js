import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media, device } from '../../../lib/styleUtils';


// 상단 고정, 그림자
const Positioner = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${device.phone} { 
        padding-right: 5px;
        padding-left: 5px;
        width: 98%;
    }
    @media ${device.tablet} { 
        padding-right: 10px;
        padding-left: 10px;
        width: 91%;
    }
    @media ${device.desktop} { 
        padding-right: 20px;
        padding-left: 20px;
        width: 85%;
    }
    @media ${device.wide} { 
        padding-right: 20px;
        padding-left: 20px;
        width: 88%;
    }

`;

// 로고
const Logo = styled.a`
    position: absolute;
    letter-spacing: 1px;
    color: #f69e53;
    font-family: 'Rajdhani';
    text-decoration: none;
    transition: .2s all;
    text-align: center;

    @media ${device.phone} { 
        font-size: 20px;
        width: 52%;
    }
    @media ${device.tablet} { 
        font-size: 20px;
        width: 24%;
    }
    @media ${device.desktop} { 
        font-size: 28px;
        width: 24%;
    }
    @media ${device.wide} { 
        font-size: 28px;
        width: 20%;
    }
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, #f69e53, #fa6e57, #4695D6);
`;

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Logo href="/">ensemble makers</Logo>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>

        </Positioner>
    );
};

export default Header;