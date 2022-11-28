import { MoreOutlined } from '@ant-design/icons';
import { appIntl } from '@crema/utility/helper/Utils';
import { Grid, Paper } from '@mui/material';
import { Avatar, Image, Popover, Tag } from 'antd';
import { TRANSACTION_TRANSFER_VARS_ROUTE } from 'pages/TransactionManagement/declareRoute';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onDeleteEmployee } from 'redux/actions/Employee';
import '../index.style.less';
import ModalConfirm from './modalComfirm';

const SearchResultItem = ({ data, listData, setListData }) => {
    const { messages } = appIntl();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { enterpriseInfo } = useSelector(({ auth }) => auth);
    const navigate = useNavigate();
    return <Paper style={{
        boxShadow: "0px 0px 8px rgba(17, 16, 16, 0.16)",
        borderRadius: "12px",
        width: '100%',
        height: '120px'
    }}>
        <Grid container>
            <Grid xs={4} >
                <Avatar style={{ margin: '10px' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={<Image src={data.avatar}
                    style={{ width: 100, height: 100 }} onError={(e) => {
                        e.target.src = "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
                        e.onerror = null
                    }
                    } />} />
            </Grid>
            <Grid xs={7}>
                <div style={{ marginTop: "10px" }}>
                    <div className='name'>
                        {data.name}
                    </div>
                    <div>
                        {data.phone}
                    </div>
                    <div>
                        {data.email}
                    </div>
                    <div>
                        <Tag color={"#" + data.status.color}>
                            {data.status.name}
                        </Tag>
                    </div>
                </div>
            </Grid>
            <Grid xs={1}>
                <Popover content={(
                    <div >
                        <div onMouseEnter={(e) => {
                            e.target.style.cursor = 'pointer';
                        }} onClick={() => {
                            navigate(TRANSACTION_TRANSFER_VARS_ROUTE, {
                                state: { "phoneNumber": data.phone }
                            })
                        }}>{messages["employee.tranfersVARS"]}</div>
                        <div onMouseEnter={(e) => {
                            e.target.style.cursor = 'pointer';
                        }} onClick={() => setIsModalOpen(true)}>{messages["employee.delete"]}</div>
                        <ModalConfirm message={messages["employee.confirmDelete"].replace("{employeeName}", data.name)} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onOK={async () => {
                            let enterpriseId = enterpriseInfo.id;
                            let employeeId = data.id;
                            let resultsDelete = await dispatch(onDeleteEmployee({ enterpriseId, employeeId }));
                            console.log(employeeId);
                            let tempList = [];
                            tempList = listData.filter(function (item) {
                                console.log(item.id)
                                return item.id != employeeId;
                            });
                            if (resultsDelete != null) {
                                setListData(tempList);
                            }
                        }}></ModalConfirm>
                    </div>
                )}>
                    <MoreOutlined style={{ marginTop: "10px" }} />
                </Popover>
            </Grid>
        </Grid >
    </Paper >
}
export default SearchResultItem;
SearchResultItem.propTypes = {
    data: PropTypes.any,
    listData: PropTypes.any,
    setListData: PropTypes.func
};

SearchResultItem.defaultProps = {};