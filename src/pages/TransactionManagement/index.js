import React from 'react';
import {
  TRANSACTION_HISTORY_ROUTE,
  TRANSACTION_INFO_ROUTE,
  TRANSACTION_ROUTE,
  TRANSACTION_TRANSFER_VARS_CONFIRM_ROUTE,
  TRANSACTION_TRANSFER_VARS_INFO_ROUTE,
  TRANSACTION_TRANSFER_VARS_ROUTE,
  TRANSACTION_TRANSFER_VARS_SUCCESS_ROUTE
} from './declareRoute';

const TransactionForm = React.lazy(() => import('./TransactionForm'));
const TransactionInfomation = React.lazy(() => import('./TransactionInfomation'));
const TransactionHistory= React.lazy(() => import('./TransactionHistory'));
const TransferFormPage= React.lazy(() => import('./TransactionTransfer').then((module) => ({ default: module.TransferFormPage })));
const ConfirmPasswordPage= React.lazy(() => import('./TransactionTransfer').then((module) => ({ default: module.ConfirmPasswordPage })));
const TransferSuccessPage= React.lazy(() => import('./TransactionTransfer').then((module) => ({ default: module.TransferSuccessPage })));
const TransferInfoPage= React.lazy(() => import('./TransactionTransfer').then((module) => ({ default: module.TransferInfoPage })));
export const authorize = [
  {
    path: TRANSACTION_ROUTE,
    element: <TransactionForm />,
  },
  {
    path: TRANSACTION_INFO_ROUTE,
    element: <TransactionInfomation />,
  },
  {
    path: TRANSACTION_HISTORY_ROUTE,
    element: <TransactionHistory />,
  },
  {
    path: TRANSACTION_TRANSFER_VARS_ROUTE,
    element: <TransferFormPage />,
  },
  {
    path: TRANSACTION_TRANSFER_VARS_CONFIRM_ROUTE,
    element: <ConfirmPasswordPage />,
  },
  {
    path: TRANSACTION_TRANSFER_VARS_SUCCESS_ROUTE,
    element: <TransferSuccessPage />,
  },
  {
    path: TRANSACTION_TRANSFER_VARS_INFO_ROUTE,
    element: <TransferInfoPage />,
  },
];



export default {authorize};