import {CloseCircleOutlined} from '@ant-design/icons';

function TypeMap() {
  return (
    <div style={{width: '100%'}}>
      <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
        <img
          className='icon_form_map'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAXCAYAAAAYyi9XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK5SURBVHgBtdXLTxNRFAbwb6ZQWgSmNYolLioEpRESYYGhBlhoYlioiSs3bPAdJMaE6MK/wI1RBDQu3JmocenGha+IQDAQJKKgCxUJlfKyhdp2OtMZz22BljLtzET8kpsmNzPn13MfLadSYCJji2H0jPshWPPQXl2KipICw+9KkgTOKDi2GEH3+Cz6fCvrcxzH4ZhbQHvNLlQU68OGQNZRN3WUDmVmDb5EcHkOOCf4YRXqJ8jomjP4uNtBcCn2aMCaIIPufPRj4JdxKBvcQbA7Dd4AbgWkByfA0YU/ahdBg7MEbZW0WSZYwMWq7eB/hmKYofHfMBYqPs2csJxcUoY9mwqglw7JjxURW5m6nYW4XOOC11UEmZaUZ5PUceJYd3pKYAsHoMoS/jWKJKJEDKB9r4BDhHGr81xcUdSX3/y4NTCJiYXUXeNt22ApEsDl5cNMlJgIJRSgz+j6XF2ZE1caquDd7QB3s39S7R76mrUAbysk2KELa0Eb6tAyXvNWJvfw01wQtwe/4AV1ahZmgBIK5oSOVrrQ6fWg3GHfePGHpufR9rQPES5fF1aVeE6Ild1h5fHwVBM8O4Xkl1OUJBgSY3jwbgz3344iGBbB5VvBFzthsdlhNgxSxQjiy78Th6/MUYSOI/Vord9P3dKhufdmRO16NYzl8ObrYAbOhDLjIvh6ixf8idp9OEnDmmfZXESKIb7khzTvgxKNZIWUaBgyPSMvzWlixbYCtB6sxmGPO7WHvkAIPa+H8ej9Z8TkuGZx1rGFOuapY72OkpAVF5rr0NZ4AA57QWoP0x/yBVYIHsFjgsUcMPu50oNOEyTYU/8WmuBaZgju1YGNQobATPgJwdEsMIPON9XiDA0tyBSYDt9NdDxBsLwOnW2sxbnm3FAm+B0mMrUYxI3ng3Dabbja0gBnoc3wuwz8CytauEQ34dcVAAAAAElFTkSuQmCC'
          alt=''
        />
        <div className='title_form_map'>Nền bản đồ</div>
        <CloseCircleOutlined className='icon_close_form_map' />
      </div>
      <div className='form_place_angular'>
        <div>
            <h3>GoogleMap</h3>
            <div>
            <label className="label_ggmap">
                  <input
                    type="radio"
                    name="curentRadio"
                    value="googleMap"
                    // checked={currentMap === "googleMap"}
                    // onChange={onChangeRadio}
                    style={{ marginRight: "5px" }}
                    className="input_radio"
                  />
                 Nền giao thông
                </label>
                
            </div>
            <div>
            <label className="label_ggmap">
                  <input
                    type="radio"
                    name="curentRadio"
                    value="googleMap"
                    // checked={currentMap === "googleMap"}
                    // onChange={onChangeRadio}
                    style={{ marginRight: "5px" }}
                    className="input_radio"
                  />
                 Nền vệ tinh
                </label>
                
            </div>
        </div>
        <div>
            <h3>Khác</h3>
            <label className="label_ggmap">
                  <input
                    type="radio"
                    name="curentRadio"
                    value="googleMap"
                    // checked={currentMap === "googleMap"}
                    // onChange={onChangeRadio}
                    style={{ marginRight: "5px" }}
                    className="input_radio"
                  />
                 Nền giao thông
                </label>
        </div>
      </div>
    </div>
  );
}
export default TypeMap;