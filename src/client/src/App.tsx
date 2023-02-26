import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TaskList from 'components/TaskList';

function App() {
  return (
    <>
      <AppBar position="static" elevation={0} sx={{ mb: [4, 6] }}>
        <Toolbar>
          <Container maxWidth="md">
            <Typography variant="h5" component="h1">
              To-Do List
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <TaskList />
      </Container>
    </>
  );
}

export default App;
