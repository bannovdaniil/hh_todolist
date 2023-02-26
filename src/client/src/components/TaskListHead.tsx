import { grey } from '@mui/material/colors';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SxProps } from '@mui/system';

const headRowStyles: SxProps = {
  '& > th': { backgroundColor: grey[200] },
};

const TaskListHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow sx={headRowStyles}>
        <TableCell />
        <TableCell>NAME</TableCell>
        <TableCell align="center">STATUS</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default TaskListHead;
