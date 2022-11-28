import {memo, 
  useEffect, 
  useState
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../../page.style.less';
import { onGetRegisterInfoCategory } from 'redux/actions/Category';

const Benifit = () => {
  const dispatch = useDispatch();
  const { registerInfo } = useSelector(({category}) => category);
  const [enterpriseBenefitHTML,setEnterpriseBenefitHTML] = useState();
  
  useEffect(() => {
    dispatch(onGetRegisterInfoCategory());
  }, []);

  
  useEffect(() => {
    if(registerInfo) {
      setEnterpriseBenefitHTML(registerInfo.enterpriseBenefitHTML);
    }
  }, [registerInfo]);

  return (
    <div className='enterprise-form'>
      <div className='enterprise-text-label' >Tính năng nổi bật</div>
      <div dangerouslySetInnerHTML={{__html: enterpriseBenefitHTML}}></div>
  </div>
  );
};

export default memo(Benifit);

Benifit.propTypes = {};

Benifit.defaultProps = {};


