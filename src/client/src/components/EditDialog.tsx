import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { apiStatusMap, ApiTaskStatus, Task, TaskStatus } from 'global-types';
import { useEditTask } from 'hooks';
import { useState } from 'react';

type EditDialogProps = {
  task: Task;
  open: boolean;
  close: () => void;
};
type StatusOption = {
  value: ApiTaskStatus;
  label: TaskStatus;
};

const statusOptions: StatusOption[] = [
  {
    value: 'ACTIVE',
    label: 'active',
  },
  {
    value: 'COMPLETED',
    label: 'done',
  },
  {
    value: 'WORK',
    label: 'work',
  },
];

const EditDialog: React.FC<EditDialogProps> = ({ task, open, close }) => {
  const [name, setName] = useState(task.name);
  const [status, setStatus] = useState<ApiTaskStatus>(apiStatusMap.get(task.status) || 'ACTIVE');
  const { mutate: editTask } = useEditTask();

  const cancelHandler = () => {
    close();
    setName(task.name);
    setStatus(apiStatusMap.get(task.status) || 'ACTIVE');
  };
  const applyHandler = () => {
    editTask({ task, name, status });
    close();
  };
  const changeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };
  const changeStatusHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setStatus(event.target.value as ApiTaskStatus);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit task</DialogTitle>
      <DialogContent>
        <TextField
          value={name}
          onChange={changeNameHandler}
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          autoFocus
        />
        <TextField
          select
          value={status}
          onChange={changeStatusHandler}
          label="Status"
          variant="outlined"
          margin="normal"
          sx={{ textTransform: 'capitalize' }}
          fullWidth
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={applyHandler}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
