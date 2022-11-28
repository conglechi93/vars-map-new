import { appIntl } from "@crema/utility/helper/Utils";
import { Box, Grid } from "@mui/material";
import { Modal } from "antd";
import { useState } from "react";
import ListResult from "./listResult";
import SearchComponent from "./searchComponent";
import PropTypes from 'prop-types';
const EmployeeAction = ({ isModalOpen, setIsModalOpen,  setReloadPage }) => {
    const { messages } = appIntl();
    const [searchData, setSearchData] = useState({
        phone: null
    });
    const handleCancel = () => {
        setSearchData({
            phone: null
        })
        setReloadPage(true);
        setIsModalOpen(false);
    };
    return <>
        <Modal title={messages["employee.addEmployeeNow"]} footer={null} open={isModalOpen} onCancel={handleCancel}>
            <Box sx={{ flexGrow: 1 }} style={{ background: "inherit", marginBottom: '20px', marginTop: '20px' }}>
                <Grid container spacing={2} >
                    <SearchComponent searchData={searchData} changeSearchData={setSearchData} ></SearchComponent>
                </Grid>
            </Box>
            <ListResult searchData={searchData}></ListResult>
        </Modal>
    </>
}
export default EmployeeAction;

EmployeeAction.propTypes = {
    isModalOpen: PropTypes.any,
    setIsModalOpen: PropTypes.func,
    setReloadPage: PropTypes.func,
};

EmployeeAction.defaultProps = {};