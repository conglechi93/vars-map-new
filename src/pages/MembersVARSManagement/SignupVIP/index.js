import {memo, 
  useEffect, 
  useState
} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../index.style.less';
import {Button, Checkbox, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { 
  onGetUserInfo,
} from 'redux/actions/Auth';
import { 
  onUploadAttachment,
  onEnrollUserMemberUpgrade,
  onDeleteAttachment,
  onGetEnrollUserMember
} from 'redux/actions/User';
import UploadIco from '@assets/icon/upload.svg';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import deleteIco from '@assets/icon/deleteFile.svg';
import { AppInfoView } from '@crema';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import { MEMBER_VIP_SIGNUP_SUCCESS_ROUTE } from '../declareRoute';
import Number1 from '@assets/icon/1.svg';
import Number2 from '@assets/icon/2.svg';
import Number3 from '@assets/icon/3.svg';
import Number4 from '@assets/icon/4.svg';
import { getExtensionFile } from 'utils/File';
import '../../page.style.less';
import DoneIco from '@assets/icon/done.svg';


const SignupVIP = () => {
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const [enterpriseOwnerId] = useState('');

  const { profile } = useSelector(({auth}) => auth);

  const { enrollUser, isRegisterUserMember } = useSelector(({user}) => user);
  const [stylePage, setStylePage] = useState({display: "none"});
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [personalId,setPersonalId] = useState('');
  const [checked,setChecked] = useState(false);

  const [registerFormHTML,setRegisterFormHTML] = useState([]);
  const [cardIdHTML,setCardIdHTML] = useState([]);
  let [listRegisterForm,setListRegisterForm] = useState([]);
  let [listCardId,setListCardId] = useState([]);
  const [listUploadFile, setListUploadFile] = useState([]);

  useEffect(() => {
    dispatch(onGetUserInfo());
    dispatch(onGetEnrollUserMember());
  }, []);

  useEffect(() => {
    if(enrollUser) {
      if(enrollUser.approvalStatus) {
        if(enrollUser.approvalStatus && isRegisterUserMember == null) navigate(MEMBER_VIP_SIGNUP_SUCCESS_ROUTE);
      }
      setStylePage({display: "block"});
      if(enrollUser.attachments) {
        let listFiles = enrollUser.attachments;
        setListRegisterForm(listFiles.filter(listFiles => listFiles.type == 3));
        setListCardId(listFiles.filter(listFiles => listFiles.type == 2));
      }
    }
  }, [enrollUser, isRegisterUserMember]);
  
  useEffect(() => {
    if(profile) {
      setPhone(profile.phone);
      setFullName(profile.fullName);
      setEmail(profile.email);
      setAddress(profile.address);
      setPersonalId(profile.personalId);
    }
  }, [profile]);

  useEffect(() => {
    if(profile) {
      form.setFieldsValue({
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        personalId: personalId,
      })
    }
   }, [form, profile])


  const RegisterMember = () => {
    let attachments =  [];
    listUploadFile.map((v) => 
    {
      const uploadFileJson = {id:  v.id}
      attachments = [...attachments, uploadFileJson]
    });
    dispatch(onEnrollUserMemberUpgrade({attachments}));
    setOpen(false);
  }

  const ConfirmInfo = () =>  {
    let checkForm = true;
    if(listRegisterForm.length == 0 || listCardId.length == 0) checkForm = false;
    if(checkForm == false) dispatch({type: FETCH_ERROR, payload: "Bạn cần điền đầy đủ hồ sơ đính kèm"});
    else {
      setListUploadFile([...listRegisterForm, ...listCardId]);
      handleClickOpen();
    }
  }


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Attach File Handle 

  useEffect(() => {
    if(listRegisterForm.length != 0){
      let list = [];
      for(let i = 0; i < listRegisterForm.length; i++) {
        let filename = listRegisterForm[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list' key={registerFormHTML.length + i}>
          <div>
            <img src={srcImg} className='extension-icon'/>
            {listRegisterForm[i].fileName +" "}
            <img src={DoneIco} id={listRegisterForm[i].id}></img>
          </div>
          <img src={deleteIco} id={listRegisterForm[i].id} onClick={handleClickIcoRegisterForm}></img>
        </div>]
      }
      setRegisterFormHTML(list);
    }

    if(listRegisterForm.length == 0){
      let list = []
      setRegisterFormHTML(list);
    }
  }, [listRegisterForm]);

  const handleClickIcoCardId = (e) => {
    let list = [...listCardId];
    list = list.filter(list => list.id != e.target.id);
    const id = e.target.id;
    dispatch(onDeleteAttachment({id}));
    setListCardId(list);
  }

  useEffect(() => {
    if(listCardId.length != 0){
      let list = [];
      for(let i = 0; i < listCardId.length; i++) {
        let filename = listCardId[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list-right' key={listCardId.length + i}>
          <div>
            <img src={srcImg} className='extension-icon'/>
            {listCardId[i].fileName +" "} 
            <img src={DoneIco} id={listRegisterForm[i].id}></img>
          </div>
          <img src={deleteIco} id={listCardId[i].id} onClick={handleClickIcoCardId}></img>
        </div>]
      }
      setCardIdHTML(list);
    }
    if(listCardId.length == 0){
      let list = [];
      setCardIdHTML(list);
    }
  }, [listCardId]);

  const handleClickIcoRegisterForm = (e) => {
    let list = [...listRegisterForm];
    list = list.filter(list => list.id != e.target.id);
    const id = e.target.id;
    dispatch(onDeleteAttachment({id}));
    setListRegisterForm(list);
   }

  const handleChooseRegisterFormFile = async (e) => { 
    if(e.target.files) {
      const files = e.target.files;  
      let list = [...listRegisterForm];
      for(let i = 0; i < files.length; i++) {
        const type = 3;
        const file = files[i];
        let value = await dispatch(onUploadAttachment({file, type, enterpriseOwnerId}));
        list = [...list,value];
      }
      setListRegisterForm(list);
    }
  }

  const handleChooseCardIdFile = async (e) => {
    if( e.target.files) {
      const files = e.target.files;  
      let list = [...listCardId];
      for(let i = 0; i < files.length; i++) {
        const type = 2;
        const file = files[i];
        let value = await dispatch(onUploadAttachment({file, type, enterpriseOwnerId}));
        list = [...list,value];
      }
      setListCardId(list);
    }
  }

  return (
    <div style={stylePage}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>
          {"Xác nhận"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn nộp hồ sơ để hoàn tất thủ tục đăng ký hội viên VARS
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='cancle-btn' onClick={handleClose}>
              <IntlMessages id='common.cancel' />
            </Button>
          </div>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='sign-btn' onClick={RegisterMember} autoFocus>
              <IntlMessages id='common.update' />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <div className='profile-text-label'>Hoàn tất hồ sơ</div>
        <AppInfoView></AppInfoView>
        <div className='profile-form'>
          <div className='profile-text-label'>Quyền lợi</div>
          <div className='feature-row'>
            <img src={Number1} style={{marginRight:"10px"}}/> Được sử dụng miễn phí các dịch vụ trong hệ sinh thái VARS trong vòng 1 năm
          </div>
          <div className='feature-row'>
            <img src={Number2} style={{marginRight:"10px"}}/> Được mời tham gia các hoạt động mà Hội tổ chức
          </div>
          <div className='feature-row'>
            <img src={Number3} style={{marginRight:"10px"}}/> Được cấp Giấy chứng nhận là Hội viên danh dự hoặc liên kết của Hội Môi giới Bất động sản Việt Nam cho Hội viên
          </div>
          <div className='feature-row'>
            <img src={Number4} style={{marginRight:"10px"}}/> Được giới thiệu, mở rộng cơ hội hợp tác với các Hội viên của Hội trong các hoạt động sản xuất kinh doanh
          </div>
        </div>
        <div className='profile-form'>
          <div className='profile-text-label'>Thông tin hội viên VARS </div>
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
              personalId: personalId,
            }}>
            <div className='form-padding-start'></div>

            <div className='member-form-row'>
              <div className='member-form-column'>
                <Form.Item
                  name='fullName'
                  className='form-field'
                  label={frl('common.fullName')}
                  rules={[{required: true, message: frm('common.fullName')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.nameHinttext']}/>
                </Form.Item>
              </div>
              <div className='member-form-column'>
                <Form.Item
                  name='personalId'
                  className='form-field'
                  label={frl('common.personalId')}
                  rules={[{required: true, message: frm('common.personalId')}]}>
                  <AppInput maxLength={255} disabled={true}  placeholder={messages['common.personalIdHinttext']}/>  
                </Form.Item>
              </div>
            </div>

            <div className='member-form-row'>
              <div className='member-form-column'>
                <Form.Item
                  name='phone'
                  className='form-field'
                  label={frl('common.phoneNumber')}
                  rules={[{required: true, message: frm('common.phoneNumber')}]}>
                  <AppInput maxLength={12} disabled={true} placeholder={messages['common.phoneHinttext']}/>
                </Form.Item>
              </div>
              <div className='member-form-column'>
                <Form.Item
                  name='email'
                  className='form-field'
                  label={frl('common.email')}
                  rules={[{required: true, message: frm('common.email')}]}>
                  <AppInput maxLength={255} className="input-email" disabled={true} placeholder={messages['common.emailHinttext']}/>
                </Form.Item>
              </div>
            </div>
            <div className='member-form-row'>
              <div className='member-form-column'>
                <Form.Item
                  name='address'
                  className='form-field'
                  label={frl('common.address')}
                  rules={[{required: true, message: frm('common.address')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.addressHinttext']}/>
                </Form.Item>
              </div>
              <div className='member-form-column'>
                
              </div>
            </div>
          </Form>
        </div>

        <div className='profile-form'>
          <div className='profile-text-label'>Hồ sơ đính kèm </div>
          <div><IntlMessages id="common.supportFile" /></div>
          <div className='attach-list'>
            <div className='attach-list-column'>
              <div className='text-bold'>CCCD/CMND/Hộ chiếu bản thân <a className='star'>*</a></div>
              <div className='attach-note'>{"(Ảnh CCCD/CMND mặc trước và mặt sau)"}</div>
              {cardIdHTML}
            </div>
            <div style={{margin:"10px"}}></div>
            <div className='attach-list-column'>
              <div className='text-bold attach-form'>
                <div>Phiếu đăng ký trở thành hội viên<a className='star'>*</a></div>
                <a className='register-file'>Tải phiếu đăng ký</a>
                </div> 
              <div className='attach-note'>{"(Ghi đầy đủ theo mãu in sẵn và ký tên, đóng dấu xác nhận của cơ quan, đơn vị công tác)"}</div>
              {registerFormHTML}
            </div>
          </div>
          <div className='attach-form'>
            <label htmlFor="input-personnal" className='attach-card'> 
              <img src={UploadIco} />
              <div>Tải lên CCCD/CMND/Hộ chiếu của bản thân</div>
              <input id="input-personnal" type="file" style={{display:"none"}} multiple onChange={handleChooseCardIdFile}/>
            </label>

            <label htmlFor="input-business-license" className='attach-card'> 
              <img src={UploadIco} />
              <div>Tải lên phiếu đăng ký trở thành hội viên</div>
              <input id="input-business-license" type="file" style={{display:"none"}} multiple onChange={handleChooseRegisterFormFile}/>
            </label>
          </div>
        </div>
      </div>
      

      
      <div style={{margin:"20px"}}>
        <Checkbox onChange={(e) => {setChecked(e.target.checked)}}> Tôi xác nhận đã đọc và đồng ý với điều khoản của <a className='link-text'><IntlMessages id="common.VIPMember"></IntlMessages> </a></Checkbox>
      </div>
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button onClick={ConfirmInfo} type='primary' htmlType='submit' className='sign-btn' disabled={!checked}>
            <IntlMessages id='common.resgisterMember' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(SignupVIP);

SignupVIP.propTypes = {};

SignupVIP.defaultProps = {};
