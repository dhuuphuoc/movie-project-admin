import { ADMIN_LOGIN } from "../../util/Setting/config";
import { DANG_NHAP_ACTION, REMOVE_USER } from "../type/QuanLyAcccountType";


let user ={};
if(localStorage.getItem(ADMIN_LOGIN)){
    user = JSON.parse(localStorage.getItem(ADMIN_LOGIN))
}

const stateDefault = {
    adminSignin: user,
}

const QuanLyAccountReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case DANG_NHAP_ACTION:{
            localStorage.setItem(ADMIN_LOGIN,JSON.stringify(action.payload))
            localStorage.setItem('accessToken', action.payload.accessToken)
            state.adminSignin = user
            return { ...state }
        }

        case REMOVE_USER:{
            state.adminSignin = ''
            return {...state}
        }
        default:
            return {...state}
    }
}

export default QuanLyAccountReducer

export const signOut = () =>{
    return (dispatch) =>{
        dispatch({
            type: REMOVE_USER,
        })
        localStorage.removeItem(ADMIN_LOGIN)
    }
}