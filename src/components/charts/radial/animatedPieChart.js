import React from "react";
import {animated, interpolate, useTransition} from "react-spring";
import scss from '../../../styles/scss/style.scss';

const AnimatedPieChart = ({animate, arcs, path, getKey, getColor, onClickDatum}) => {

    const fromLeaveTransition = ({endAngle}) => ({
        // enter from 360° if end angle is > 180°
        startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
        endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
        opacity: 0,
    });

    const enterUpdateTransition = ({startAngle, endAngle}) => ({
        startAngle,
        endAngle,
        opacity: 1,
    });

    const transitions = useTransition(arcs, {
        from: animate ? fromLeaveTransition : enterUpdateTransition,
        enter: enterUpdateTransition,
        update: enterUpdateTransition,
        leave: animate ? fromLeaveTransition : enterUpdateTransition,
        keys: getKey,
    });

    return transitions((props, arc, {key}) => {
        const [centroidX, centroidY] = path.centroid(arc);
        const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

        return (
            <g key={key}>
                <animated.path
                    // compute interpolated path d attribute from intermediate angle values
                    d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
                        path({
                            ...arc,
                            startAngle,
                            endAngle,
                        }),
                    )}
                    fill={getColor(arc)}
                    onClick={() => onClickDatum(arc)}
                    onTouchStart={() => onClickDatum(arc)}
                />
                {hasSpaceForLabel && (
                    <animated.g>
                        <text
                            fill="white"
                            x={centroidX}
                            y={centroidY}
                            dy=".33em"
                            fontSize={15}
                            fontWeight={600}
                            textAnchor="middle"
                            pointerEvents="none"
                            paintOrder={'stroke'}
                            stroke={scss.black}
                        >
                            {getKey(arc)}
                        </text>
                    </animated.g>
                )}
            </g>
        );
    });
}

export default AnimatedPieChart;
