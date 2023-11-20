import React from "react";
import { BsCloudUpload } from "react-icons/bs"; 

const LogoUpload = ({ imageUrl, selectedFileErr, handleFileChange }) => {
  return (
    <div className="google-profile-upload-container">
      <label className="org-forms-label" htmlFor="file-input">
        Upload a Logo
      </label>

      <input id="file-input" onChange={handleFileChange} type="file" />

      <label className="file-input-label" htmlFor="file-input">
        {imageUrl ? (
          <img src={imageUrl} width="120px" height="120px" alt="image" />
        ) : null}
        <br />
        <BsCloudUpload
          style={
            selectedFileErr
              ? {
                  border: "red 2px solid",
                  backgroundColor: "#ff000025",
                  color: "red",
                }
              : null
          }
          className="upload-file-icon"
        />
        {selectedFileErr ? (
          <p style={selectedFileErr ? { color: "red" } : null}>
            {selectedFileErr}
          </p>
        ) : null}
      </label>
    </div>
  );
};

export default LogoUpload;
