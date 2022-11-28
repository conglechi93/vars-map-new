import React, { useEffect, useState } from 'react';
import { Space, Select, DatePicker, Button } from 'antd';
import { GET_TRANSACTION_STATUS, GET_TRANSACTION_TYPE } from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import '../index.style.less';
import IntlMessages from '@crema/utility/IntlMessages';
const SearchComponent = ({ searchData, changeSearchData }) => {
    const { RangePicker } = DatePicker;
    const [listTransactionType, setListTransactionType] = useState([]);
    const [listTransactionStatus, setListTransactionStatus] = useState([]);

    const [transactionType, settTransactionType] = useState("");
    const [transactionStatus, setTransactionStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const dateFormat = 'DD/MM/YYYY';
    useEffect(() => {
        API.get(GET_TRANSACTION_TYPE, { REQUEST_MUTED })
            .then((data) => {
                var list = [];
                for (let i = 0; i < data.length; i++) {
                    list = [...list, { "value": data[i].code, "label": data[i].name }]
                }
                setListTransactionType(list);
            })
            .catch((err) => {
                console.log("err", err);
            });

        API.get(GET_TRANSACTION_STATUS, { REQUEST_MUTED })
            .then((data) => {
                var list = [{
                    "value": "",
                    "label": "Tất cả"
                }];
                for (let i = 0; i < data.length; i++) {
                    list = [...list, { "value": data[i].code, "label": data[i].name }]
                }
                setListTransactionStatus(list);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);
    const onSearchChange = () => {
        changeSearchData({
            ...searchData,
            transactionType,
            transactionStatus,
            fromDate,
            toDate
        })
    }
    return (
        <Box style={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'flex-end',
            background: "white",
            height: "100px",
            borderRadius: "10px",
            padding: "10px"
        }}>
            <Space style={{ alignItems: "flex-end" }}>
                <Grid>
                    <Grid>Loại dịch vụ   </Grid>
                    <Select placeholder="Loại dịch vụ" defaultValue={0} options={listTransactionType} onChange={(value) => settTransactionType(value)}>
                    </Select>
                </Grid>
                <Grid>
                    <Grid>Trạng thái   </Grid>
                    <Select placeholder="Trạng thái" defaultValue={""} options={listTransactionStatus} onChange={(value) => setTransactionStatus(value)}>
                    </Select>
                </Grid>
                <Grid>
                    <Grid>Ngày tạo giao dịch  </Grid>
                    <RangePicker onChange={(dates, dateStrings) => { setFromDate(dateStrings[0]); setToDate(dateStrings[1]) }} format={dateFormat}></RangePicker>
                </Grid>
                <Grid>
                    <Button type="primary" className='search-btn' onClick={() => onSearchChange()}><IntlMessages id="common.search"/></Button>
                </Grid>
            </Space>
        </Box>
    );
};
export default SearchComponent;

SearchComponent.propTypes = {
    searchData: PropTypes.any,
    changeSearchData: PropTypes.func
};

SearchComponent.defaultProps = {};