import {
  Fragment,
  memo,
  useEffect,
  useState,
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import '../index.style.less';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import { onGetBalanceWallet } from 'redux/actions/Transaction';
import { AppInfoView } from '@crema';
import BalanceWallet from './balanceWallet';
import SearchComponent from './searchComponent';
import TransactionTable from './transactionTable';
import { Box, Grid } from '@mui/material';
import { appIntl } from '@crema/utility/helper/Utils';
import { defaultPageSize } from 'shared/constants/AppConst';
import { loadState } from 'utils/localStoreHandle';


const TransactionHistory = () => {
  const { messages } = appIntl();
  const dispatch = useDispatch();
  const { enterpriseInfo } = useSelector(({ enterprise }) => enterprise);
  const { profile } = useSelector(({ auth }) => auth);
  const [searchData, setSearchData] = useState({
    page: 1,
    pageSize: defaultPageSize,
    fromDate: "",
    toDate: "",
    type: "",
    status: ""
  });

  useEffect(() => {
    let modeLogin = loadState("modeLogin");
    if (modeLogin == "1") {
      const walletId = enterpriseInfo?.walletId;
      dispatch(onGetBalanceWallet({ walletId }));
    } else {
      const walletId = profile?.wallet.walletId;
      dispatch(onGetBalanceWallet({ walletId }));
    }
  }, [])

  return (
    <Fragment>
      <AppInfoView></AppInfoView>
      <div>
        <AppPageMetadata title={messages['common.rechargeVARS']} />
        <div className='trasaction-text-label'>{messages['common.transactionHistory']}</div>
      </div>
      <div className='transaction-form'>
        <Box sx={{ flexGrow: 1 }} style={{ background: "inherit", marginBottom: '20px', marginTop: '20px' }}>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <BalanceWallet></BalanceWallet>
            </Grid>
            <Grid item xs={8}>
              <SearchComponent searchData={searchData} changeSearchData={setSearchData}></SearchComponent>
            </Grid>
          </Grid>
        </Box>
        <TransactionTable searchData={searchData}></TransactionTable>
      </div>
      
    </Fragment>
  );
};

export default memo(TransactionHistory);

TransactionHistory.propTypes = {};

TransactionHistory.defaultProps = {};
