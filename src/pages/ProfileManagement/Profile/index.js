import {memo, 
  useEffect, 
  useState
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import {Button, Form, Select, DatePicker} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import Avatar from '@assets/avatar_anh_Binh.png';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import {
  GET_GENDER_CATEGORY,
  GET_JOB_TYPE_CATEGORY
} from 'shared/constants/ApiUrls';
import { 
  onGetUserInfo,
  onUpdateAvatar, onUpdateInfo } from 'redux/actions/Auth';
import TextArea from 'antd/lib/input/TextArea';
import Validators from 'shared/validators';
import { AppInfoView } from '@crema';
import moment from "moment";
import { FETCH_ERROR, UPDATE_PROFILE_SUCCESSS } from 'shared/constants/ActionTypes';

const Profile = () => {

  const {messages} = useIntl();
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const dispatch = useDispatch();

  const {profile, avatar, isUpdateUserInfo} = useSelector(({auth}) => auth);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [personalId, setPersonalId] = useState('');

  useEffect(() => {
    if(profile) {
      setPhone(profile.phone);
      setFullName(profile.fullName);
      setEmail(profile.email);
      setAddress(profile.address);
      setPersonalId(profile.personalId);
      setDescription(profile.description);
    }
  }, [profile]);

  const onFinish = () => {
    const formData = form.getFieldValue();
    const day = new Date(formData.birthday);
    const today = new Date();
    console.log(today > day);
    if(today < day) {
      dispatch({type: FETCH_ERROR, payload: "Ngày sinh không hợp lệ"});
      return
    }

    if(formData.gender == '') {
      dispatch({type: FETCH_ERROR, payload: "Vui lòng chọn giới tính"});
      return
    }
    const birthday =  day.toLocaleDateString();
    const dataReq = {
      fullName: formData.fullName,
      email: formData.email,
      jobType: {
        code: formData.jobType,
      },
      gender: {
        code: formData.gender,
      },
      personalId: formData.personalId,
      description: formData.description,
      birthday: birthday,
      address: formData.address,
    }
    dispatch(onUpdateInfo({dataReq}));
  }

  useEffect(() => {
    if(isUpdateUserInfo) {
      dispatch(onGetUserInfo());
      const isUpdateUserInfo = false;
      dispatch({type: UPDATE_PROFILE_SUCCESSS, payload: {isUpdateUserInfo}})
    }
    
  }, [isUpdateUserInfo])

  const [listGender,setListGender] = useState();
  const [listJobType,setListJobType] = useState();
  

  useEffect(() => {
    dispatch(onGetUserInfo());

    API.get(GET_GENDER_CATEGORY, {REQUEST_MUTED})
    .then((data) => { 
      var list =  [{"value": '', "label": messages['common.choose'], disabled: true}];
      for(let i = 0; i < data.length; i++) {
        list = [...list, {"value": data[i].code, "label": data[i].name}]
      }
      setListGender(list);
    })
    .catch((err) => {
      console.log("err",err);
    });

    API.get(GET_JOB_TYPE_CATEGORY, {REQUEST_MUTED})
    .then((data) => { 
      var list =  [{"value": '', "label": messages['common.choose'], disabled: true}];
      for(let i = 0; i < data.length; i++) {
        list = [...list, {"value": data[i].code, "label": data[i].name}]
      }
      setListJobType(list);
    })
    .catch((err) => {
      console.log("err",err);
    });
  }, []);

  const onChageFilePicker = (e) => {
    const image = e.target.files[0];
    dispatch(onUpdateAvatar({image})) ;
    dispatch(onGetUserInfo());
  }

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
      <div className='profile-text-label'>Thông tin cá nhân </div>
      <div className='profile-form'>
        <div className='text-bold' style={{margin:"20px 40px"}}>Ảnh đại diện</div>
        <div className='profile-avatar'>
          <div className='profile-img'>
            <img className='avatar-img' alt='avatar' src={avatar == null ? Avatar : avatar} />
          </div>
          <div className='upload-avatar'>
            <div style={{marginTop:"40px"}}></div>
            <label htmlFor="filePicker" className='upload-avatar-btn'>
                Tải ảnh
            </label>
            <input id="filePicker"  style={{display:"none"}} type="file" onChange={onChageFilePicker} />
            <p className='upload-avatar-text'><IntlMessages id='common.uploadImage'/></p>
          </div>
          
        </div>
      </div>
      <div className='profile-form'>
        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{
            fullName: fullName,
            phone: phone,
            email: email,
            address: address,
            description: description,
            personalId: personalId,
          }}
          onFinish={onFinish}
          onFinishFailed={() => {}}>
          <div className='form-padding-start'></div>
          <div className='profile-form-row'> 
            <div className='profile-form-column'>
              <Form.Item
                name='fullName'
                className='form-field'
                label={frl('common.fullName')}
                rules={[{required: true, message: frm('common.fullName')}]}>
                <AppInput maxLength={255} autoFocus placeholder={messages['common.nameHinttext']}/>
              </Form.Item>
            </div>
            <div className='profile-form-column'>
              <Form.Item
                name='phone'
                className='form-field'
                label={frl('common.phoneNumber')}
                rules={[{required: true, message: frm('common.phone')},
                  {
                    validator: (_, v) => Validators.PhoneNumber(v),
                    message: messages['validator.phoneNumber'],
                  },]}>
                <AppInput maxLength={12} disabled={true} placeholder={messages['common.phoneHinttext']}/>
              </Form.Item>
            </div>
            <div className='profile-form-column'>
              <Form.Item
                name='email'
                className='form-field'
                label={frl('common.email')}
                rules={[{required: true, message: frm('common.email')}]}>
                <AppInput  maxLength={255} className="input-email" placeholder={messages['common.emailHinttext']}/>
              </Form.Item>
            </div>
          </div>

          <div className='profile-form-row'> 
            <div className='profile-form-column'>
              <Form.Item
                name='jobType'
                className='form-field'
                label={frl('common.object')}  
                rules={[{required: true, message: frm('common.object')}]}>
                <Select placeholder="Đối tượng" options={listJobType}> 
                </Select>
              </Form.Item>
            </div>
            <div className='profile-form-column'>
              <Form.Item
                name='gender'
                className='form-field'
                label={frl('common.gender')}
                rules={[{required: true, message: frm('common.gender')}]}>
                <Select placeholder={messages['common.choose']}  options={listGender} >
                </Select>
              </Form.Item>
              </div>
            <div className='profile-form-column'>
              <Form.Item
                name='birthday'
                className='form-field'
                label={frl('common.birthDay')}
                rules={[{required: true, message: frm('common.birthDay')}]}>
                <DatePicker 
                format={dateFormat}
                placeholder={messages['common.choose']}
                />
              </Form.Item>
            </div>
          </div>
        
          <div className='profile-form-row'> 
            <div className='profile-form-column'>
              <Form.Item
                name='address'
                className='form-field'
                label={frl('common.address')}
                rules={[{required: true, message: frm('common.address')}]}>
                <AppInput maxLength={255} onChange={(e) => setAddress(e.target.value)}  placeholder={messages['common.addressHinttext']}/>
              </Form.Item>
            </div>
            <div className='profile-form-column'>
                <Form.Item
                  name='personalId'
                  className='form-field'
                  label={frl('common.personalId')}
                  rules={[{required: true, message: frm('common.personalId')}]}>
                  <AppInput maxLength={255} onChange={(e) => setPersonalId(e.target.value)} placeholder={messages['common.personalIdHinttext']}/>  
                </Form.Item>
              </div>
            <div className='profile-form-column'>
              
            </div>
          </div>

          <Form.Item
            name='description'
            className='form-field'
            label={frl('common.introduction')}
            rules={[{required: true, message: frm('common.introduction')}]}>
            <TextArea maxLength={255} onChange={(e) => setDescription(e.target.value)} placeholder={messages['common.descriptionHinttext']}/>  
          </Form.Item>
          <div className='right-btn'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.save' />
            </Button>
          </div>
        </Form>
      </div>   
    </div>
  );
};

export default memo(Profile);

Profile.propTypes = {};

Profile.defaultProps = {};
