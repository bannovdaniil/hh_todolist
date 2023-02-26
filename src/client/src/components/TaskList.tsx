import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { isEmptyArray } from 'common/array-helpers';
import TaskListAddForm from 'components/TaskListAddForm';
import TaskListFilter from 'components/TaskListFilter';
import TaskListHead from 'components/TaskListHead';
import TaskListItem from 'components/TaskListItem';
import { isFilterOption, Task } from 'global-types';
import { useGetTasks } from 'hooks';
import { useState } from 'react';

const TaskList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [{ data: tasks, isLoading }, filter, changeFilter] = useGetTasks();

  const changePageHandler = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const changeRowsPerPageHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const changeFilterHandler: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const newFilter = event.currentTarget.dataset.value;

    if (isFilterOption(newFilter)) {
      changeFilter(newFilter);
      setPage(0);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <TaskListAddForm />
        <TaskListFilter value={filter} onChange={changeFilterHandler} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TaskListHead />
          <TableBody>
            {tasks == null || isEmptyArray(tasks) ? (
              <TaskListItem loading={isLoading} />
            ) : (
              getPage(tasks, page, itemsPerPage).map((task) => <TaskListItem key={task.id} task={task} />)
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks?.length || 0}
          rowsPerPage={itemsPerPage}
          page={page}
          labelRowsPerPage="Rows:"
          labelDisplayedRows={({ page }) => {
            return `Page: ${page + 1}`;
          }}
          onPageChange={changePageHandler}
          onRowsPerPageChange={changeRowsPerPageHandler}
          SelectProps={{
            MenuProps: {
              sx: {
                '.MuiTablePagination-menuItem': {
                  py: 1,
                  minHeight: 32,
                  typography: 'body2',
                },
              },
            },
          }}
        />
      </TableContainer>
    </Box>
  );
};

function getPage(data: Task[], page: number, itemsPerPage: number): Task[] {
  if (data.length <= itemsPerPage) {
    return data;
  }
  return data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
}

export default TaskList;
