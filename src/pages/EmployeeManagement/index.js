import React from 'react';
import {
  EMPLOYEE_MANAGEMENT_ROUTE
} from './declareRoute';

const EmployeeManagement = React.lazy(() => import('./employeeList'));
export const authorize = [
  {
    path: EMPLOYEE_MANAGEMENT_ROUTE,
    element: <EmployeeManagement />,
  },
];

export default {authorize};