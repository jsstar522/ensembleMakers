import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from '../../../lib/styleUtils';

const BorderedButton = styled(Link)`
    width: 20%;
    font-weight: 500;
    color: ${oc.blue[4]};
    // border: 1px solid ${oc.blue[4]};
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-align: center;
    text-decoration: none;
    transition: .2s all;

    &:hover {
        background: ${oc.blue[4]};
        color: white;
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }


`;

const LoginButton = () => (
    <BorderedButton to="/auth/login">
            로그인 및 회원가입
    </BorderedButton>

);

export default LoginButton;
