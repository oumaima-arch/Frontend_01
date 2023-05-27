// import React, { useEffect, useRef } from 'react';
// import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
// import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
// import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
// import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader';
// import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps.json';
// import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
// import vtkLookupTable from 'vtk.js/Sources/Common/Core/LookupTable';
//
// function VisualizationComponent(props) {
//   const containerRef = useRef(null);
//
//   useEffect(() => {
//     const container = containerRef.current;
//
//     // Create a vtk.js renderer and render window
//     const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({ rootContainer: container });
//
//     // Load the VTP file using vtkXMLPolyDataReader
//     const reader = vtkXMLPolyDataReader.newInstance();
//     reader.setUrl('http://localhost:8080/refined_colored_file.vtp').then(() => {
//       reader.update();
//
//       // Get the vtk.js polydata object from the reader
//       const polydata = reader.getOutputData(0);
//
//       // Create a vtk.js mapper and actor from the polydata
//       const mapper = vtkMapper.newInstance();
//       mapper.setInputData(polydata);
//       const actor = vtkActor.newInstance();
//       actor.setMapper(mapper);
//
//       fullScreenRenderer.getRenderer().addActor(actor);
//
//       // // Apply a color map to the polydata
//       // const colorMap = vtkColorMaps['Rainbow'];
//       // const colorTransferFunction = vtkColorTransferFunction.newInstance();
//       // colorTransferFunction.applyColorMap(colorMap);
//       // const lookupTable = vtkLookupTable.newInstance();
//       // lookupTable.setMappingRange(polydata.getPointData().getScalars().getRange());
//       // lookupTable.setNumberOfTableValues(256);
//       // lookupTable.build();
//       // mapper.setLookupTable(lookupTable); // Apply the lookup table to the mapper
//       // mapper.setScalarRange(polydata.getPointData().getScalars().getRange());
//       // Apply a color map to the polydata
//       const polydataScalars = polydata.getPointData().getScalars();
//       const colorTransferFunction = vtkColorTransferFunction.newInstance();
//       colorTransferFunction.addRGBPoint(polydataScalars.getRange()[0], 0, 0, 1); // blue at minimum scalar value
//       colorTransferFunction.addRGBPoint(polydataScalars.getRange()[1], 1, 0, 0); // red at maximum scalar value
//       mapper.setLookupTable(colorTransferFunction);
//       mapper.setScalarRange(polydataScalars.getRange());
//
//       // Set up thecamera to view the 3D object
//       fullScreenRenderer.getRenderer().resetCamera();
//       fullScreenRenderer.getRenderer().resetCameraClippingRange();
//
//       // Render the scene
//       fullScreenRenderer.getRenderWindow().render();
//     });
//   }, []);
//
//   return (
//     <div ref={containerRef} />
//   );
// }
//
// export default VisualizationComponent;
import React, { useEffect, useRef } from 'react';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader';

function VisualizationComponent({ fileUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderer = vtkFullScreenRenderWindow.newInstance({
      background: [0, 0, 0],
      rootContainer: containerRef.current,
    }).getRenderer();

    const reader = vtkXMLPolyDataReader.newInstance();
    reader.setUrl(fileUrl);
    reader.loadData().then(() => {
      const polydata = reader.getOutputData(0);

      const mapper = vtkMapper.newInstance();
      mapper.setInputData(polydata);

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);

      const lut = vtkColorTransferFunction.newInstance();
      lut.addRGBPoint(0, 1, 0, 0);
      lut.addRGBPoint(1, 0, 0, 1);

      mapper.setLookupTable(lut);

      renderer.addActor(actor);
      renderer.resetCamera();
      renderer.getActiveCamera().zoom(1.5);
      renderer.resetCameraClippingRange();

      renderer.resetCamera();
      renderer.resetCameraClippingRange();
      renderer.resetCameraClippingRange();

      renderer.resetCamera();
      renderer.resetCameraClippingRange();
      renderer.resetCameraClippingRange();
    });

    return () => renderer.delete();
  }, [fileUrl]);

  return <div ref={containerRef} />;
}

export default VisualizationComponent;