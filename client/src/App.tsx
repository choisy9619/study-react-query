import { Alert, Snackbar } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAlertMessage } from './stores/alert';

import { router } from '@/routes';
import { GlobalStyle } from '@/styles';

function App() {
    const { alertMessage, setAlertMessage } = useAlertMessage();

    const handleCloseAlert = () => {
        setAlertMessage('');
    };

    return (
        <>
            <GlobalStyle />
            <RouterProvider router={router} />
            {alertMessage !== '' && (
                <Snackbar
                    open={alertMessage !== ''}
                    onClose={handleCloseAlert}
                    autoHideDuration={1000}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Alert onClose={handleCloseAlert} severity="info">
                        {alertMessage}
                    </Alert>
                </Snackbar>
            )}
            <ReactQueryDevtools
                initialIsOpen={false}
                position={'bottom-right'}
            />
        </>
    );
}

export default App;
