import React, {useEffect, useState} from "react";
import useData from "../../hooks/hooks.data";
import HorizontalBarSeries from "react-vis/es/plot/series/horizontal-bar-series";
import {FlexibleXYPlot} from "react-vis";
import XAxis from "react-vis/es/plot/axis/x-axis";
import {toTitleCase} from "../../utils/utils";
import scss from '../../styles/scss/style.scss';

import peacock from '../../assets/images/peacock.jpeg';
import nowTV from '../../assets/images/now-tv.jpeg';
import skyGo from '../../assets/images/sky-go.jpeg';

const getChannelColour = (channel, previous) => {
    switch (channel.toLowerCase()) {
        case 'sky-go':
            return `${scss.lime}${previous ? '80' : ''}`;
        case 'now-tv':
            return `${scss.orange}${previous ? '80' : ''}`
        case 'peacock':
            return `${scss.blue}${previous ? '80' : ''}`
        default :
            return `${scss.white}${previous ? '80' : ''}`
    }
}

// const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const ViewsLineChart = () => {
    const {
        selectedMovie
    } = useData(window);

    const [currentData, setCurrentData] = useState([])
    const [previousData, setPreviousData] = useState([])
    const [channelsRepresented, setChannelsRepresented] = useState([])

    useEffect(() => {
        prepareData();
    }, [])

    const prepareData = () => {
        const data = {...selectedMovie};
        if (data.name) {
            delete data.totalViews.total;
            let currentViews = []
            let previousViews = []
            let channels = []
            Object.keys(data.totalViews).forEach(entry => {
                if (data.totalViews[entry] > 0) {
                    channels.push(entry)
                    currentViews.push({
                        y: entry,
                        x: data.totalViews[entry],
                        color: getChannelColour(entry, false)
                    })
                    previousViews.push({
                        y: entry,
                        x: data.prevTotalViews[entry],
                        color: getChannelColour(entry, true)
                    })
                }
            })
            setChannelsRepresented(channels)
            setCurrentData(currentViews)
            setPreviousData(previousViews)
        } else {
            setChannelsRepresented([])
            setCurrentData([])
            setPreviousData([])
        }
    }

    const getChannelLogo = (channel) => {
        // eslint-disable-next-line default-case
        switch (channel.toLowerCase()) {
            case  'sky-go':
                return skyGo;
            case  'now-tv':
                return nowTV;
            case  'peacock':
                return peacock;
        }
    }

    // const handleToolTipValue = (event) => {
    //     setToolTipData({
    //         value: event.x,
    //         label: toTitleCase(event.y)
    //     })
    // }
    //
    // const clearToolTipValue = () => {
    //     setToolTipData({})
    // }

    return (
        <section>
            <div
                className={'row no-gutters max-width-wrapper mx-auto'}>
                <div data-aos="fade-up">
                    <div className={'col-12 px-5 d-flex'}>
                        {channelsRepresented.map(entry =>
                            <div key={`channel-legend-${entry}`}
                                 className={'d-flex align-items-center channel-legend'}>
                                <div className={'indicator'}
                                     style={{backgroundColor: getChannelColour(entry, false)}}/>
                                <div className={'name'}>
                                    {toTitleCase(entry.replace('-', ' '))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={'row no-gutters'} style={{position: 'relative'}}>
                        <div className={'col-12'}>
                            <FlexibleXYPlot yType="ordinal" style={{position: 'relative', color: 'red'}}
                                // width={500}
                                            height={300}
                                            colorType={'literal'}>

                                <XAxis
                                    style={{text: {fill: scss.white, fontFamily: 'Sky-Med', fontStyle: 'italic'}}}/>
                                <HorizontalBarSeries
                                    // {/*Horribly inconsistent cant diagnose why, library issue?*/}
                                    // onNearestXY={handleToolTipValue}
                                    // onSeriesMouseOut={clearToolTipValue}
                                    data={currentData}/>
                                <HorizontalBarSeries
                                    data={previousData}/>
                            </FlexibleXYPlot>
                        </div>
                    </div>
                    <div className={'row no-gutters mx-auto my-3'}>
                        {currentData.map((entry, index) => {
                                return (
                                    <div
                                        key={`views_${entry.x}_${entry.y}`}
                                        data-aos="fade-up"
                                        className={`col-${12 / channelsRepresented.length} p-1`}>
                                        <div
                                            className={'p-3 text-center channel-views-tooltip mx-auto drop-shadow'}>
                                            <img src={getChannelLogo(entry.y)}
                                                 alt={toTitleCase(entry.y.replace('-', ' '))}
                                                 style={{width: '100%', height: 'auto'}}
                                            />
                                            <div>
                                                {`Current: ${entry.x.toLocaleString()}`}
                                            </div>
                                            <div>
                                                {`Previous: ${previousData[index].x.toLocaleString()}`}
                                            </div>
                                        </div>
                                    </div>)
                            }
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewsLineChart
