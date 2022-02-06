import {Hint, RadialChart} from "react-vis";
import 'react-vis/dist/style.css';
// import useMap from "../../hooks/hooks.map";
import {useState} from "react";
import {capitaliseFirstLetter, returnGenreColour} from "../../../utils/utils";
import scss from '../../../styles/scss/style.scss';
import useData from "../../../hooks/hooks.data";

const Radial = () => {

    const [hovering, setHovering] = useState(null);

    const {
        filter,
        genres,
        contentData,
        filteredContentData,
        setFilterData
    } = useData();

    const getChartData = () => {
        let dataSet = [];
        let genreCount = {};

        // data.forEach(genre => {
        //     let foundRampsWithgenre = pointsInView.filter(entry => entry.properties.genre === genre)
        //     genreCount[genre] = !foundRampsWithgenre ? 0 : foundRampsWithgenre.length;
        // })

        try {
            let genres = filteredContentData.map(entry => entry.genre).flat()

            let countByGenre = genres.reduce(function (acc, curr) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
            }, {});

            //All are movies so it's irrelevant to chart
            delete countByGenre.movies;

            Object.keys(countByGenre).forEach(count => {
                dataSet.push({
                    label: capitaliseFirstLetter(count),
                    color: returnGenreColour(capitaliseFirstLetter(count)),
                    count: countByGenre[count],
                    angle: countByGenre[count]
                })
            })
        } catch {
            dataSet = [];
        }

        console.log({dataSet})

        // Object.keys(genreCount).forEach((genre, index) => {
        //     if (genreCount[genre] > 0) {
        //         data.push({
        //             angle: genreCount[genre],
        //             count: genreCount[genre],
        //             color: returnGenreColour(genre),
        //             label: genre
        //         })
        //     }
        // })

        return dataSet;
    }


    return (
        <div className={'chart-container'}>
            {filteredContentData.length > 0 ? <RadialChart
                    //Forcing redraw, noticing issues in
                    // not sure if it's related to that.
                    key={`genres_chart_${filteredContentData.length}`}
                    colorType={"literal"}
                    data={getChartData()}
                    width={300}
                    height={300}
                    animation={"gentle"}
                    radius={150}
                    innerRadius={100}
                    onValueClick={(value) => {
                        if (filter.value.length === 0) {
                            setFilterData({type: "Genre", value: value.label}).then();
                        }
                    }}
                    onValueMouseOut={() => {
                        setHovering(null)
                    }}
                    onValueMouseOver={(d) => {
                        const hintData =
                            {
                                value: d
                            }
                        setHovering(hintData)
                    }}
                >
                    {hovering &&
                        <Hint {...hovering}>
                            <div
                                style={{ backgroundColor: `${scss.black}80`}}
                                className={'chart-tooltip'}
                            >
                                <div style={{color: scss.white}}>{hovering.value.label}</div>
                                <div style={{color: scss.white, textAlign: 'center'}}>{hovering.value.count}</div>
                            </div>
                        </Hint>
                    }
                </RadialChart>
                :null}
        </div>
    )
}

export default Radial
