import {memo, 
  useEffect,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.style.less';
import {Button } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import RafikiImg from '@assets/rafiki.svg';
import { onGetEnrollUserMember } from 'redux/actions/User';
import { AppInfoView } from '@crema';
import { useNavigate } from 'react-router-dom';
import { MEMBER_VIP_SIGNUP_ROUTE } from '../declareRoute';

const SignupSuccess = () => {
  const {messages} = useIntl();

  const { enrollUser } = useSelector(({user}) => user);
  const dispatch = useDispatch();
  const [fullName,setFullName] = useState("");
  const [phone,setPhone] = useState("");
  const [enrollDate,setEnrollDate] = useState("");
  const [code,setCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(onGetEnrollUserMember())
  }, []);

  useEffect(() => {
    if(enrollUser) {
      if(enrollUser.userInfo){
        setFullName(enrollUser.userInfo.fullName);
        setPhone(enrollUser.userInfo.phone);
      }
      setEnrollDate(enrollUser.enrollDate);
      setCode(enrollUser.code);
    }
  }, [enrollUser]);

  const handleMemberVIP = () => {
    navigate(MEMBER_VIP_SIGNUP_ROUTE);
  }

  
  return (
    <div style={{marginBottom:"30px"}}>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='profile-text-label'>Đăng ký hội viên VARS</div>
        <div className='card-form'>
          <img className='card-img' src={RafikiImg}/>
          <div className='card-text-label'> Đăng ký thành công</div>
          <div className='note-text'>Hãy hoàn tất hồ sơ trở thành <a className='link-text'><IntlMessages id="common.VIPMember"></IntlMessages> </a> để hưởng đầy đủ quyền lợi </div>
          <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
          <Button type='primary' htmlType='submit' className='sign-btn' onClick={handleMemberVIP}>
            <IntlMessages id='common.completeProfile' />
          </Button>
        </div>
        <div className="padding-line" style={{margin:"15px auto", height:"1px"}}></div>
        <div className='card-form'>
          <div className='card-info'>
            <div className='card-label-text'><b>Thông tin giao dịch</b></div>
            <div className='card-info-row'>
              <div>Chủ tài khoản nhận: </div>
              <div><b>Công ty cổ phần công nghệ Resdii</b></div>
            </div>
            <div className='card-info-row'>
              <div>Tài khoản thanh toán: </div>
              <div><b>{fullName}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Số điện thoại: </div>
              <div><b>{phone}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Phí đăng ký hội viên: </div>
              <div><b>2.000.000 VARS</b></div>
            </div>
            <div className='card-info-row'>
              <div>Thời gian: </div>
              <div><b>{enrollDate}</b></div>
            </div>
            <div className='card-info-row'>
              <div>Mã giao dịch: </div>
              <div><b>{code}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SignupSuccess);

SignupSuccess.propTypes = {};

SignupSuccess.defaultProps = {};
