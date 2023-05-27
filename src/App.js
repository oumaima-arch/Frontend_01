import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import VisualizationComponent from "./components/VisualizationComponent";
import UploadComponent from "./components/upload";
// import Upload from "./components/upload_predict";

function App() {
  return (
    <BrowserRouter>
      <div>
        <UploadComponent />
        <Routes>
          {/*<Route exact path="/" element={<UploadComponent />} />*/}
          <Route exact path="/visualization" element={<VisualizationComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;