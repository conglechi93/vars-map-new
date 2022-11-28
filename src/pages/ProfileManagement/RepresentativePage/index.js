import {memo, 
  useEffect, 
  useState
} from 'react';
import { useSelector} from 'react-redux';
import '../index.style.less';
import {Form} from 'antd';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import Avatar from '@assets/avatar_anh_Binh.png';
import BackGround from '@assets/prepage/background.svg';
import GoogleIco from '@assets/prepage/google.svg';
import FacebookIco from '@assets/prepage/facebook.svg';
import ZaloIco from '@assets/prepage/zalo.svg';
import EmailIcon from '@assets/prepage/email-icon.svg';
import PhoneIcon from '@assets/prepage/phone-icon.svg';
import LocationIcon from '@assets/prepage/location-icon.svg';

import { AppInfoView } from '@crema';
import moment from "moment";


const RepresentativePage = () => {

  const {messages} = useIntl();
  const [form] = Form.useForm();

  const {profile, avatar} = useSelector(({auth}) => auth);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [jobTypeName, setJobTypeName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [description, setDescription] = useState('')

  useEffect(() => {
    if(profile) {
      setPhone(profile.phone);
      setFullName(profile.fullName);
      setEmail(profile.email);
      setAddress(profile.address);
      setDescription(profile.description);
      setJobTypeName(profile.jobType.name)
      setQrCode(profile.qrCode);
    }
  }, [profile]);
  


  useEffect(() => {
    if(profile) { 
      const birthdayValue = profile.birthday == null ? "" : profile.birthday;
      form.setFieldsValue({
        fullName: profile.fullName == null ? "" : profile.fullName,
        phone: profile.phone == null ? "" : profile.phone,
        email: profile.email == null ? "" : profile.email,
        address: profile.address == null ? "" : profile.address,
        description: profile.description == null ? "" : profile.description,
        personalId: profile.personalId == null ? "" : profile.personalId,
        birthday: birthdayValue == '' ? "" : moment(birthdayValue.split('/').join('-'), "DDMMYYYY"),
        gender: profile.gender == null ? "" : profile.gender.code,
        jobType: profile.jobType == null ? "" : profile.jobType.code,
      })
    }
   }, [form, profile]);

  return (
    <div>
      <AppInfoView></AppInfoView>
      <AppPageMetadata title={messages['route.group.profileManagement']} />
      <img className='background-img' alt='background' src={BackGround} />
      <div className='representative '>
        <div className='representative-column'>
          <div className='representative-info'>
            <img className='representative-avatar' alt='avatar' src={avatar == null ? Avatar : avatar} />
            <div className='representative-cover'>
              <div className='representative-text text-bold' >
                {fullName}
              </div>
              <div>{jobTypeName}</div>
              <div>
              <img src={ZaloIco} className="icon-img"></img>
              <img src={FacebookIco} className="icon-img"></img>
              <img src={GoogleIco} className="icon-img"></img>
              </div>
            </div> 
          </div>
        </div>
        <div className='representative-column'>
          <div className='representative-contact'>
            <img src={EmailIcon}/>
            <div className='representative-contact-text'>{email}</div>
          </div>
          <div className='representative-contact'>
            <img src={PhoneIcon}></img>
            <div  className='representative-contact-text'>{phone}</div>
          </div>
          <div className='representative-contact'>
            <img src={LocationIcon}></img>
            <div  className='representative-contact-text'>{address}</div>
          </div>
        </div>
        <div className='representative-column'>
          <img className='representative-qrcode' src={qrCode}></img>
        </div>
      </div>

      <div className='representative-form'>
        <div className='representative-1'>
          <div className='text-bold text-label'>
            Giới thiệu
          </div>
          {description}
        </div>
        <div className='representative-2'>
        <div className='text-bold text-label'>
           Thông tin tổ chức
        </div>
          <div className='representative-contact'>
            <img src={LocationIcon}></img>
            <div className='representative-contact-text'>Tầng 2, tòa nhà Thành Công, 57 Láng Hạ, Phường Thành Công, Quận Ba Đình, Thành phố Hà Nội</div>
          </div>
          <div className='representative-contact'>
            <img src={EmailIcon}></img>
            <div  className='representative-contact-text'>vnreb.vp@gmail.com</div>
          </div>
          <div className='representative-contact'>
            <img src={PhoneIcon}></img>
            <div  className='representative-contact-text'>0903567789</div>
          </div>
          <div className='representative-contact'>
            <img src={PhoneIcon}></img>
            <div  className='representative-contact-text'>0903567789</div>
          </div>
        </div>
       
      </div>
      
    </div>
  );
};

export default memo(RepresentativePage);

RepresentativePage.propTypes = {};

RepresentativePage.defaultProps = {};
