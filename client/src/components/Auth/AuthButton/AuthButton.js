import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../../lib/styleUtils';

const Wrapper = styled.div`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: #4695D6;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: #4695D6;
        ${shadow(0)}
    }

    &:active {
        background: #4695D6;
    }

`;

const AuthButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

export default AuthButton;