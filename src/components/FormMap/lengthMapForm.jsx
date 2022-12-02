import {CloseCircleOutlined} from '@ant-design/icons';

function LengthMapForm() {
  return (
    <div style={{width: '120%'}}>
      <div className='w-11/12 mx-auto mt-1 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3 header_form_map'>
        <img
          className='icon_form_map'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALHSURBVHgBjZRLTBNRFIb/Ni2xgghBNz4CKKJYlRhDJBETNGpicI1LZeHCiIkxMS4M0YWJCeqCuDBuRMWliTsWkgBKItoKhfIobSlFKUUJBVumL5j2eO/QKTOdseFPJpk599zvnnseYyAmZPRXFHF1zIH31lrsLihAPs0m4rjrdmGn2YQw21exzYKnB6sBymhlfZ0uDdmobzlEjT++kT8eIz1x+2O/V+PTE1qiNo+LoITJDv5YTBe6vLZGbdNuKu3/RB0/ZzWHXbANErKwWEwTSS6Uv5d/6aX2WR/dmHTSu2BAtafZMUTGjl9+XNuzFyVmsypHPCed1hNoGXdK+eJPy4QT/XX1EFIp1BWXwCmsomthXvLvDAZwtKgQBk6+PTWBAqMRz6tr0L8SQmNpmSr5HCRtYgfwg7iNRY8HlVXwxeNYXEtgu9GEjkOHYeSOL45YkUyncH7oO0pMZm1JaRPmjUcRZxGO1J9FIJnAHANORaO4XLYr46tQq2ucPq+EpCLp5dETE+j6+Gh2/U1wjs7YvtKHPwsUYTZRFAm5leIb7ntdGzD7JswRCWtg9zxT0nskY9MFct1ikTbYB7OVd6yGqdk5rILxKueKA416EzAhCOg6VosKiwUjQgRP/D68qjnO8mvC24UA7OEIgomk5KvNd27vKa/JImty2HWvyX2ahu2qPlVdeWswF2kCUBQtC8xd0IPJOeSz/j+oBNTAWDWbR9UF4EXizxV2CD8sVzJjWlgl1A4O0EwemJwzLt6n3UuL2XWl7rgn6dnMNKFyoI+1wBi5o0JemCxln35c/C3ZHvk87PGSmGJXPsdC5dcoH+ilZDqdF6aMtMG20acyTC6KgQN7T52W+u31fAAndxTDxWaznQ16PrWyH0o4JaLKUoiHB6okW4rNuAE93X3WoiL2acBSMomLbMh5U29FLwNzuLlvf/abRYh/y1dMMl0OPT0AAAAASUVORK5CYII='
          alt=''
        />
        <div className='title_form_map'>Đo chiều dài</div>
        <CloseCircleOutlined className='icon_close_form_map' />
      </div>
      <div className='form_place_angular'>
        <div className='are_form_map'>
          <label htmlFor=''>Đơn vị đo</label>
          <input/>
          {/* <select name='' id=''></select> */}
        </div>
        <div className='are_form_map'>
          <label htmlFor=''>Chiều dài</label>
          <div></div>km
        </div>
      </div>
    </div>
  );
}
export default LengthMapForm;
