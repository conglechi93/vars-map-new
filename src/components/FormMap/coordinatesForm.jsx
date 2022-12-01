import {CloseCircleOutlined} from '@ant-design/icons';

function CoordinantesForm() {
  return (
    <div style={{width: '100%'}}>
      <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
        <img
          className='icon_form_map'
          src='data:image/png;base64,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'
          alt=''
        />
        <div className='title_form_map'>Tọa độ vị trí</div>
        <CloseCircleOutlined className='icon_close_form_map' />
      </div>
      <div className='form_place_angular'>
        <div className='are_form_map'>
          <label htmlFor=''>Tọa độ :</label>
          <input id="length" type="text" />
        </div>
        
      </div>
    </div>
  );
}
export default CoordinantesForm;