import { useQuery } from '@tanstack/react-query';

import instance from '../middlewares/axios';

import { TODO_API_URL } from '@/constants';
import { type ITodo } from '@/interfaces';

const getTodoById = async (id: string): Promise<{ data: ITodo }> => {
    const { data } = await instance.get(`${TODO_API_URL}/${id}`);
    return data;
};

export const useGetTodoById = (id: string) => {
    const {
        data: todoById,
        isLoading: isGetTodoByIdLoading,
        isSuccess: isGetTodoByIdSuccess,
        isError: isGetTodoByIdError,
    } = useQuery(['todoById', id], async () => await getTodoById(id));

    return {
        todoById,
        isGetTodoByIdLoading,
        isGetTodoByIdSuccess,
        isGetTodoByIdError,
    };
};
