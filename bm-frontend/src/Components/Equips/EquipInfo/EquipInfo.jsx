import React from 'react';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import './equipinfo.css';
import { stringToMoneyFormat } from '../../../Utils/index';

const EqipInfo = ({ title = 'title', children }) => {
  return (
    <div className="eqipInfo-container">
      <h3>{title}</h3>
      <hr />
      <div className="profile-details-container">{children}</div>
    </div>
  );
};

EqipInfo.Input = ({
  label = 'title',
  name,
  value,
  setValue,
  desc = null,
  size = 'small',
  variant = 'outlined',
  style,
  property,
  disabled = false,
  multiline = false,
  type = 'text',
}) => {
  const handleValue = (e) => {
    if (!setValue) {
      return;
    }
    setValue(e.target.name, e.target.value);
  };

  const textArea = multiline
    ? {
        multiline: true,
        minRows: 10,
        maxRows: 10,
      }
    : {};

  const val = type === 'number' ? stringToMoneyFormat(value) : value;
  return (
    <div className="field-container">
      <h5>{label}</h5>
      <div className="property-feild">
        <TextField
          disabled={disabled}
          label={name}
          name={property}
          variant={variant}
          size={size}
          helperText={desc}
          style={style}
          fullWidth={true}
          value={val}
          onChange={handleValue}
          {...textArea}
        />
      </div>
    </div>
  );
};

EqipInfo.Select = ({
  label = 'label',
  name,
  property,
  value,
  setValue,
  style,
  disabled = false,
  items = [],
  render,
}) => {
  const handleValue = (e) => {
    if (!setValue) {
      return;
    }
    setValue(e.target.name, e.target.value);
  };

  const renderMenus = render
    ? items.map(render)
    : items.map((item) => {
        return (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        );
      });

  return (
    <div className="field-container">
      <h5>{label}</h5>
      <div className="property-feild">
        <FormControl fullWidth>
          <Select
            name={property}
            value={value}
            onChange={handleValue}
            style={style}
            disabled={disabled}
            defaultValue=""
          >
            <MenuItem disabled value="">
              선택
            </MenuItem>
            {render && renderMenus}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default EqipInfo;
