import React from 'react';

export default function ColorButton({ color, onClick, size = 40 }) {

  const buttonStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: color,
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
  };

  return (
    <button
      style={buttonStyle}
      onClick={() => onClick && onClick(color)}
    />
  );
}
