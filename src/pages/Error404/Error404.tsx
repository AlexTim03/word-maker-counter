import React from 'react';
import { useRouteError } from 'react-router-dom';

interface RouteError {
    data?: string;
    statusText?: string;
    message?: string;
}

export const Error404 = () => {
    const error = useRouteError();
    console.error(error);
    const castError = error as RouteError;

    return (
        <>
            <h1>Ой!</h1>
            <p>Необрабатываемая ошибка роутинга:</p>
            <p>
                <i>{castError.data || castError.statusText || castError.message}</i>
            </p>
        </>
    );
};
