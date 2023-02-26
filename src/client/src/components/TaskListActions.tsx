import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMediaQuery } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import AppMenu from 'components/AppMenu';
import DeleteButton from 'components/DeleteButton';
import EditButton from 'components/EditButton';
import EditDialog from 'components/EditDialog';
import { Task } from 'global-types';
import { useDeleteTask } from 'hooks';
import { useState } from 'react';

type TaskListActionsProps = {
  task: Task;
};

const TaskListActions: React.FC<TaskListActionsProps> = ({ task }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = useState(false);
  const { mutate: deleteTask } = useDeleteTask();

  const deleteHandler = () => {
    deleteTask(task);
  };
  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  if (matches) {
    return (
      <>
        <Stack direction="row" spacing={0.5}>
          <EditButton onClick={openHandler} />
          <DeleteButton onClick={deleteHandler} />
        </Stack>
        <EditDialog task={task} open={open} close={closeHandler} />
      </>
    );
  }
  return (
    <>
      <AppMenu tooltipTitle="Task actions" icon={<MoreVertIcon />}>
        <MenuItem onClick={openHandler} dense>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={deleteHandler} dense>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </AppMenu>
      <EditDialog task={task} open={open} close={closeHandler} />
    </>
  );
};

export default TaskListActions;
export type { TaskListActionsProps };
