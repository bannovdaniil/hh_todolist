import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { SxProps } from '@mui/system';

type DetailsItemProps = {
  title: string;
  children?: React.ReactNode;
};

const detailsStyles: SxProps = {
  '& > td': { borderBottom: 'unset' },
};
const detailsCellStyles: SxProps = {
  width: '1%',
  whiteSpace: 'nowrap',
};

const DetailsItem: React.FC<DetailsItemProps> = ({ title, children }) => {
  return (
    <TableRow sx={detailsStyles} hover>
      <TableCell variant="head" sx={detailsCellStyles}>
        {title}
      </TableCell>
      <TableCell>{children}</TableCell>
    </TableRow>
  );
};

export default DetailsItem;
export type { DetailsItemProps };
