import { GET_USER_LIST } from "../type/QuanLyAcccountType";

const stateDefault = {
  userList: null,
};

const QuanLyUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USER_LIST: {
      state.userList = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default QuanLyUserReducer;
