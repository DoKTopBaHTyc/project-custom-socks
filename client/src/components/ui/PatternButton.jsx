import React from 'react';

export default function PatternButton({ pattern, onClick, size = 40 }) {
  const buttonStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    // backgroundColor: pattern,
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  };

  return (
    <button
      style={buttonStyle}
      onClick={() => {
        console.log('Клик по паттерну:', pattern);
        onClick && onClick();
      }}
    >
      {pattern?.url && (
        <img src={`data/${pattern.url}`} alt="Pattern" style={imageStyle} />
      )}
    </button>
  );
}
