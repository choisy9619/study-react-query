import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export default function Loading() {
    return (
        <StyledLoading sx={{ display: 'flex' }}>
            <CircularProgress />
        </StyledLoading>
    );
}

const StyledLoading = styled(Box)`
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
`;
