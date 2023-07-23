import styled from '@emotion/styled';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateTodo } from '../../hooks/useUpdateTodo';

import { type INewTodo, type ITodo, type IUpdateTodo } from '@/interfaces';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    p: 3,
};

interface UpdateTodoModalProps {
    open: boolean;
    onClose: () => void;
    todoInfo: ITodo;
}

export default function UpdateTodoModal(props: UpdateTodoModalProps) {
    const { open, onClose, todoInfo } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateTodo>({
        mode: 'onChange',
        defaultValues: { title: todoInfo.title, content: todoInfo.content },
    });

    const { mutate: updateTodoMutation } = useUpdateTodo();

    const handleUpdateTodo = (data: INewTodo) => {
        const apiData: IUpdateTodo = {
            id: todoInfo.id,
            title: data.title,
            content: data.content,
        };

        updateTodoMutation(apiData, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">
                    수정할 정보를 입력해주세요.
                </Typography>
                <StyledFormWrap onSubmit={handleSubmit(handleUpdateTodo)}>
                    <StyledTextFieldsWrap>
                        <TextField
                            required
                            label="title"
                            defaultValue={todoInfo.title}
                            error={!(errors?.title?.message == null)}
                            helperText={errors?.title?.message}
                            {...register('title', { required: 'required' })}
                        />
                        <TextField
                            required
                            label="content"
                            defaultValue={todoInfo.content}
                            error={!(errors?.content?.message == null)}
                            helperText={errors?.content?.message}
                            {...register('content', { required: 'required' })}
                        />
                    </StyledTextFieldsWrap>
                    <StyledButtonsWrap>
                        <Button variant="contained" type="submit">
                            수정
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onClose}
                        >
                            취소
                        </Button>
                    </StyledButtonsWrap>
                </StyledFormWrap>
            </Box>
        </Modal>
    );
}

const StyledFormWrap = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 0;
`;

const StyledTextFieldsWrap = styled.div`
    display: flex;
    gap: 5px;
`;

const StyledButtonsWrap = styled.div`
    display: flex;
    gap: 5px;
`;
