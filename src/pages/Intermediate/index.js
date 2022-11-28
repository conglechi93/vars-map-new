import { AppLoader } from '@crema';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { defaultAdminUrl } from 'shared/constants/AppConst';

const Intermediate = () => {
  const {isAuthenticated} = useSelector(({auth}) => auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(defaultAdminUrl);
    }
  }, [isAuthenticated])
  return <AppLoader />;
};

export default Intermediate;
