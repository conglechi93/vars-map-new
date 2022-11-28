import React, { useEffect, useState } from 'react';
import { Space, Select, Button, Input } from 'antd';
import { GET_REAL_ESATE_TYPE } from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { appIntl } from '@crema/utility/helper/Utils';
const FilterComponent = ({ searchData, changeSearchData }) => {
    const { messages } = appIntl()
    const [listRealEstateTypeCat, setListRealEstateTypeCat] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [realEstateType, setRealEstateType] = useState(null);
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

    }, []);
    const onSearchChange = () => {
        changeSearchData({
            ...searchData,
            searchText: searchText,
            type: realEstateType,
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
                    <Input placeholder="Tìm kiếm nội dung tin đăng" onChange={(e) => setSearchText(e.target.value)} />
                </Grid>
                <Grid>
                    <Grid>Loại tin</Grid>
                    <Select placeholder="Loại" options={listRealEstateTypeCat} onChange={(value) => setRealEstateType(value)}>
                    </Select>
                </Grid>
                <Grid>
                    <Grid>Sắp xếp</Grid>
                    <Select placeholder="Sắp xếp" options={[
                        { "value": 0, "label": "Mới nhất" },
                        { "value": 1, "label": "Cũ nhất" }
                    ]} onChange={(value) => setRealEstateType(value)}>
                    </Select>
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