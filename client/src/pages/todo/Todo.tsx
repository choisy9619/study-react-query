import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import React from 'react';

import AddTodo from '../../components/todo/AddTodo';
import TodoList from '../../components/todo/TodoList';

export default function Todo() {
    return (
        <StyledTodoWrap>
            <Typography variant="h5">TODO</Typography>
            <AddTodo />
            <Divider />
            <TodoList />
        </StyledTodoWrap>
    );
}

const StyledTodoWrap = styled.div`
    width: 500px;
    padding: 10px;

    h5 {
        padding: 0 0 10px;
    }
`;
