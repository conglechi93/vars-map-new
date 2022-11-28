// Resdii custom


import { useEffect, useState } from 'react'; 
import clsx from 'clsx';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import './index.style.less';
import { useThemeContext } from '../../../../utility/AppContextProvider/ThemeContextProvider';
import { useSidebarContext } from '../../../../utility/AppContextProvider/SidebarContextProvider';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from '@crema/utility/IntlMessages';
import emptyAvatar from '@assets/profile/empty-avatar.jpg';
import changeAccountIco from '@assets/icon/change-account.svg';
import changePassIco from '@assets/icon/change-pass.svg';
import logoutIco from '@assets/icon/logout.svg';
import accountInfoIco from '@assets/icon/account-info.svg';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import {
  CHANGE_PASSWORD_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../../../../pages/ProfileManagement/declareRoute'
import { useNavigate } from 'react-router-dom';
import { onGetUserInfo, onSigninwithSS0, onLogoutSSO } from 'redux/actions/Auth';
import { loadState, saveState } from 'utils/localStoreHandle';
import { onGetEnterpriseList } from 'redux/actions/Enterprise';
import { onGetBalanceWallet } from 'redux/actions/Transaction';


const UserInfo = ({ hasColor }) => {
  const navigate = useNavigate();
  const { themeMode } = useThemeContext();
  const { profile, avatar, accessToken, refreshToken } = useSelector(({ auth }) => auth);
  const userInfo = profile?.userInfo || {};
  const dispatch = useDispatch();
  const { sidebarColorSet } = useSidebarContext();
  const { isSidebarBgImage } = useSidebarContext();
  const { enterpriseInfo, avatarEnterprise } = useSelector(({ enterprise }) => enterprise);
  const [accountListHTML, setAccountListHTML] = useState([]);
  const [name,setName] = useState();
  const handleChangeAccount = () => {
    const mode = loadState('modeLogin');
    console.log('mode', mode)
    if(mode == '1' ) {
      saveState('modeLogin', '0');
      const walletId = profile.wallet.walletId;
      dispatch(onGetBalanceWallet({walletId}))
      
    }
    if(mode == '0' ) {
      saveState('modeLogin', '1');
      const walletId = enterpriseInfo.walletId;
      dispatch(onGetBalanceWallet({walletId}))
    }
    navigate(USER_PROFILE_ROUTE);
    window.location.reload(false);
  }

  useEffect(() => {
    dispatch(onGetUserInfo());
    dispatch(onGetEnterpriseList());
  },[])

  useEffect(() => {
    if(profile) {
      const modeLogin = loadState('modeLogin');
      if(modeLogin == '0') {
        setName(profile.fullName);
        if(enterpriseInfo) {
        setAccountListHTML(
          <>
          <div style={{textAlign:"center"}} className='text-bold'> Đổi tài khoản </div>
          <div className='padding-middle' ></div>    
          <button className='list-account-form'>
            <img target="list-account-form" className="image-icon" src={enterpriseInfo.avatar}></img>
            <div className='list-account-row' >
              <li className='text-bold'>{enterpriseInfo.name} <a className='mode-name-text'>{"Doanh nghiệp"}</a></li>
              <li>{enterpriseInfo.phone}</li>
            </div>
          </button>
          </>)
        }
      }
      if(modeLogin == '1') {
        if(enterpriseInfo) {
          console.log(enterpriseInfo)
          setName(enterpriseInfo.name);
        }
        setAccountListHTML(
          <>
          <div style={{textAlign:"center"}} className='text-bold'> Đổi tài khoản </div>
          <div className='padding-middle' ></div>    
          <button className='list-account-form'>
            <img target="list-account-form" src={profile.avatar} className="image-icon"></img>
            <div className='list-account-row' >
              <div className='text-bold'>{profile.fullName} <a className='mode-name-text'>{"Cá nhân"}</a></div>
              <div >{profile.phone}</div>
            </div>
          </button>
          </>
          )
      }
    }
  },[profile, enterpriseInfo])

  
  const getUserAvatar = () => {
    const modeLogin = loadState('modeLogin');
    if(modeLogin == '0') {
      return avatar ?? emptyAvatar;
    }
    if(modeLogin == '1') {
      return avatarEnterprise ?? emptyAvatar;
    }
  };

  const logOutPage = () => {
    saveState('modeLogin','0');
    dispatch(onLogoutSSO(
      { accessToken, refreshToken }
    ));
  }

  const menuN = (
    <Menu
      items={[
        {
          key: '5',
          label: (
            <a
              onClick={handleChangeAccount}
              target='_blank'
              rel='noopener noreferrer'>
              {accountListHTML}
            </a>
          ),   
        },
      ]}
    />
  );

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          icon: <img src={changeAccountIco  }/>,
          label: (
            <Dropdown
              overlay={menuN}
              trigger={['click']}
              placement='topCenter'
              overlayStyle={{
                zIndex: 1050,
                minWidth: 250,
                left: 0,
                top: 100,
              }}>
              <a>
              <IntlMessages id='common.changeAccount' />
            </a>
            </Dropdown>
          ),
        },
        {
          key: '2',
          icon: <img src={changePassIco}/>,
          label: (
            <a
              onClick={() => {
                navigate(CHANGE_PASSWORD_ROUTE);
              }}
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='profile.changePassword' />
            </a>
          ),
        },
        {
          key: '3',
          icon: <img src={accountInfoIco}/>,
          label: (
            <a
              onClick={() => {
                navigate(USER_PROFILE_ROUTE);
                dispatch(onGetUserInfo());
              }
              }
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='common.accountInfo' />
            </a>
          ),
        },
        {
          key: '4',
          icon: <img src={logoutIco}/>,
          label: (
            <a
              onClick={logOutPage}
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='common.logout' />
            </a>
          ),
        },
      ]}
    />
  );


  

  const onLogin = () => {
    saveState('modeLogin','0');
    dispatch(onSigninwithSS0());   
  }

  return (
    <>
      {
        profile != null ? hasColor ? (
          <div
            style={{
              backgroundColor: isSidebarBgImage
                ? ''
                : sidebarColorSet.sidebarHeaderColor,
              color: sidebarColorSet.sidebarTextColor,
            }}
            className={clsx('cr-user-info cr-user-info-hasColor', {
              light: themeMode === 'light',
            })}>
            <Dropdown
              className='user-profile-dropdown'
              overlay={menu}
              trigger={['click']}
              placement='bottomRight'
              overlayStyle={{
                zIndex: 1052,
                minWidth: 250,
              }}>
              <a className='cr-user-info-inner ant-dropdown-link'>
                <Avatar
                  className='cr-user-info-avatar'
                  src={getUserAvatar()}
                  alt='avatar'
                />
                <span className='cr-user-info-content'>
                  <span className='cr-user-name-info'>
                    <h3
                      className={clsx('cr-user-name text-truncate', {
                        light: themeMode === 'light',
                      })}>
                      {userInfo.email}
                    </h3>
                    <span className='cr-user-arrow'>
                      <BsChevronDown />
                    </span>
                  </span>
                </span>
              </a>
            </Dropdown>
          </div>
        ) : (
          <div
            className={clsx('cr-user-info', {
              light: themeMode === 'light',
            })}>
            <Dropdown
              className='user-profile-dropdown'
              overlay={menu}
              trigger={['click']}
              placement='bottomRight'
              overlayStyle={{
                zIndex: 1052,
                minWidth: 200,
                right:0
              }}>
              <a className='cr-user-info-inner ant-dropdown-link'>
                <Avatar className='cr-user-info-avatar' src={getUserAvatar()} />
                <p className='cr-user-text text-bold '> {name} </p>
                <span className='cr-user-info-content'>
                  <span className='cr-user-name-info'>
                    <h3
                      className={clsx('cr-user-name text-truncate', {
                        light: themeMode === 'light',
                      })}>
                      {userInfo.email}
                    </h3>
                    <span className='cr-user-arrow'>
                      <BsChevronDown />
                    </span>
                  </span>
                </span>
              </a>
            </Dropdown>
          </div>
        ) : (<Button onClick={onLogin} className="btn-header" style={{ maxWidth: "120px" }}><IntlMessages id="common.login" /></Button>)
      }

    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
