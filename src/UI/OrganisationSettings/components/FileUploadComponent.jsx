import React from 'react';
import { BsCloudUpload } from 'react-icons/bs';

const FileUploadComponent = ({
  onChange,
  id,
  imageUrl,
  kycUploadErr,
  kycDocumentsLocation,
}) => {
  return (
    <div className="CAC-container">
      <label className="CAC-label">
        Upload your company's registration certificate
        <span className="CAC-required">**</span>
      </label>
      <input
        onChange={onChange}
        id={id}
        className="CAC-file-input"
        type="file"
      />
      <label
        style={
          kycUploadErr
            ? {
                border: "red 2px solid",
                backgroundColor: "#ff000025",
                color: "red",
              }
            : null
        }
        htmlFor={id}
        className="CAC-custom-label"
      >
        <br /> <BsCloudUpload style={kycUploadErr ? { color: "red" } : null} />
      </label>
      {imageUrl ? (
        <img
          src={imageUrl}
          width="120px"
          height="120px"
          alt="uploaded image"
          style={{
            marginTop: 12,
            borderRadius: 12,
          }}
        />
      ) : null}

      {kycDocumentsLocation ? (
        <img
          src={kycDocumentsLocation}
          width="120px"
          height="120px"
          alt="default image"
        />
      ) : null}
      {kycUploadErr ? (
        <p style={kycUploadErr ? { color: "red", marginTop: 0 } : null}>
          {kycUploadErr}
        </p>
      ) : null}
    </div>
  );
};

export default FileUploadComponent;
