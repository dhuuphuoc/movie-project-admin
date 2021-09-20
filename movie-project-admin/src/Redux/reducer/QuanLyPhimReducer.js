import { SET_FILM_LIST, SET_PAGE } from "../type/QuanLyPhimType"


const stateDefault ={
    movieList:[],
    page:1,
}

const QuanLyPhimReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case SET_FILM_LIST :{
            state.movieList = action.payload
            return { ...state }
        }
        case SET_PAGE :{
            state.page = action.payload
            return { ...state }
        }
        default:{
            return {...state}
        }
    }
}

export default QuanLyPhimReducer