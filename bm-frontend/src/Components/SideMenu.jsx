import React, { useState } from 'react';
import ImportantDevicesOutlinedIcon from '@mui/icons-material/ImportantDevicesOutlined';
import { useNavigate } from 'react-router-dom';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { styled } from '@mui/material/styles';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

const StyledList = styled(List)({
  // selected and (selected + hover) states
  '&& .Mui-selected, && .Mui-selected:hover': {
    backgroundColor: '#edefff',
    '&, & .MuiListItemIcon-root': {
      color: '#4f67ff',
    },
  },
  // hover states
  '& .MuiListItemButton-root:hover': {
    backgroundColor: '#edefff',
    '&, & .MuiListItemIcon-root': {
      color: '#4f67ff',
    },
  },
});

const SideMenu = () => {
  /* Router */
  /* State */
  const navigate = useNavigate();
  const [selected, setSelected] = useState('equipment');
  const [open, setOpen] = useState(true);
  /* Hooks */
  /* Functions */
  const handleListClick = (e) => {
    setSelected(e.currentTarget.id);
    navigate(`/${e.currentTarget.id}`);
  };
  const handleOpenList = () => {
    setOpen(!open);
  };
  /* Render */
  return (
    <div className="sidemenu-container">
      <nav>
        <StyledList
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ width: '100%', textAlign: 'center' }}
            >
              ISLab 기자재 관리
            </ListSubheader>
          }
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItemButton
            sx={{ width: '100%' }}
            selected={selected === 'equipment'}
            id="equipment"
            onClick={(e) => handleListClick(e)}
          >
            <ListItemIcon>
              <ImportantDevicesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="기자재 조회" />
          </ListItemButton>
          <ListItemButton sx={{ width: '100%' }} onClick={handleOpenList}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="데이터 관리" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                id="equipmentdata"
                selected={selected === 'equipmentdata'}
                onClick={(e) => handleListClick(e)}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="제품" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                id="attributes"
                selected={selected === 'attributes'}
                onClick={(e) => handleListClick(e)}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="카테고리" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                id="assignment"
                selected={selected === 'assignment'}
                onClick={(e) => handleListClick(e)}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="과제" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            sx={{ width: '100%' }}
            selected={selected === 'barcode'}
            id="barcode"
            onClick={(e) => handleListClick(e)}
          >
            <ListItemIcon>
              <ImportantDevicesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="바코드 테스트" />
          </ListItemButton>
        </StyledList>
      </nav>
    </div>
  );
};

export default SideMenu;
