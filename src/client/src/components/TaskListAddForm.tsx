import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { SxProps } from '@mui/system';
import AddButton from 'components/AddButton';
import { useAddTask } from 'hooks';
import { useState } from 'react';

const formStyle: SxProps = {
  minWidth: 180,
  width: 300,
};

const TaskListAddForm: React.FC = () => {
  const [name, setName] = useState('');
  const { mutate: addTask, isLoading } = useAddTask();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (name !== '') {
      addTask(name);
      setName('');
    }
  };

  return (
    <FormControl component="form" onSubmit={submitHandler} sx={formStyle} variant="outlined" size="small">
      <InputLabel htmlFor="add-new-task-input">New task name</InputLabel>
      <OutlinedInput
        value={name}
        onChange={changeHandler}
        id="add-new-task-input"
        endAdornment={
          <InputAdornment position="end">
            <AddButton loading={isLoading} />
          </InputAdornment>
        }
        label="New task name"
        autoComplete="off"
      />
    </FormControl>
  );
};

export default TaskListAddForm;
