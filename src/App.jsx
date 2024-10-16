import { Route, Routes } from "react-router-dom";
import Capture from "./components/Capture";
import Home from "./components/Home";
import { DataProvider } from "./contexts/DataContext";

const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/capture"} element={<Capture />} />
      </Routes>
    </DataProvider>
  );
};

export default App;
