import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Error from '../pages/Error';

import { LOGIN_URL, LOGOUT_URL, MAIN_URL, SIGN_UP_URL } from '@/constants';
import { Login, SignUp, Root } from '@/pages';

const router = createBrowserRouter([
    {
        path: MAIN_URL,
        element: <Root />,
        errorElement: <Error />,
    },
    {
        path: LOGOUT_URL,
    },
    {
        path: LOGIN_URL,
        element: <Login />,
    },
    {
        path: SIGN_UP_URL,
        element: <SignUp />,
    },
]);

export default router;
