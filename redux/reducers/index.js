import * as constants from "../constants"
const initialState = {
    searchPress:false,
    videos:{
        items:[],
        q:""
    },
    searchResults:{
        items:[],
        q:""
    }
}

export const reducer= (state=initialState,action)=>{
    if(action.type==constants.SEARCHBUTTONPRESS){
        return {
            ...state,
            searchPress:!state.searchPress
        }
    }
    else if(action.type==constants.GETRESULTS){
        return {
            ...state,
            searchResults:action.payload
        }
    }
    else if(action.type==constants.LOADHOMEVIDEOS){
        return {
            ...state,
            videos:action.payload
        }
    }
    return {
        ...state
    }
}