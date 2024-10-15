import Capture from "./components/Capture";
import { ImageProvider } from "./contexts/ImageContext";

const App = () => {
  return (
    <ImageProvider>
      <Capture />
    </ImageProvider>
  );
};

export default App;
