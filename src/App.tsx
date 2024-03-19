import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import StackParse from "@/pages/StackParse";
import MarkDown from "@/pages/MarkDown";
import MyMoniter from "@/pages/MyMoniter";
import AiElkLog from "@/pages/AiElkLog";
import OpmTimeLine from "@/pages/OpmTimeLine";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stackparse" element={<StackParse />} />
      <Route path="/mk" element={<MarkDown />} />
      <Route path="/mt2" element={<MyMoniter onFilterChange={()=>{}} />} />
      <Route path="/aielk" element={<AiElkLog />} />
      <Route path="/opm" element={<OpmTimeLine />} />
    </Routes>
  );
}

export default App;
