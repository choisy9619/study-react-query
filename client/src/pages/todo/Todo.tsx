import styled from '@emotion/styled';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

import Loading from '../../components/common/Loading';
import AddTodoModal from '../../components/todo/AddTodoModal';
import TodoNothing from '../../components/todo/TodoNothing';
import UpdateTodoModal from '../../components/todo/UpdateTodoModal';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { useGetTodoList } from '../../hooks/useGetTodoList';
import { useAlertMessage } from '../../stores/alert';

import { DELETE_TO_DO_CONFIRMATION, DELETE_TO_DO_SUCCESS } from '@/constants';
import { type ITodo } from '@/interfaces';

export default function Todo() {
    const { setAlertMessage } = useAlertMessage();

    const [isOpenUpdateTodoModal, setIsOpenUpdateModal] =
        useState<boolean>(false);
    const [isOpenAddTodoModal, setIsOpenAddModal] = useState<boolean>(false);
    const [clickedTodoInfo, setClickedTodoInfo] = useState<ITodo>();

    const { mutate: deleteTodoMutation } = useDeleteTodo();
    const { todoList, isGetTodoListLoading } = useGetTodoList();

    const handleOpenAddModal = () => setIsOpenAddModal(true);
    const handleCloseAddModal = () => setIsOpenAddModal(false);
    const handleOpenUpdateModal = (info: ITodo) => {
        setClickedTodoInfo(info);
        setIsOpenUpdateModal(true);
    };
    const handleCloseUpdateModal = () => setIsOpenUpdateModal(false);

    const handleDeleteTodo = (id: string) => {
        if (window.confirm(DELETE_TO_DO_CONFIRMATION)) {
            deleteTodoMutation(id, {
                onSuccess: () => setAlertMessage(DELETE_TO_DO_SUCCESS),
            });
        }
    };

    if (isGetTodoListLoading) return <Loading />;
    if (todoList?.data?.length === 0) return <TodoNothing />;

    return (
        <StyledTodoWrap>
            <header>
                <Typography variant="h5">TODO</Typography>
                <Button
                    color="success"
                    variant="outlined"
                    onClick={handleOpenAddModal}
                >
                    + 추가
                </Button>
            </header>
            <div>
                {todoList?.data?.map((todo: ITodo) => (
                    <StyledCard sx={{ minWidth: 200 }} key={todo.id}>
                        <StyledCardContent>
                            <Typography component="div" variant="h5">
                                {todo.title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {todo.content}
                            </Typography>
                        </StyledCardContent>
                        <StyledCardActions>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => handleOpenUpdateModal(todo)}
                            >
                                수정
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                삭제
                            </Button>
                        </StyledCardActions>
                    </StyledCard>
                ))}
            </div>
            {isOpenAddTodoModal && (
                <AddTodoModal
                    open={isOpenAddTodoModal}
                    onClose={handleCloseAddModal}
                />
            )}
            {isOpenUpdateTodoModal && clickedTodoInfo != null && (
                <UpdateTodoModal
                    open={isOpenUpdateTodoModal}
                    onClose={handleCloseUpdateModal}
                    todoInfo={clickedTodoInfo}
                />
            )}
        </StyledTodoWrap>
    );
}

const StyledTodoWrap = styled.div`
    margin: 0 auto;
    padding: 20px;
    width: 500px;

    > header {
        background-color: lavender;
        display: flex;
        justify-content: space-between;
        padding: 20px 20px 20px 10px;
        margin: 0 0 20px;
        border-radius: 5px;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

const StyledCard = styled(Card)`
    margin: 10px;
`;

const StyledCardContent = styled(CardContent)`
    white-space: pre-wrap;
`;

const StyledCardActions = styled(CardActions)`
    display: flex;
    justify-content: flex-end;
`;
