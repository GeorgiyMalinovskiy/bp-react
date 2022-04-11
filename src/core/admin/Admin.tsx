import { createBrowserHistory } from 'history';
import { Admin as RaAdmin, Resource } from 'react-admin';
import type { AuthProvider } from 'react-admin';
import { Provider } from 'react-redux';

import { dataProvider } from './dataProvider';
import { createStore } from './store';

const authProvider = (() => Promise.resolve()) as unknown as AuthProvider;
const history = createBrowserHistory();

const store = createStore({ dataProvider, authProvider, history });

export const Admin = () => (
    <Provider store={store}>
        <RaAdmin authProvider={authProvider} dataProvider={dataProvider} history={history} title='Admin'>
            <Resource name='posts' />
        </RaAdmin>
    </Provider>
);
