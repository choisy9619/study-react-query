import instance from '../middlewares/axios';

import { TODO_API_URL } from '@/constants';
import { type INewTodo, type ITodo, type IUpdateTodo } from '@/interfaces';

const todoAPI = {
    getTodoList: async (): Promise<{ data: ITodo[] }> => {
        const { data } = await instance.get(TODO_API_URL);
        return data;
    },
    getTodoById: async (id: string): Promise<{ data: ITodo }> => {
        const { data } = await instance.get(`${TODO_API_URL}/${id}`);
        return data;
    },
    createTodo: async (newTodo: INewTodo): Promise<{ data: ITodo }> => {
        const { data } = await instance.post(TODO_API_URL, newTodo);
        return data;
    },
    updateTodo: async ({
        id,
        ...info
    }: IUpdateTodo): Promise<{ data: ITodo }> => {
        const { data } = await instance.put(`${TODO_API_URL}/${id}`, info);
        return data;
    },
    deleteTodo: async (id: string): Promise<{ data: null }> => {
        const { data } = await instance.delete(`${TODO_API_URL}/${id}`);
        return data;
    },
};

export default todoAPI;
