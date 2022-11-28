import {memo, 
  useEffect, 
  useState
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import {Button, Checkbox, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { 
  onGetEnterprise, 
  onGetEnterpriseList, 
  onUpdateEnterprise, 
} from 'redux/actions/Enterprise';
import { 
  onDeleteAttachment,
  onUploadAttachment 
} from 'redux/actions/User';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import { AppInfoView } from '@crema';
import deleteIco from '@assets/icon/deleteFile.svg';
import { useNavigate } from 'react-router-dom';
import Feature1 from '@assets/enterprise/feature_1.svg';
import Feature2 from '@assets/enterprise/feature_2.svg';
import Feature3 from '@assets/enterprise/feature_3.svg';
import Feature4 from '@assets/enterprise/feature_4.svg';
import UploadIco from '@assets/icon/upload.svg';
import DoneIco from '@assets/icon/done.svg';
import '../../page.style.less';


// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ENTERPRISE_SIGNUP_SUCCESS_ROUTE } from '../declareRoute';
import { getExtensionFile } from 'utils/File';

const Signup = () => {
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const [stylePage, setStylePage] = useState({display: "block"});

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [listUploadFile, setListUploadFile] = useState([]);
  const { enterpriseInfo, isRegisterEnterprise, enterpriseInfoDetail, enterpriseInfoAvailable } = useSelector(({auth}) => auth);
  const [enterpriseOwnerId, setEnterpriseOwnerId] = useState('');
  const [businessLicenceHTML,setBusinessLicenceHTML] = useState([]);
  const [cardIdHTML,setCardIdHTML] = useState([]);
  let [listBusinessLicence,setListBusinessLicence] = useState([]);
  let [listCardId,setListCardId] = useState([]);

  const [checked,setChecked] = useState(false);
  
  const RegisterMember = () => {
    let registerAttachments =  [];
    listUploadFile.map((v) => 
    {
      const uploadFileJson = {id:  v.id}
      registerAttachments = [...registerAttachments, uploadFileJson]
    });
    const id = enterpriseOwnerId;
    const formData = form.getFieldValue();
    dispatch(onUpdateEnterprise({formData, registerAttachments, id}));
    setOpen(false);
  }

  useEffect(() => {
    dispatch(onGetEnterpriseList());
  }, []);

  useEffect(() => {
    if(enterpriseInfoAvailable == false) {
      const id = -1;
      dispatch(onGetEnterprise({id}));
    }
  }, [enterpriseInfoAvailable]);

  useEffect(() => {
    if(enterpriseInfoDetail) {
      if(enterpriseInfoDetail.registerAttachments) {
        let listFiles = enterpriseInfoDetail.registerAttachments;
        if(listFiles) {
          setListBusinessLicence(listFiles.filter(listFiles => listFiles.type == 1));
          setListCardId(listFiles.filter(listFiles => listFiles.type == 2));
        }
      }
    }
  }, [enterpriseInfoDetail]);

  useEffect(() => {
    if(enterpriseOwnerId) {
      console.log("enterpriseOwnerId",enterpriseOwnerId)
      const id = enterpriseOwnerId;
      dispatch(onGetEnterprise({id}));
    }
  }, [enterpriseOwnerId]);

  

  useEffect(() => {
    if(enterpriseInfo) {
      setEnterpriseOwnerId(enterpriseInfo.id);
    }
  }, [enterpriseInfo]);

  useEffect(() => {
    if(enterpriseInfo){
      if(enterpriseInfo.registerStatus && isRegisterEnterprise == null) navigate(ENTERPRISE_SIGNUP_SUCCESS_ROUTE);
      else setStylePage({display: "block"});
    }
  }, [isRegisterEnterprise, enterpriseInfo]);



  useEffect(() => {
    if(listBusinessLicence.length != 0){
      let list = [];
      for(let i = 0; i < listBusinessLicence.length; i++) {
        let filename = listBusinessLicence[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list' key={i+1}>
          <div >
            <img src={srcImg} className='extension-icon'/>
            {listBusinessLicence[i].fileName + " "} <img src={DoneIco}/>
          </div>
          <img src={deleteIco} id={listBusinessLicence[i].id} onClick={handleClickIcoBusinessLicences}></img>
        </div>]
      };
      setBusinessLicenceHTML(list);
    }
    if(listBusinessLicence == 0) {
      let list = []
      setBusinessLicenceHTML(list);
    }
  }, [listBusinessLicence]);



  useEffect(() => {
    if(listCardId.length != 0){

      let list = [];
      for(let i = 0; i < listCardId.length; i++) {
        let filename = listCardId[i].fileName;
        let srcImg = getExtensionFile(filename);
        list = [...list, 
        <div className='file-list-right' key={i+1}>
          <div> 
            <img src={srcImg} className='extension-icon'/>
            {listCardId[i].fileName} <img src={DoneIco}/>
          </div>
          <img src={deleteIco} id={listCardId[i].id} onClick={handleClickIcoCardId}></img>
        </div>]
      }
      setCardIdHTML(list);
    }
    if(listBusinessLicence == 0) {
      let list = []
      setCardIdHTML(list);
    }
  }, [listCardId]);

  const handleClickIcoBusinessLicences = (e) => {
    let list = [...listBusinessLicence];
    list = list.filter(list => list.id != e.target.id);
    const id = e.target.id;
    dispatch(onDeleteAttachment({id}));
    setListBusinessLicence(list);
  }

  const handleClickIcoCardId = (e) => {
    let list = [...listCardId];
    list = list.filter(list => list.id != e.target.id);
    const id = e.target.id;
    dispatch(onDeleteAttachment({id}));
    setListCardId(list);
  }

  const handleChooseBusinessLicencesFile = async (e) => {
    if(e.target.files) {
      const files = e.target.files;  
      let list = [...listBusinessLicence]
      for(let i = 0; i < files.length; i++) {
        const type = 1;
        const file = files[i];
        let value = await dispatch(onUploadAttachment({file, type, enterpriseOwnerId}));
        list = [...list,value];
      }
      setListBusinessLicence(list);
    } 
  }

  const handleChooseCardIdFile = async (e) => {
    if(e.target.files) {
      const files = e.target.files;  
      let list = [...listCardId]
      for(let i = 0; i < files.length; i++) {
        const type = 2;
        const file = files[i];
        let value = await dispatch(onUploadAttachment({file, type, enterpriseOwnerId}));
        list = [...list,value];
      }
      setListCardId(list);
    }
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if(listCardId == [] || listBusinessLicence == []) dispatch({type: FETCH_ERROR, payload: "Cần hoàn thành đủ hồ sơ đính kèm"});
    else {
      setListUploadFile([...listCardId,...listBusinessLicence]);
      let checkForm = true;
      const formData = form.getFieldValue();
      if (JSON.stringify(formData) === JSON.stringify({})) checkForm = false;
      for(var k in formData) {
        if (formData[k] == '' || formData[k] == null) checkForm = false;
      }
      if(checkForm == false) dispatch({type: FETCH_ERROR, payload: "Bạn chưa nhập đủ thông tin"});
      else setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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


  return (
    <div style={stylePage}>
      <AppInfoView></AppInfoView>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn tạo tài khoản doanh nghiệp ?
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
              <IntlMessages id='common.confirm' />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div>
        <AppPageMetadata title={messages['route.group.enterpriseManagement']} />
        <div className='enterprise-form'>
          <div className='enterprise-text-label'>Tính năng nổi bật</div>
          <div className='feature-row'>
            <img src={Feature1} style={{marginRight:"10px"}}/> Quản lí hiệu quản nhiều tài khoản trong doanh nghiệp
          </div>
          <div className='feature-row'>
            <img src={Feature2} style={{marginRight:"10px"}}/> Chuyển và thu hồi tiền linh hoạt cho các tài khoản nhân viên
          </div>
          <div className='feature-row'>
            <img src={Feature3} style={{marginRight:"10px"}}/> Tổng quan được lịch sử đăng tin và hoạt dộng của các thành viên
          </div>
          <div className='feature-row'>
            <img src={Feature4} style={{marginRight:"10px"}}/> Quản lý và phân phối lượt tra cứu quy hoạch
          </div>
        </div>

        <div className='enterprise-form'>
          <div className='enterprise-text-label'>Thông tin doanh nghiệp </div>
          <Form
            form={form}
            className='sign-form'
            name='basic'
            layout='vertical'
            initialValues={{
            }}>
            <div className='form-padding-start'></div>
            <div className='enterprise-form-row'>
              <div className='enterprise-form-column'>
                <Form.Item
                name='name'
                className='form-field'
                label={frl('common.companyName')}
                rules={[{required: true, message: frm('common.companyName')}]}>
                <AppInput maxLength={255} placeholder={messages['common.nameHinttext']}/>
              </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='shortName'
                  className='form-field'
                  label={frl('common.shortName')}
                  rules={[{required: true, message: frm('common.shortName')}]}>
                  <AppInput maxLength={255} placeholder={messages['common.shortNameHinttext']}/>
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
                  <AppInput maxLength={12} placeholder={messages['common.phoneHinttext']}/>
                </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='email'
                  className='form-field'
                  label={frl('common.email')}
                  rules={[{required: true, message: frm('common.email')}]}>
                  <AppInput maxLength={255} className="input-email" placeholder={messages['common.emailHinttext']}/>
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
                  <AppInput maxLength={255} placeholder={messages['common.addressHinttext']}/>
                </Form.Item>
              </div>
              <div className='enterprise-form-column'>
                <Form.Item
                  name='tax'
                  className='form-field'
                  label={frl('common.tax')}
                  rules={[{required: true, message: frm('common.tax')}]}>
                  <AppInput maxLength={255} placeholder={messages['common.taxHinttext']}/>  
                </Form.Item>
              </div>
            </div>   
          </Form>
        </div>

        <div className='enterprise-form'>
          <div className='enterprise-text-label'>Hồ sơ đính kèm </div>
          <div ><IntlMessages id="common.supportFile" /></div>
          <div className='attach-list'>
            <div className='attach-list-column'>
              <div className='text-bold'>Giấy phép đăng ký kinh doanh <a className='star'>*</a></div>
              {businessLicenceHTML}
            </div>
            <div style={{margin:"10px"}}></div>
            <div className='attach-list-column'>
              <div className='text-bold'>CCCD/CMND/Hộ chiếu chủ doanh nghiệp <a className='star'>*</a></div>
              {cardIdHTML}
            </div>
            <div className='file-list'>
            </div>
          </div>
          <div className='attach-form'>
            <label htmlFor="input-business-license" className='attach-card'> 
              <img src={UploadIco} />
              <div>Tải lên giấy phép kinh doanh</div>
              <input id="input-business-license" type="file" style={{display:"none"}} multiple onChange={handleChooseBusinessLicencesFile}/>
            </label>
            
            <label htmlFor="input-personnal" className='attach-card'> 
              <img src={UploadIco} />
              <div>Tải lên CCCD/CMND/Hộ chiếu doanh nghiệp</div>
              <input id="input-personnal" type="file" style={{display:"none"}} multiple onChange={handleChooseCardIdFile}/>
            </label>
          </div>
        </div>
      </div>

      <div style={{margin:"20px"}}>
        <Checkbox onChange={(e) => {setChecked(e.target.checked)}}> Tôi xác nhận đã đọc và đồng ý với điều khoản của <a className='link-text'><IntlMessages id="common.VIPMember"></IntlMessages> </a></Checkbox>
      </div>
      <div className='form-btn'>
        <div className='form-btn-field'>
          <Button onClick={handleClickOpen} type='primary' htmlType='submit' className='sign-btn' disabled={!checked}>
            <IntlMessages id='common.resgisterEnterprise' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Signup);

Signup.propTypes = {};

Signup.defaultProps = {};


