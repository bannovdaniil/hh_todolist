import FilterListIcon from '@mui/icons-material/FilterList';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import AppMenu from 'components/AppMenu';
import { FilterOption, FILTER_OPTIONS } from 'global-types';
import { ChangeFilterHandler } from 'hooks';

type TaskListFilterProps = {
  value?: FilterOption;
  onChange?: React.MouseEventHandler<HTMLLIElement>;
};

const filterStyles: SxProps = {
  mr: 1,
  display: 'flex',
  gap: 0.5,
  alignItems: 'center',
};

const TaskListFilter: React.FC<TaskListFilterProps> = ({ value = 'all', onChange }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={filterStyles}>
      {matches && (
        <Typography variant="overline" sx={{ color: value === 'all' ? 'action.active' : 'primary.main' }}>
          {value}
        </Typography>
      )}
      <AppMenu
        variant="selectedMenu"
        icon={<FilterListIcon />}
        tooltipTitle="Filter by status"
        IconButtonProps={{ color: value === 'all' ? 'default' : 'primary' }}
      >
        {FILTER_OPTIONS.map((option) => (
          <MenuItem key={option} selected={value === option} data-value={option} onClick={onChange} dense>
            <ListItemText primaryTypographyProps={{ px: 1, textTransform: 'capitalize' }}>{option}</ListItemText>
          </MenuItem>
        ))}
      </AppMenu>
    </Box>
  );
};

export default TaskListFilter;
export type { FilterOption, ChangeFilterHandler, TaskListFilterProps };
