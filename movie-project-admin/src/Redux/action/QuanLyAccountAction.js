import { request } from "../../Api"
import { DANG_NHAP_ACTION } from "../type/QuanLyAcccountType"

export const dangNhap = (user, callBack) =>{
    return dispatch =>{
        request({
            url:"https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
            method: "POST",
            data: user
        })
        .then((res)=>{
            if(res.data.statusCode === 200){
                dispatch({
                    type: DANG_NHAP_ACTION,
                    payload: res.data.content
                })
                callBack()
            }
        })
        .catch((res)=>{

        })
    }

}