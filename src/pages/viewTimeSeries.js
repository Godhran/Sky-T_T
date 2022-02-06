import useData from "../hooks/hooks.data";
import React, {useEffect} from "react";
import Navbar from "../components/navigation/navbar";
import TimeLineGraph from "../components/charts/graph/timeLineGraph";
import TimeSeriesTop5 from "../components/container/timeSeriesTop5";

const ViewTimeSeries = () => {

    const {
        getTimeSeriesData,
    } = useData(window);

    useEffect(() => {
        getTimeSeriesData().then()
    }, []);

    return (
        <>
            <Navbar/>
            <TimeLineGraph/>
            <div className={'row no-gutters'}>
                <TimeSeriesTop5 length={3} top/>
                <TimeSeriesTop5 length={3}/>
            </div>
        </>
    );
}

export default ViewTimeSeries;
