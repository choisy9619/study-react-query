import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Loading from '../components/common/Loading';
import Home from '../pages/Home';
import PrivateRoute from '../utils/PrivateRoute';

import { LOGIN_URL, MAIN_URL, SIGN_UP_URL, TODO_URL } from '@/constants';
import { Login, SignUp, Root, Error, Todo } from '@/pages';

const router = createBrowserRouter([
    {
        path: MAIN_URL,
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: MAIN_URL,
                element: <Home />,
            },
            {
                path: SIGN_UP_URL,
                element: <SignUp />,
            },
            {
                path: LOGIN_URL,
                element: <Login />,
            },
            {
                path: TODO_URL,
                element: (
                    <Suspense fallback={<Loading />}>
                        <PrivateRoute>
                            <Todo />
                        </PrivateRoute>
                    </Suspense>
                ),
            },
        ],
    },
]);

export default router;
