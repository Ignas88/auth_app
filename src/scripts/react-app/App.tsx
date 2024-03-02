import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { Navbar } from '@app/components/Navbar';


function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path='/' element={<div>hello</div>}/>
                    <Route path='/login' element={<div>login</div>}/>
                    <Route
                        path='/servers'
                        element={<div>servers</div>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;