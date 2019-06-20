import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from '../../../lib/styleUtils';

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
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled.div`
    width: 100%;
    font-size: 1.4rem;
    text-align: center;
    letter-spacing: 2px;
    color: #4695D6;
    font-family: 'Rajdhani';
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
                    <Logo>ensemble makers</Logo>
                    <Spacer/>
                    {/* 로그인 메뉴 */}
                    {/* {children} */}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>

        </Positioner>
    );
};

export default Header;
