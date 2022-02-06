import '../../App.css';
import '../../styles/scss/inputs.css';
import useData from "../../hooks/hooks.data";
import {useMemo} from "react";
import scss from '../../styles/scss/style.scss';
import moment from "moment";

const TimeSeriesTop5 = () => {
    const {
        timeSeries
    } = useData();

    const getBottom5 = useMemo(() => {
        return [...timeSeries].sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)).slice(0, 5)
    }, [timeSeries])

    if (timeSeries.length > 0) {
        return (
            <div className={'col-12 d-flex justify-content-center p-3 p-md-5 mx-auto max-width-wrapper'}>
                <div className={'col-12 col-md-6 text text-md-left'}>
                    <h1 style={{color: scss.white}}>Top 5</h1>
                </div>
                <div className={'col-12 col-md-6 text text-md-right'}>
                    {getTop5.map((entry, index) =>
                        <div key={`top-5-${index}`} className={"mb-3"}>
                            <div style={{color:scss.lime}}>
                                <h4>{moment(entry.timestamp).format('MMMM D YYYY - hh:mm:ssA')}</h4>
                            </div>

                            <div style={{color:scss.white}}>
                                <h3>{entry.value}</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return <div/>;
    }
}

export default TimeSeriesTop5;
