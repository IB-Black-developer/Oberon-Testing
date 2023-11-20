import React from 'react';

const LoadingButton = ({ loading, onClick, buttonText }) => {
  return (
    <button disabled={loading} type="submit" onClick={onClick}>
      {loading ? (
        <div className="spinner-container"></div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default LoadingButton;
