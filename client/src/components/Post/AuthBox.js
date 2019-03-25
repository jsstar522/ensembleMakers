import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Box = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.black[8]};
    border: 1px solid black;
    height: 15rem;
    width: 50rem;
`;

const AuthBox = ({children}) => (
    <div>
      <Box>{children}</Box>
    </div>
);

export default AuthBox;