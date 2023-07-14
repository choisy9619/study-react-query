import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

import instance from '../middlewares/axios';

import { TODO_API_URL } from '@/constants';
import { type INewTodo, type ITodo } from '@/interfaces';

const createTodo = async (newTodo: INewTodo): Promise<{ data: ITodo }> => {
    const { data } = await instance.post(TODO_API_URL, newTodo);
    return data;
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(async (data: INewTodo) => await createTodo(data), {
        onError: (error: AxiosError<{ details: string }>) => {
            window.alert(error.response?.data.details);
        },
        onSuccess: async () => {
            await queryClient.refetchQueries(['todos']);
        },
    });
};
