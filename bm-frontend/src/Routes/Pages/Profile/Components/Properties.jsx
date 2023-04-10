import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AiFillQuestionCircle } from 'react-icons/ai';

const Properties = ({ title = 'title', children }) => {
  return (
    <div className="profile-properties-container">
      <h3>{title}</h3>
      <hr />
      <div className="profile-details-container">{children}</div>
    </div>
  );
};

Properties.Button = ({ fieldTitle }) => {
  return (
    <div className="property-button">
      <span className="property-button-span">{fieldTitle}</span>
    </div>
  );
};

Properties.Input = ({
  fieldTitle = 'title',
  name,
  value,
  setValue,
  desc = null,
  size = 'small',
  variant = 'outlined',
  style = { width: '100%' },
  property,
  disabled = false,
  multiline = true,
  rows,
  h5style,
}) => {
  const handleValue = (e) => {
    if (!setValue) {
      return;
    }
    setValue(e.target.name, e.target.value);
  };
  return (
    <div className="field-container">
      <h5 style={h5style}>{fieldTitle}</h5>
      <div className="property-field">
        <TextField
          disabled={disabled}
          label={name}
          name={property}
          variant={variant}
          size={size}
          helperText={desc}
          style={style}
          value={value}
          onChange={handleValue}
          multiline={multiline}
          rows={rows}
        ></TextField>
      </div>
    </div>
  );
};

Properties.Select = ({
  fieldTitle,
  name,
  property,
  value = '',
  setValue,
  style,
  disabled = false,
  render,
}) => {
  const handleValue = (e) => {
    if (!setValue) {
      return;
    }
    setValue(e.target.value);
  };

  const renderMenus =
    render &&
    render.map((item) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });

  return (
    <div className="field-container">
      <h5>{fieldTitle}</h5>
      <div className="property-field">
        <FormControl fullWidth>
          <InputLabel>{fieldTitle}</InputLabel>
          <Select
            name={property}
            value={value}
            label={name}
            onChange={handleValue}
            style={style}
            disabled={disabled}
          >
            {render ? renderMenus : <MenuItem value="0">선택</MenuItem>}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

// 제일 상단 Header ( MainTitle, SubTitle 입력 후 출력 )
// 이미 만들어져있는걸 사용하기 위해 굳이 새로 만들지 않음
Properties.Header = ({ fieldTitle, name }) => {
  return (
    <div className="property-header-main">
      <div className="property-header-main-div">
        <span className="property-header-main-div-top">{name}</span>
      </div>
      <div className="property-header-main-div">
        <span className="property-header-main-div-bottom">{fieldTitle}</span>
      </div>
    </div>
  );
};

// 정보 Box ( ex: ProfilePage- 유저 정보, 이메일 알림 )
Properties.Box = ({
  fieldTitle,
  children,
  help,
  style,
  value = '',
  setValue = '',
}) => {
  const handleChangeState = () => {
    console.log('CLICK');
    setValue(!value);
  };

  return (
    <div className="property-box-main" style={style}>
      <div className="property-box-main-title">
        <span>{fieldTitle}</span>
        {help && (
          <div className="property-box-main-title-help">
            {/* 얘를 눌르면 Alert 동작 */}
            <AiFillQuestionCircle
              className="property-box-main-title-help-icon"
              onClick={handleChangeState}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

// 외부영역 클릭 처리 해야함
Properties.Alert = ({
  Header,
  Title,
  Sub,
  clickHelp = false,
  setValue,
  clickRef = '',
}) => {
  const handleChangeState = (e) => {
    console.log('current');
    console.log(clickRef.current);
    console.log('TARGET');
    console.log(e.target);
    console.log(clickRef.current.contains(e.target));

    if (clickRef && clickRef.current.contains(e.target)) {
      console.log('UP');
    } else {
      console.log('DOWN');
    }
    setValue(!clickHelp);
  };
  return (
    clickHelp && (
      <div
        className="property-alertbox"
        ref={clickRef}
        onClick={handleChangeState}
      >
        {/* 외부영역 */}
        <div className="property-alert">
          {/* 내부영역 */}
          <div className="property-alert-header">
            <span className="property-alert-header-span property-alert-span">
              {Header}
            </span>
            <span
              className="property-alert-header-span property-alert-span cursor"
              onClick={handleChangeState}
            >
              X
            </span>
          </div>
          <div className="property-alert-body flexcolumn">
            <span className="property-alert-span">{Title}</span>
            <span className="property-alert-body-bottomspan">{Sub}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Properties;
