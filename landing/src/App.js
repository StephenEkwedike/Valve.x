import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import FeesPage from "./Pages/FeesPage";
import LandingPage from "./Pages/LandingPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/fees" element={<FeesPage />} />
                    <Route path="/" index element={<LandingPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
