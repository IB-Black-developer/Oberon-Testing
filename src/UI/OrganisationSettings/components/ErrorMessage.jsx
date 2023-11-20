import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <p style={message ? { color: 'red', marginTop: 0 } : null}>
      {message}
    </p>
  );
};

export default ErrorMessage;
