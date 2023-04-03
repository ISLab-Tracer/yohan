import { Box, Button, Divider } from '@mui/material';
import { PageHeader } from 'Components';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'equipment_nm',
    headerName: '제품명',
    width: 200,
    editable: true,
  },
  {
    field: 'equipment_price',
    headerName: '제품 가격',
    width: 150,
    editable: true,
  },
  {
    field: 'category',
    headerName: '카테고리명',
    width: 150,
    editable: true,
  },
  {
    field: 'user',
    headerName: '사용자',
    width: 150,
    editable: true,
  },
  {
    field: 'team',
    headerName: '팀명',
    width: 150,
    editable: true,
  },
  {
    field: 'created',
    headerName: '등록일자',
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    equipment_nm: '장비명',
    equipment_price: '10,000',
    category: '카테고리',
    user: '오시몬',
    team: '블록체인',
    created: '2023-03-28',
  },
  {
    id: 2,
    equipment_nm: '장비명',
    equipment_price: '10,000',
    category: '카테고리',
    user: '오시몬',
    team: '블록체인',
    created: '2023-03-28',
  },
];

const EquipmentDataPresenter = () => {
  return (
    <div className="main-content-container">
      <PageHeader
        title="제품"
        subTitle="데이터 관리"
        right={
          <>
            <Button variant="outlined" size="middium" sx={{ marginRight: 1 }}>
              액셀 내보내기
            </Button>
            <Button variant="outlined" size="middium">
              액셀 가져오기
            </Button>
          </>
        }
      />
      <Divider sx={{ marginTop: 1, marginBottom: 3 }} />
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
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
          //   onRowSelectionModelChange={(id) => handleSelect(id)}
        />
      </Box>
    </div>
  );
};

export default EquipmentDataPresenter;
