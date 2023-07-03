import { useQuery } from '@tanstack/react-query';
import React from 'react';

import TodoNothing from './TodoNothing';
import todoAPI from '../../api/todo';
import Loading from '../Loading';

import { type ITodo } from '@/interfaces';

export default function TodoList() {
    const { data: todoList, isLoading } = useQuery(
        ['todos'],
        async () => await todoAPI.getTodoList(),
    );

    if (isLoading) return <Loading />;
    if (todoList?.data?.length === 0) return <TodoNothing />;

    return (
        <>
            {todoList?.data?.map((todo: ITodo) => (
                <div key={todo.id}>
                    <p>{todo.title}</p>
                    <p>{todo.content}</p>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            ))}
        </>
    );
}
