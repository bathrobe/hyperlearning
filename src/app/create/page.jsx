'use client';
import { useState } from 'react';

export default function UploadPdf() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submitted');
    // const formData = new FormData();
    // formData.append('file', file);

    const response = await fetch('/api/hello');
    console.log('get req', response);
    const extractedContent = await response.json();
    console.log(extractedContent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">Upload a PDF file:</label>
      <input
        type="file"
        id="file"
        name="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
