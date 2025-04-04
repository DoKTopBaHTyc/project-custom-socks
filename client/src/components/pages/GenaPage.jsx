import React from 'react';
import GenaRightSide from '../ui/GenaRightSide';
import { Navigate } from 'react-router';
import BasicCubeScene from '../ui/scenes/BasicCubeScene';
import ColorPicker from '../ui/ColorPicker';
import { ColorContextProvider, useColorContext } from '../../context/ColorContext';
import { PatternContextProvider, usePatternContext } from '../../context/PatternContext';
import PatternPicker from '../ui/PatternPicker';
import BasicSockScene from '../ui/scenes/BasicSockScene';
import { Col, Row } from 'react-bootstrap';

function GenaPageContent() {
  const { selectedColor } = useColorContext();
  const { selectedPattern } = usePatternContext();

  return (
    <>
      <header
        className="App-header"
        style={{ justifySelf: 'center', marginTop: '0.6rem' }}
      >
        <h3>Превью носка</h3>
      </header>
      <span>
        <BasicSockScene />
      </span>
    </>
  );
}

export default function GenaPage({ user }) {
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <ColorContextProvider>
        <PatternContextProvider>
          <Row style={{ paddingInline: '5rem', marginTop: '2rem' }}>
            <Col
              md={6}
              style={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                paddingBottom: '2rem',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease',
                marginBottom: '2rem', // Добавляем отступ снизу для мобильных устройств
              }}
            >
              <GenaPageContent />
            </Col>
            <Col md={6}>
              <GenaRightSide />
            </Col>
          </Row>
        </PatternContextProvider>
      </ColorContextProvider>
    </div>
  );
}
