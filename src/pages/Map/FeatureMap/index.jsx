import MapPage from '../GoogleMapPage';
import './style.css';
import logo from './logo.svg';
import {SearchOutlined} from '@ant-design/icons';
import {Slider, Dropdown} from 'antd';
import PlaceForm from 'components/FormMap/placeForm';
import LocationForm from 'components/FormMap/locationForm';
import AngularForm from 'components/FormMap/angularForm';
import AreForm from 'components/FormMap/areForm';
import LengthMapForm from 'components/FormMap/lengthMapForm';
import CoordinantesForm from 'components/FormMap/coordinatesForm';
import TypeMap from 'components/FormMap/typeMap';
import LayerMap from 'components/FormMap/layerMap';
import {useDispatch,useSelector} from 'react-redux';
import {cityAction,districtAction,wardAction} from 'redux/actions/ProviceAction';
import {useEffect} from 'react';

const HeaderMap = () => {
  const dispatch = useDispatch();
   const cityID = useSelector((state)=> state.proviceSelect)
   const districtID= useSelector((state)=> state.districtSelect)

  useEffect(() => {
    dispatch(cityAction());
  }, []);
  useEffect(() => {
    dispatch(districtAction({cityID}))
  }, [cityID]);
  useEffect(() => {
    dispatch(wardAction({cityID,districtID}))
  }, [districtID]);

  const placeForm = () => {
    return <PlaceForm className='drop_tothua'></PlaceForm>;
  };
  const locationForm = () => {
    return <LocationForm className='drop_tothua'></LocationForm>;
  };
  const angularForm = () => {
    return <AngularForm className='drop_tothua'></AngularForm>;
  };
  const areForm = () => {
    return <AreForm></AreForm>;
  };
  const lengthMapForm = () => {
    return <LengthMapForm />;
  };
  const coordinantesForm = () => {
    return <CoordinantesForm />;
  };
  const typeMap = () => {
    return <TypeMap />;
  };
  const layerMap = () => {
    return <LayerMap />;
  };

  const TypeIcon = [
    {
      id: 1,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUPSURBVHgB5VZpTFxVFP5mYwYYyjJMh7K1LJU1QoEqKZhUY20Tq6YuCW4taUzUpJI0BtOkiWKjSUP80cYlMbU0ti7RtE2qNcYlpPqjqViBQCnLDMSBlm2YYTrDzDDr89z7gIHy3pTEWH/0kAeP++693z3L952rEMjwP5h68cUVAObD0Q9xKiBZAygU4v+eED3BlYvjaXWSRnxnp3ffvoeS9oiL7rEKeI42bPkLcPqjkxLpy5EaIEUrfm8bBHodQGRZfCoMwP5iQK8W1x7pFB1YPIieDnWoAshMlAEOR2ghLdiVA2QnRr1hp11835kNbDXShsuATQn0TSW+6+hv433RqHgpQqfNQDACSVMv/6c0FShPWz1JRVEoSkFMY4djEVi0aR/9MsvPV+JfWqzK1Cil88uMe6yiCalaceJazOMLYWTUhY5rdtid84hTK7ExS4/KYgOyKP5xtNE6StM+Cr1BK72HQhBEQk36xJwmqOUBff4wuvrt+PSbAVwbckJLZZu6TotgKEIH8ENDgDvrM/HKM0XI2ZAY8/CKtfI4QuV89mcrWk/0IC87Cc/vzsdD1SYCZ9UlYNo+j18uj+PrH0aQlqzF0TerUZwfozAYcDgiCINOQfAEBUkLBMPClxeHhW0vXBRaT/YK9tl5IUInYU/P0KzQZ3Hyd/JcuG6ZFV5qviQ829Qu9A+L41LGs8rE4eM+YGxO+nAjY26c+HYQW8uMeL2hCGlEbgVVjYc4c/x0H858Z0GAeKOm8mdeHnq1AuM2H9rODcEvwyelGEZSnaA85zqv2+GeC6Fxz2boEzRL42HKEgNnT3hBWVgVl+QlY+9TBfj96hQmpr3ywHeySx2TeKQ2A5s3Ja1lOpRKBZ54OAfhsADruEdyjnotG5n/voWXnyyEVqPiYe8ecPBxRqtxmxf+QBgX2kf5dxWBVhSnUYHFoSA3CUNWF7Y/kCENzHi8XifP42BIgFqtQIi09exPVnzx/TAfp7KBg2g0QmAMQElxVtNmB14sxnO7NnE+BwJheY+ZmLfUiN1EyowGHSaoWFj+mvaWUP7y+biLqvKtD64inYrt8Gv3I16r4nNSiU5u+nZj0os9j0rzeQmKibxSRt6qSw243G2Dk9qUjnibYUzgjyldx8ESSKhN6fELY0y5VLgx4cHEjBeFuXp5YIokOmxiR5Gyx+qzKLcu/PjbGC+YO5njlh9HP+shCU1DbmYMYC9R6fMhwOqW3qiEuLl7ew5OnjOjvWOCqxgzlsPSwhRSMj3PLdNA11wAp86b8WfvDBoez0NyUpzknjzHbAEVKOSc0ZOAH9xXhqkZH94+1onZxnLsqNvAdbp5fzmRlwqUxMM6PoczFyxoO2/hBZus13J+qyRyyLWaIoODV6hwyqX7MQsLK5qbkx589NUAfiVNzqYuVFu5noeSNYneQQd5aeMTn96xEV0kOjenfKTZVdhSYuDclgUup4uAUbcaWEtx2WYCsqhAQ1QQnX0z+KPHRp3KwduihtpiLnWjSgKorzJx/k4SC979pBvDo260HKjEgxXGFZ5zYB9R7Xgv3RpI3RQSlGLXm4YCoCw12thZCP3UJkOUHzbGeM46lYL9LMxhFGx67wrs5Flrcw2qlnm+1BZZRctpNbv6sD4tR7dYZiZheefDLi40LW9sQS15vgL4v7Qx4vThY10IhMI49X4d4nXquwPMjDGi3+JEHV0e2E3lrgEzY9quVNyW43vG/gFRE1M/WXQzogAAAABJRU5ErkJggg==',
      type: 'khuvuc',
      component: locationForm,
    },
    {
      id: 2,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQJSURBVHgBrVZPbNtUGP89J82SNrSdkCpWKtZJCFgHtNI4ICQYgoI2VWJF0xAcBgIkLhyAI0hcECfElTsXDoiJHrjw51DKYCMbaSljnUbbtYxkSerWbv41ie348fnZcRyc1inZT7L9/L33vd/7/tqME9ANSFtbWYL29XkYP/8IhCWwsQn0nnsD4QcfonkGJrEWFVmWwbolrl76CZWPPwSP9SE6eRImcehzs4AqI/reBzjw/CnQUXzE4F3AULe48tIUV86c5Po/6015LsNVkikvTHJD2fTpbWxscAldQF+cB9uU0TNxHOGRw648NHQPek48A1bKozb7Q1vdroh5JiOeLBTyz5XL9hwd7I4TozdGucWhUUy13+dtQrr0G0vQExctWrB4f1vVMLrB8Ihg4loFxfffQejRCYRiMSJNgJHMsovd/4A4DLuTxLFHJlAcOIjItgpeq4FfScDwkPD+uxAZe9hHCnTr6gNRxJ87RaXK2k6HnngSrC/edm5X4oquoqQrKNOzLMb2ZY2rRsFdF6Y6heQnNlkIkemzqHO97f5tXZ2vZfD5wmvkNo1OxkWMvHEa7j+Gl8c+ExJ2ZBTRqdOofjPTuvFTJ7A8uAoz9xfGD51GRxanin+gzjRrWyKUxDLmPJtjG9fl78DPToN7XMrjcUivvoIrqS+QKl9tR9GeeFmeEz12dzS7bFHfwm/mHHrOvS7eGU1FaLwgXcK2lsO6chGGWQ0m1us7SFeuIRg2OSemZPpL5CaPULynwCih1GePIpk9T7MmakS6pl4OJk6VrqKmFREM5mzAhJnf3/wUtbfOoP7um/j2709QdwuLU+gWfdq+5FrZukD3OvauNG8YuPgiVY1tzKx/JBxRMGRInlCtqQk8Pfp2S2607G5yA6nCIoLLu5Hn1p2JuFqHKWoyxVx23ptQa2lkSzdaZC0W52tZxCIDiEYGhTK3vWgTMMdOer+7dxQNq/t6DmI4fgzYKxdhJWEGh3DUfff9CHBhQ5C9rNkWXcle6+HRsH8EfDFmgbStxjGfZO/1DbjE+WoGC9kZe1HDz+64oW7bN9g7jPGhaSFby/+KW2qShs68V8+CGyMTo4OP4/DAY63EtwpJJHNfWb5HkAX3UsscH3pRjG8XljBPNcsRpMdR1hTcN3BcvLnpu6Jc8GXj7jDh7V7cc98dDKvKZejmTpPY+tqk6eT2iYNj/F9IgjT4C6vxMm4qCUeHcLtI3YoXOzh1e3SqxQTXnyIsgniZGjnj+7e0Sdy57srWL7BCJdW5Rr10wcnC/2cx24de2ciR1dcgbZSWUahknTLo9OSt6/bjLcs721S6bHNnbXZzZ9WWShyi43uWid8a0xk7hNHwgFuP2dJ1arVp7AdRbQT/AkAlFyAO4RBxAAAAAElFTkSuQmCC',
      type: 'timtothua',
      component: placeForm,
    },
    {
      id: 3,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVFSURBVHgBxVZpbFRVFP5m6TKdKW3ptFRKaQptEcsibhiDWDVoQhRFo9EEExMVEyGaYKKYaFRwiZDgH0kUMVFrgIYIakAsaoKWShtaSmlLW7pOO12dtrN3pjPzrudc6es2046tCV8yybz37nvnnnu+851PIwiIArzMPRqC2xfEoGcUHn8QGo0Gpjg9Uo2xSEqIQbxei2ihn21BiALWWh34tXEA1mEvXBQ4JSEWxng9hCLg8AbgCykwxuqwMiMR9yw3o2DxAmhm+a5mpowb+lz44s82BBUFhXnpuC07GUtSDIjVTc6Ms++kTdX3OPFX25DM/OWNy5C9MAERIcIgGFJE8cVOseVgmSip7xMef0BEC6cvII5XWcWj9O75ZptQFCXsummBvaNBsa+kSew4Vi3s3lExV/Q5RsRLRVXicFm7CISUmQPz7g78dk3sOl4jXL6AmkGv3aeuCdGaogqLGKZNnai2Crc/GDE4lUA8/81F8W25ZdqzScUqbRlEq82Djx5fJdnK2H/2Gg783iRJxtASk3VEnY9/aYKXWM6kioQEevbJ1tUoqe9HRcdQ+Bp320dkXfqd49nVWO2i4P2zYtWes+JCq029z6fxxola0UPvRIPGPqd46lC5cI4Epmf89YUObL01E+mJcfJ6NKhg788NoOqASoQPzjRiwOWXz3RaDdJNsUiMn7UbJVYsSsTaJQtQXGlV78nAbXS8PQ4ftqy9SX1w4nI3Gnpd6jWv+aqsA3zihhgdXt+Ur5YjGmxbn42yVhuIE+OBa7uduHmRSSoQw0O1K7naj6ULDTIIIzs1AdVdw+iyezEXLE6KRxb1dWXnsLzW81HW9TiwMc+sLorRabCPSMF02n2yFs0Dbhzedjvd1yLJEIO5gN9dRYpWQypYmJcG/UggBJvbTzsyqItYmdKu1zqWVIhfSjPFyf/zQV66CVWWYVJCAS2TiH8pxrllMhXMgd0n61DWNojPS9vUNmSYqZQ+GS8ELTOWjztON79sxkBtTkTKwts/1qMwPw06zfi40FMMkizajNQDjaylEtVwjA5Xuh1yUllsk4nISbIAcYparidfuEeD+D8QoHT67H58+FgBLDSxghMycvgCiNFqiSs6aA0kaywEpEKYD5itpS02MP92bcqTM3v7hhy6Hj/qfhIgblnuGi0/yDWb5IvzQfOACzuOVmPP6QZYBsP3ek2XnRQsSf6X0nNnTgqKKjrhIlVJjKBG3Ph8TJHQ8rdHHmtxlRV/NNvwyn3LsGXNYrUFvdS2LFRPrsscD7wmMxmKYsFl2tG9ueZpH+1z+vBiURWiBa9/99RVSbJ3Nt8ij/bUlV5kkXthB8NQrc95GokHz7XiyAt3YUIHoJ00mn3WbDhd1ytPbQzPrV+K1x7Ik6PRT7379Jfl2P/EauTTwFAzZmzITUV5+yA+O9eCnYXLpYNk5JiNiAbVXQ6pcOuykvHWwyuwIuPfAEE52RrwzB1L1KASE+cmz9kdRy+JI+S3InmlSDhT3yu+v2SVDmUM/P9QaZvYSTYqNOV70zxXL3mlZw+Xi+LKLmn6osXUD/uDIfEp2ajt31WRd5tuFsPa2wE3keOnBjko3nwoH8b/MHcZQ2T491Jbmen9V+/PDWsYIvpqljc2A0yYzQUZsg1SyXVoNeGtOhOI7BN+qOnBuaYB4kkuHlyZPkmrowo8BuvwCI5VdtHMdkpblE+jLZNagvudxd4+EoB1yCsdiodk9+6cVDyyOgNmU9xMn5098BgcFKCVRKLV5pY2yX29xdj+ZCYbiMUm5Cw0whSlD+PA7+EG4B9ytoABaRnwuQAAAABJRU5ErkJggg==',
      type: 'timgocranh',
      component: angularForm,
    },
    {
      id: 4,
      src: 'data:image/png;base64,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',
      type: 'dodientich',
      component: areForm,
    },
    {
      id: 5,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALHSURBVHgBjZRLTBNRFIb/Ni2xgghBNz4CKKJYlRhDJBETNGpicI1LZeHCiIkxMS4M0YWJCeqCuDBuRMWliTsWkgBKItoKhfIobSlFKUUJBVumL5j2eO/QKTOdseFPJpk599zvnnseYyAmZPRXFHF1zIH31lrsLihAPs0m4rjrdmGn2YQw21exzYKnB6sBymhlfZ0uDdmobzlEjT++kT8eIz1x+2O/V+PTE1qiNo+LoITJDv5YTBe6vLZGbdNuKu3/RB0/ZzWHXbANErKwWEwTSS6Uv5d/6aX2WR/dmHTSu2BAtafZMUTGjl9+XNuzFyVmsypHPCed1hNoGXdK+eJPy4QT/XX1EFIp1BWXwCmsomthXvLvDAZwtKgQBk6+PTWBAqMRz6tr0L8SQmNpmSr5HCRtYgfwg7iNRY8HlVXwxeNYXEtgu9GEjkOHYeSOL45YkUyncH7oO0pMZm1JaRPmjUcRZxGO1J9FIJnAHANORaO4XLYr46tQq2ucPq+EpCLp5dETE+j6+Gh2/U1wjs7YvtKHPwsUYTZRFAm5leIb7ntdGzD7JswRCWtg9zxT0nskY9MFct1ikTbYB7OVd6yGqdk5rILxKueKA416EzAhCOg6VosKiwUjQgRP/D68qjnO8mvC24UA7OEIgomk5KvNd27vKa/JImty2HWvyX2ahu2qPlVdeWswF2kCUBQtC8xd0IPJOeSz/j+oBNTAWDWbR9UF4EXizxV2CD8sVzJjWlgl1A4O0EwemJwzLt6n3UuL2XWl7rgn6dnMNKFyoI+1wBi5o0JemCxln35c/C3ZHvk87PGSmGJXPsdC5dcoH+ilZDqdF6aMtMG20acyTC6KgQN7T52W+u31fAAndxTDxWaznQ16PrWyH0o4JaLKUoiHB6okW4rNuAE93X3WoiL2acBSMomLbMh5U29FLwNzuLlvf/abRYh/y1dMMl0OPT0AAAAASUVORK5CYII=',
      type: 'dokhoangcach',
      component: lengthMapForm,
    },
    {
      id: 6,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAXtSURBVHgBjVZrbFNlGH7anq5ru3Wlu99hMNwKGHADjEgUA4iZICZeMIiRYJb4VySSKD9A/yjRqJsGiRnT8IObF0DEEOJAB9sYY8sGjF0o21hZt27rbb235/P9TrfZ2m7xTd+ec77vO+/3Xp73+Y6MkWAO4RNTIRGOUBhhEVDIgRSFAmlKOWSYV+qFRKNB2qtpwoMLFieGfUHIZDKILLKVQPdZSQpszErB+owUaPluCSTO8IOpAL7qG4NHFLGj0IBVC9TQCwoyHonAHgyj2+nDRdq07v4E9pfn4AlaEx9ulHTbveyFhl52ZczFwqLI5hM+f3PCzV79u59demT/7/SxWY/7yYt9bUP47smFKNQkSd4NewI4fn8czWNuWP1B6JQKVKZrsXNxBh5LS0aFQYOja4pR3TQAjVyOddmpsw7LuPkgJfDdaya8XpKOTfl6hCjHx/usOHRrGPZAOC7KNMpxdVk23luRB5VChrt2Dw62mXHsmcXQCFLO66X/JosLeSolNualgWPkm64R7L8+AJc3BEWYxekUjX/ZbsZHLQNSUY16DVana3BxcHJ2c8lwo9mODXk6qfp9Dg9qyFM5QUwZjmgardq7Ihe55OnMmIL01L1RnDWNS4aqjTk42WP917CP49QbRGlapLJHOx4h4AtBCDFJVy7Qomb9YjBad2RDKTYX6GfnWEDE6e5RhClMHW2qJeTY/aEI3LjhgD+MTLVSGmh5aCdvRMjlMux+PA/bSjPx/uVe9Nk8ON8zhn1ri7EuV4dvb1L+CeP3rW4MOnwo0auRqRIwSU7q6SonUNGfCEER6SW7yw+B8phCvbUqU4vLhAo3LS6jiARK6J+mCSyjKDTcK55vQo7TF/EyiTQc6SQIAnmmotx6gyJSKBxuMMSjIP21ywIjQeggVdtPzyUEryMtQ7g+MIFJ8pJjVS0XqBsjefVQUTXTnShXEzy0hEErecqlnF4WKBVcKRzIKaIw3X/R0A8vQY9HJ6PxmTWFWiWytUnSuxMuHwzT93Il7VBMYG+n3HLZWp5FVWdSmGFq302U4xU5qfhgwxIUUh53VRQgFBSlea6rCaIZWhVM1iks0qmhjuA4whVPLTTgB+qequU52GLMxi9tw+geceLukA0f/tQZw2Q8gxxF3Ns8fTLeWlMo8cjPt8x4cVl2LI4XUZFSiWjaB2xQU9t+sn05Sg1aMEKLZdyNkSjlz153ALnU9geqjChYoMEAIcNCqKko0sca5h69trYIZ8hrO71URHmu2VWBVyoLUDSNBg5BrulqAS+tzEctzVdSpDzvP17tx5vEMbzBYrhi5uESNUeHaRJ7ty8jUo8sGuJe2rzShppkAcUZWuTyAtM8h9b5Gw/hJoLaSciJkvoY2hSJCmvP3Wa/NQ+y/yOtvVZ2+Ewnc7gDcbQZQ/88lD3Pl6H5tgWdROLzyTBR6anL/dizeSl0GmX8gkSejNk87ND3LWyCiD+RuH1BduBIE+sZsrE5JNZjnrNOYqjf/zJheNiBw3WtCARj+Zg/Hz3VCbPZiSvNg2i7MwpfAs6WRTYAmjvMOHmhG8YlmXi6Mh9LqeJXqTD9gzZU71iJmYJfvGLCOBH7G1uNGHrkQjPxcmvnCJ4lVG3buGQGGfXgR9u5S72s7kQHszniQ+fjDY0D0v3te2Ps09przOnyxazx+UPs7B89rLauVQIATwUsoy72eU0jCwTCCZPlcPrY4a8b2a0OM/v4swZmpQN0LjlBCOm6Y4nkmFFeVURCCkXiTxBdqgq7d67C6dNdeLmqHBkGDeYSTlpsmjZlxFzswvluOO1ebKkqg4HOrugOikLPnONOpx9tVA8TQfTtd1YTFyvqpeKJxFI3mgbRTpP5BWkoWZqBdPrK0RvUSKaTJdoeL3QgEMIU8fEYHcL9veMYpWtRiQHPbSqFQFzDixfT0l5PEIMPJvGg1wqX3Sc9h4L8dJBJfCJ5zH/UzkoyoElNQjF9MpQas5CqS44OJNZwtEinCB2MnHs50Yuc9KOMqigSQUj83cYN/wNqDh/BXwWYeAAAAABJRU5ErkJggg==',
      type: 'todovitri',
      component: coordinantesForm,
    },
    {
      id: 7,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAXCAYAAAAYyi9XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK5SURBVHgBtdXLTxNRFAbwb6ZQWgSmNYolLioEpRESYYGhBlhoYlioiSs3bPAdJMaE6MK/wI1RBDQu3JmocenGha+IQDAQJKKgCxUJlfKyhdp2OtMZz22BljLtzET8kpsmNzPn13MfLadSYCJji2H0jPshWPPQXl2KipICw+9KkgTOKDi2GEH3+Cz6fCvrcxzH4ZhbQHvNLlQU68OGQNZRN3WUDmVmDb5EcHkOOCf4YRXqJ8jomjP4uNtBcCn2aMCaIIPufPRj4JdxKBvcQbA7Dd4AbgWkByfA0YU/ahdBg7MEbZW0WSZYwMWq7eB/hmKYofHfMBYqPs2csJxcUoY9mwqglw7JjxURW5m6nYW4XOOC11UEmZaUZ5PUceJYd3pKYAsHoMoS/jWKJKJEDKB9r4BDhHGr81xcUdSX3/y4NTCJiYXUXeNt22ApEsDl5cNMlJgIJRSgz+j6XF2ZE1caquDd7QB3s39S7R76mrUAbysk2KELa0Eb6tAyXvNWJvfw01wQtwe/4AV1ahZmgBIK5oSOVrrQ6fWg3GHfePGHpufR9rQPES5fF1aVeE6Ild1h5fHwVBM8O4Xkl1OUJBgSY3jwbgz3344iGBbB5VvBFzthsdlhNgxSxQjiy78Th6/MUYSOI/Vord9P3dKhufdmRO16NYzl8ObrYAbOhDLjIvh6ixf8idp9OEnDmmfZXESKIb7khzTvgxKNZIWUaBgyPSMvzWlixbYCtB6sxmGPO7WHvkAIPa+H8ej9Z8TkuGZx1rGFOuapY72OkpAVF5rr0NZ4AA57QWoP0x/yBVYIHsFjgsUcMPu50oNOEyTYU/8WmuBaZgju1YGNQobATPgJwdEsMIPON9XiDA0tyBSYDt9NdDxBsLwOnW2sxbnm3FAm+B0mMrUYxI3ng3Dabbja0gBnoc3wuwz8CytauEQ34dcVAAAAAElFTkSuQmCC',
      type: 'nenbando',
      component: typeMap,
    },
    {
      id: 8,
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAZCAYAAADaILXQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU4SURBVHgBlVZrUFRlGH7O2cVluawQ1zVCSUEEQ1BEBzLEGEVFykobRS1DbBrzj7/8UU3N1ExW0zQ16IwFWWqSU4oKCSgQiuYF8cYKKiiEIgjKuiy7h7N7ztd7ziFGCgXeM9/sub7f8zzf+z7fcowCowhZkmG192G8rzd4jgNHY6TQP+2hMq8yOrt6kPfjIdQ3dSIxNhwbsjMQHOgPLb82yXCTcU9D7hAEFP1xGkWVdUhdnglzZARar13HX0eOY2lqHFZkJsNoNI4tOWMy2tq78MGXexH2QhwS5idDrx8gSUkkt4RLNWfwd91F5KxcgJSkGPA8T4/4IZMMJGeQZTUtbL1O2DkPWHol2BwMOg+9Sl957b/oHDYbKg+Xwluw4f31WYiMmKBOMCS5TJn7nA7k7ylDY7sVL69ZAb3BqGTESEGrgs7mVlyoOoHEKWasen0+fL2MKhDO7Xaxsqo6FB6pQWTyHETGTYfBy4gxBRHqdwq4XnsJN8/VYu0rLyE9NR761rb7yNtdiszcbISEhY2qxIaBD4OnJ6YnJyEiOgpffJWH2GmTwE8KD0V21jxcKC5D09VGuEXXmPJiEIyMm5ctKN61BzlvLEBQgC840ltd0+4HVnyXfwgPZQPi0+YhwByi0h2ZB33b3oGakuOIDvLB26vSETLQA3ptzRhcbhm8Tg8f0YnagwfhHxWF2LlJ8DH5qLT/n5JBcDhQW1kD1tUBs4GHRCUsCKL6jFMOQRTY4dKzKCk/iw2rFyEpMUYpIewrOoFjZyxISE9DRGyU9rrChHHqx82WBlwsr0D6nBisWPYiDAYDztU1YufPZchcPBuvLU4Bd7vlLtv84U5s3/YeJgQHUDMoQmi1eq+zG9/vLcMtq4DUrCXwDw7Eo4c9qD5QjCkB3ngneyFCSQKNGvUK/dzr6EbOlm+w/fNN4CRJYlWnLuEHqvFVy1OxMC0BhnGeqtYy0VTgnidEBYXHIBrHQ+e04t3VSzBj+iTodXqtuoip6HKh4lQ9fi2qRO7aDMyNjwbnEvuZm5qo8uQVVNZcIXp6rKQ6jZ0aTu6ntbOy4I9sfahvaEZCfBS8qOx49T4BoG/rG1uw9/cKqjSZ/EjEJ1vXIvAZE7iS4+dYj7UHK7PSSBLgakMLDhSfpgQeWJ+9GIEBpsFq40iuf61Iuddx/yH2H65G250u5K5ZhskRoai/fhshQf40/KB7bvLsj2clRCM8LJjQ6BBKuqfMmQaH04X8X47Cbnci6vln4aHzGJAAEN1uHK2oJbR/YtaMqchZs4gs2KQyDQ70Q/Otu/AzeYNrbe9m3+7Yj00bXkWYOQg6PUnBNJwPrDYU7CslSZx4M4ukmjYRDTdaSddqeFJ15K5bQvTHax5EQyKJ8veUoqG5DR9tWa14i0S3ZbU+Pvu6EDGUIGNBIrzIp7XNQsa1Gy3Y/dtJQu/Gg55ebFy3FHFKe/OaY9r7yFdutSM2MgznLzdh7swpZNHjVCsdjEc2O9uxq4SdOGNhvQ4HE8nUlGpSol/oZ5bGFvVa6WplSJKL3bnXybZ+WsDyCg4x0dX/eDo2ZLNQzwipcvy0r5xkcWAjlZWJ9NNeY6pcytFrd6CpuR3mUH84yY8m0popXs4/bnxsmJAlNxMIRXlVLcvLL2KCKLJ+upbovkzIT523sLc2b6P+uMgGvGnYeMI2h8GuU87PXmjArsJSLMtIgTnEH8EBfvD19YHJ16jxeIJNcyP9tVBamiDjTkcXqk9fpQ6eqSbneR1GihGTD0xBHKhElX2W19iMZlP5B9jQ0Ax1d70EAAAAAElFTkSuQmCC',
      type: 'lopbando',
      component: layerMap,
    },
    {
      id: 9,
      src: 'data:image/png;base64,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',
      type: 'kihieudat',
    },
  ];

  return (
    <>
      <div className='Checkbox_all'>
        <div className='Checkbox_all_chir'>
          <div className='lable_lqh'>
            <img src={logo} alt='' className='logo' />

            <div className='all_search' direction='vertical'>
              <input
                className='input_search'
                id='pac-input'
                placeholder='Nhập tọa độ, địa chỉ'
                // onChange={hanldleChange}
                // value={searchInput}
                autoComplete='on'
              />
              <SearchOutlined
                style={{marginRight: '16px'}}
                id='search-button'
              />
              {/* 
          <FontAwesomeIcon
            style={{ marginRight: "16px" }}
            icon={faMagnifyingGlass}
            id="search-button"
          /> */}
            </div>
            <button className='dang_nhap'>Đăng nhập</button>
          </div>
          <div className='buttom_header'>
            <div className='all_icon_header'>
              {TypeIcon.map((item) => {
                return (
                  <Dropdown
                    className='dropdown_khuvuc'
                    overlay={item.component}
                    trigger='click'
                    // open={false}
                    // onOpenChange={setIsOpen(true)}
                    key={item.id}>
                    <img
                      key={item.id}
                      src={item.src}
                      alt=''
                      className='icon_header'
                    />
                  </Dropdown>
                );
              })}
            </div>

            <div className='slider'>
              <img
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG1SURBVHgBnVXBUcMwEDwbF+BUgOkgVIDdAR0kdAD/TBzP5A9UkLiDpAJMB6GCmAowP14xe2SdEYrsONmZG8m629OeZEkiPTHb46VvfCD9EcHqvsG++QFFkVwIm+tbjm2WZamLWNf1Bvbh8pGznc/n183YVdMpiqKK49jTOZIk0e93Y9LQ87xKDTEVfD9mUkw40+50Ol03454cl6RBIzQ3rGIBi62wpSaCv4Rt0c/Jk9bEhpIRlOhfEBrDaybV0oeoYJymae7i+65BVepIqviCbwW71bk1pm3DnYmpKJQOsPSN7JfqdGLdKDRj6YcMFpPzDwEGnxt1WLPWX6oFJdsIe3IH7pB5SlX83UTtdjvdzErOR0juHzDBILB/E1dZHRiy3UBxYTpca6yKC+kH3eQlOdKZmHiQE0vCY6yKM5e/9YBAxRjNYWOJFeyVSjXpE+KWLr7vUqLHlAQ9CObJuoe9sX+rMRrrurh8OykvlJyqSyofwBJONMBYoj7ScuXYyQ9L0Vybsr9cZrYC3AmPnPzoFWF8GgRBNJlMPsUREEkLWPaiwx+Z3/YLUsqFsLnnvHmVnHEqfwF5sNSCLHdEfQAAAABJRU5ErkJggg=='
                alt=''
              />
              <Slider
                style={{width: '100%'}}
                trackStyle={{background: '#D1132A'}}
                //   onChange={changeOpacity}
                defaultValue={30}
              />
            </div>
          </div>
        </div>
      </div>
      <MapPage />
    </>
  );
};
export default HeaderMap;
