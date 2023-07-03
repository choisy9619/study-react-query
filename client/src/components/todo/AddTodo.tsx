import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios/index';
import React from 'react';
import { useForm } from 'react-hook-form';

import todoAPI from '../../api/todo';

import { type INewTodo } from '@/interfaces';

const defaultFormValues = {
    title: '',
    content: '',
};

export default function AddTodo() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<INewTodo>({
        mode: 'onChange',
        defaultValues: defaultFormValues,
    });

    const addTodoMutation = useMutation(
        async (data: INewTodo) => await todoAPI.createTodo(data),
        {
            onError: (error: AxiosError<{ details: string }>) => {
                window.alert(error.response?.data.details);
            },
            onSuccess: async () => {
                await queryClient.refetchQueries(['todos']);
                reset(defaultFormValues);
            },
        },
    );

    const onSubmit = (data: INewTodo) => {
        addTodoMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Title"
                {...register('title', {
                    required: 'required',
                })}
            />
            <span>{errors?.title?.message}</span>
            <input
                type="text"
                placeholder="content"
                {...register('content', {
                    required: 'required',
                })}
            />
            <span>{errors?.content?.message}</span>
            <button type="submit">ADD</button>
        </form>
    );
}
