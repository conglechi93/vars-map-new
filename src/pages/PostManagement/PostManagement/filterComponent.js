import React, { useEffect, useState } from 'react';
import { Space, Select, DatePicker, Button, Input } from 'antd';
import { GET_REAL_ESATE_TYPE, GET_REAL_ESATE_POST_STATUS } from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { appIntl } from '@crema/utility/helper/Utils';
const FilterComponent = ({ searchData, changeSearchData }) => {
    const { messages } = appIntl()
    const { RangePicker } = DatePicker;
    const [listRealEstateTypeCat, setListRealEstateTypeCat] = useState([]);
    const [listRealEstatePostStatus, setListRealEstatePostStatus] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [realEstateType, setRealEstateType] = useState(null);
    const [realEstatePostStatus, setRealEstatePostStatus] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const dateFormat = 'DD/MM/YYYY';
    useEffect(() => {
        API.get(GET_REAL_ESATE_TYPE, { REQUEST_MUTED })
            .then((data) => {
                var list = [];
                for (let i = 0; i < data.length; i++) {
                    list = [...list, { "value": data[i].code, "label": data[i].name }]
                }
                setListRealEstateTypeCat(list);
            })
            .catch((err) => {
                console.log("err", err);
            });

        API.get(GET_REAL_ESATE_POST_STATUS, { REQUEST_MUTED })
            .then((data) => {
                var list = [];
                for (let i = 0; i < data.length; i++) {
                    list = [...list, { "value": data[i].code, "label": data[i].name }]
                }
                setListRealEstatePostStatus(list);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);
    const onSearchChange = () => {
        changeSearchData({
            ...searchData,
            searchText: searchText,
            type: realEstateType,
            status: realEstatePostStatus,
            fromDate,
            toDate
        })
    }
    return (
        <Box style={{
            display: 'flex',
            alignSelf: 'center',
            background: "white",
            justifyContent: "center",
            height: "100px",
            borderRadius: "10px",
            padding: "10px",
            width: "100%"
        }}>
            <Space style={{ alignItems: "flex-end", width: '100%' }}>
                <Grid>
                    <Grid>Nội dung tin</Grid>
                    <Input placeholder="Tìm kiếm nội dung tin đăng"  onChange={(e) => setSearchText(e.target.value)} />
                </Grid>
                <Grid>
                    <Grid>Loại tin</Grid>
                    <Select placeholder="Loại" options={listRealEstateTypeCat}  onChange={(value) => setRealEstateType(value)}>
                    </Select>
                </Grid>
                <Grid>
                    <Grid>Trạng thái   </Grid>
                    <Select placeholder="Trạng thái" options={listRealEstatePostStatus} onChange={(value) => setRealEstatePostStatus(value)}>
                    </Select>
                </Grid>
                <Grid>
                    <Grid>Ngày tạo tin</Grid>
                    <RangePicker onChange={(dates, dateStrings) => { setFromDate(dateStrings[0]); setToDate(dateStrings[1]) }} format={dateFormat}></RangePicker>
                </Grid>
                <Grid>
                    <Button type="primary" onClick={() => onSearchChange()}>{messages["post.postSearch"]}</Button>
                </Grid>

            </Space>
        </Box>
    );
};
export default FilterComponent;

FilterComponent.propTypes = {
    searchData: PropTypes.any,
    changeSearchData: PropTypes.func
};

FilterComponent.defaultProps = {};