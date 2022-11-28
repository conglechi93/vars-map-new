import {
  useEffect,
  useState,
} from 'react';
import '..';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import { AppInfoView } from '@crema';
import SearchComponent from './searchComponent';
import EmployeeList from './employeeList';
import { Box, Grid } from '@mui/material';
import { appIntl } from '@crema/utility/helper/Utils';
import { defaultPageSize } from 'shared/constants/AppConst';
import EmptyPage from './empyPage';
import { useDispatch, useSelector } from 'react-redux';
import { onGetEnterpriseList } from 'redux/actions/Enterprise';
import { onGetEmployee } from 'redux/actions/Employee';
import EmployeeAction from '../actionWithEmployee';


const EmployeeManagement = () => {
  const { messages } = appIntl();
  const [searchData, setSearchData] = useState({
    page: 1,
    pageSize: defaultPageSize,
    searchText: "",
    status: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadPage, setReloadPage] = useState(false);
  const [allTotal, setAllTotal] = useState(null);
  const { enterpriseInfoAvailable, enterpriseInfo } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetEnterpriseList());
  }, [])

  useEffect(async () => {
    if (enterpriseInfoAvailable) {
      let data = await dispatch(onGetEmployee({
        enterpriseId: enterpriseInfo.id, searchData: {
          page: 1,
          pageSize: defaultPageSize,
          searchText: "",
          status: ""
        }
      }));
      setAllTotal(data.total);
      setIsLoading(false);
    }
  })

  return (
    <div className="employee">
      <AppInfoView></AppInfoView>
      {isLoading == false && (allTotal == 0 || allTotal == null) &&
        <EmptyPage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></EmptyPage>
      }
      {isLoading == true || !(allTotal == 0 || allTotal == null) && <div>
        <div>
          <AppPageMetadata title={messages['employee.employeeManagement']} />
          <div className='trasaction-text-label'>{messages["employee.employeeManagement"]}</div>
        </div>
        <Box sx={{ flexGrow: 1 }} style={{ background: "inherit", marginBottom: '20px', marginTop: '20px' }}>
          <Grid container spacing={2} >
            <SearchComponent searchData={searchData} changeSearchData={setSearchData}></SearchComponent>
          </Grid>
        </Box>
        <EmployeeList searchData={searchData} reloadPage={reloadPage} setReloadPage={setReloadPage} setIsModalOpen={setIsModalOpen} ></EmployeeList>
      </div>}
      <EmployeeAction isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setReloadPage={setReloadPage}></EmployeeAction>
    </div>
  );
};

export default EmployeeManagement;

EmployeeManagement.propTypes = {};

EmployeeManagement.defaultProps = {};
