import React, {createContext, useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import {getRouteMenus} from '../../../../utility/VerticalMenuUtils';
import clsx from 'clsx';
import './index.style.less';
import defaultConfig from '../../../../utility/AppContextProvider/defaultConfig';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import {MenuStyle} from '../../../../../shared/constants/AppEnums';
import PropTypes from 'prop-types';
import routesConfig from 'pages/routeConfig';
import compact from 'lodash/compact';
import Route from 'utils/Route';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector} from 'react-redux';
import { loadState } from 'utils/localStoreHandle';
import { 
  onGetEnrollEnterpriseMember,
  onGetEnterpriseList, 
  onUpdateAvatarEnterprise} from 'redux/actions/Enterprise';
import { ENTERPRISE_VIP_SIGNUP_ROUTE, ENTERPRISE_MEMBER_SIGNUP_ROUTE } from 'pages/EnterpriseVARSManagement/declareRoute';
import { MEMBER_SIGNUP_ROUTE, MEMBER_VIP_SIGNUP_ROUTE } from 'pages/MembersVARSManagement/declareRoute';
import { ENTERPRISE_SIGNUP_ROUTE, ENTERPRISE_SIGNUP_SUCCESS_ROUTE } from 'pages/EnterpriseManagement/declareRoute';
import { EMPLOYEE_MANAGEMENT_ROUTE } from 'pages/EmployeeManagement/declareRoute';
import emptyAvatar from '@assets/profile/empty-avatar.jpg';
import Check from '@assets/icon/check.svg';
import ContinueIco from '@assets/icon/continue.svg';
import Photo from '@assets/icon/take-photo.svg';
import { onGetBalanceWallet } from 'redux/actions/Transaction';
import { 
  onGetUserInfo,
  //onGetUserInfo, 
  onUpdateAvatar } from 'redux/actions/Auth';

const AppNavContext = createContext();

const AppNavProvider = ({children}) => {
  
  const [routeConfig, setRouteConfig] = useState(cloneDeep(routesConfig));
  const {exclusiveNavId, navParam, } = useSelector(
    ({userApplication}) => userApplication,
  );
  const dispatch = useDispatch();
  const { profile } = useSelector(({auth}) => auth);
  const { enterpriseInfo, enrollEnterprise, } = useSelector(({enterprise}) => enterprise);
  useEffect(() => {
    if(enterpriseInfo) {
      if(enterpriseInfo.registerStatus == '1') {
        const id = enterpriseInfo.id;
        dispatch(onGetEnrollEnterpriseMember({id}));
      }
    }
  },[enterpriseInfo])




  const filterExclude = (arr, excludes) => {
    return compact(
      arr.map((item) => {
        if (excludes.includes(item.id)) return null;
        if (item.children && item.children.length > 0)
          return {
            ...item,
            children: compact(filterExclude(item.children, excludes)),
          };
        else return item;
      }),
    );
  };

  const applyParam = (arr, params) => {
    return arr.map((item) => {
      if (item.path) item.path = Route.replaceParam(item.path, params);
      if (item.children && item.children.length > 0)
        return {
          ...item,
          children: applyParam(item.children, params),
        };
      return item;
    });
  };

  useEffect(() => {
    dispatch(onGetEnterpriseList());
  },[])

  useEffect(() => {
    var filterRouteConfig =
    filterExclude(routesConfig, exclusiveNavId ?? []) || [];
    const modeLogin = loadState('modeLogin')
    if(modeLogin == '0') {
      filterRouteConfig = filterRouteConfig.filter(filterRouteConfig => filterRouteConfig.id !== "enterpriseMembers");
      if(profile) {
        if(enterpriseInfo) {
          let pathChildren;
          if(enterpriseInfo.registerStatus == 1) {
            pathChildren =  "enterprise";
            filterRouteConfig = filterRouteConfig.filter(filterRouteConfig => filterRouteConfig.id !== pathChildren); 
          }
        }
        if(profile.enrollInfo) {
          for(let i = 0 ; i < filterRouteConfig.length; i++) {
            if(filterRouteConfig[i].id == "personMembers") {
              const step = profile.enrollInfo.isFirstEnroll;
              let pathChildren;
              if(step == '0') pathChildren = MEMBER_SIGNUP_ROUTE;
              else pathChildren = MEMBER_VIP_SIGNUP_ROUTE;
              let value = filterRouteConfig[i].children;
              value = value.filter(value => value.id !== pathChildren);
              filterRouteConfig[i].children = value;
            }
            if(filterRouteConfig[i].id == "enterprise") {
              let pathChildren;
              pathChildren = ENTERPRISE_SIGNUP_ROUTE;
              let value = filterRouteConfig[i].children;
              value = value.filter(value => value.id == pathChildren);
              filterRouteConfig[i].children = value;
            }
          }
        }
      }
    }

    if(modeLogin == '1') {
      filterRouteConfig = filterRouteConfig.filter(filterRouteConfig => filterRouteConfig.id !== "personMembers");
      if(enterpriseInfo) {
        let pathChildren;
        if(enterpriseInfo.registerStatus != 1) {
          pathChildren =  "enterpriseMembers";
          filterRouteConfig = filterRouteConfig.filter(filterRouteConfig => filterRouteConfig.id !== pathChildren); 
          for(let i = 0 ; i < filterRouteConfig.length; i++) {
            if(filterRouteConfig[i].id == "enterprise") {
                pathChildren = ENTERPRISE_SIGNUP_SUCCESS_ROUTE;
                let value = filterRouteConfig[i].children;
                value = value.filter(value => value.id !== pathChildren);
                filterRouteConfig[i].children = value;
            }
          }
        }
        else {
          for(let i = 0 ; i < filterRouteConfig.length; i++) {
            if(filterRouteConfig[i].id == "enterpriseMembers") {
              if(enrollEnterprise) {
                const step = enrollEnterprise.isFirstEnroll;
                let pathChildren;
                if(step != 0) pathChildren = ENTERPRISE_VIP_SIGNUP_ROUTE;
                else pathChildren = ENTERPRISE_MEMBER_SIGNUP_ROUTE;
                let value = filterRouteConfig[i].children;
                value = value.filter(value => value.id !== pathChildren);
                filterRouteConfig[i].children = value;
              }
            }
            if(filterRouteConfig[i].id == "enterprise") {
              let employeeRoute = EMPLOYEE_MANAGEMENT_ROUTE ;
              pathChildren = ENTERPRISE_SIGNUP_ROUTE;
              let value = filterRouteConfig[i].children;
              value = value.filter(value => value.id !== pathChildren || value.id == employeeRoute);
              filterRouteConfig[i].children = value;
            }
          }
        }
      }
    }  
    const newRouteConfig =
      applyParam(cloneDeep(filterRouteConfig), navParam || {}) || [];
    setRouteConfig(newRouteConfig);
  }, [exclusiveNavId, navParam, profile, enterpriseInfo, enrollEnterprise]);

  const getFirstRoute = (routes) => {
    const first = routes?.[0];
    return first?.path || first?.children?.[0]?.path || '';
  };
  const getFirstOriginalRoute = () => {
    const filterOriginalRouteConfig =
      filterExclude(routesConfig, exclusiveNavId ?? []) || [];
    return getFirstRoute(filterOriginalRouteConfig);
  };

  const getFirstModifiedRoute = () => {
    return getFirstRoute(routeConfig);
  };

  return (
    <AppNavContext.Provider
      value={{routeConfig, getFirstOriginalRoute, getFirstModifiedRoute}}>
      {children}
    </AppNavContext.Provider>
    
  );
};

AppNavProvider.propTypes = {
  children: PropTypes.node,
};

const AppVerticalNav = () => {
  const {menuStyle, sidebarColorSet} = useSidebarContext();
  const {pathname} = useLocation();
  const selectedKeys = pathname.substr(1).split('/');
  const defaultOpenKeys = selectedKeys[0];
  const [openKeys, setOpenKeys] = useState([defaultOpenKeys]);
  const {routeConfig} = useContext(AppNavContext);

  const { profile, avatar } = useSelector(({auth}) => auth);
  const { enterpriseInfo, avatarEnterprise } = useSelector(({ enterprise }) => enterprise);

  const [stylePage, setStylePage] = useState({display: "none"});
  const [name, setName] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [balance, setBalance] = useState(''); 
  const { wallet } = useSelector(({ transaction }) => transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpenKeys([selectedKeys[selectedKeys.length - 2]]);
  }, []);


  useEffect(() => {
    if(profile) {
      setStylePage({display: "block"})
      const modeLogin = loadState('modeLogin');
      if(modeLogin == '0') {
        setName(profile.fullName);
        setPhone(profile.phone);
        const walletId = profile.wallet.walletId;
        dispatch(onGetBalanceWallet({walletId}));
      }

      if(modeLogin == '1') {
        if(enterpriseInfo) {
          setName(enterpriseInfo.name);
          setPhone(enterpriseInfo.phone);
          const walletId = enterpriseInfo.walletId;
          dispatch(onGetBalanceWallet({walletId}));
        }
      }
    }
    else  setStylePage({display: "none"});
  },[profile, enterpriseInfo])

  useEffect(() => {
    if(wallet) {
      setBalance(wallet.balance);
    }
  },[wallet])
  
  const getUserAvatar = () => {
    const modeLogin = loadState('modeLogin');
    if(modeLogin == '0') {
      return avatar ?? emptyAvatar;
    }
    if(modeLogin == '1') {
      return avatarEnterprise ?? emptyAvatar;
    }
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const onChageFilePicker = (e) => {
    const modeLogin = loadState('modeLogin');
    const image = e.target.files[0];
    if(modeLogin == '0') {
      dispatch(onUpdateAvatar({image})) ;
      dispatch(onGetUserInfo());
    }
    if(modeLogin == '1') {
      const id = enterpriseInfo.id;
      dispatch(onUpdateAvatarEnterprise({image,id})) ;
      dispatch(onGetEnterpriseList());
    }
  }

  const menu = getRouteMenus(routeConfig);
  return (
  <>
    <div style={stylePage}>
      <div className='menu-info'>
        <div className='avatar-form'>
          <div>
            <img className='avatar-icon' src={getUserAvatar()}></img>
          </div>
          <div className='avatar-icon-b' >
            <label htmlFor="filePicker" >
                <img htmlFor="filePicker" src={Photo}/>
            </label>
            <input id="filePicker"  style={{display:"none"}} type="file" onChange={onChageFilePicker} />
          </div>
        </div>
        <div className='user-info'>
          <p className='user-info-text text-bold'>{name} <img src={Check}/></p>
          <p className='user-info-text'>{phone}</p>
        </div>
        
      </div>
      <div className='wallet-info'>
        <p className='user-info-text'>{"Số dư ví (VARS)"} </p>
        <div className='balance-text'>{balance.toLocaleString()}</div>
      </div>
      <div className='menu-info'>
        <div className='point-info'>
          <p className='user-info-text'>Điểm tích lũy</p>
          <div className='user-info-text text-bold'>{"123456".toLocaleString()}</div>
          <img src={ContinueIco}/>
        </div>
        <div className='rank-info'>
          <p className='user-info-text'>Xếp hạng</p>
          <div className='user-info-text text-bold'>{"Hội viên bạc"}</div>
          <img src={ContinueIco}/>
        </div>
      </div>
    </div>
    <Menu
        theme={sidebarColorSet.mode}
        mode='inline'
        className={clsx('app-main-sidebar-menu ', {
          'menu-rounded': menuStyle === MenuStyle.ROUNDED,
          'menu-rounded rounded-menu-reverse':
            menuStyle === MenuStyle.ROUNDED_REVERSE,
          'menu-rounded standard-menu': menuStyle === MenuStyle.STANDARD,
          'menu-rounded curved-menu': menuStyle === MenuStyle.CURVED_MENU,
          'bg-color-menu':
            sidebarColorSet.sidebarBgColor !==
            defaultConfig.sidebar.colorSet.sidebarBgColor,
        })}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[selectedKeys[selectedKeys.length - 1]]}>
        {menu}
      </Menu>
    </>
  );
};

export {AppNavContext, AppNavProvider};
export default AppVerticalNav;
