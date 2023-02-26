import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type ArrowButtonProps = { up: boolean } & IconButtonProps;

const ArrowButton: React.FC<ArrowButtonProps> = ({ up, onClick }) => {
  return (
    <Tooltip title="Details" disableInteractive>
      <IconButton size="small" onClick={onClick}>
        {up ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ArrowButton;
export type { ArrowButtonProps };
