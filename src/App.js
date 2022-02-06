// import './App.css';
import './styles/scss/style.scss';

import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";

import {ToastContainer} from "react-toastify";
import NotFound from "./pages/notFound";
import ViewTimeSeries from "./pages/viewTimeSeries";
import ViewContentData from "./pages/viewContentData";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="time-series" element={<ViewTimeSeries/>}/>
                <Route path="content-data" element={<ViewContentData/>}/>
            </Routes>

            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                theme={"colored"}
                closeOnClick
                closeButton={false}/>
        </Router>
    );
}

export default App;
