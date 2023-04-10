import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginLayout, MainLayout, PlaygroundLayout } from '../Layout';
import {
  Assignment,
  Attributes,
  Barcode,
  Equipment,
  EquipmentData,
  EquipmentRegister,
  Login,
  Main,
  Profile,
  SignUp,
} from './Pages';
import EquipPlayground from './Pages/Playground/equip';

const index = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="profile" element={<Profile />} />
        <Route path="equipment">
          <Route index element={<Equipment />} />
          <Route path="register" element={<EquipmentRegister />} />
        </Route>
        <Route path="attributes" element={<Attributes />} />
        <Route path="equipmentdata" element={<EquipmentData />} />
        <Route path="assignment" element={<Assignment />} />
        <Route path="barcode" element={<Barcode />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />}>
          <Route index element={<Login />} />
          <Route path=":login_id" element={<Login />} />
        </Route>
        <Route path="/register">
          <Route index element={<SignUp />} />
          <Route path=":signup_id" element={<SignUp />} />
        </Route>
      </Route>

      <Route path="/playground" element={<PlaygroundLayout />}>
        <Route path="equipment" element={<EquipPlayground />} />
      </Route>
    </Routes>
  );
};

export default index;
