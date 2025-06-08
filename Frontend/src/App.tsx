import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navigation from './components/Navigation';
import AssignmentsPage from './pages/AssignmentsPage';
import AddAssignmentPage from './pages/AddAssignmentPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3fcf29',
    },
    secondary: {
      main: '#71de83',
    },
    background: {
      default: "#deffe3"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/assignments" replace />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/assignments/new" element={<AddAssignmentPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
