import React from 'react';
import { ImgError, stringToMoneyFormat } from 'Utils';

const Equip = ({ childrun }) => {
  return { childrun };
};

Equip.List = ({
  id,
  img,
  title,
  price,
  category,
  project,
  count,
  charger,
  onClick,
}) => {
  /* Router */
  /* State */
  /* Functions */
  const handleOnClick = () => {
    onClick(id);
  };
  /* Hooks */
  /* Render */
  return (
    <div
      className="equip-page-itembox-left-listbox"
      id={id}
      name={id}
      onClick={handleOnClick}
    >
      <div className="equip-page-itembox-left-list">
        <img
          className="equip-page-itembox-left-img"
          src={img}
          alt="img"
          onError={ImgError}
        />
        <div className="equip-page-itembox-left-info">
          <p className="equip-page-itembox-left-info-title">{title}</p>
          <p className="equip-page-itembox-left-info-property">
            {stringToMoneyFormat(price)}원 / {project} / {category} / {charger}
          </p>
        </div>
        <div className="equip-page-itembox-left-countbox">
          <p>{stringToMoneyFormat(count)}</p>
        </div>
      </div>
    </div>
  );
};

Equip.Text = ({ title, value, style }) => {
  return (
    <div className="equip-page-equipitem-box" style={style}>
      <p className="equip-page-equipitem-box-title">{title}</p>
      <p className="equip-page-equipitem-box-content">{value}</p>
    </div>
  );
};

Equip.Input = ({ title, name, value, style }) => {
  return (
    <div className="equip-page-equipitem-box" style={style}>
      <p className="equip-page-equipitem-box-title">{title}</p>
      <input
        className="equip-page-equipitem-box-input"
        type="text"
        name={name}
        placeholder={value}
        defaultValue={value}
      />
    </div>
  );
};

Equip.Img = ({ src }) => {
  return (
    <img
      className="equip-page-itembox-clickitembox-infobox-img"
      src={src}
      alt="img"
      onError={ImgError}
    />
  );
};

Equip.File = () => {
  return <input type="file" accept="image/*" />;
};

Equip.Detail = ({
  editOn,
  id,
  title,
  price,
  thumbnail,
  charger,
  project,
  qty,
}) => {
  /* Router */
  /* State */
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <div className="equip-page-itembox-right">
      <div className="equip-page-itembox-clickitembox">
        <div className="equip-page-itembox-clickitembox-titlebox">
          <p className="equip-page-itembox-clickitembox-title">제품 정보</p>
          <div className="equip-page-itembox-clickitembox-buttonbox">
            <p className="centerflex equip-page-itembox-clickitembox-button">
              인수
            </p>
            <p
              className="centerflex equip-page-itembox-clickitembox-button"
              onClick={editOn}
            >
              수정
            </p>
            <p className="centerflex equip-page-itembox-clickitembox-button">
              삭제
            </p>
          </div>
        </div>

        {/* 여기서 IF 써야됨 */}

        <div className="equip-page-itembox-clickitembox-infobox">
          <div className="equip-page-itembox-clickitembox-infobox-imgbox">
            <img
              className="centerflex equip-page-itembox-clickitembox-infobox-img"
              src={thumbnail}
              alt="img"
            />
          </div>
          <Equip.Text
            title="제품명"
            value={title}
            style={{
              paddingTop: '2%',
              borderTop: '1px solid #cccdd4',
            }}
          />
          <Equip.Text title="가격" value={stringToMoneyFormat(price)} />
          <Equip.Text title="프로젝트" value={project} />
          <Equip.Text title="소유자" value={charger} />
        </div>

        <div className="equip-page-itembox-clickitembox-changebox line">
          <Equip.Text title="수량" value={stringToMoneyFormat(qty)} />
        </div>

        {/* IF 종료 */}
      </div>
    </div>
  );
};

export default Equip;
