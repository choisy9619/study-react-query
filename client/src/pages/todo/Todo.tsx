import styled from '@emotion/styled';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
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
            <div>
                <Typography variant="h5">TODO</Typography>
                <Button variant="contained" onClick={handleOpenAddModal}>
                    추가
                </Button>
            </div>
            <Divider />
            <StyledTodoListWrap>
                <List>
                    {todoList?.data?.map((todo: ITodo) => (
                        <StyledListItemWrap
                            key={todo.id}
                            secondaryAction={
                                <StyledListActionButtons>
                                    <IconButton
                                        edge="end"
                                        aria-label="modify"
                                        onClick={() =>
                                            handleOpenUpdateModal(todo)
                                        }
                                    >
                                        <BuildTwoToneIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            handleDeleteTodo(todo.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledListActionButtons>
                            }
                        >
                            <ListItemText
                                primary={todo.title}
                                secondary={
                                    <StyledListContent>
                                        {todo.content}
                                    </StyledListContent>
                                }
                            />
                        </StyledListItemWrap>
                    ))}
                </List>
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
            </StyledTodoListWrap>
        </StyledTodoWrap>
    );
}

const StyledTodoWrap = styled.div`
    width: 500px;
    padding: 10px;

    > div:first-of-type {
        display: flex;
        justify-content: space-between;
        padding: 5px;
    }
`;

const StyledTodoListWrap = styled.div`
    padding: 10px 0 0;
`;

const StyledListItemWrap = styled(ListItem)`
    padding: 0 0 10px;
`;

const StyledListContent = styled.p`
    white-space: pre-wrap;
`;

const StyledListActionButtons = styled.div`
    display: flex;
    gap: 5px;
    padding: 0 20px 0;
`;
