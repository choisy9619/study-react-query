import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios/index';

import instance from '../middlewares/axios';

import { TODO_API_URL } from '@/constants';
import { type ITodo, type IUpdateTodo } from '@/interfaces';

const updateTodo = async ({
    id,
    ...info
}: IUpdateTodo): Promise<{ data: ITodo }> => {
    const { data } = await instance.put(`${TODO_API_URL}/${id}`, info);
    return data;
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(async (data: IUpdateTodo) => await updateTodo(data), {
        onError: (error: AxiosError<{ details: string }>) => {
            window.alert(error.response?.data.details);
        },
        onSuccess: async () => {
            await queryClient.refetchQueries(['todos']);
        },
    });
};
