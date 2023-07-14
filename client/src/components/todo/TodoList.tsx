import React, { useState } from 'react';

import TodoNothing from './TodoNothing';
import UpdateTodoModal from './UpdateTodoModal';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { useGetTodoList } from '../../hooks/useGetTodoList';
import Loading from '../Loading';

import { type ITodo } from '@/interfaces';

export default function TodoList() {
    const [isOpenUpdateTodoModal, setIsOpenModal] = useState<boolean>(false);
    const [clickedTodoInfo, setClickedTodoInfo] = useState<ITodo>();

    const { mutate: deleteTodoMutation } = useDeleteTodo();
    const { todoList, isGetTodoListLoading } = useGetTodoList();

    const handleCloseModal = () => setIsOpenModal(false);
    const handleOpenModal = (info: ITodo) => {
        setClickedTodoInfo(info);
        setIsOpenModal(true);
    };

    if (isGetTodoListLoading) return <Loading />;
    if (todoList?.data?.length === 0) return <TodoNothing />;

    return (
        <>
            {todoList?.data?.map((todo: ITodo) => (
                <div key={todo.id}>
                    <p>{todo.title}</p>
                    <p>{todo.content}</p>
                    <button onClick={() => handleOpenModal(todo)}>수정</button>
                    <button
                        type="submit"
                        onClick={() => deleteTodoMutation(todo.id)}
                    >
                        삭제
                    </button>
                </div>
            ))}
            {isOpenUpdateTodoModal && clickedTodoInfo != null && (
                <UpdateTodoModal
                    open={isOpenUpdateTodoModal}
                    onClose={handleCloseModal}
                    todoInfo={clickedTodoInfo}
                />
            )}
        </>
    );
}
