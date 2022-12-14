import {memo, 
  useEffect,
  useState,
} from 'react';
import { 
  useDispatch, 
  useSelector} from 'react-redux';
import '../index.style.less';
import {Button } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { AppInfoView } from '@crema';
import { 
  onBackFromTransactionPage, 
  onGetTransactionDetail } from 'redux/actions/Transaction';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_ROUTE } from '../declareRoute';
import { USER_PROFILE_ROUTE } from 'pages/ProfileManagement/declareRoute';
import '../../page.style.less';

const TransactionInfomation = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const { transactionInfo, wallet, transactionDetail } = useSelector(({transaction}) => transaction);
  const [qrCodeUrl, setQrCodeUrl] = useState();
  const [bankName, setBankName] = useState();
  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [expectedAmount, setExpectedAmount] = useState();
  const [transactionCode, setTransactionCode] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if(wallet == null) {
      navigate(TRANSACTION_ROUTE);
    }
  }, []);

  useEffect(() => {
    if(transactionInfo) {
      const bankId = transactionInfo.bankId;
      const exchangeRate = transactionInfo.exchangeRate;
      const expectedAmount = transactionInfo.expectedAmount;
      const expectedVars = transactionInfo.expectedVars;
      const transactionId = transactionInfo.transactionId;
      const walletId = wallet.walletId;
      dispatch(onGetTransactionDetail({ bankId, exchangeRate, expectedAmount, expectedVars, walletId, transactionId }));
    }
  }, [transactionInfo]);

  useEffect(() => {
    if(transactionDetail){
      setQrCodeUrl(transactionDetail.qrCodeUrl);
      setBankName(transactionDetail.bankInfo.bankName);
      setBankAccountNumber(transactionDetail.bankInfo.bankAccountNumber);
      setExpectedAmount(transactionDetail.expectedAmount.toLocaleString() + "  VN??");
      setTransactionCode(transactionDetail.transactionCode);
    }
  }, [transactionDetail]);

  const handleBack = (e) => {
    dispatch(onBackFromTransactionPage());
    if(e.target.value == "home") navigate(USER_PROFILE_ROUTE)
    else navigate(TRANSACTION_ROUTE);
  }


  return (
    <div>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['common.rechargeVARS']} />
        <div className='card-confirm'>
          <div className='card-confirm-info'>
            <div className='text-bold' style={{textAlign:'left'}}> Th??ng tin chuy???n kho???n </div>
            <div className='bank-info'>
              <div className='info-row'>
                <div className='row-label'>Ng??n h??ng: </div>
                <div className='row-content-end text-bold'>{bankName}</div>
              </div>
              <div className='info-row'>
                <div className='row-label'>S??? t??i kho???n: </div>
                <div className='row-content-end text-bold'>{bankAccountNumber}</div>
              </div>
              <div className='info-row'>
                <div className='row-label'>Ch??? t??i kho???n nh???n: </div>
                <div className='row-content-end text-bold'>C??ng ty c??? ph???n c??ng ngh??? Resdii</div>
              </div>
              <div className='info-row'>
                <div className='row-label'>S??? ti???n: </div>
                <div className='row-content-end text-bold'>{expectedAmount} </div>
              </div>
              <div className='info-row'>
                <div className='row-label'>N???i dung giao d???ch: </div>
                <div className='row-content-end text-bold'>{transactionCode}</div>
              </div>
            </div>
          </div>
          <div style={{margin:"10px"}}></div>
          <div className='card-confirm-info'>
            <div className='card-confirm-qr'>
              <div className='text-bold'>M?? QR chuy???n kho???n </div>
              <img className='qr-code' src={qrCodeUrl}/>
            </div>
          </div>
        </div>
        <div className='transaction-form'>
          <div className="transaction-note">
            <div className='contact-note-text'><b>??</b> Vui l??ng chuy???n ????ng n???i dung giao d???ch ????? ch??ng t??i x??c nh???n thanh to??n</div>
            <div className='contact-note-text'><b>??</b> Giao d???ch c???ng ?????ng VARS v??o s??? d?? t??i kho???n s??? ???????c x??? l?? trong v??ng n gi???</div>
            <div className='contact-note-text'><b>??</b> N???u b???n mu???n thay ?????i th??ng tin, vui l??ng li??n h??? qua email: <a className='contact-text-confirm'>hotrovarland@gmail.com</a></div>
            <div className='contact-note-text'><b>??</b> Ho???c g???i qua s??? hotline: <a className='contact-text-confirm'>{"0247 15 65 | 0236 256 325"}</a> {" ????? ???????c h??? tr???"}</div>
          </div>
        </div>
        <div className='form-btn'>
            <div className='form-btn-field'>
              <Button type='primary'  className='cancle-btn' onClick={handleBack} value="home">
                <IntlMessages id='error.goBackToHome' />
              </Button>
            </div>
            <div className='form-btn-field'>
              <Button type='primary'  className='sign-btn' onClick={handleBack} value="transaction">
                <IntlMessages id='common.continueRecharge' />
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default memo(TransactionInfomation);

TransactionInfomation.propTypes = {};

TransactionInfomation.defaultProps = {};
