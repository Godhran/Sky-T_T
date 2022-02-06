import React, {useCallback} from "react";
import useData from "../../hooks/hooks.data";
import {toTitleCase} from "../../utils/utils";

const MovieDetails = () => {
    const {
        selectedMovie
    } = useData(window);

    console.log({selectedMovie})

    const getGenres = useCallback((genres)=>{
        let tags = [...genres];
        tags.forEach((entry,index)=>{
            tags[index]=toTitleCase(entry)
        })
        return tags.join(' - ');
    },[])

    return (
        <section>
            <div className={'row no-gutters max-width-wrapper mx-auto'}>
                <div className={'mx-auto'} style={{maxWidth:600}}>
                    <div className={'col-12 px-5 movie-details py-3'}>
                        <div className={'text-center'}>
                        <img data-aos="fade-down" className={'image my-3 drop-shadow-lg'} src={selectedMovie.assetImage} alt={selectedMovie.name}/>
                        </div>
                        <h3 data-aos="fade-up" className={'text-center title'}>{selectedMovie.name}</h3>
                        <p data-aos="fade-up" className={'description text-center'}>{selectedMovie.description}</p>
                        <p data-aos="fade-up" className={'tags text-center'}>{getGenres(selectedMovie.genre)}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieDetails
