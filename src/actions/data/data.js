import {
    CLEAR_SELECTED_MOVIE,
    SET_CONTENT_DATA,
    SET_FILTERED_DATA,
    SET_SELECTED_MOVIE,
    SET_TIME_SERIES,
} from "../../constants/action-types";
import {API} from "../../utils/requests";

const actions = {
    getTimeSeriesData: () => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            API.get('https://my-json-server.typicode.com/alb90/aieng-tech-test-timeseries/data').then((resp) => {
                if (resp.error) {
                    if (resp.warning) {
                    }
                    resolve(false)
                } else {
                    let preparedData = [...resp]
                    try {
                        let [lowest] = new Set([...resp.map(entry => entry.value).sort()]);

                        preparedData.forEach(entry => {
                            entry.offsetValue = entry.value - lowest;
                        })

                        dispatch({type: SET_TIME_SERIES, value: preparedData});
                    } catch {
                        dispatch({type: SET_TIME_SERIES, value: resp});
                    }
                    resolve(true)
                }

            }, error => {

                reject(error)
            })
        })
    },
    getContentData: () => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            API.get('https://my-json-server.typicode.com/alb90/aieng-tech-test-assets/data').then((resp) => {
                if (resp.error) {
                    if (resp.warning) {
                    }
                    resolve(false)
                } else {
                    dispatch({type: SET_CONTENT_DATA, value: resp});
                    dispatch({type: SET_FILTERED_DATA, value: resp});
                    resolve(true)
                }

            }, error => {

                reject(error)
            })
        })
    },

    setSelectedMovie: ({title}) => async (dispatch) => {
        return new Promise(async (resolve, reject) => {

            dispatch({type: SET_SELECTED_MOVIE, value: title});
            resolve(true)
        })
    },
    clearSelectedMovie: ({}) => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            dispatch({type: CLEAR_SELECTED_MOVIE, value: {}});
            resolve(true)
        })
    },
};

export default actions;
