export interface ITodo {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface INewTodo {
    title: string;
    content: string;
}

export interface IUpdateTodo {
    id: string;
    title: string;
    content: string;
}
