import React, { useState, useRef } from 'react';
import Equip from './../Components/Equip';

const EquipCreate = (props) => {
  /* Router */

  /* State */
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState('');

  /* Functions */
  const handleFileClick = () => {
    // 이미지 클릭시 input file 클릭
    imgRef.current.click();
  };

  const handleChangeFile = () => {
    // input file에서 사진 선택하면 img 변경( 미리 보기 )
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  /* Hooks */

  /* Render */

  return (
    <div>
      <div className="equip-page-itembox-clickitembox-infobox">
        <input
          type="file"
          accept="image/*"
          className="equip-component-file"
          onChange={handleChangeFile}
          ref={imgRef}
        />

        <div
          className="centerflex equip-page-itembox-clickitembox-infobox-imgbox"
          onClick={handleFileClick}
        >
          <Equip.Img src={imgFile} alt="img" />
        </div>

        <Equip.Input
          title="제품명"
          name=""
          value=""
          style={{ paddingTop: '2%', borderTop: '1px solid #cccdd4' }}
        />

        <Equip.Input title="바코드" name="" value="" />

        <Equip.Input title="가격" name="" value="" />

        <Equip.Input title="소유자" name="" value="" />

        <Equip.Input title="팀" name="" value="" />

        <Equip.Input
          title="수량"
          name=""
          value=""
          style={{ paddingTop: '2%', borderTop: '1px solid #cccdd4' }}
        />

        <div className="equip-page-equipitem-edit-buttonbox">
          <p className="equip-page-equipitem-edit-button equip-page-equipitem-button-left">
            등록
          </p>
          <p className="equip-page-equipitem-edit-button equip-page-equipitem-button-right">
            취소
          </p>
        </div>
      </div>
    </div>
  );
};

export default EquipCreate;
