import { AxiosError } from 'axios';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

import { MAIN_URL } from '@/constants';

const Error = () => {
    const error = useRouteError();

    if (error instanceof AxiosError) {
        return <div>{error?.response?.data}</div>;
    }

    return (
        <div>
            잘못된 접근입니다.
            <Link to={MAIN_URL}>Main Page</Link>
        </div>
    );
};

export default Error;
