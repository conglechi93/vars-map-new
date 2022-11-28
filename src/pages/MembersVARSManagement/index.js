import React from 'react';
import {
  MEMBER_SIGNUP_ROUTE,
  MEMBER_INFORMATION_CONFIRM_ROUTE,
  MEMBER_PASSWORD_CONFIRM_ROUTE,
  MEMBER_SIGNUP_SUCCESS_ROUTE,
  MEMBER_SUCCESS_ROUTE,
  MEMBER_VIP_SIGNUP_ROUTE,
  MEMBER_VIP_SIGNUP_SUCCESS_ROUTE
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
    path: MEMBER_SIGNUP_ROUTE,
    element: <Signup />,
  },
  {
    path: MEMBER_INFORMATION_CONFIRM_ROUTE,
    element: <ConfirmPayment />,
  },
  {
    path: MEMBER_PASSWORD_CONFIRM_ROUTE,
    element: <ConfirmPassword />,
  },
  {
    path: MEMBER_SIGNUP_SUCCESS_ROUTE,
    element: <SignupSuccess />,
  },
  {
    path: MEMBER_SUCCESS_ROUTE,
    element: <Success />,
  },
  {
    path: MEMBER_VIP_SIGNUP_ROUTE,
    element: <SignupVIP />,
  },
  {
    path: MEMBER_VIP_SIGNUP_SUCCESS_ROUTE,
    element: <SignupVIPSuccess />,
  }
];

export default {authorize};