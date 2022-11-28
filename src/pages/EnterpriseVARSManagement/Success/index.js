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
import { onGetEnrollUserMember } from 'redux/actions/User';
import { AppInfoView } from '@crema';

const Success = () => {
  const {messages} = useIntl();

  const { enrollUser } = useSelector(({user}) => user);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [enrollDate, setEnrollDate] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    dispatch(onGetEnrollUserMember())
  }, []);

  useEffect(() => {
    if(enrollUser) {
      console.log("enrollUser",enrollUser);
      setFullName(enrollUser.userInfo.fullName);
      setPhone(enrollUser.userInfo.phone);
      setEnrollDate(enrollUser.enrollDate);
      setCode(enrollUser.code);
    }
  }, [enrollUser]);


  
  return (
    <div>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='card-form'>
          <div className='card-text-label'> Đăng ký thành công A</div>
          <div className='card-info'>
            <div className='card-label-text'><b>Thông tin giao dịch</b></div>
            <div className="padding-line" style={{backgroundColor:"#BDBDBD", margin:"15px auto", height:"1px"}}></div>
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
      
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button type='primary' htmlType='submit' className='sign-btn'>
            <IntlMessages id='common.completeProfile' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Success);

Success.propTypes = {};

Success.defaultProps = {};
