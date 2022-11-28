import React from 'react';
import {MAP_ROUTE} from './declareRoute';

const HeaderMap = React.lazy(() => import('./FeatureMap'));

export const authorize = [
  {
    path: MAP_ROUTE,
    element: <HeaderMap  />,
  },
];

export default {authorize};
