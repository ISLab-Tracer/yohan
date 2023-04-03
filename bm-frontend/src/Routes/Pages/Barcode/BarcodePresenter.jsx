import { Button } from '@mui/material';
import { EquipInfo } from 'Components';
import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { QRCodeCanvas } from 'qrcode.react';

const BarcodePresenter = () => {
  /* Router */
  /* State */
  const [barcode, setBarcode] = useState();
  /* Hooks */
  /* Functions */
  const handleCreateBarcode = () => {
    let num = '';
    for (let i = 0; i < 13; i++) {
      num += Math.floor(Math.random() * 10);
    }
    setBarcode(num);
  };
  /* Render */
  return (
    <div className="main-content-container">
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <EquipInfo.Input label="바코드" value={barcode} />
        <Button
          variant="outlined"
          size="small"
          sx={{ width: 100, height: 40 }}
          onClick={handleCreateBarcode}
        >
          자동생성
        </Button>
      </div>
      <Barcode value={barcode} />
      <hr style={{ marginBottom: 30 }} />
      <QRCodeCanvas value={`http://10.0.4.200:3333/${barcode}`} />
    </div>
  );
};

export default BarcodePresenter;
