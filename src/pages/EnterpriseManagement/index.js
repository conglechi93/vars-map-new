import React from 'react';
import {
  ENTERPRISE_SIGNUP_ROUTE, ENTERPRISE_SIGNUP_SUCCESS_ROUTE
} from './declareRoute';

const Signup = React.lazy(() => import('./Signup'));
const Success = React.lazy(() => import('./Success'));

export const authorize = [
  {
    path: ENTERPRISE_SIGNUP_ROUTE,
    element: <Signup />,
  },
  {
    path: ENTERPRISE_SIGNUP_SUCCESS_ROUTE,
    element: <Success />,
  },
];

export default {authorize};