import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StackParse from "./pages/StackParse";
import MarkDown from "./pages/MarkDown";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stackparse" element={<StackParse />} />
      <Route path="/mk" element={<MarkDown />} />
    </Routes>
  );
}

export default App;
