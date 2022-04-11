import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Admin } from './core/admin';
import { Client } from './core/client';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/admin' component={Admin} />
                <Route path='/' component={Client} />
            </Switch>
        </Router>
    );
}

export default App;
