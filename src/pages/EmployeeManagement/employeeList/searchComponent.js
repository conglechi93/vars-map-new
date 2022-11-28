import React, { useEffect, useState } from 'react';
import { Select, Button, Input } from 'antd';
import { GET_EMPLOYEE_STATUS } from 'shared/constants/ApiUrls';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { appIntl } from '@crema/utility/helper/Utils';
const SearchComponent = ({ searchData, changeSearchData }) => {
    const { messages } = appIntl();
    const [listEmployeeStatus, setListEmployeeStatus] = useState([]);
    const [employeeStatus, setEmployeeStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        API.get(GET_EMPLOYEE_STATUS, { REQUEST_MUTED })
            .then((data) => {
                var list = [];
                for (let i = 0; i < data.length; i++) {
                    list = [...list, { "value": data[i].code, "label": data[i].name }]
                }
                setListEmployeeStatus(list);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);
    const onSearchChange = () => {
        changeSearchData({
            ...searchData,
            status: employeeStatus,
            searchText
        })
    }
    return (
        <Box style={{
            display: 'flex',
            alignSelf: 'center',
            background: "white",
            height: "100px",
            borderRadius: "10px",
            padding: "10px",
            width: "100%",
        }}>
            <Grid container style={{ alignItems: "flex-end" }}>
                <Grid item xs={5}>
                    <Grid>{messages["employee.searchText"]}</Grid>
                    <Input style={{ width: "90%" }} placeholder={messages["employee.inputSearchText"]} onChange={(e) => setSearchText(e.target.value)} />
                </Grid>
                <Grid item xs={5}>
                    <Grid>{messages["employee.status"]}</Grid>
                    <Select style={{ width: "90%" }} placeholder={messages["employee.status"]} options={listEmployeeStatus} onChange={(value) => setEmployeeStatus(value)}>
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    <Button type="primary"  onClick={() => onSearchChange()}>{messages["employee.search"]}</Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default SearchComponent;

SearchComponent.propTypes = {
    searchData: PropTypes.any,
    changeSearchData: PropTypes.func
};

SearchComponent.defaultProps = {};