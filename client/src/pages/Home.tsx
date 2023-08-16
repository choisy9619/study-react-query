import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_URL, TODO_URL, TOKEN } from '@/constants';

export default function Home() {
    return (
        <StyledHomeWrap>
            <Typography variant="h5">Home</Typography>{' '}
            <Link
                to={
                    !(localStorage.getItem(TOKEN) == null)
                        ? TODO_URL
                        : LOGIN_URL
                }
            >
                Please Login to start your Todo App.
            </Link>
        </StyledHomeWrap>
    );
}

const StyledHomeWrap = styled.div`
    padding: 10px;
`;
