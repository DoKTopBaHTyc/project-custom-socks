import React from 'react';
import GenaRightSide from '../ui/GenaRightSide';
import { Navigate } from 'react-router';
import BasicCubeScene from '../ui/scenes/BasicCubeScene';
import ColorPicker from '../ui/ColorPicker';
import { ColorContextProvider, useColorContext } from '../../context/ColorContext';
import { PatternContextProvider, usePatternContext } from '../../context/PatternContext';
import PatternPicker from '../ui/PatternPicker';
import BasicSockScene from '../ui/scenes/BasicSockScene';

function GenaPageContent() {
  const { selectedColor } = useColorContext();
  const { selectedPattern } = usePatternContext();

  return (
    <>
      <header className="App-header">
        <h3>customize</h3>
      </header>
      <span>
        <BasicSockScene />
      </span>
      <span>
        <ColorPicker />
      </span>
      {selectedColor && <div>Выбранный цвет: {selectedColor}</div>}
      <span>
        <PatternPicker />
      </span>
      {selectedPattern && (
        <div>Выбранный паттерн: {selectedPattern.url || 'Неизвестный паттерн'}</div>
      )}
      <div>GenaPage</div>
    </>
  );
}

export default function GenaPage({ user }) {
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <ColorContextProvider>
        <PatternContextProvider>
          <GenaRightSide />
          <GenaPageContent />
        </PatternContextProvider>
      </ColorContextProvider>
    </div>
  );
}
