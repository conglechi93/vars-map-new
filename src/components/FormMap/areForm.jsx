import {CloseCircleOutlined} from '@ant-design/icons';

function AreForm() {
  return (
    <div style={{width: '100%'}}>
      <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
        <img
          className='icon_form_map'
          src='data:image/png;base64,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'
          alt=''
        />
        <div className='title_form_map'>Đo diện tích</div>
        <CloseCircleOutlined className='icon_close_form_map' />
      </div>
      <div className='form_place_angular'>
        <div className='are_form_map'>
          <label htmlFor=''>Đơn vị đo</label>
          <input></input>
          {/* <select name='' id=''></select> */}
        </div>
        <div className='are_form_map'>
          <label htmlFor=''>Diện tích</label>
          <div></div>m2
        </div>
      </div>
    </div>
  );
}
export default AreForm;
