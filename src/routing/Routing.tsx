import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainMenu } from 'pages/MainMenu';
import { Error404 } from 'pages/Error404';
import { NewGame } from 'pages/NewGame';
import { ActiveGame } from 'pages/ActiveGame';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainMenu />,
        errorElement: <Error404 />,
    },
    {
        path: '/new',
        element: <NewGame />,
    },
    {
        path: '/game',
        element: <ActiveGame />,
    },
]);

export const Routing = () => <RouterProvider router={router} />;
