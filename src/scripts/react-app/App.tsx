import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Login} from '@app/views/Login';
import {Navbar} from '@app/components/NavBar';
import {RequireAuth} from '@app/components/RequireAuth';
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

const Servers = lazy(() => import(/* webpackChunkName: "Servers" */ '@app/views/Servers'))
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Container />} />
            <Route path='/login' element={<Login/>} />
            <Route
              path='/servers'
              element={
              <RequireAuth>
                <Suspense fallback={<Container><h2>page unavailable</h2></Container>}>
                  <Servers/>
                </Suspense>
              </RequireAuth>
              }
            />
          </Routes>
        </Main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;