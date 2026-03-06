import { createBrowserRouter } from "react-router-dom";
import RegisterUser from "./pages/auth/register";
import LoginUser from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import TaskIndex from "./pages/tasks";
import TaskCreate from "./pages/tasks/create";
import TaskEdit from "./pages/tasks/edit";
import TaskDetail from "./pages/tasks/view";

import UserIndex from "./pages/users/index";
import UserCreate from "./pages/users/create";
import UserDetail from "./pages/users/view";
import UserEdit from "./pages/users/edit";

import AuthRoute from "../components/auth-router";

const router = createBrowserRouter([
    {
        path: 'user/register',
        element: <RegisterUser />,
    },
    {
        path: 'user/login',
        element: <LoginUser />,
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: 'reset-password',
        element: <ResetPassword />,
    },
    {
        path: 'tasks',
        element:  <AuthRoute><TaskIndex /></AuthRoute>,
    },
    {
        path: 'tasks/create',
        element: <AuthRoute><TaskCreate /></AuthRoute>,
    },
    {
        path: 'tasks/:id/edit',
        element: <AuthRoute><TaskEdit /></AuthRoute>,
    },
    {
        path: 'tasks/:id',
        element: <AuthRoute><TaskDetail /></AuthRoute>,
    },
    {
        path: 'users',
        element: <AuthRoute><UserIndex /></AuthRoute>,
    },
        {
        path: 'users/create',
        element: <AuthRoute><UserCreate /></AuthRoute>,
    },
    {
        path: 'users/:id',
        element: <AuthRoute><UserDetail /></AuthRoute>,
    },
    {
        path: 'users/:id/edit',
        element: <AuthRoute><UserEdit /></AuthRoute>,
    },
])

export default router;