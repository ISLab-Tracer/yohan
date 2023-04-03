import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PCreateEquip from './PCreateEquip';

const EquipPlayground = () => {
  return (
    <Routes>
      <Route index element={<PCreateEquip />} />
    </Routes>
  );
};

export default EquipPlayground;
