import styled from '@emotion/styled';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useAlertMessage } from '../../stores/alert';

import { UPDATE_TO_DO_SUCCESS } from '@/constants';
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
    const { setAlertMessage } = useAlertMessage();

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
            onSuccess: () => {
                setAlertMessage(UPDATE_TO_DO_SUCCESS);
                onClose();
            },
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">수정할 정보를 입력해주세요</Typography>
                <StyledFormWrap onSubmit={handleSubmit(handleUpdateTodo)}>
                    <StyledTextFieldsWrap>
                        <TextField
                            required
                            label="title"
                            defaultValue={todoInfo.title}
                            helperText={errors?.title?.message}
                            error={!(errors?.title?.message == null)}
                            {...register('title', { required: 'required' })}
                        />
                        <StyledTextarea
                            required
                            minRows={5}
                            id="content"
                            defaultValue={todoInfo.content}
                            {...register('content', { required: 'required' })}
                        />
                        <span>{errors?.content?.message}</span>
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
    flex-direction: column;
    padding: 5px 0 0;

    > button {
        height: 56px;
    }
`;

const StyledButtonsWrap = styled.div`
    display: flex;
    gap: 5px;
    justify-content: flex-end;
`;

const StyledTextarea = styled(TextareaAutosize)`
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px;
    color: gray;
    background: white;
    border: 1px solid gray;

    &:hover {
        border-color: black;
    }

    &:focus {
        border-color: blue;
    }

    // firefox
    &:focus-visible {
        outline: 0;
    }
`;
