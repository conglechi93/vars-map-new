import {
    Fragment,
    memo,
    useEffect,
    useState,
} from 'react';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import { AppInfoView } from '@crema';
import { appIntl } from '@crema/utility/helper/Utils';
import EmptyPage from './emptyPage';
import FilterComponent from './filterComponent';
import { defaultPageSize } from 'shared/constants/AppConst';
import { useDispatch } from 'react-redux';
import { onGetListPost } from 'redux/actions/Post';
import PostList from './postList';


const PostManagement = () => {
    const { messages } = appIntl();
    const [searchData, setSearchData] = useState({
        page: 1,
        pageSize: defaultPageSize,
        fromDate: "",
        toDate: "",
        type: "",
        status: "",
        searchText: "",
        subType: ""
    });

    const [postList, setPostList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(async () => {
        let data = await dispatch(onGetListPost(searchData));
        setPostList(data);
        setIsLoading(false);
    }, [searchData])
    if (isLoading == false && postList?.total == 0) {
        return <EmptyPage></EmptyPage>
    }
    return (
        <Fragment>
            <AppInfoView></AppInfoView>
            <div>
                <AppPageMetadata title={messages['post.postManagement']} />
                {postList != null && <div className='trasaction-text-label'>{messages['post.postManagement']}</div>}
            </div>
            {
                postList != null && <FilterComponent searchData={searchData} changeSearchData={setSearchData}></FilterComponent>
            }{
                postList!=null && <PostList searchData={searchData}></PostList>
            }
        </Fragment>
    );
};

export default memo(PostManagement);

PostManagement.propTypes = {};

PostManagement.defaultProps = {};
