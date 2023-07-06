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
            onSuccess: () => {
                reset(defaultFormValues);
            },
        });
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
