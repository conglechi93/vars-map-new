import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import Auth from './Auth';
import Category from './Category';
import View from './View';
import SSO from './SSO';
import UserApplication from './UserApplication';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import User from './User';
import Enterprise from './Enterprise';
import Transaction from './Transaction'

const persistConfig = {
  key: 'default',
  storage,
  blacklist: ['loading'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['', '', ''],
  whitelist: ['codeVerifier', 'accessToken', 'refreshToken', 'profile', 'isAuthenticated']
};

const categoryPersistConfig = {
  key: 'category',
  storage,
  blacklist: ['address'],
};

const ssoPersistConfig = {
  key: 'sso',
  storage,
  whitelist: ['settings'],
};

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: persistReducer(persistConfig, Settings),
    common: persistReducer(persistConfig, Common),
    auth: persistReducer(authPersistConfig, Auth),
    category: persistReducer(categoryPersistConfig, Category),
    view: View,
    sso: persistReducer(ssoPersistConfig, SSO),
    userApplication: UserApplication,
    user: User,
    enterprise: Enterprise, 
    transaction: Transaction,
  });
export default reducers;
