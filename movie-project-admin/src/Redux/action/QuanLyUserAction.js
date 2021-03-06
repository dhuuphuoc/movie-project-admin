import { request } from "../../Api";
import { GET_USER_INFO, GET_USER_LIST } from "../type/QuanLyAcccountType";

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

export const getUserList = () => {
  return (dispatch) => {
    request({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
      method: "GET",
      params: {
        MaNhom: "GP01",
      },
    })
      .then((res) => {
        dispatch({
          type: GET_USER_LIST,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteUser = (taiKhoan) => {
  return (dispatch) => {
    request({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung",
      method: "DELETE",
      params: { TaiKhoan: decodeURIComponent(taiKhoan) },
    })
      .then((res) => {
        alert("Xóa user thành công");
        dispatch(getUserList());
      })

      .catch((errors) => {
        console.log("error", errors);
      });
  };
};

export const layThongTinUser = (taiKhoan) => {
  return (dispatch) => {
    request({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung",
      method: "POST",
      params: {
        taiKhoan: taiKhoan,
      },
    })
      .then((res) => {
        dispatch({
          type: GET_USER_INFO,
          payload: res.data.content,
        });
      })
      .catch((errors) => {
        console.log("error", errors.response?.data);
      });
  };
};

export const capNhapUser = (data) => {
  return (dispatch) => {
    request({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: data,
    })
      .then((res) => {
        alert("Câp nhập thành công");
      })
      .catch((errors) => {
        console.log("error", errors.response?.data);
      });
  };
};
