import scss from '../../styles/scss/style.scss';

const Navbar = ()=>{
    // No Time
    // const toggleLessColours = () =>{
    //
    // }

    return(
        <nav className="navbar navbar-expand-md">
            <a className="navbar-brand mx-2" href="#">
                <svg width="100%" height="40" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={scss.lime}/>
                            <stop offset="100%" stopColor={scss.green}/>
                        </linearGradient>
                    </defs>
                    <rect x="0" width="400" height="200" fill="url(#gradient)"  rx={35}/>
                    <text x="50%" y="110" fill="white" fontSize="160" textAnchor="middle" alignmentBaseline="middle" fontFamily="Sky-Med">stat</text>
                </svg>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/time-series/">Time Series</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/content-data/">Content Data</a>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <a className="nav-link disabled" style={{cursor:'pointer'}}*/}
                    {/*       // onClick={toggleLessColours}*/}
                        {/*>Toggle Colours</a>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
