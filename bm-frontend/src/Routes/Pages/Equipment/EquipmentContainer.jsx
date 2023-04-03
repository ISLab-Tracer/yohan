import { EquipAPI } from 'API';
import React, { useCallback, useEffect, useState } from 'react';
import EquipmentPresenter from './EquipmentPresenter';

const EquipmentContainer = () => {
  /* Router */

  /* State */
  const [equipList, setEquipList] = useState();

  // Main 에서 사용
  // 품목 개수가 0일 경우 == true
  const zeroItem = equipList ? (equipList.length === 0 ? true : false) : true;

  // 전체 리스트에서 물품 클릭

  const [itemid, setItemid] = useState(false);
  // Main 에서 사용
  /* Functions */
  const handleOnClick = (id) => {
    // 제품 목록 클릭시
    if (id === itemid) {
      setItemid(false);
      return;
    }
    setItemid(id);
  };

  const editOn = () => {
    //setMode( false );
  };

  const handleGetEquipmentList = useCallback(async () => {
    const result = await EquipAPI.getEquipList();
    if (result) {
      setEquipList(result);
      // setEquipList(initial);
      return true;
    }

    return false;
  }, []);
  /* Hooks */
  useEffect(() => {
    handleGetEquipmentList();
  }, [handleGetEquipmentList]);

  /* Render */
  return (
    equipList && (
      <EquipmentPresenter
        equipList={equipList}
        zeroItem={zeroItem}
        itemid={itemid}
        handleOnClick={handleOnClick}
        editOn={editOn}
      />
    )
  );
};

export default EquipmentContainer;

// const initial = [
//   {
//     equipment_id: 1,
//     equipment_nm: 'Monitor',
//     equipment_price: '1000',
//     category: {
//       category_id: '1',
//       category_nm: '소모품',
//     },
//     team: {
//       team_id: '1',
//       team_nm: 'Blockchain',
//     },
//     equipment_thumbnail:
//       'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c48f324a0b9c48f77dbce3a43bd11ce785',
//     equipment_qty: 11,
//     barcode: '11111',
//     user: {
//       user_id: '1',
//       user_nm: '조욱',
//     },
//   },
//   {
//     equipment_id: 2,
//     equipment_nm: 'Mouse',
//     equipment_price: '2000',
//     category: {
//       category_id: '1',
//       category_nm: '소모품',
//     },
//     team: {
//       team_id: '2',
//       team_nm: 'Hardware',
//     },
//     equipment_thumbnail:
//       'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c49f5287469802eca457586a25a096fd31',
//     equipment_qty: 0,
//     barcode: '22222',
//     user: {
//       user_id: '2',
//       user_nm: '오경우',
//     },
//   },
//   {
//     equipment_id: 3,
//     equipment_nm: 'KeyBoard',
//     equipment_price: '3000',
//     category: {
//       category_id: '1',
//       category_nm: '소모품',
//     },
//     team: {
//       team_id: '1',
//       team_nm: 'Blockchain',
//     },
//     equipment_thumbnail:
//       'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c46fb33a4b4cf43b6605fc7a1e262f0845',
//     equipment_qty: 3,
//     barcode: '33333',
//     user: {
//       user_id: '3',
//       user_nm: '오시몬',
//     },
//   },
//   {
//     equipment_id: 4,
//     equipment_nm: 'Phone',
//     equipment_price: '4000',
//     category: {
//       category_id: '1',
//       category_nm: '소모품',
//     },
//     team: {
//       team_id: '1',
//       team_nm: 'Blockchain',
//     },
//     equipment_thumbnail:
//       'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c415b3f4e3c2033bfd702a321ec6eda72c',
//     equipment_qty: 0,
//     barcode: '44444',
//     user: {
//       user_id: '4',
//       user_nm: '김요한',
//     },
//   },
//   {
//     equipment_id: 5,
//     equipment_nm: 'Desk',
//     equipment_price: '5000',
//     category: {
//       category_id: '1',
//       category_nm: '소모품',
//     },
//     team: {
//       team_id: '1',
//       team_nm: 'Blockchain',
//     },
//     equipment_thumbnail:
//       'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c4960f4ab09fe6e38bae8c63030c9b37f9',
//     equipment_qty: 5,
//     barcode: '55555',
//     user: {
//       user_id: '5',
//       user_nm: '정한호',
//     },
//   },
//   {
//     equipment_id: 6,
//     equipment_nm: 'Chair',
//     equipment_price: '6000',
//     category: {
//       category_id: '1',
//       category_nm: '소모품',
//     },
//     team: {
//       team_id: '1',
//       team_nm: 'Blockchain',
//     },
//     equipment_thumbnail:
//       'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c48b566dca82634c93f811198148a26065',
//     equipment_qty: 1,
//     barcode: '6666',
//     user: {
//       user_id: '6',
//       user_nm: '조재한',
//     },
//   },
// ];
