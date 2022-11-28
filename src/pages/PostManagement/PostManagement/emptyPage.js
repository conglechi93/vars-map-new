import {
    Fragment
} from 'react';
import { appIntl } from '@crema/utility/helper/Utils';
import balanceIcon from '@assets/post/emptyPage.png';
import { Box } from '@mui/material';
import { Button } from 'antd';

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
                        messages["post.postEmpty"]
                    }
                </div>
                <div style={{
                    fontWeight: 400,
                    fontSize: "14px"
                }}>
                    {
                        messages["post.postNow"]
                    }
                </div>

            </Box>
            <Box style={{
                marginTop: '150px',
                textAlign: 'center'
            }}>
                <Button type="primary">
                    Đăng tin ngay
                </Button>
            </Box>

        </Fragment>
    );
};

export default EmptyPage;

EmptyPage.propTypes = {};

EmptyPage.defaultProps = {};
