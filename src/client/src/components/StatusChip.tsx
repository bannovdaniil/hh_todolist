import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import MovingIcon from '@mui/icons-material/Moving';
import Chip, { ChipProps } from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TaskStatus } from 'global-types';

type StatusChipProps = {
  status?: TaskStatus;
};

const icon = new Map<TaskStatus, JSX.Element>([
  ['active', <AddIcon />],
  ['done', <DoneIcon />],
  ['work', <MovingIcon />],
]);

const color = new Map<TaskStatus, ChipProps['color']>([
  ['active', 'default'],
  ['done', 'success'],
  ['work', 'primary'],
]);

const StatusChip: React.FC<StatusChipProps> = ({ status = 'active' }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Chip
      label={status}
      icon={matches ? icon.get(status) : undefined}
      variant="outlined"
      size={matches ? 'medium' : 'small'}
      color={color.get(status)}
      sx={{ textTransform: 'capitalize' }}
    />
  );
};

export default StatusChip;
export type { StatusChipProps };
