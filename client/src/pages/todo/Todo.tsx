import React from 'react';

import AddTodo from '../../components/todo/AddTodo';
import TodoList from '../../components/todo/TodoList';

export default function Todo() {
    return (
        <>
            <h1>TODO</h1>
            <AddTodo />
            <TodoList />
        </>
    );
}
