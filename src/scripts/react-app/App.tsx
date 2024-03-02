import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navbar } from '@app/components/Navbar';
import styled from "styled-components";

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
        }
    },
    palette: {
        mode: 'dark',
    },
});
const Main = styled.nav`
    padding: 0 16px 0 16px;
`;

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Main>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<div>hello</div>}/>
                        <Route path='/login' element={<div>login</div>}/>
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