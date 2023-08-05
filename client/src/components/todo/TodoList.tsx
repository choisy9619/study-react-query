import styled from '@emotion/styled';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';

import TodoNothing from './TodoNothing';
import UpdateTodoModal from './UpdateTodoModal';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { useGetTodoList } from '../../hooks/useGetTodoList';
import { useAlertMessage } from '../../stores/alert';
import Loading from '../common/Loading';

import { DELETE_TO_DO_SUCCESS } from '@/constants';
import { type ITodo } from '@/interfaces';

export default function TodoList() {
    const { setAlertMessage } = useAlertMessage();

    const [isOpenUpdateTodoModal, setIsOpenModal] = useState<boolean>(false);
    const [clickedTodoInfo, setClickedTodoInfo] = useState<ITodo>();

    const { mutate: deleteTodoMutation } = useDeleteTodo();
    const { todoList, isGetTodoListLoading } = useGetTodoList();

    const handleCloseModal = () => setIsOpenModal(false);
    const handleOpenModal = (info: ITodo) => {
        setClickedTodoInfo(info);
        setIsOpenModal(true);
    };

    const handleDeleteTodo = (id: string) => {
        deleteTodoMutation(id, {
            onSuccess: () => setAlertMessage(DELETE_TO_DO_SUCCESS),
        });
    };

    if (isGetTodoListLoading) return <Loading />;
    if (todoList?.data?.length === 0) return <TodoNothing />;

    return (
        <StyledTodoListWrap>
            <List>
                {todoList?.data?.map((todo: ITodo) => (
                    <StyledListItemWrap
                        disablePadding
                        key={todo.id}
                        secondaryAction={
                            <StyledListActionButtons>
                                <IconButton
                                    edge="end"
                                    aria-label="modify"
                                    onClick={() => handleOpenModal(todo)}
                                >
                                    <BuildTwoToneIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </StyledListActionButtons>
                        }
                    >
                        <ListItemText
                            primary={todo.title}
                            secondary={todo.content}
                        />
                    </StyledListItemWrap>
                ))}
            </List>
            {isOpenUpdateTodoModal && clickedTodoInfo != null && (
                <UpdateTodoModal
                    open={isOpenUpdateTodoModal}
                    onClose={handleCloseModal}
                    todoInfo={clickedTodoInfo}
                />
            )}
        </StyledTodoListWrap>
    );
}

const StyledTodoListWrap = styled.div`
    padding: 10px 0 0;
`;

const StyledListItemWrap = styled(ListItem)`
    padding: 0 0 10px;
`;

const StyledListActionButtons = styled.div`
    display: flex;
    gap: 5px;
    padding: 0 20px 0;
`;
