import { useQuery } from '@tanstack/react-query';

import instance from '../middlewares/axios';

import { TODO_API_URL } from '@/constants';
import { type ITodo } from '@/interfaces';

const getTodoList = async (): Promise<{ data: ITodo[] }> => {
    const { data } = await instance.get(TODO_API_URL);
    return data;
};

export const useGetTodoList = () => {
    const {
        data: todoList,
        isLoading: isGetTodoListLoading,
        isSuccess: isGetTodoListSuccess,
        isError: isGetTodoListError,
    } = useQuery(['todos'], async () => await getTodoList());

    return {
        todoList,
        isGetTodoListLoading,
        isGetTodoListSuccess,
        isGetTodoListError,
    };
};
