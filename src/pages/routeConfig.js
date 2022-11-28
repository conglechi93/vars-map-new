
import { CHANGE_PASSWORD_ROUTE, INVITE_ROUTE, USER_PROFILE_ROUTE, USER_REPRESENTATIVE_ROUTE } from './ProfileManagement/declareRoute';
import { ENTERPRISE_SIGNUP_ROUTE, ENTERPRISE_SIGNUP_SUCCESS_ROUTE } from './EnterpriseManagement/declareRoute';
import { MEMBER_SIGNUP_ROUTE, MEMBER_VIP_SIGNUP_ROUTE } from './MembersVARSManagement/declareRoute';
import { TRANSACTION_HISTORY_ROUTE, TRANSACTION_ROUTE, TRANSACTION_TRANSFER_VARS_ROUTE } from './TransactionManagement/declareRoute';
import pinIco from '@assets/navbar/pin.svg';
import saveIcon from '@assets/navbar/saved-content.svg';
import loadVarsIco from '@assets/navbar/load-vars.svg';
import transferVarsIco from '@assets/navbar/transfer-vars.svg';
import historyVarsIco from '@assets/navbar/history.svg';
import vipVarsIco from '@assets/navbar/vip-vars.svg';
import endowIco from '@assets/navbar/endow.svg';
import starIco from '@assets/navbar/star.svg';
import representiveIco from '@assets/navbar/representive.svg';
import { ENTERPRISE_MEMBER_SIGNUP_ROUTE, ENTERPRISE_VIP_SIGNUP_ROUTE } from './EnterpriseVARSManagement/declareRoute';
import { EMPLOYEE_MANAGEMENT_ROUTE } from './EmployeeManagement/declareRoute';

const routesConfig = [
  // {
  //   id: 'post',
  //   messageId: 'route.group.postManagement',
  //   type: 'group',
  //   children: [
  //     {
  //       id: POST_MANAGEMENT_ROUTE,
  //       messageId: 'post.postManagement',
  //       type: 'item',
  //       icon: <AiOutlineCopy />,
  //       path: POST_MANAGEMENT_ROUTE,
  //     },
  //     {
  //       id: POST_SAVED_ROUTE,
  //       messageId: 'post.postSaved',
  //       type: 'item',
  //       icon: <AiOutlineCopy />,
  //       path: POST_SAVED_ROUTE,
  //     },
  //   ],
  // },
  {
    id: 'profile',
    messageId: 'route.group.userManagement',
    type: 'group',
    children: [
      {
        id: USER_PROFILE_ROUTE,
        messageId: 'profile.information',
        type: 'item',
        icon: <img src={pinIco} />,
        path: USER_PROFILE_ROUTE,
      },
      {
        id: CHANGE_PASSWORD_ROUTE,
        messageId: 'profile.changePassword',
        type: 'item',
        icon: <img src={saveIcon} />,
        path: CHANGE_PASSWORD_ROUTE,
      },
      {
        id: USER_REPRESENTATIVE_ROUTE,
        messageId: 'profile.representativePage',
        type: 'item',
        icon: <img src={representiveIco} />,
        path: USER_REPRESENTATIVE_ROUTE,
      },
      {
        id: INVITE_ROUTE,
        messageId: 'invites.titleMenu',
        type: 'item',
        icon: <img src={pinIco} />,
        path: INVITE_ROUTE,
      },
    ],
  },


  {
    id: 'enterprise',
    messageId: 'route.group.enterpriseManagement',
    type: 'group',
    children: [
      {
        id: ENTERPRISE_SIGNUP_ROUTE,
        messageId: 'common.register',
        type: 'item',
        icon: <img src={starIco} />,
        path: ENTERPRISE_SIGNUP_ROUTE,
      },
      {
        id: ENTERPRISE_SIGNUP_SUCCESS_ROUTE,
        messageId: 'navbar.enterpriseInfomation',
        type: 'item',
        icon: <img src={starIco} />,
        path: ENTERPRISE_SIGNUP_SUCCESS_ROUTE,
      },
      {
        id: EMPLOYEE_MANAGEMENT_ROUTE,
        messageId: 'employee.employeeManagement',
        type: 'item',
        icon: <img src={pinIco} />,
        path: EMPLOYEE_MANAGEMENT_ROUTE
      }
    ],
  },

  {
    id: 'enterpriseMembers',
    messageId: 'route.group.membersVARSManagement',
    type: 'group',
    children: [
      {
        id: ENTERPRISE_MEMBER_SIGNUP_ROUTE,
        messageId: 'common.becomeMember',
        type: 'item',
        icon: <img src={vipVarsIco} />,
        path: ENTERPRISE_MEMBER_SIGNUP_ROUTE,
      },
      {
        id: ENTERPRISE_VIP_SIGNUP_ROUTE,
        messageId: 'navbar.compleMemberVARS',
        type: 'item',
        icon: <img src={vipVarsIco} />,
        path: ENTERPRISE_VIP_SIGNUP_ROUTE,
      },
      {
        id: 'enterprise.endow',
        messageId: 'navbar.endow',
        type: 'item',
        icon: <img src={endowIco} />,
        path: '',
        redirectTo: 'https://www.w3schools.com/jsref/met_win_open.asp'
      },
    ],
  },

  {
    id: 'personMembers',
    messageId: 'route.group.membersVARSManagement',
    type: 'group',
    children: [
      {
        id: MEMBER_SIGNUP_ROUTE,
        messageId: 'common.becomeMember',
        type: 'item',
        icon: <img src={vipVarsIco} />,
        path: MEMBER_SIGNUP_ROUTE,
      },
      {
        id: MEMBER_VIP_SIGNUP_ROUTE,
        messageId: 'navbar.compleMemberVARS',
        type: 'item',
        icon: <img src={vipVarsIco} />,
        path: MEMBER_VIP_SIGNUP_ROUTE,
      },
      {
        id: '2',
        messageId: 'navbar.endow',
        type: 'item',
        icon: <img src={endowIco} />,
        path: '',
      },
    ],
  },

  {
    id: 'transaction',
    messageId: 'route.group.transactionManagement',
    type: 'group',
    children: [
      {
        id: TRANSACTION_ROUTE,
        messageId: 'common.rechargeVARS',
        type: 'item',
        icon: <img src={loadVarsIco} />,
        path: TRANSACTION_ROUTE,
      },
      {
        id: TRANSACTION_HISTORY_ROUTE,
        messageId: 'common.transactionHistory',
        type: 'item',
        icon: <img src={historyVarsIco} />,
        path: TRANSACTION_HISTORY_ROUTE,
      },
      {
        id: TRANSACTION_TRANSFER_VARS_ROUTE,
        messageId: 'common.transferVARS',
        type: 'item',
        icon: <img src={transferVarsIco} />,
        path: TRANSACTION_TRANSFER_VARS_ROUTE,
      },
    ],
  },

  {
    id: '',
    messageId: '',
    type: 'group',
    children: [
      {
        id: 'profile.introduction',
        messageId: 'profile.introduction',
        type: 'item',
        icon: <img src={loadVarsIco} />,
        path: '//',
      },
      {
        id: 'navbar.help',
        messageId: 'navbar.help',
        type: 'item',
        icon: <img src={historyVarsIco} />,
        path: '///',
      },
      {
        id: 'navbar.settings',
        messageId: 'navbar.settings',
        type: 'item',
        icon: <img src={transferVarsIco} />,
        path: '////',
      },
    ],
  },
];
export default routesConfig;  
