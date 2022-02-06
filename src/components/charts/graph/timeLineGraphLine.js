import React from "react";
import {scaleLinear} from "@visx/scale";
import {extent, max} from "d3-array";
import {AreaClosed} from "@visx/shape";
import {LinearGradient} from "@visx/gradient";

const TimeLineGraphLine = ({team, highestGold, isDire, progress}) => {
    if (team) {
        const width = 800;

        const aspectRatio = 0.5;
        const margin = {
            top: 60,
            bottom: 60,
            left: 0,
            right: 0
        };
        const xMax = width;
        const baseYMax = width * aspectRatio - margin.top - margin.bottom;


        const percentage = Math.round((team[progress].gold / highestGold) * 100);
        const yMax = Math.round((baseYMax / 100) * percentage)
        const yDifference = baseYMax - yMax;

        //DIRE
        const x = d => d.time;
        const y = d => d.gold;

        const xScale = scaleLinear({
            domain: extent(team, x),
            range: [0, xMax]
        });

        const yScale = scaleLinear({
            domain: [0, max(team, y)],
            range: [yMax, 0]
        });

        return (
            <>
                <LinearGradient id={isDire ? "dire-team-gradient" : "radiant-team-gradient"}
                                from={isDire ? Colours.dire.stop : Colours.radiant.stop}
                                to={'black'}
                                fromOpacity={0.8}
                                toOpacity={1}
                />

                <g transform={`translate(0 ${yDifference})`}>
                    <AreaClosed
                        data={team}
                        yScale={yScale}
                        x={d => xScale(x(d))}
                        y={d => yScale(y(d))}
                        stroke="white"
                        fill={`url(#${isDire ? "dire-team-gradient" : "radiant-team-gradient"})`}
                    />
                </g>
            </>
        );
    } else {
        return (<></>)
    }
}

export default TimeLineGraphLine;
