import React from "react";
import '../../styles/scss/loading.css'
import useLoading from "../../hooks/hooks.loading";
// import Colours from './../../styles/colours'

// const size = 35

const LoadingOverlay = () => {
    const {
        loading,
    } = useLoading();

    if(loading) {
        return (
            <div className={'loading-overlay'}>
                {/*<div style={{height: 300, width: 300}} className={'loading-animation'}>*/}
                {/*    <svg className={`mr-1 mb-1 loading-element`}*/}
                {/*         height={size}*/}
                {/*         width={size}*/}
                {/*         viewBox={`0 0 30 30`}*/}
                {/*         style={{animationDelay: `${0.1}s`}}*/}
                {/*    >*/}
                {/*        <rect height={30} width={30} rx={10} fill={'#FFFFFF'}/>*/}
                {/*        <text x={'50%'}*/}
                {/*              fontWeight={900}*/}
                {/*              fontFamily={'Major Mono Display'}*/}
                {/*              y={'50%'}*/}
                {/*              textAnchor={'middle'}*/}
                {/*              fontSize={20}*/}
                {/*              alignmentBaseline={'central'}*/}
                {/*              fill={Colours.palettes['a'].backgroundColor}*/}
                {/*        >*/}
                {/*            {'.'}*/}
                {/*        </text>*/}
                {/*    </svg>*/}

                {/*    <svg className={`mr-1 mb-1 loading-element`}*/}
                {/*         height={size}*/}
                {/*         width={size}*/}
                {/*         viewBox={`0 0 30 30`}*/}
                {/*         style={{animationDelay: `${0.2}s`}}*/}
                {/*    >*/}
                {/*        <rect height={30} width={30} rx={10} fill={'#FFFFFF'}/>*/}
                {/*        <text x={'50%'}*/}
                {/*              fontWeight={900}*/}
                {/*              fontFamily={'Major Mono Display'}*/}
                {/*              y={'50%'}*/}
                {/*              textAnchor={'middle'}*/}
                {/*              fontSize={20}*/}
                {/*              alignmentBaseline={'central'}*/}
                {/*              fill={Colours.palettes['a'].backgroundColor}*/}
                {/*        >*/}
                {/*            {'.'}*/}
                {/*        </text>*/}
                {/*    </svg>*/}

                {/*    <svg className={`mb-1 loading-element`}*/}
                {/*         height={size}*/}
                {/*         width={size}*/}
                {/*         viewBox={`0 0 30 30`}*/}
                {/*         style={{animationDelay: `${0.3}s`}}*/}
                {/*    >*/}
                {/*        <rect height={30} width={30} rx={10} fill={'#FFFFFF'}/>*/}
                {/*        <text x={'50%'}*/}
                {/*              fontWeight={900}*/}
                {/*              fontFamily={'Major Mono Display'}*/}
                {/*              y={'50%'}*/}
                {/*              textAnchor={'middle'}*/}
                {/*              fontSize={20}*/}
                {/*              alignmentBaseline={'central'}*/}
                {/*              fill={Colours.palettes['a'].backgroundColor}*/}
                {/*        >*/}
                {/*            {'.'}*/}
                {/*        </text>*/}
                {/*    </svg>*/}
                {/*</div>*/}
            </div>
        )
    }else{
        return(
            <></>
        )
    }
}

export default LoadingOverlay;
