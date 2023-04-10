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
