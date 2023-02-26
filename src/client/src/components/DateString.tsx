import Typography from '@mui/material/Typography';

type DateStringProps = {
  date: Date | number;
};

const DateString: React.FC<DateStringProps> = ({ date }) => {
  return <Typography>{new Intl.DateTimeFormat().format(date)}</Typography>;
};

export default DateString;
export type { DateStringProps };
