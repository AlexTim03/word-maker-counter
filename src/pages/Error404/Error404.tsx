import React from 'react';
import { useRouteError } from 'react-router';

interface RouteError {
    data?: string;
    statusText?: string;
    message?: string;
}

export const Error404 = () => {
    const error = useRouteError();
    if (error) console.error(error);
    const castError = (error ?? {}) as RouteError;

    return (
        <>
            <h1>Ой!</h1>
            <p>Страница не найдена или произошла ошибка маршрутизации.</p>
            {(castError.data || castError.statusText || castError.message) && (
                <p>
                    <i>{castError.data || castError.statusText || castError.message}</i>
                </p>
            )}
        </>
    );
};
