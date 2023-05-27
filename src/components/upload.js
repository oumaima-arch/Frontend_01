import React, { useState } from 'react';
import axios from 'axios';
import VisualizationComponent from './VisualizationComponent';

function UploadComponent() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const handleFileUpload = (event) => {
  setFile(event.target.files[0]);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('file', file);
  setUploading(true);
  setMessage('');

  try {
    const response = await axios.post('http://127.0.0.1:8000/model/upload-file-segment-refined/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    });

    const file = new Blob([response.data], { type: 'application/octet-stream' });
    const fileUrl = URL.createObjectURL(file);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'refined_colored_file.vtp';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(fileUrl);
    setFileUrl(fileUrl);
    setMessage('File downloaded successfully');
    setShowVisualization(true);
    } catch (error) {
      console.error('Error downloading file:', error);
      setMessage('Error downloading file');
    } finally {
      setUploading(false);
    }
  };
  const handleShowVisualization = () => {
  setShowVisualization(true);
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {message && <div>{message}</div>}
      {showVisualization && fileUrl && <VisualizationComponent fileUrl={fileUrl} />}
      {fileUrl && <button onClick={handleShowVisualization}>Visualize</button>}
    </div>
  );
}

export default UploadComponent;