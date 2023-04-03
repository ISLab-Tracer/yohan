import { PageHeader } from 'Components';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'attribute',
    headerName: '속성명',
    width: 200,
    editable: true,
  },
  {
    field: 'type',
    headerName: '종류',
    width: 200,
    editable: true,
  },
  {
    field: 'desc',
    headerName: '설명',
    width: 300,
    editable: true,
  },
];

const rows = [
  { id: 1, type: '텍스트', attribute: '과제명', desc: '설명입니다.' },
  { id: 2, type: '텍스트', attribute: '구매자', desc: '설명입니다.' },
];

const AttributesPresenter = () => {
  /* Router */
  /* State */
  const [data, setData] = useState(rows);
  const [selectId, setSelectId] = useState();
  /* Hooks */
  /* Functions */
  /**
   * row 추가
   */
  const handleAttributeAdd = () => {
    const item = {
      id: data.length + 1,
      type: '',
      attribute: '',
      desc: '',
    };
    setData([...data, item]);
  };
  /**
   * 선택항목 삭제
   */
  const handleRemoveAttribute = () => {
    const result = data.filter((i) => !selectId.includes(i.id));
    setData(result);
  };
  /**
   * 선택 항목 담기
   * @param {*} id
   */
  const handleSelect = (id) => {
    setSelectId(id);
  };
  /* Render */
  return (
    <div className="main-content-container">
      <PageHeader
        title="속성"
        subTitle="데이터 관리"
        right={
          <>
            <Button
              variant="outlined"
              size="middium"
              onClick={handleAttributeAdd}
              sx={{ marginRight: 1 }}
            >
              속성 추가
            </Button>
            <Button
              variant="outlined"
              size="middium"
              onClick={handleRemoveAttribute}
            >
              선택항목 삭제
            </Button>
          </>
        }
      />
      <Divider sx={{ marginTop: 1, marginBottom: 3 }} />
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(id) => handleSelect(id)}
        />
      </Box>
    </div>
  );
};

export default AttributesPresenter;
