import './style.css';
export default function FormSearchMap() {
  return (
    <>
      <form
        style={{width: '220px'}}
        className='w-11/12 p-5 mx-auto mt-5 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 form_place'>
        <div className='form_map_component'>
          <div className='header_form_map'>
            <img src="" alt="" />
            <div></div>
            
            </div>
          <div>day la body</div>
          <div className='style_button_form'>
            <button
              type='submit'
              className='w-full text-white rounded'
              style={{
                background: '#D1132A',
                outline: 'none',
              }}>
              Tìm kiếm
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
