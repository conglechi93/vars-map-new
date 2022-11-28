import {
    Fragment
} from 'react';
import balanceIcon from '@assets/post/emptyPage.png';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
const NotFound = ({message}) => {

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
                    {message}
                </div>
            </Box>
          
        </Fragment>
    );
};

export default NotFound;
NotFound.propTypes = {
    message: PropTypes.string
};

NotFound.defaultProps = {};
