import { lazy } from 'react';

const Main = lazy(() => import('../pages/Main'));
const LogIn= lazy(() => import('../pages/Login'));
// const Emails = lazy(() => import('../components/Emails'));
// const ViewEmail = lazy(() => import('../components/ViewEmail'));
const SignUp = lazy(()=> import('../pages/SignUp'));
const View = lazy(()=> import('../components/View'));
const Sum = lazy(()=> import('../components/Sum'));

const routes = {
    login: {
        path: '/',
        element: LogIn
    },

    signup:{
        path : '/signup',
        element : SignUp
    },

    main:{
        path : '/view',
        element : View
    },

    sum:{
        path : '/sum',
        element : Sum
    }

   
}

export { routes };