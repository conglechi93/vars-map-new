import AppPageMetadata from '@crema/core/AppPageMetadata';
import {memo, 
} from 'react';
import {
} from 'react-redux';
import {useIntl} from 'react-intl';



const HomePage = () => {
  const {messages} = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['common.home']}></AppPageMetadata>
    </div>
  );
};

export default memo(HomePage);

HomePage.propTypes = {};

HomePage.defaultProps = {};
