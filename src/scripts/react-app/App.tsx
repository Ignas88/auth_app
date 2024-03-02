import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Login} from '@app/views/Login';
import {Navbar} from '@app/components/NavBar';
import {Container} from '@app/components/ViewContainer';
import styled from 'styled-components';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    primary: {
      light: '#d5cfff',
      main: '#6E29F5',
      dark: '#392bab',
      contrastText: '#ffffff',
    },
  },
});
const Main = styled.div`
    padding: 0 16px 0 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Container />} />
            <Route path='/login' element={<Login/>}/>
            <Route
              path='/servers'
              element={<div>servers</div>}
            />
          </Routes>
        </Main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;