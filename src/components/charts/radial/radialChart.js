import React from "react";
import {Pie} from "@visx/shape";
import {Group} from "@visx/group";
import AnimatedPieChart from "./animatedPieChart";
import {capitaliseFirstLetter, returnGenreColour} from "../../../utils/utils";
import {useTooltip} from "@visx/tooltip";
import { localPoint } from '@visx/event';

const RadialChart = ({data}) => {

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    const width = 300;
    const radius = width / 2;
    const center = width / 2;
    const donutThickness = width / 6;

    let dataSet = [];

    try {
        let genres = data.map(entry => entry.genre).flat()
        let countByGenre = genres.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        //All are movies so it's irrelevant to chart
        delete countByGenre.movies;

        Object.keys(countByGenre).forEach(count => {
            dataSet.push({label: capitaliseFirstLetter(count), value: countByGenre[count]})
        })
    } catch {
        dataSet = [];
    }

    const handleMouseOver = (event, datum) => {
        const coords = localPoint(event.target.ownerSVGElement, event);
        console.log({event})
        console.log({coords})
        showTooltip({
            tooltipLeft: coords.x,
            tooltipTop: coords.y,
            tooltipData: datum
        });
    };

    const handleOnClick = (event, datum) => {
        const coords = localPoint(event.target.ownerSVGElement, event);
        console.log({event})
        console.log({coords})
        // console.log({datum})
        // showTooltip({
        //     tooltipLeft: coords.x,
        //     tooltipTop: coords.y,
        //     tooltipData: datum
        // });
    };

    const values = d => d.value;

    if (dataSet.length > 0) {
        return (
            <svg width={'100%'} height={'100%'} className={'mx-auto'} viewBox={`0 0 ${width} ${width}`}>
                <Group top={center} left={center}
                       // onMouseOver={handleMouseOver}
                >
                    <Pie
                        data={dataSet}
                        pieValue={values}
                        outerRadius={radius}
                        innerRadius={radius - donutThickness}
                        cornerRadius={3}
                        padAngle={0.005}
                        // onMouseMove={handleMouseOver}
                    >
                        {(pie) => (
                            <AnimatedPieChart
                                {...pie}
                                animate={true}
                                getKey={(arc) => arc.data.label}
                                onClickDatum={()=>{}}
                                onMouseMove={handleMouseOver}
                                getColor={(arc) => returnGenreColour(arc.data.label)}
                            />
                        )}
                    </Pie>
                </Group>

                {/*{dataSet.map((entry, index) => {*/}
                {/*    let offset = {*/}
                {/*        x: 0,*/}
                {/*        y: 30*index*/}
                {/*    };*/}
                {/*    return (*/}
                {/*        <g>*/}
                {/*            <circle cx={center - 30} cy={center - offset.y} r={10} fill={returnGenreColour(entry.label)}/>*/}
                {/*            <text fill="white"*/}
                {/*                  x={center}*/}
                {/*                  y={center}*/}
                {/*                  dy=".33em"*/}
                {/*                  fontSize={15}*/}
                {/*                  textAnchor="middle"*/}
                {/*                  pointerEvents="none"*/}
                {/*            >*/}
                {/*                {entry.label}*/}
                {/*            </text>*/}
                {/*        </g>)*/}
                {/*})}*/}
            </svg>
        )
    } else {
        return null;
    }
}

export default RadialChart;
