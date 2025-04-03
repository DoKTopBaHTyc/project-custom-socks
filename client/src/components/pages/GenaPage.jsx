import React from 'react';
import GenaRightSide from '../ui/GenaRightSide';
import { Navigate } from 'react-router';

export default function GenaPage({ user }) {
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <GenaRightSide />
    </div>
  );
}
