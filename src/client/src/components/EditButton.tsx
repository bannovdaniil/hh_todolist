import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const EditButton: React.FC<IconButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="Edit" disableInteractive>
      <IconButton size="small" onClick={onClick}>
        <EditOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
