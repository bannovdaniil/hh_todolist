import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import DetailsItem from 'components/DetailsItem';
import { Task } from 'global-types';

type DetailsProps = {
  task: Task;
};

const Details: React.FC<DetailsProps> = ({ task }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Table size="small">
        <TableBody sx={{ '& > :last-child': { textTransform: 'capitalize' } }}>
          <DetailsItem title="ID:">{task.id}</DetailsItem>
          <DetailsItem title="CREATED AT:">{task.time}</DetailsItem>
          <DetailsItem title="NAME:">{task.name}</DetailsItem>
          <DetailsItem title="STATUS:">{task.status}</DetailsItem>
        </TableBody>
      </Table>
    </Box>
  );
};

export default Details;
export type { DetailsProps };
