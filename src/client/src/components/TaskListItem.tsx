import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SxProps } from '@mui/system';
import ArrowButton from 'components/ArrowButton';
import Details from 'components/Details';
import StatusChip from 'components/StatusChip';
import TaskListActions from 'components/TaskListActions';
import { Task } from 'global-types';
import { useState } from 'react';

type TaskListItemProps = {
  task?: Task;
  loading?: boolean;
};

const itemStyles: SxProps = {
  '& > th,td': { py: 1.5, borderBottom: 'unset', height: [48, 66] },
  '& > td': {
    width: '1%',
  },
  '& > th': {
    maxWidth: 100,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  '& > td:first-of-type': {
    py: [0, 2],
    pr: [0, 2],
    pl: [0.5, 2],
  },
  '& > td:last-of-type': {
    py: [0, 2],
    pl: [0, 2],
    pr: [0.5, 2],
  },
};

const emptyStyles = {
  '& > th,td': { py: 1.5, height: [48, 66], color: 'text.secondary' },
};

const TaskListItem: React.FC<TaskListItemProps> = ({ task, loading = false }) => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  if (loading) {
    return (
      <TableRow sx={emptyStyles}>
        <TableCell colSpan={4} align="center" sx={{ lineHeight: 0 }}>
          <CircularProgress size={30} />
        </TableCell>
      </TableRow>
    );
  }

  if (task == null) {
    return (
      <TableRow sx={emptyStyles}>
        <TableCell colSpan={4} align="center">
          <Typography component="em" variant="body2">
            Empty
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableRow sx={itemStyles}>
        <TableCell>
          <ArrowButton up={open} onClick={openHandler} />
        </TableCell>
        <TableCell component="th" scope="row">
          {task.name}
        </TableCell>
        <TableCell align="center">
          <StatusChip status={task.status} />
        </TableCell>
        <TableCell>
          <TaskListActions task={task} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} padding="none">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Details task={task} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TaskListItem;
export type { TaskListItemProps };
