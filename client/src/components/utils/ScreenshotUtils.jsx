import React from 'react';

export default function captureScreenshot(renderer) {
  return renderer.domElement.toDataURL('image/png');
}
