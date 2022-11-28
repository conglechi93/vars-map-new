import {
    Fragment
} from 'react';
import { appIntl } from '@crema/utility/helper/Utils';
import balanceIcon from '@assets/post/emptyPage.png';
import { Box } from '@mui/material';

const EmptyPage = () => {
    const { messages } = appIntl();

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
                        messages["post.postSavedEmpty"]
                    }
                </div>

            </Box>

        </Fragment>
    );
};

export default EmptyPage;

EmptyPage.propTypes = {};

EmptyPage.defaultProps = {};
