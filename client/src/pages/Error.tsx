import { AxiosError } from 'axios';
import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();

    if (error instanceof AxiosError) {
        return <div>{error?.response?.data}</div>;
    }

    return <div>잘못된 접근입니다.</div>;
};

export default Error;
