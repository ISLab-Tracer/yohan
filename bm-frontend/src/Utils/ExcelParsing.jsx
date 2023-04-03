import React from 'react';
import * as XLSX from 'xlsx';

const ExcelParsing = ({ setField, setRow, target } = props) => {
  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rowData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
    const fieldHeader = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    setField(fieldHeader);
    setRow(rowData);
  };
  /* Hooks */
  /* Render */
};

export default ExcelParsing;
