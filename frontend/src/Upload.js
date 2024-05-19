import React, { useState } from "react";
import axios from "axios";

const Upload = ({ token }) => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.data.success);
      setErrors(response.data.data.errors);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload File</button>
      </form>
      {results && (
        <div>
          <h3>Successful Uploads</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                {result.name} - {result.email} - {result.age}
              </li>
            ))}
          </ul>
        </div>
      )}
      {errors.length > 0 && (
        <div>
          <h3>Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                Row {error.row}: {JSON.stringify(error.details)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;
