import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../Layout';
import {
  Assignment,
  Attributes,
  Barcode,
  Equipment,
  EquipmentData,
  EquipmentRegister,
  Main,
} from './Pages';

const index = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="equipment">
          <Route index element={<Equipment />} />
          <Route path="register" element={<EquipmentRegister />} />
        </Route>
        <Route path="attributes" element={<Attributes />} />
        <Route path="equipmentdata" element={<EquipmentData />} />
        <Route path="assignment" element={<Assignment />} />
        <Route path="barcode" element={<Barcode />} />
      </Route>
    </Routes>
  );
};

export default index;
