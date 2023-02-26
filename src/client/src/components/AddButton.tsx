import AddTaskIcon from '@mui/icons-material/AddTask';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type AddButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick, loading = false }) => {
  return (
    <Tooltip title="Add new task" disableInteractive>
      <IconButton onClick={onClick} type="submit" disabled={loading} edge="end" size="small">
        {loading ? <CircularProgress size={20} color="inherit" /> : <AddTaskIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
export type { AddButtonProps };
