import React from 'react';
import {
  ENTERPRISE_MEMBER_SIGNUP_ROUTE,
  ENTERPRISE_MEMBER_INFORMATION_CONFIRM_ROUTE,
  ENTERPRISE_MEMBER_PASSWORD_CONFIRM_ROUTE,
  ENTERPRISE_MEMBER_SIGNUP_SUCCESS_ROUTE,
  ENTERPRISE_MEMBER_SUCCESS_ROUTE,
  ENTERPRISE_VIP_SIGNUP_ROUTE,
  ENTERPRISE_VIP_SIGNUP_SUCCESS_ROUTE
} from './declareRoute';

const Signup = React.lazy(() => import('./Signup'));
const ConfirmPayment = React.lazy(() => import('./ConfirmPayment'));
const ConfirmPassword = React.lazy(() => import('./ConfirmPassword'));
const SignupSuccess = React.lazy(() => import('./SignupSuccess'));
const Success = React.lazy(() => import('./Success'));
const SignupVIP = React.lazy(() => import('./SignupVIP'));
const SignupVIPSuccess = React.lazy(() => import('./SignupVIPSuccess'));

export const authorize = [
  {
    path: ENTERPRISE_MEMBER_SIGNUP_ROUTE,
    element: <Signup />,
  },
  {
    path: ENTERPRISE_MEMBER_INFORMATION_CONFIRM_ROUTE,
    element: <ConfirmPayment />,
  },
  {
    path: ENTERPRISE_MEMBER_PASSWORD_CONFIRM_ROUTE,
    element: <ConfirmPassword />,
  },
  {
    path: ENTERPRISE_MEMBER_SIGNUP_SUCCESS_ROUTE,
    element: <SignupSuccess />,
  },
  {
    path: ENTERPRISE_MEMBER_SUCCESS_ROUTE,
    element: <Success />,
  },
  {
    path: ENTERPRISE_VIP_SIGNUP_ROUTE,
    element: <SignupVIP />,
  },
  {
    path: ENTERPRISE_VIP_SIGNUP_SUCCESS_ROUTE,
    element: <SignupVIPSuccess />,
  },
  

];

export default {authorize};