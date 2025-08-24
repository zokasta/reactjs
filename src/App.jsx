import { Routes, Route } from "react-router-dom";


import NotFound from "./Pages/NotFound/NotFound";
import ExampleGrid from "./Pages/Example/ExampleGrid";
import Home from "./Pages/Home/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

    
      <Route path="/ExampleComponents" element={<ExampleGrid />} />
      {/* Others */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
