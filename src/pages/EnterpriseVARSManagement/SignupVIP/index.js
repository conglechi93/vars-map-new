import {memo, 
  useEffect, 
  useState
} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../index.style.less';
import {Button, Checkbox, Form, Input } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { 
  onGetEnterpriseList,
  onGetEnrollEnterpriseMember,
  onEnrollEnterpriseMemberUpgrade
} from 'redux/actions/Enterprise';
import { 
  onDeleteAttachment,
  onUploadAttachment,
} from 'redux/actions/User';
import { useNavigate } from 'react-router-dom';
import UploadIco from '@assets/icon/upload.svg';
import Number1 from '@assets/icon/1.svg';
import Number2 from '@assets/icon/2.svg';
import Number3 from '@assets/icon/3.svg';
import Number4 from '@assets/icon/4.svg';
import DoneIco from '@assets/icon/done.svg';
import '../../page.style.less';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import deleteIco from '@assets/icon/deleteFile.svg';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import { AppInfoView } from '@crema';
import { ENTERPRISE_VIP_SIGNUP_SUCCESS_ROUTE } from '../declareRoute';
import { getExtensionFile } from 'utils/File';

const SignupVIP = () => {
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stylePage, setStylePage] = useState({display: "none"});
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const { enterpriseInfo, enrollEnterprise, isRegisterEnterpriserMember } = useSelector(({enterprise}) => enterprise);
  const [checked,setChecked] = useState(false);
  const [id, setId] = useState("");
  const [enterpriseOwnerId, setEnterpriseOwnerId] = useState('');
  let [listRegisterForm,setListRegisterForm] = useState([]);
  const [registerFormHTML,setRegisterFormHTML] = useState([]);
  const [description, setDescription] = useState();
  
  
  const RegisterMember = () => {
    let checkForm = true;
    const formData = form.getFieldValue();
    for(var k in formData) {
      if (formData[k] == '' || formData[k] == null) checkForm = false;
    }
    if(!description) checkForm = false;
    if(listRegisterForm == []) checkForm = false;
    if(checkForm) handleClickOpen();
    else dispatch({type: FETCH_ERROR, payload: "Ch??a nh???p ????? th??ng tin"});
  }

  useEffect(() => {
    dispatch(onGetEnterpriseList());
  }, []);
  
  useEffect(() => {
    if(enrollEnterprise) {
      if(enrollEnterprise.attachments) {
        let listFiles = enrollEnterprise.attachments;
        if(listFiles) {
          setListRegisterForm(listFiles.filter(listFiles => listFiles.type == 3));
        } 
      }
    }
  }, [enrollEnterprise]);

  useEffect(() => {
    if(enrollEnterprise) {
      if(enrollEnterprise.approvalStatus && isRegisterEnterpriserMember == null) navigate(ENTERPRISE_VIP_SIGNUP_SUCCESS_ROUTE);
      else setStylePage({display: "block"});
    }
  }, [enrollEnterprise, isRegisterEnterpriserMember]);


  useEffect(() => {
    if(enterpriseInfo) {
      setId(enterpriseInfo.id);
      setDescription(enterpriseInfo.description); 
      setEnterpriseOwnerId(enterpriseInfo.id);
    }
  }, [enterpriseInfo]);

  useEffect(() => {
    if(listRegisterForm.length !=0 ){
      let list = [];
      for(let i = 0; i < listRegisterForm.length; i++) {
        let filename = listRegisterForm[0].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='registerForm-row' key={i+1}>
          <div>
            <img src={srcImg} className='extension-icon'/>
            {listRegisterForm[i].fileName + " "} 
            <img src={DoneIco}/>
          </div>
          <img src={deleteIco} id={listRegisterForm[i].id} onClick={handleClickIcoRegisterForm}></img>
        </div>]
      }
      setRegisterFormHTML(list);
    }
    if(listRegisterForm.length == 0) {
      let list = [];
      setRegisterFormHTML(list);
    }
  }, [listRegisterForm]);

  useEffect(() => {
    if(id) dispatch(onGetEnrollEnterpriseMember({id}))
  }, [id]);

  useEffect(() => {
    if(enterpriseInfo) {
      form.setFieldsValue({
        phone: enterpriseInfo.phone == null ? "" : enterpriseInfo.phone,
        email: enterpriseInfo.email == null ? "" : enterpriseInfo.email,
        address: enterpriseInfo.address == null ? "" : enterpriseInfo.address,
        name: enterpriseInfo.name == null ? "" : enterpriseInfo.name,
        shortName: enterpriseInfo.shortName == null ? "" : enterpriseInfo.shortName,
        tax: enterpriseInfo.tax == null ? "" : enterpriseInfo.tax,
      })
    }
   }, [form, enterpriseInfo]);

   const handleClickIcoRegisterForm = (e) => {
    let list = [...listRegisterForm];
    list = list.filter(list => list.id != e.target.id);
    const id = e.target.id;
    dispatch(onDeleteAttachment({id}));
    setListRegisterForm(list);
   }

  const handleChooseRegisterForm = async (e) => {
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


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    let attachments =  [];
    listRegisterForm.map((v) => 
    {
      const uploadFileJson = {id:  v.id}
      attachments = [...attachments, uploadFileJson]
    });
    const formData = {
      attachments: attachments,
      description: description,
    }
    dispatch(onEnrollEnterpriseMemberUpgrade({formData, enterpriseOwnerId}));
  }

  return (
    <div style={stylePage} >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"X??c nh???n"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            B???n ch???c ch???n mu???n n???p h??? s?? ????? ho??n t???t th??? t???c ????ng k?? h???i vi??n VARS
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='cancle-btn' onClick={handleClose}>
              <IntlMessages id='common.forLater' />
            </Button>
          </div>
          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='sign-btn' onClick={handleUpdate} autoFocus>
              <IntlMessages id='common.update' />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div>
        <AppPageMetadata title={messages['route.group.membersVARSManagement']} />
        <AppInfoView></AppInfoView>
        <div className='profile-text-label'>Ho??n t???t h??? s??</div>
        <div className='profile-form'>
          <div className='profile-text-label'>Quy???n l???i</div>
          <div className='feature-row'>
            <img src={Number1} style={{marginRight:"10px"}}/> ???????c s??? d???ng mi???n ph?? c??c d???ch v??? trong h??? sinh th??i VARS trong v??ng 1 n??m
          </div>
          <div className='feature-row'>
            <img src={Number2} style={{marginRight:"10px"}}/> ???????c m???i tham gia c??c ho???t ?????ng m?? H???i t??? ch???c
          </div>
          <div className='feature-row'>
            <img src={Number3} style={{marginRight:"10px"}}/> ???????c c???p Gi???y ch???ng nh???n l?? H???i vi??n danh d??? ho???c li??n k???t c???a H???i M??i gi???i B???t ?????ng s???n Vi???t Nam cho H???i vi??n
          </div>
          <div className='feature-row'>
            <img src={Number4} style={{marginRight:"10px"}}/> ???????c gi???i thi???u, m??? r???ng c?? h???i h???p t??c v???i c??c H???i vi??n c???a H???i trong c??c ho???t ?????ng s???n xu???t kinh doanh
          </div>
        </div>
        <div className='profile-form'>
          <div className='profile-text-label'>Th??ng tin h???i vi??n VARS </div>
          <Form
            form={form}
            className='sign-form'
            name='basic'
            layout='vertical'>
            <div className='form-padding-start'></div>
            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                name='name'
                className='form-field'
                label={frl('common.companyName')}
                rules={[{required: true, message: frm('common.companyName')}]}>
                <AppInput maxLength={255} disabled={true} placeholder={messages['common.nameHinttext']}/>
              </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='shortName'
                  className='form-field'
                  label={frl('common.shortName')}
                  rules={[{required: true, message: frm('common.shortName')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.shortNameHinttext']}/>
                </Form.Item>
              </div>
            </div>

            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='phone'
                  className='form-field'
                  label={frl('common.phoneNumber')}
                  rules={[{required: true, message: frm('common.phoneNumber')}]}>
                  <AppInput maxLength={12} disabled={true} placeholder={messages['common.phoneHinttext']}/>
                </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='email'
                  className='form-field'
                  label={frl('common.email')}
                  rules={[{required: true, message: frm('common.email')}]}>
                  <AppInput maxLength={255} className="input-email" disabled={true} placeholder={messages['common.emailHinttext']}/>
                </Form.Item>
              </div>
            </div>

            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='address'
                  className='form-field'
                  label={frl('common.address')}
                  rules={[{required: true, message: frm('common.address')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.addressHinttext']}/>
                </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='tax'
                  className='form-field'
                  label={frl('common.tax')}
                  rules={[{required: true, message: frm('common.tax')}]}>
                  <AppInput maxLength={255} disabled={true} placeholder={messages['common.taxHinttext']}/>  
                </Form.Item>
              </div>
            </div>   
          </Form>   
        </div>

        <div className='profile-form'>
          <div className='profile-text-label'>H??? s?? ????nh k??m </div>
          <div style={{marginTop:"-20px"}}><IntlMessages id="common.supportFile" /></div>
          <div className='registerForm-list'>    
            <div className='text-bold'>
                <div>Phi???u ????ng k?? tr??? th??nh h???i vi??n<a className='star'>*</a></div>
                <a className='register-file'>T???i phi???u ????ng k??</a>
              </div> 
            <div>{"(Ghi ?????y ????? theo m??u in s???n v?? k?? t??n, ????ng d???u x??c nh???n c???a c?? quan, ????n v??? c??ng t??c)"}</div>
            {registerFormHTML}
          </div>
          <div className='registerForm-form'>
            <label htmlFor="input-registerForm" className='registerForm-card'> 
              <img src={UploadIco} />
              <div>T???i l??n phi???u ????ng k?? h???i vi??n</div>
              <input id="input-registerForm" type="file" style={{display:"none"}} multiple onChange={handleChooseRegisterForm}/>
            </label>
          </div>
          
        </div>

        <div className='profile-form'>
          <div className='profile-text-label'>Gi???i thi???u v??? doanh nghi???p </div>
          <Input value={description} onChange={(e) => setDescription(e.target.value)}></Input>
        </div>
      </div>
      

      
      <div style={{margin:"20px"}}>
        <Checkbox onChange={(e) => {setChecked(e.target.checked)}}> T??i x??c nh???n ???? ?????c v?? ?????ng ?? v???i ??i???u kho???n c???a <a className='link-text'><IntlMessages id="common.VIPMember"></IntlMessages> </a></Checkbox>
      </div>
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button onClick={RegisterMember} type='primary' htmlType='submit' className='sign-btn' disabled={!checked}>
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
