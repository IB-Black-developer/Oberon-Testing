import React from 'react';

const ConditionalStyle = ({ condition, styleIfTrue, additionalStyles, children }) => {
  const combinedStyles = condition ? { ...styleIfTrue, ...additionalStyles } : null;

  return <div style={combinedStyles}>{children}</div>;
};

export default ConditionalStyle;
