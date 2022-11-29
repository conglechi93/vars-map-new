import Select from "react-select";
import './style.css';
import {CloseCircleOutlined} from '@ant-design/icons';

function LocationForm() {
    return (
        <div style={{width: '100%'}}>
        <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
          <img
            className='icon_form_map'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUPSURBVHgB5VZpTFxVFP5mYwYYyjJMh7K1LJU1QoEqKZhUY20Tq6YuCW4taUzUpJI0BtOkiWKjSUP80cYlMbU0ti7RtE2qNcYlpPqjqViBQCnLDMSBlm2YYTrDzDDr89z7gIHy3pTEWH/0kAeP++693z3L952rEMjwP5h68cUVAObD0Q9xKiBZAygU4v+eED3BlYvjaXWSRnxnp3ffvoeS9oiL7rEKeI42bPkLcPqjkxLpy5EaIEUrfm8bBHodQGRZfCoMwP5iQK8W1x7pFB1YPIieDnWoAshMlAEOR2ghLdiVA2QnRr1hp11835kNbDXShsuATQn0TSW+6+hv433RqHgpQqfNQDACSVMv/6c0FShPWz1JRVEoSkFMY4djEVi0aR/9MsvPV+JfWqzK1Cil88uMe6yiCalaceJazOMLYWTUhY5rdtid84hTK7ExS4/KYgOyKP5xtNE6StM+Cr1BK72HQhBEQk36xJwmqOUBff4wuvrt+PSbAVwbckJLZZu6TotgKEIH8ENDgDvrM/HKM0XI2ZAY8/CKtfI4QuV89mcrWk/0IC87Cc/vzsdD1SYCZ9UlYNo+j18uj+PrH0aQlqzF0TerUZwfozAYcDgiCINOQfAEBUkLBMPClxeHhW0vXBRaT/YK9tl5IUInYU/P0KzQZ3Hyd/JcuG6ZFV5qviQ829Qu9A+L41LGs8rE4eM+YGxO+nAjY26c+HYQW8uMeL2hCGlEbgVVjYc4c/x0H858Z0GAeKOm8mdeHnq1AuM2H9rODcEvwyelGEZSnaA85zqv2+GeC6Fxz2boEzRL42HKEgNnT3hBWVgVl+QlY+9TBfj96hQmpr3ywHeySx2TeKQ2A5s3Ja1lOpRKBZ54OAfhsADruEdyjnotG5n/voWXnyyEVqPiYe8ecPBxRqtxmxf+QBgX2kf5dxWBVhSnUYHFoSA3CUNWF7Y/kCENzHi8XifP42BIgFqtQIi09exPVnzx/TAfp7KBg2g0QmAMQElxVtNmB14sxnO7NnE+BwJheY+ZmLfUiN1EyowGHSaoWFj+mvaWUP7y+biLqvKtD64inYrt8Gv3I16r4nNSiU5u+nZj0os9j0rzeQmKibxSRt6qSw243G2Dk9qUjnibYUzgjyldx8ESSKhN6fELY0y5VLgx4cHEjBeFuXp5YIokOmxiR5Gyx+qzKLcu/PjbGC+YO5njlh9HP+shCU1DbmYMYC9R6fMhwOqW3qiEuLl7ew5OnjOjvWOCqxgzlsPSwhRSMj3PLdNA11wAp86b8WfvDBoez0NyUpzknjzHbAEVKOSc0ZOAH9xXhqkZH94+1onZxnLsqNvAdbp5fzmRlwqUxMM6PoczFyxoO2/hBZus13J+qyRyyLWaIoODV6hwyqX7MQsLK5qbkx589NUAfiVNzqYuVFu5noeSNYneQQd5aeMTn96xEV0kOjenfKTZVdhSYuDclgUup4uAUbcaWEtx2WYCsqhAQ1QQnX0z+KPHRp3KwduihtpiLnWjSgKorzJx/k4SC979pBvDo260HKjEgxXGFZ5zYB9R7Xgv3RpI3RQSlGLXm4YCoCw12thZCP3UJkOUHzbGeM46lYL9LMxhFGx67wrs5Flrcw2qlnm+1BZZRctpNbv6sD4tR7dYZiZheefDLi40LW9sQS15vgL4v7Qx4vThY10IhMI49X4d4nXquwPMjDGi3+JEHV0e2E3lrgEzY9quVNyW43vG/gFRE1M/WXQzogAAAABJRU5ErkJggg=='
            alt=''
          />
          <div className='title_form_map'>Tìm kiếm theo khu vực</div>
          <CloseCircleOutlined className='icon_close_form_map' />
        </div>
        <div className='form_place_angular'>
          
      
      <form
        // onSubmit={onSubmit}
        style={{ width: "220px" }}
        className="w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 form_place"
      >
        <div className="flex flex-col gap-5 form_search">
          <Select
            name="cityId"
            className="select_form_search"
            // key={`cityId_${selectedCity?.value}`}
            // isDisabled={cityOptions.length === 0}
            // options={cityOptions}
            // onChange={(option) => {
            //   onCitySelect(option);
            // }}
            // placeholder="Tỉnh/Thành"
            // defaultValue={selectedCity}
          />
  
          <Select
            name="districtId"
            className="select_form_search"
            // key={`districtId_${selectedDistrict?.value}`}
            // isDisabled={districtOptions.length === 0}
            // options={districtOptions}
            // onChange={(option) => {
            //   onDistrictSelect(option);
            // }}
            // placeholder="Quận/Huyện"
            // defaultValue={selectedDistrict}
          />
  
          <Select
            name="wardId"
            className="select_form_search"
            // key={`wardId_${selectedWard?.value}`}
            // isDisabled={wardOptions.length === 0}
            // options={wardOptions}
            // placeholder="Phường/Xã"
            // onChange={(option) => onWardSelect(option)}
            // defaultValue={selectedWard}
          />
          <Select
            name="projectId"
            className="select_form_search"
            // placeholder="Dự án"
            // options={projectOption}
            // onChange={setSelectedProject}
            // defaultValue={selectedProject}
          />
        </div>
  
        <div className="style_button_form">
        <button
          type="submit"
          className="w-full text-white rounded"
          style={{
            background: "#D1132A",
            outline: "none",
          }}
        >
          Tìm kiếm
        </button>
        </div>
      </form>
        </div>
      </div>
    );
  }
  
  export default LocationForm;
  