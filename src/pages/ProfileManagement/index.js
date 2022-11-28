import React from 'react';
import {
    USER_PROFILE_ROUTE,
    USER_CHANGE_EMAIL_ROUTE,
    CHANGE_PASSWORD_ROUTE,
    USER_REPRESENTATIVE_ROUTE,
    INVITE_ROUTE
} from './declareRoute';

const Profile = React.lazy(() => import('./Profile'));
const ChangeEmail = React.lazy(() => import('./ChangeEmail'));
const ChangePassword = React.lazy(() => import('./ChangePassword'));
const RepresentativePage = React.lazy(() => import('./RepresentativePage'));
const Invite = React.lazy(() => import('./Invite'));

export const authorize = [
  {
    path: USER_PROFILE_ROUTE,
    element: <Profile />,
  },
  {
    path: USER_CHANGE_EMAIL_ROUTE,
    element: <ChangeEmail />,
  },
  {
    path: CHANGE_PASSWORD_ROUTE,
    element: <ChangePassword />,
  },
  {
    path: USER_REPRESENTATIVE_ROUTE,
    element: <RepresentativePage />,
  },
  {
    path: INVITE_ROUTE,
    element: <Invite />,
  },
];

export default {authorize};