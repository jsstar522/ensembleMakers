import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow, device } from '../../../lib/styleUtils';

const ButtonWrapper = styled.div`
    height: 55px;
    align-items: center;
`;

const BorderedButton = styled(Link)`
    font-weight: 600;
    color: #4695D6;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-align: center;
    text-decoration: none;
    transition: .2s all;

    &:hover {
        background: #4695D6;
        color: white;
        ${shadow(1)}
    }

    @media ${device.phone} { 
        font-size: 12px;
        width: 110px;
    }
    @media ${device.tablet} { 
        font-size: 15px;
        width: 140px;
    }
    @media ${device.desktop} { 
        font-size: 15px;
        width: 140px;
    }
    @media ${device.wide} { 
        font-size: 18px;
        width: 170px;
    }


`;

const LoginButton = () => (
    <BorderedButton to="/login/signin">
            로그인 및 회원가입
    </BorderedButton>

);

export default LoginButton;
