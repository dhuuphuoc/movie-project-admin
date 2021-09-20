import { request } from "../../Api"
import { SET_FILM_LIST } from "../type/QuanLyPhimType"



export const fetchFilmList = (currentPage) =>{
    return dispatch =>{
        request ({
            url:"https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01",
            method:"GET",
            headers: { TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk"},
            params:{
                soTrang: currentPage,
                soPhanTuTrenTrang:10,
            },
        })
        .then((res)=>{
            dispatch({
                type: SET_FILM_LIST,
                payload:res.data.content
            })
            console.log(res.data.content)
        }).catch((err)=> console.log(err))
    }
}


export const themPhimUploadHinh = (formData) =>{
    return dispatch =>{
        request({
            url:"https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
            method:"POST",
            data:formData
        })
        .then((res)=>{
            alert('Thêm Phim Thành Công')
            console.log('result', res.data.content)
        })
        .catch((errors)=>{
            console.log("error", errors.response?.data)
        })
    }
}