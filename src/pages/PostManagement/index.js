import React from 'react';
import {
    POST_MANAGEMENT_ROUTE, POST_SAVED_ROUTE
} from './declareRoute';

const PostManagement = React.lazy(() => import('./PostManagement'));
const PostSaved = React.lazy(() => import('./PostSaved'));

export const authorize = [
  {
    path: POST_MANAGEMENT_ROUTE,
    element: <PostManagement />,
  },
  {
    path: POST_SAVED_ROUTE,
    element: <PostSaved />,
  }
];

export default {authorize};