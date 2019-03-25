import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Positioner = styled.div`
    position: absolute;
    margin-top: 5rem;
    margin-bottom: 5rem;
    z-index: -1;
    left: 10%;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.black[8]};
    margin-bottom: 1rem;
`;

const PostContent = ({title, children}) => (
    <div>
        <Positioner>
            <Title>{title}</Title>
            {children}
        </Positioner>
    </div>
);

export default PostContent;