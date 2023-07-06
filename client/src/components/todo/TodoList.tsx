import React from 'react';

import TodoNothing from './TodoNothing';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { useGetTodoList } from '../../hooks/useGetTodoList';
import Loading from '../Loading';

import { type ITodo } from '@/interfaces';

export default function TodoList() {
    const { mutate: deleteTodoMutation } = useDeleteTodo();

    const { todoList, isGetTodoListLoading } = useGetTodoList();

    const handleDeleteTodo = (id: string) => {
        deleteTodoMutation(id);
    };

    if (isGetTodoListLoading) return <Loading />;
    if (todoList?.data?.length === 0) return <TodoNothing />;

    return (
        <>
            {todoList?.data?.map((todo: ITodo) => (
                <div key={todo.id}>
                    <p>{todo.title}</p>
                    <p>{todo.content}</p>
                    <button>수정</button>
                    <button
                        type="submit"
                        onClick={() => {
                            handleDeleteTodo(todo.id);
                        }}
                    >
                        삭제
                    </button>
                </div>
            ))}
        </>
    );
}
