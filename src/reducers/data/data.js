import {
    CLEAR_SELECTED_MOVIE,
    SET_CONTENT_DATA,
    SET_SELECTED_MOVIE,
    SET_TIME_SERIES,
} from "../../constants/action-types";

const initialState = {
    timeSeries: [],
    contentData: [],
    selectedMovie: {},
    filter: {type: '', value: ''}
}

const filterMovies = (state,title) =>{
    console.log({state})
    console.log({title})
    console.log(state.contentData.find(entry=>entry.name === title))
    return state.contentData.find(entry=>entry.name === title)
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIME_SERIES:
            return {
                ...state,
                timeSeries: action.value
            }
        case SET_CONTENT_DATA:
            return {
                ...state,
                contentData:action.value
            }
        case SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: filterMovies(state,action.value)
            }
        case CLEAR_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: {}
            }
        default:
            return state;
    }
}

export default Reducer;
