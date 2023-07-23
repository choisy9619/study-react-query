import styled from '@emotion/styled';
import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateTodo } from '../../hooks/useCreateTodo';

import { type INewTodo } from '@/interfaces';

const defaultFormValues = {
    title: '',
    content: '',
};

export default function AddTodo() {
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

    const onSubmit = (data: INewTodo) => {
        createTodoMutation(data, {
            onSuccess: () => reset({}, { keepDefaultValues: true }),
        });
    };

    return (
        <>
            <Typography variant="subtitle1">할일 추가 🤖</Typography>
            <StyledTextFieldsWrap onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    required
                    type="text"
                    label="Title"
                    error={!(errors?.title?.message == null)}
                    helperText={errors?.title?.message}
                    {...register('title', { required: 'required' })}
                />
                <TextField
                    required
                    type="text"
                    label="Content"
                    error={!(errors?.content?.message == null)}
                    helperText={errors?.content?.message}
                    {...register('content', { required: 'required' })}
                />
                <Button type="submit" variant="contained">
                    ADD
                </Button>
            </StyledTextFieldsWrap>
        </>
    );
}

const StyledTextFieldsWrap = styled.form`
    display: flex;
    gap: 10px;
    padding: 5px 0 20px;

    > button {
        height: 56px;
    }
`;
