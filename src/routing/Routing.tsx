import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from 'components/AppShell';
import { MainMenu } from 'pages/MainMenu';
import { Error404 } from 'pages/Error404';
import { NewGame } from 'pages/NewGame';
import { ActiveGame } from 'pages/ActiveGame';
import { SaveGame } from 'pages/SaveGame';
import { Result } from 'pages/Result';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppShell routeComponent={<MainMenu />} />,
        errorElement: <AppShell routeComponent={<Error404 />} />,
    },
    {
        path: '/new',
        element: <AppShell routeComponent={<NewGame />} />,
    },
    {
        path: '/game',
        element: <AppShell routeComponent={<ActiveGame />} />,
    },
    {
        path: '/save',
        element: <AppShell routeComponent={<SaveGame />} />,
    },
    {
        path: '/result',
        element: <AppShell routeComponent={<Result />} />,
    },
]);

export const Routing = () => <RouterProvider router={router} />;
