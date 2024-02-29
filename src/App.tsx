import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StackParse from "./pages/StackParse";
import MarkDown from "./pages/MarkDown";
import MyMoniter from "./pages/MyMoniter";
import MyMoniterCSS from "./pages/MyMoniterCSS";
import AiElkLog from "./pages/AiElkLog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stackparse" element={<StackParse />} />
      <Route path="/mk" element={<MarkDown />} />
      <Route path="/mt" element={<MyMoniter onFilterChange={()=>{}} />} />
      <Route path="/mtcss" element={<MyMoniterCSS />} />
      <Route path="/aielk" element={<AiElkLog />} />
    </Routes>
  );
}

export default App;
