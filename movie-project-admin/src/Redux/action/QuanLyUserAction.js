import { request } from "../../Api";

export const addUser = (data) => {
  return (dispatch) => {
    request({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: data,
    })
      .then((res) => {
        alert("Thêm User Thành Công");
        console.log("result", res.data.content);
      })
      .catch((errors) => {
        console.log("error", errors.response?.data);
      });
  };
};

export const getTypeUser = (response) => {
  return (dispatch) => {
    request({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
      method: "GET",
    })
      .then((res) => {
        response = res?.content;
      })
      .catch((errors) => {
        console.log("error", errors.response?.data);
      });
  };
};
