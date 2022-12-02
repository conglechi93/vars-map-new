import {CloseCircleOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCityAction,
  setDistrictAction,
} from '../../redux/actions/InfoProvice';
import {landPlotAction} from 'redux/actions/LandPlot';
import './style.css';
// import ValidateLandPlot from '../ValidateFormMap/ValidateFormLandPlot';
// import useMarkerLandPlot from '../Marker/markerLandPlot'

function PlaceForm(setIsOpen) {
  const dispatch = useDispatch();
  // const [isOpen,setIsOpen] = useState(false)
  // var map = window.map;

  const cityOption = useSelector((state) => state.provice);

  const districtOption = useSelector((state) => state.district);

  // const landPlot = useSelector((state) => state.landPlot);

  const wardOption = useSelector((state) => state.ward);
  const [valueInputSoTo, setValueInputSoTo] = useState(null);

  const [valueInputSoThua, setValueInputSoThua] = useState(null);

  const [valueCity, setValueCity] = useState(null);

  const [valueDistrict, setValueDistrict] = useState(null);

  const [valueWard, setValueWard] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpenToThua, setIsModalOpenToThua] = useState(false);
  const [isModalOpenAll, setIsModalOpenAll] = useState(false);

  useEffect(() => {
    dispatch(setCityAction(valueCity));
  }, [valueCity]);

  useEffect(() => {
    dispatch(setDistrictAction(valueDistrict));
  }, [valueDistrict]);

  //handle so to
  const onChangeSoTo = (e) => {
    e.preventDefault();
    const handle = e.target.value;
    setValueInputSoTo(handle);
  };
  //handle so thua
  const onChangeSoThua = (e) => {
    e.preventDefault();
    const handle = e.target.value;
    setValueInputSoThua(handle);
  };

  const onChangeSelectCity = (e) => {
    setValueCity(e.target.value);
  };
  const onChangeSelectDistrict = (e) => {
    setValueDistrict(e.target.value);
  };
  const onChangeSelectWard = (e) => {
    setValueWard(e.target.value);
  };
  const ValidateLandPlot = () => {
    return (
      <>
        {isModalOpen && (
          <div className="popup-box">
            <div className="box">
              <label className="lable_nottyfication">Thông báo</label>
              <h3 className="validate_provice">
                Không được bỏ trống tên tỉnh thành,quận huyện,phường xã.
              </h3>
              <button
                className="btn_validate_provice"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                OK
              </button>
            </div>
          </div>
        )}
        {isModalOpenToThua && (
          <div className="popup-box">
            <div className="box">
              <label className="lable_nottyfication">Thông báo</label>
              <h3 className="validate_provice">
                Không được bỏ trống số tờ, số thửa.
              </h3>
              <button
                className="btn_validate_provice"
                onClick={() => setIsModalOpenToThua(!isModalOpenToThua)}
              >
                OK
              </button>
            </div>
          </div>
        )}
        {isModalOpenAll && (
          <div className="popup-box">
            <div className="box">
              <label className="lable_nottyfication">Thông báo</label>
              <h3 className="validate_provice">
                Không được bỏ trống các trường tìm kiếm.
              </h3>
              <button
                className="btn_validate_provice"
                onClick={() => setIsModalOpenAll(!isModalOpenAll)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  // const polygonLandPlot = () => {
  //   console.log(
  //     '🚀 ~ file: placeForm.jsx ~ line 20 ~ PlaceForm ~ landPlot',
  //     landPlot,
  //   );
  //   const polygon = landPlot.coordinates.map((item) => {
  //     const data = item.map((location) => {
  //       return {
  //         lat: location[0],
  //         lng: location[1],
  //       };
  //     });
  //     map.setCenter({lat: item[0][0], lng: item[0][1]});
  //     return data;
  //   });
  //   window.bermuda = new google.maps.Polygon({
  //     paths: polygon,
  //     strokeColor: 'blue',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#3e32a8',
  //     fillOpacity: 0.2,
  //   });

  //   window.bermuda.setMap(map);

  //   map.setZoom(20);

  //   return;
  // };

  //handle submit Form
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !valueCity &&
      !valueDistrict &&
      !valueWard &&
      !valueInputSoThua &&
      !valueInputSoTo
    ) {
      setIsModalOpenAll(true);
      return;
    }
    if (!valueInputSoThua || !valueInputSoTo) {
      setIsModalOpenToThua(true);
      return;
    }

    if (!valueCity || !valueDistrict || !valueWard) {
      setIsModalOpen(true);
      return;
    }
    dispatch(
      landPlotAction({
        valueInputSoTo,
        valueInputSoThua,
        valueCity,
        valueDistrict,
        valueWard,
      }),
    );

    // polygonLandPlot();
  };
  return (
    <div>
      {
        <div style={{width: '100%'}}>
          {
            // !isOpen ?
            <>
              <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
                <img
                  className='icon_form_map'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQJSURBVHgBrVZPbNtUGP89J82SNrSdkCpWKtZJCFgHtNI4ICQYgoI2VWJF0xAcBgIkLhyAI0hcECfElTsXDoiJHrjw51DKYCMbaSljnUbbtYxkSerWbv41ie348fnZcRyc1inZT7L9/L33vd/7/tqME9ANSFtbWYL29XkYP/8IhCWwsQn0nnsD4QcfonkGJrEWFVmWwbolrl76CZWPPwSP9SE6eRImcehzs4AqI/reBzjw/CnQUXzE4F3AULe48tIUV86c5Po/6015LsNVkikvTHJD2fTpbWxscAldQF+cB9uU0TNxHOGRw648NHQPek48A1bKozb7Q1vdroh5JiOeLBTyz5XL9hwd7I4TozdGucWhUUy13+dtQrr0G0vQExctWrB4f1vVMLrB8Ihg4loFxfffQejRCYRiMSJNgJHMsovd/4A4DLuTxLFHJlAcOIjItgpeq4FfScDwkPD+uxAZe9hHCnTr6gNRxJ87RaXK2k6HnngSrC/edm5X4oquoqQrKNOzLMb2ZY2rRsFdF6Y6heQnNlkIkemzqHO97f5tXZ2vZfD5wmvkNo1OxkWMvHEa7j+Gl8c+ExJ2ZBTRqdOofjPTuvFTJ7A8uAoz9xfGD51GRxanin+gzjRrWyKUxDLmPJtjG9fl78DPToN7XMrjcUivvoIrqS+QKl9tR9GeeFmeEz12dzS7bFHfwm/mHHrOvS7eGU1FaLwgXcK2lsO6chGGWQ0m1us7SFeuIRg2OSemZPpL5CaPULynwCih1GePIpk9T7MmakS6pl4OJk6VrqKmFREM5mzAhJnf3/wUtbfOoP7um/j2709QdwuLU+gWfdq+5FrZukD3OvauNG8YuPgiVY1tzKx/JBxRMGRInlCtqQk8Pfp2S2607G5yA6nCIoLLu5Hn1p2JuFqHKWoyxVx23ptQa2lkSzdaZC0W52tZxCIDiEYGhTK3vWgTMMdOer+7dxQNq/t6DmI4fgzYKxdhJWEGh3DUfff9CHBhQ5C9rNkWXcle6+HRsH8EfDFmgbStxjGfZO/1DbjE+WoGC9kZe1HDz+64oW7bN9g7jPGhaSFby/+KW2qShs68V8+CGyMTo4OP4/DAY63EtwpJJHNfWb5HkAX3UsscH3pRjG8XljBPNcsRpMdR1hTcN3BcvLnpu6Jc8GXj7jDh7V7cc98dDKvKZejmTpPY+tqk6eT2iYNj/F9IgjT4C6vxMm4qCUeHcLtI3YoXOzh1e3SqxQTXnyIsgniZGjnj+7e0Sdy57srWL7BCJdW5Rr10wcnC/2cx24de2ciR1dcgbZSWUahknTLo9OSt6/bjLcs721S6bHNnbXZzZ9WWShyi43uWid8a0xk7hNHwgFuP2dJ1arVp7AdRbQT/AkAlFyAO4RBxAAAAAElFTkSuQmCC'
                  alt=''
                />
                <div className='title_form_map'>Tìm kiếm theo tờ thửa</div>
                <CloseCircleOutlined
                  className='icon_close_form_map'
                  onClick={() => setIsOpen(true)}
                />
              </div>

              <div className='form_place_angular'>
                <form
                  onSubmit={onSubmit}
                  style={{width: '220px'}}
                  className='w-11/12 mx-auto bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 form_place'>
                  <div className='flex flex-col gap-5 form_search'>
                    <input
                      className='input_tothua'
                      name='soTo'
                      onChange={onChangeSoTo}
                      value={valueInputSoTo}
                      placeholder='Nhập số tờ'
                    />
                    <input
                      className='input_tothua'
                      name='soThua'
                      onChange={onChangeSoThua}
                      value={valueInputSoThua}
                      placeholder='Nhập số thửa'
                    />
                    <select
                      className='input_tothua_select'
                      onChange={onChangeSelectCity}>
                      <option>Tỉnh/Thành</option>
                      {cityOption.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className='input_tothua_select'
                      onChange={onChangeSelectDistrict}>
                      <option>Quận/Huyện</option>

                      {valueCity != null &&
                        districtOption != null &&
                        districtOption.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    <select
                      className='input_tothua_select'
                      onChange={onChangeSelectWard}>
                      <option>Phường/Xã</option>
                      {valueCity != null &&
                        valueDistrict != null &&
                        wardOption != null &&
                        wardOption.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
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
            </>
            // :''
          }
        </div>
      }
      <ValidateLandPlot/>
    </div>
  );
}

export default PlaceForm;
