import { Routes, Route } from "react-router-dom";


import NotFound from "./Pages/NotFound/NotFound";
import ExampleGrid from "./Pages/Example/ExampleGrid";

export default function App() {
  return (
    <Routes>

    
      <Route path="/ExampleComponents" element={<ExampleGrid />} />
      <Route path="/" element={<ExampleGrid />} />
      {/* Others */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
