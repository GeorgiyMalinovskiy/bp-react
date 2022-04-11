import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Admin } from './core/admin';
import { Client } from './core/client';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="admin" element={<Admin />} />
                <Route path="/" element={<Client />} />
            </Routes>
        </Router>
    )
}

export default App
