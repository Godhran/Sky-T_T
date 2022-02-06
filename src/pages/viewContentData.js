import useData from "../hooks/hooks.data";
import React, {useEffect} from "react";
import Navbar from "../components/navigation/navbar";
import ViewsLineChart from "../components/charts/viewsLineChart";
import SelectContent from "../components/container/selectContent";
import MovieDetails from "../components/container/movieDetails";

const ViewContentData = () => {
    const {
        selectedMovie,
        getContentData
    } = useData(window);

    useEffect(() => {
        getContentData().then()
    }, []);

    return (
        <>
            <Navbar/>
            <SelectContent/>
            {selectedMovie.name ? <MovieDetails/> : null}
            {selectedMovie.name ? <ViewsLineChart/> : null}
        </>
    );
}

export default ViewContentData;
