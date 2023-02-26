import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const DeleteButton: React.FC<IconButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="Delete" disableInteractive>
      <IconButton size="small" onClick={onClick}>
        <DeleteOutlineIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
