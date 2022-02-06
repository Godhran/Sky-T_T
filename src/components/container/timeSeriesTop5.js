import '../../App.css';
import useData from "../../hooks/hooks.data";
import React, {useMemo} from "react";
import moment from "moment";

const TimeSeriesTop5 = ({top, length}) => {
    const {
        timeSeries
    } = useData();

    const getBottom5 = useMemo(() => {
        return [...timeSeries].sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0)).slice(0, length)
    }, [length, timeSeries])

    const getTop5 = useMemo(() => {
        return [...timeSeries].sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)).slice(0, length)
    }, [length, timeSeries])

    if (timeSeries.length > 0) {
        if (top) {
            return (
                <div className={'col-6 d-flex p-3 p-md-5 mx-auto max-width-wrapper'}>
                    <div data-aos="fade-right" className={'data-card white-background p-3 w-100 h-100 drop-shadow-lg-positive'}>
                        <div className={'col-12 text-left metrics'}>
                            <h1 className={'title'}>{`Peak`}</h1>
                            {getTop5.map((entry, index) =>
                                <div key={`top-5-${index}`} className={"mb-3 data"}>
                                    <h4 className={'date'}>{moment(entry.timestamp).format('MMMM Do - hh:mm A')}</h4>
                                    <h3 className={'value positive'}>{entry.value.toLocaleString()}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'col-6 d-flex p-3 p-md-5 mx-auto max-width-wrapper'}>
                    <div data-aos="fade-left" className={'data-card white-background p-3 w-100 h-100 drop-shadow-lg-negative'}>
                        <div className={'col-12 text-left metrics'}>
                            <h1 className={'title'}>{`Lulls`}</h1>
                            {getBottom5.map((entry, index) =>
                                <div key={`top-5-${index}`} className={"mb-3 data"}>
                                    <h4 className={'date'}>{moment(entry.timestamp).format('MMMM Do - hh:mm A')}</h4>
                                    <h3 className={'value negative'}>{entry.value.toLocaleString()}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return <div/>;
    }
}

export default TimeSeriesTop5;
