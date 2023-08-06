import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAlertMessage } from '../stores/alert';

import { LOGIN_URL, PLEASE_LOGIN, TOKEN } from '@/constants';

export default function PrivateRoute({ children }: any) {
    const { setAlertMessage } = useAlertMessage();

    if (!(localStorage.getItem(TOKEN) == null)) {
        return children;
    } else {
        setAlertMessage(PLEASE_LOGIN);
        return <Navigate to={LOGIN_URL} />;
    }
}
