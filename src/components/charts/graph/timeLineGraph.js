import React, {useCallback, useMemo, useState} from "react";
import {scaleLinear, scaleTime} from "@visx/scale";
import {extent, max} from "d3-array";
import {LinearGradient} from "@visx/gradient";
import {GridColumns} from "@visx/grid";
import {AreaClosed, Bar, Line} from "@visx/shape";
import useData from "../../../hooks/hooks.data";
import scss from '../../../styles/scss/style.scss';
import {localPoint} from '@visx/event';
import {TooltipWithBounds} from "@visx/tooltip";
import moment from "moment";

const getDate = d => d.timestamp;
// const getValue = d => d.value;
const getValue = d => d.offsetValue;
const width = 800;
const height = 275;

const TimeLineGraph = () => {
    const {
        timeSeries
    } = useData();

    const [toolTipLocation, setToolTipLocation] = useState({left: 0, top: 0, bottom: 0, right: 0})
    const [tooltipData, setTooltipData] = useState(null)

    const dateScale = useMemo(
        () =>
            scaleTime({
                range: [0, width],
                domain: extent(timeSeries, getDate),
            }),
        [timeSeries]
    );

    const valueScale = useMemo(
        () =>
            scaleLinear({
                range: [height, 0],
                domain: [0, (max(timeSeries, getValue) || 0) + height / 3],
                nice: true,
            }),
        [timeSeries],
    );

    const getClosest = useCallback((num, arr) => {
        let curr = arr[0].timestamp,
            diff = Math.abs(num - curr),
            index = 0;

        for (let val = 0; val < arr.length; val++) {
            let newdiff = Math.abs(num - arr[val].timestamp);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val].timestamp;
                index = val;
            }
        }
        return index;
    }, [])

    const handleTooltip = useCallback((event) => {
        const {x} = localPoint(event) || {x: 0}
        const x0 = dateScale.invert(x);
        const xTime = Date.parse(`${x0}`);
        const xIndex = getClosest(xTime, timeSeries);
        const closest = timeSeries[xIndex]
        setToolTipLocation({...toolTipLocation, left: x, top: valueScale(getValue(timeSeries[xIndex]))})
        //Not ideal, using absolute screen x instead of relative screen x coordinate.
        setTooltipData({left: event.clientX||0, timestamp: closest.timestamp, value: closest.value})
    }, [dateScale, getClosest, timeSeries, toolTipLocation, valueScale])


    if (timeSeries.length > 0) {
        const margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };

        const xMax = width;
        const yMax = height;

        const x = d => d.timestamp;
        const y = d => d.offsetValue;
        // const y = d => d.value;

        const xScale = scaleLinear({
            domain: extent(timeSeries, x),
            range: [0, xMax]
        });

        const yScale = scaleLinear({
            domain: [0, max(timeSeries, y)],
            range: [yMax, 0]
        });

        return (
            <div data-aos="fade-down" style={{position: 'relative'}}
                 className={'col-12 d-flex justify-content-center px-3 px-md-5 mx-auto'}>
                <div style={{position: 'relative', height: '100%', width: '100%'}}>
                    <h1 className={'py-3 white-text'}>Timeline</h1>
                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        overflow="visible"
                        style={{overflow: 'visible', width: '100%'}}
                    >
                        <GridColumns
                            top={0}
                            scale={xScale}
                            height={height}
                            strokeDasharray="1,3"
                            stroke={'white'}
                            strokeOpacity={0.35}
                            pointerEvents="none"
                        />

                        <LinearGradient id="timeline-gradient"
                                        from={scss.lime}
                                        to={scss.jade}
                                        toOpacity={0.6}
                        />

                        <Bar
                            x={margin.left}
                            y={margin.top}
                            width={'100%'}
                            height={'100%'}
                            fill="transparent"
                            rx={14}
                            // onMouseLeave={() => hideTooltip()}
                        />

                        {/*<g transform={`translate(0 ${yDifference})`}>*/}
                        <AreaClosed
                            data={timeSeries}
                            yScale={yScale}
                            x={d => xScale(x(d))}
                            y={d => yScale(y(d))}
                            stroke="white"
                            fill={`url(#timeline-gradient)`}
                            onTouchStart={handleTooltip}
                            onTouchMove={handleTooltip}
                            onMouseMove={handleTooltip}
                        />
                        {tooltipData && (
                            <g key={tooltipData?.timestamp} style={{position: 'relative'}}>
                                <Line
                                    from={{x: toolTipLocation.left, y: 0}}
                                    to={{x: toolTipLocation.left, y: height}}
                                    stroke={`${scss.white}80`}
                                    strokeWidth={2}
                                    pointerEvents="none"
                                    strokeDasharray="5,2"
                                />
                                {/*<circle*/}
                                {/*    cx={toolTipLocation.left}*/}
                                {/*    cy={toolTipLocation.top - 3}*/}
                                {/*    r={4}*/}
                                {/*    fill="black"*/}
                                {/*    fillOpacity={0.1}*/}
                                {/*    stroke="black"*/}
                                {/*    strokeOpacity={0.1}*/}
                                {/*    strokeWidth={2}*/}
                                {/*    pointerEvents="none"*/}
                                {/*/>*/}
                                {/*<circle*/}
                                {/*    cx={toolTipLocation.left}*/}
                                {/*    cy={toolTipLocation.top - 4}*/}
                                {/*    r={4}*/}
                                {/*    fill={scss.white}*/}
                                {/*    stroke="white"*/}
                                {/*    strokeWidth={2}*/}
                                {/*    pointerEvents="none"*/}
                                {/*/>*/}
                            </g>
                        )}
                    </svg>
                    {tooltipData && (
                        //Less than ideal, doesn't follow dot marker too well.
                            <TooltipWithBounds
                                className={'time-series-chart-gradient text-center time-series-tool-tip'}
                                style={{
                                    top: toolTipLocation.top+120,
                                    left: tooltipData.left-80,
                                    width:80
                                }}
                            >
                                <div className={'header'}>
                                    {`${moment(tooltipData.timestamp).format('hh:mmA')}`}
                                </div>
                                <div className={'data'}>
                                    {`${tooltipData.value.toLocaleString()}`}
                                </div>
                            </TooltipWithBounds>
                    )}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default TimeLineGraph;
