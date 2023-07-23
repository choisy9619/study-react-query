import styled from '@emotion/styled';
import React from 'react';

export default function Loading() {
    return (
        <StyledLoadingWrap>
            <p>Loading...</p>
        </StyledLoadingWrap>
    );
}

const StyledLoadingWrap = styled.div`
    padding: 10px 0 0;
`;
