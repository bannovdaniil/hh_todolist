import Box from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

type AppMenuProps = {
  tooltipTitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: MenuProps['variant'];
  IconButtonProps?: Omit<IconButtonProps, 'children'>;
};

const AppMenu: React.FC<AppMenuProps> = ({ variant = 'menu', tooltipTitle, children, icon, IconButtonProps }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title={tooltipTitle} disableInteractive>
        <IconButton onClick={openHandler} size="small" {...IconButtonProps}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        variant={variant}
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        onClick={closeHandler}
        elevation={2}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {children}
      </Menu>
    </Box>
  );
};

export default AppMenu;
