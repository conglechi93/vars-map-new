import {APPLICATION_SELECTOR_ROUTE} from 'pages/ApplicationManagement/declareRoute';
import {
  USER_PROFILE_ROUTE,
} from 'pages/ProfileManagement/declareRoute';
import {ERROR_404_ROUTE} from 'pages/errorPages/declareRoute';
import {RECEPTION_ROUTE} from 'pages/SSOReception/declareRoute';
import {
  FooterType,
  LayoutType,
  MenuStyle,
  NavStyle,
  ThemeDirection,
  ThemeMode,
  ThemeStyle,
} from './AppEnums';
import { HOME_PAGE_ROUTE } from 'pages/Home/declareRoute';


const decodeReactAppEnv = (key) => {
  if (process.env?.[key] == null) return {};

  return JSON.parse(process.env?.[key]);
};

export const appConfig = {
  sidebar: {
    borderColor: 'transparent',
    menuStyle: MenuStyle.CURVED_MENU,
    isSidebarBgImage: false,
    sidebarBgImage: null,
    colorSet: {
      sidebarBgColor: 'var(--sidebar-bg)',
      sidebarHeaderColor: 'var(--sidebar-bg)',
      sidebarTextColor: '#fff',
      sidebarMenuSelectedBgColor: 'var(--sidebar-selected-bg)',
      sidebarMenuSelectedTextColor: '#fff',
      mode: ThemeMode.LIGHT,
    },
  },
  themeStyle: ThemeStyle.STANDARD,
  direction: ThemeDirection.LTR,
  themeMode: ThemeMode.SEMI_DARK,
  footerType: FooterType.FLUID,
  navStyle: NavStyle.USER_STANDARD,
  layoutType: LayoutType.FULL_WIDTH,
  footer: false,
  rtlLocale: ['ar'],
  localeContext: {
    locale: 'vi',
  },
};

export const dateFormat = 'DD/MM/YYYY';
export const initialUrl = '/intermediate'; // this url will open after login

export const apiTimeout = 10000;
export const apiHeaders = {
  'Content-Type': 'application/json',
  'Accept':'*/*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, *',
  
};
export const authOTPTimeout = 10000;
export const defaultSignInUrl = HOME_PAGE_ROUTE;
export const defaultAdminUrl = USER_PROFILE_ROUTE;

export const nullLayoutRoute = [

  RECEPTION_ROUTE,
  initialUrl,
  ERROR_404_ROUTE,
  '/qr/(\\w)+',
];

export const headerOnlyLayoutRoute = [APPLICATION_SELECTOR_ROUTE];

export const notificationSuccessOptions = {
  //titleId: 'common.success',
};

export const notificationErrorOptions = {
  titleId: 'common.error',
};

export const loginAttemptShowCaptcha = 5;

export const defaultPageSize =5;
export const defaultPageOption = {
  page: 1,
  pageSize: defaultPageSize,
};
export const pageSizeOptions = [10, 20, 50, 100];
export const localeConfig = decodeReactAppEnv('REACT_APP_LOCALE_CONFIG');
export const adminRole = 'ADMIN';
export const subAdminRole = 'SUB_ADMIN';
