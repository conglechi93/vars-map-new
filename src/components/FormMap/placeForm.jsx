import Select from "react-select";
import './style.css'
import {CloseCircleOutlined} from '@ant-design/icons';

function PlaceForm() {
  return (
    <>
       <div style={{width: '100%'}}>
      <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
        <img
          className='icon_form_map'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQJSURBVHgBrVZPbNtUGP89J82SNrSdkCpWKtZJCFgHtNI4ICQYgoI2VWJF0xAcBgIkLhyAI0hcECfElTsXDoiJHrjw51DKYCMbaSljnUbbtYxkSerWbv41ie348fnZcRyc1inZT7L9/L33vd/7/tqME9ANSFtbWYL29XkYP/8IhCWwsQn0nnsD4QcfonkGJrEWFVmWwbolrl76CZWPPwSP9SE6eRImcehzs4AqI/reBzjw/CnQUXzE4F3AULe48tIUV86c5Po/6015LsNVkikvTHJD2fTpbWxscAldQF+cB9uU0TNxHOGRw648NHQPek48A1bKozb7Q1vdroh5JiOeLBTyz5XL9hwd7I4TozdGucWhUUy13+dtQrr0G0vQExctWrB4f1vVMLrB8Ihg4loFxfffQejRCYRiMSJNgJHMsovd/4A4DLuTxLFHJlAcOIjItgpeq4FfScDwkPD+uxAZe9hHCnTr6gNRxJ87RaXK2k6HnngSrC/edm5X4oquoqQrKNOzLMb2ZY2rRsFdF6Y6heQnNlkIkemzqHO97f5tXZ2vZfD5wmvkNo1OxkWMvHEa7j+Gl8c+ExJ2ZBTRqdOofjPTuvFTJ7A8uAoz9xfGD51GRxanin+gzjRrWyKUxDLmPJtjG9fl78DPToN7XMrjcUivvoIrqS+QKl9tR9GeeFmeEz12dzS7bFHfwm/mHHrOvS7eGU1FaLwgXcK2lsO6chGGWQ0m1us7SFeuIRg2OSemZPpL5CaPULynwCih1GePIpk9T7MmakS6pl4OJk6VrqKmFREM5mzAhJnf3/wUtbfOoP7um/j2709QdwuLU+gWfdq+5FrZukD3OvauNG8YuPgiVY1tzKx/JBxRMGRInlCtqQk8Pfp2S2607G5yA6nCIoLLu5Hn1p2JuFqHKWoyxVx23ptQa2lkSzdaZC0W52tZxCIDiEYGhTK3vWgTMMdOer+7dxQNq/t6DmI4fgzYKxdhJWEGh3DUfff9CHBhQ5C9rNkWXcle6+HRsH8EfDFmgbStxjGfZO/1DbjE+WoGC9kZe1HDz+64oW7bN9g7jPGhaSFby/+KW2qShs68V8+CGyMTo4OP4/DAY63EtwpJJHNfWb5HkAX3UsscH3pRjG8XljBPNcsRpMdR1hTcN3BcvLnpu6Jc8GXj7jDh7V7cc98dDKvKZejmTpPY+tqk6eT2iYNj/F9IgjT4C6vxMm4qCUeHcLtI3YoXOzh1e3SqxQTXnyIsgniZGjnj+7e0Sdy57srWL7BCJdW5Rr10wcnC/2cx24de2ciR1dcgbZSWUahknTLo9OSt6/bjLcs721S6bHNnbXZzZ9WWShyi43uWid8a0xk7hNHwgFuP2dJ1arVp7AdRbQT/AkAlFyAO4RBxAAAAAElFTkSuQmCC'
          alt=''
        />
        <div className='title_form_map'>Tìm kiếm theo tờ thửa</div>
        <CloseCircleOutlined className='icon_close_form_map' />
      </div>
      <div className='form_place_angular'>
        
      <form
        // onSubmit={onSubmit}
        style={{ width: "220px" }}
        className="w-11/12 mx-auto bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 form_place"
      >
        <div className="flex flex-col gap-5 form_search">
          <input
            className="input_tothua"
            name="soTo"
            // onChange={onChangeSoTo}
            // value={valueInputSoTo}
            placeholder="Nhập số tờ"
          />
          <input
            className="input_tothua"
            name="soThua"
            // onChange={onChangeSoThua}
            // value={valueInputSoThua}
            placeholder="Nhập số thửa"
          />
          <Select
            name="cityId"
            className="select_form_search"
            // key={`cityId_${selectedCity?.value}`}
            // isDisabled={cityOptions.length === 0}
            // options={cityOptions}
            // onChange={(option) => onCitySelect(option)}
            // placeholder="Tỉnh/Thành"
            // defaultValue={selectedCity}
          />

          <Select
            name="districtId"
            className="select_form_search"
            // key={`districtId_${selectedDistrict?.value}`}
            // isDisabled={districtOptions.length === 0}
            // options={districtOptions}
            // onChange={(option) => onDistrictSelect(option)}
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
      {/* <ValidateLandPlot /> */}
    </>
  );
}

export default PlaceForm;
