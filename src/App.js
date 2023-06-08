import React, { useState } from 'react';
import ThreeScene from './components/visualize';
import VTKViewer from './components/vtkviewer';
import './App.css';


function App() {
  const [fileType, setFileType] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file.name.endsWith('.obj') || file.name.endsWith('.stl')) {
      setFileType('3D');
    } else if (file.name.endsWith('.vtp')) {
      setFileType('VTK');
    // } else if (file.name.endsWith('.stl')){
    //   setFileType('STL');
    } else {
      setFileType('');
    }

    setFileUploaded(true);
  };

  return (
    <div className="container">
      {/* ... */}
      <section className="visualizer">

        {/*<h2>Upload, Display, and Predict Models</h2>*/}
        {!fileUploaded && (
          <input type="file" accept=".obj,.stl,.vtp" onChange={handleFileUpload} />
        )}

        {fileType === '3D' && <ThreeScene />}
        {fileType === 'VTK' && <VTKViewer />}


      </section>
      {/* ... */}
      {/*<GeometryViewer file="D:/Téléchargements/out_downsampling_refined_colored.vtp" />*/}
    </div>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
//  import VisualizationComponent from "./components/VisualizationComponent";
// import UploadComponent from "./components/upload";
// // import Upload from "./components/upload_predict";
//
// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <UploadComponent />
//         <Routes>
//           {/*<Route exact path="/" element={<UploadComponent />} />*/}
//           <Route exact path="/visualization" element={<VisualizationComponent />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }
//
// export default App;