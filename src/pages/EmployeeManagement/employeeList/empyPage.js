import {
    Fragment
} from 'react';
import { appIntl } from '@crema/utility/helper/Utils';
import balanceIcon from '@assets/post/emptyPage.png';
import { Box } from '@mui/material';
import { Button } from 'antd';
import PropTypes from 'prop-types';
const EmptyPage = ({isModalOpen, setIsModalOpen}) => {
    const { messages } = appIntl();
    console.log(isModalOpen)
    return (
        <Fragment>
            <Box style={{
                textAlign: 'center'
            }}>
                <img src={balanceIcon}></img>
                <div style={{
                    fontWeight: 700,
                    fontSize: "28px"
                }}>
                    {
                        messages["employee.notHaveEmployee"]
                    }
                </div>
            </Box>
            <Box style={{
                marginTop: '150px',
                textAlign: 'center'
            }}>
                <Button type="primary" onClick={()=>{setIsModalOpen(true)}}>
                    {
                        messages["employee.addEmployeeNow"]
                    }
                </Button>
            </Box>
        </Fragment>
    );
};

export default EmptyPage;

EmptyPage.propTypes = {
    isModalOpen: PropTypes.any, 
    setIsModalOpen: PropTypes.func
};

EmptyPage.defaultProps = {};
