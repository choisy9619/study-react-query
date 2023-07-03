import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import {
    LOGIN_URL,
    LOGOUT_URL,
    MAIN_URL,
    SIGN_UP_URL,
    TODO_URL,
} from '@/constants';
import { Login, SignUp, Root, Error, Todo } from '@/pages';

const router = createBrowserRouter([
    {
        path: MAIN_URL,
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: SIGN_UP_URL,
                element: <SignUp />,
            },
            {
                path: LOGIN_URL,
                element: <Login />,
            },
            {
                path: LOGOUT_URL,
            },
            {
                path: TODO_URL,
                element: <Todo />,
            },
        ],
    },
]);

export default router;
