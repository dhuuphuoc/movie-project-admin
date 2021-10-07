import { GET_USER_LIST, GET_USER_INFO } from "../type/QuanLyAcccountType";

const stateDefault = {
  userList: null,
  thongTinUser: {},
};

const QuanLyUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USER_LIST: {
      state.userList = action.payload;
      return { ...state };
    }
    case GET_USER_INFO: {
      state.thongTinUser = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default QuanLyUserReducer;
