import {SET_LOADING} from "../../constants/action-types";

const initialState = {
    loading: false
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            const loading = action.loading
            return {
                ...state,
                loading: loading
            }
        default:
            return state;
    }
}

export default Reducer;
