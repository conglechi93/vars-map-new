import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './style.css';
import {useState} from 'react';

function AngularForm() {
  const [inputList, setInputList] = useState(['', '', '']);
  const newItem = () => {
    setInputList([...inputList, '']);
  };
    const deleteItem = (index) => {
      setInputList(
          inputList.filter((item, currentIndex) => currentIndex !== index)
      );
    };

  return (
    <div style={{width: '50%'}}>
      <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
        <img
          className='icon_form_map'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVFSURBVHgBxVZpbFRVFP5m6TKdKW3ptFRKaQptEcsibhiDWDVoQhRFo9EEExMVEyGaYKKYaFRwiZDgH0kUMVFrgIYIakAsaoKWShtaSmlLW7pOO12dtrN3pjPzrudc6es2046tCV8yybz37nvnnnu+851PIwiIArzMPRqC2xfEoGcUHn8QGo0Gpjg9Uo2xSEqIQbxei2ihn21BiALWWh34tXEA1mEvXBQ4JSEWxng9hCLg8AbgCykwxuqwMiMR9yw3o2DxAmhm+a5mpowb+lz44s82BBUFhXnpuC07GUtSDIjVTc6Ms++kTdX3OPFX25DM/OWNy5C9MAERIcIgGFJE8cVOseVgmSip7xMef0BEC6cvII5XWcWj9O75ZptQFCXsummBvaNBsa+kSew4Vi3s3lExV/Q5RsRLRVXicFm7CISUmQPz7g78dk3sOl4jXL6AmkGv3aeuCdGaogqLGKZNnai2Crc/GDE4lUA8/81F8W25ZdqzScUqbRlEq82Djx5fJdnK2H/2Gg783iRJxtASk3VEnY9/aYKXWM6kioQEevbJ1tUoqe9HRcdQ+Bp320dkXfqd49nVWO2i4P2zYtWes+JCq029z6fxxola0UPvRIPGPqd46lC5cI4Epmf89YUObL01E+mJcfJ6NKhg788NoOqASoQPzjRiwOWXz3RaDdJNsUiMn7UbJVYsSsTaJQtQXGlV78nAbXS8PQ4ftqy9SX1w4nI3Gnpd6jWv+aqsA3zihhgdXt+Ur5YjGmxbn42yVhuIE+OBa7uduHmRSSoQw0O1K7naj6ULDTIIIzs1AdVdw+iyezEXLE6KRxb1dWXnsLzW81HW9TiwMc+sLorRabCPSMF02n2yFs0Dbhzedjvd1yLJEIO5gN9dRYpWQypYmJcG/UggBJvbTzsyqItYmdKu1zqWVIhfSjPFyf/zQV66CVWWYVJCAS2TiH8pxrllMhXMgd0n61DWNojPS9vUNmSYqZQ+GS8ELTOWjztON79sxkBtTkTKwts/1qMwPw06zfi40FMMkizajNQDjaylEtVwjA5Xuh1yUllsk4nISbIAcYparidfuEeD+D8QoHT67H58+FgBLDSxghMycvgCiNFqiSs6aA0kaywEpEKYD5itpS02MP92bcqTM3v7hhy6Hj/qfhIgblnuGi0/yDWb5IvzQfOACzuOVmPP6QZYBsP3ek2XnRQsSf6X0nNnTgqKKjrhIlVJjKBG3Ph8TJHQ8rdHHmtxlRV/NNvwyn3LsGXNYrUFvdS2LFRPrsscD7wmMxmKYsFl2tG9ueZpH+1z+vBiURWiBa9/99RVSbJ3Nt8ij/bUlV5kkXthB8NQrc95GokHz7XiyAt3YUIHoJ00mn3WbDhd1ytPbQzPrV+K1x7Ik6PRT7379Jfl2P/EauTTwFAzZmzITUV5+yA+O9eCnYXLpYNk5JiNiAbVXQ6pcOuykvHWwyuwIuPfAEE52RrwzB1L1KASE+cmz9kdRy+JI+S3InmlSDhT3yu+v2SVDmUM/P9QaZvYSTYqNOV70zxXL3mlZw+Xi+LKLmn6osXUD/uDIfEp2ajt31WRd5tuFsPa2wE3keOnBjko3nwoH8b/MHcZQ2T491Jbmen9V+/PDWsYIvpqljc2A0yYzQUZsg1SyXVoNeGtOhOI7BN+qOnBuaYB4kkuHlyZPkmrowo8BuvwCI5VdtHMdkpblE+jLZNagvudxd4+EoB1yCsdiodk9+6cVDyyOgNmU9xMn5098BgcFKCVRKLV5pY2yX29xdj+ZCYbiMUm5Cw0whSlD+PA7+EG4B9ytoABaRnwuQAAAABJRU5ErkJggg=='
          alt=''
        />
        <div className='title_form_map'>Tìm theo góc ranh</div>
        <CloseCircleOutlined className='icon_close_form_map' />
      </div>
      <div className='form_place_angular'>
        <div>
          <div>Quét tọa độ góc ranh từ ảnh chụp</div>
          <div className='upload-files-container'>
            <label className='fileUploaderContainer'>
              <CloudUploadOutlined className='icon_upload_form_map' />
              <input
                type='file'
                id='fileUploader'
                // onChange={handleChange}
                multiple
              />
              <div>
                Tải lên hoặc kéo thả ảnh <span>Bảng liệt kê tọa độ góc</span>{' '}
                trên giấy tờ đất bắt đầu quét
              </div>
            </label>
          </div>
          <div className='btn_scan'>
            <button className='w-full text-white rounded'>Quét tọa độ</button>
          </div>
        </div>
        <div>
          Hoặc nhập chính xác Tỉnh thành và tọa độ góc ranh trên giấy tờ đất để
          tìm kiếm
        </div>
        <form
        // onSubmit={onSubmit}
        //   style={{width: '220px'}}
        // className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 form_place'
        >
          <div className='flex flex-col gap-5 form_search'>
            {/* <Select
            name='cityId'
            className='select_form_search'
            // key={`cityId_${selectedCity?.value}`}
            // isDisabled={cityOptions.length === 0}
            // options={cityOptions}
            // onChange={(option) => {
            //   onCitySelect(option);
            // }}
            // placeholder="Tỉnh/Thành"
            // defaultValue={selectedCity}
          /> */}
            {inputList.map((item, index) => {
              return (
                <div
                  key={`action-item-${index}`}
                  className='box_input_condinates'>
                  <input
                    value={item}
                    className='input_condinates'
                    name='soTo'
                    // onChange={onChangeSoTo}
                    // value={valueInputSoTo}
                    placeholder='Toạ độ X'
                  />
                  <input
                    value={item}
                    className='input_condinates'
                    name='soThua'
                    // onChange={onChangeSoThua}
                    // value={valueInputSoThua}
                    placeholder='Toạ độ Y'
                  />
                  <DeleteOutlined className='add_element_condinates' onClick={()=>deleteItem(index)} />
                </div>
                
              );
            })}
  <div  className='box_input_condinates'>

             <input
                    className='input_condinates'
                    name='soTo'
                    // onChange={onChangeSoTo}
                    // value={valueInputSoTo}
                    placeholder='Toạ độ X'
                  />
                  <input
                    // value={item}
                    className='input_condinates'
                    name='soThua'
                    // onChange={onChangeSoThua}
                    // value={valueInputSoThua}
                    placeholder='Toạ độ Y'
                  />
                  <PlusCircleOutlined
                    className='add_element_condinates'
                    onClick={newItem}
                  />
  </div>


          </div>

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
        </form>
      </div>
    </div>
  );
}

export default AngularForm;
