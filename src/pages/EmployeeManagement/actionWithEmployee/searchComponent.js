import React, { useState } from 'react';
import {  Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { appIntl } from '@crema/utility/helper/Utils';
const SearchComponent = ({ searchData, changeSearchData }) => {
    const { messages } = appIntl();
    const [phone, setPhone] = useState(null);
    const onSearchChange = () => {
        changeSearchData({
            ...searchData,
            phone
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
            padding: "10px",
            width: '100%'
        }}>
            <Grid container style={{ alignItems: "flex-end" }}>
                <Grid item xs={8} style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <Grid>{messages["employee.phone"]}</Grid>
                    <Input placeholder={messages["employee.phone"]} onChange={(e) => setPhone(e.target.value)} />
                </Grid>
                <Grid item xs={4} style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <Button type="primary" onClick={() => onSearchChange()}>{messages["employee.search"]}</Button>
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