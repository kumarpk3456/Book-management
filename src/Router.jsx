import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import AddBooks from './components/users/AddBooks';
import EditBook from './components/users/EditBook';
import ViewBook from './components/users/ViewBook';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/books/add', element: <AddBooks /> },
            { path: '/books/edit/:id', element: <EditBook /> },
            { path: '/books/:id', element: <ViewBook /> },
        ]
    }, {
        path: '*',
        element: <NotFound />
    }
]);

export default Router