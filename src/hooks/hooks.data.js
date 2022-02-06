import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DataActions} from "../actions/data";
import {SET_LOADING} from "../constants/action-types";

const useData = (window) => {
        const dispatch = useDispatch();

        const contentData = useSelector(state => state.data.contentData);
        const selectedMovie = useSelector(state => state.data.selectedMovie);
        const timeSeries = useSelector(state => state.data.timeSeries);
        const filteredContentData = useSelector(state => state.data.filteredContentData);
        const filter = useSelector(state => state.data.filter);

        const [errors, setErrors] = useState({});

        const getTimeSeriesData = () => {
            dispatch({type: SET_LOADING, loading: true});
            return new Promise(async (resolve, reject) => {
                dispatch(DataActions.getTimeSeriesData()).then(resp => {
                    setErrors({});
                    dispatch({type: SET_LOADING, loading: false});
                    resolve(resp)
                }, (error) => {
                    setErrors(error);
                    dispatch({type: SET_LOADING, loading: false});
                    resolve(false);
                });
            });
        };

        const getContentData = () => {
            dispatch({type: SET_LOADING, loading: true});
            return new Promise(async (resolve, reject) => {
                dispatch(DataActions.getContentData()).then(resp => {
                    setErrors({});
                    dispatch({type: SET_LOADING, loading: false});
                    resolve(resp)
                }, (error) => {
                    setErrors(error);
                    dispatch({type: SET_LOADING, loading: false});
                    resolve(false);
                });
            });
        };


        const setSelectedMovie = (title) => {
            return new Promise(async (resolve, reject) => {
                dispatch(DataActions.setSelectedMovie({title})).then(resp => {
                    setErrors({})
                    resolve(resp)
                }, (errors) => {
                    setErrors(errors)
                    resolve(false);
                });
            });
        };

        const clearSelectedMovie = () => {
            return new Promise(async (resolve, reject) => {
                dispatch(DataActions.clearSelectedMovie({contentData})).then(resp => {
                    setErrors({})
                    resolve(resp)
                }, (errors) => {
                    setErrors(errors)
                    resolve(false);
                });
            });
        }

        return {
            errors,
            setErrors,
            contentData,
            filteredContentData,
            filter,
            timeSeries,
            selectedMovie,
            getTimeSeriesData,
            getContentData,
            setSelectedMovie,
            clearSelectedMovie
        };
    }
;

export default useData;
