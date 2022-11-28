import { Grid, Paper } from '@mui/material';
import { Avatar, Checkbox, Image } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { onAddEmployee } from 'redux/actions/Employee';
import '../index.style.less';
const AddItem = ({ data, setReload }) => {
    const dispatch = useDispatch();
    const { enterpriseInfo } = useSelector(({ auth }) => auth);
  
    return <Paper style={{
        boxShadow: "0px 0px 8px rgba(17, 16, 16, 0.16)",
        borderRadius: "12px",
        width: '100%',
        height: '120px'
    }}>
        <Grid container>
            <Grid xs={4}>
                <Avatar style={{ margin: '10px' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={<Image src={data?.userInfo.avatar}
                    style={{ width: 100, height: 100 }}  />} />
            </Grid>
            <Grid xs={5} >
                <div style={{ marginTop: '10px', alignSelf: "center" }}>
                    <div>
                        {data?.userInfo.fullName}
                    </div>
                    <div>
                        {data?.userInfo.phone}
                    </div>
                    <div>
                        {data?.userInfo.email}
                    </div>
                </div>
            </Grid>
            <Grid xs={3}>
                <div style={{ marginTop: '10px', alignSelf: "center" }}>
                    {
                        data?.inviteStatus != null ? data?.inviteStatus.name :
                            <Checkbox onChange={async (e) => {
                                let enterpriseId = enterpriseInfo.id;
                                console.log(e);
                                if (e.target.checked) {
                                    let employeeId = data?.userInfo.id;
                                    await dispatch(onAddEmployee({
                                        enterpriseId, listEmployee: [employeeId]
                                    }))
                                }
                                setReload(true);
                            }}>

                            </Checkbox>
                    }
                </div>
            </Grid>
        </Grid>
    </Paper >
}
export default AddItem;
AddItem.propTypes = {
    data: PropTypes.any,
    setReload: PropTypes.any
};

AddItem.defaultProps = {};