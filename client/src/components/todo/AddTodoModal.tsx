import styled from '@emotion/styled';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateTodo } from '../../hooks/useCreateTodo';
import { useAlertMessage } from '../../stores/alert';

import { ADD_TO_DO_SUCCESS } from '@/constants';
import { type INewTodo } from '@/interfaces';

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

interface AddTodoModalProps {
    open: boolean;
    onClose: () => void;
}

const defaultFormValues = {
    title: '',
    content: '',
};

export default function AddTodoModal(props: AddTodoModalProps) {
    const { open, onClose } = props;

    const { setAlertMessage } = useAlertMessage();
    const { mutate: createTodoMutation } = useCreateTodo();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<INewTodo>({
        mode: 'onChange',
        defaultValues: defaultFormValues,
    });

    const handleOnSubmit = (data: INewTodo) => {
        createTodoMutation(data, {
            onSuccess: () => {
                setAlertMessage(ADD_TO_DO_SUCCESS);
                reset({});
                onClose();
            },
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">할일을 추가해보세요</Typography>
                <StyledTextFieldsWrap onSubmit={handleSubmit(handleOnSubmit)}>
                    <TextField
                        required
                        type="text"
                        label="제목"
                        helperText={errors?.title?.message}
                        error={!(errors?.title?.message == null)}
                        {...register('title', { required: 'required' })}
                    />
                    <StyledTextarea
                        id="content"
                        required
                        placeholder="내용"
                        minRows={5}
                        {...register('content', { required: 'required' })}
                    />
                    <span>{errors?.content?.message}</span>
                    <Button type="submit" variant="contained">
                        추가
                    </Button>
                </StyledTextFieldsWrap>
            </Box>
        </Modal>
    );
}

const StyledTextFieldsWrap = styled.form`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 5px 0 20px;
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
