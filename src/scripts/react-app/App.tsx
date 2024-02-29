import type { FC } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import '@styles';


const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Hello, TypeScript React!aaa</h1>,
    },
    {
        path: 'login',
        element: <div>login</div>,
    },
    {
        path: 'servers',
        element: <div>servers</div>,
    },
]);
export const App: FC = () => <RouterProvider router={router} />