import { errorPagesConfigs } from './errorPages';
import { defaultSignInUrl, initialUrl } from '../shared/constants/AppConst';
import React from 'react';
// import applicationConfig from './ApplicationManagement';
import { Navigate } from 'react-router-dom';
import { ERROR_404_ROUTE } from './errorPages/declareRoute';
import Intermediate from './Intermediate';
import profileConfig from './ProfileManagement';
import { authorize } from './Home';
import mapConfig from './Map';
import employeeConfig from './EmployeeManagement';
import enterpriseConfig from './EnterpriseManagement';
import memberConfig from './MembersVARSManagement';
import transactionConfig from './TransactionManagement';
import enterpriseMemberConfig from './EnterpriseVARSManagement';
const Error403 = React.lazy(() => import('./errorPages/Error403'));

const authorizedStructure = {
  fallbackPath: defaultSignInUrl,
  unAuthorizedComponent: <Error403 />,
  routes: [
    {
      path: initialUrl,
      element: <Intermediate />,
    },
    ...profileConfig.authorize,
    ...enterpriseConfig.authorize,
    ...memberConfig.authorize,
    ...transactionConfig.authorize,
    ...enterpriseMemberConfig.authorize,
    ...employeeConfig.authorize,
    ...mapConfig.authorize
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: [...authorize],
};

const anonymousStructure = {
  routes: [
    ...errorPagesConfigs.concat([
      {
        path: '*',
        element: <Navigate to={ERROR_404_ROUTE} replace />,
      },
    ]),
  ],
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
