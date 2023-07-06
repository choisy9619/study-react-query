import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios/index';

import instance from '../middlewares/axios';

import { TODO_API_URL } from '@/constants';

const deleteTodo = async (id: string): Promise<{ data: null }> => {
    const { data } = await instance.delete(`${TODO_API_URL}/${id}`);
    return data;
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(async (id: string) => await deleteTodo(id), {
        onError: (error: AxiosError<{ details: string }>) => {
            window.alert(error.response?.data.details);
        },
        onSuccess: async () => {
            await queryClient.refetchQueries(['todos']);
        },
    });
};
