import {combineReducers} from "redux";
import {Data} from "./data";
import {Loading} from "./loading";

const combined = combineReducers({
    loading: Loading,
    data: Data,
})

export default combined;
