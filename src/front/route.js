import App from './components/app';
import Landing from './components/landing';
import Page404 from './components/404';
import User from './components/user';
import Admin from './components/admin';

export default [
  {
    ...App,
    routes: [
      {
        ...Landing,
        path: '/',
        exact: true,
      },
      {
        ...User,
        path: '/user',
        exact: true,
      },
      {
        ...Admin,
        path: '/admin',
        exact: true,
      },
      {
        ...Page404,
      },
    ],
  },
];
