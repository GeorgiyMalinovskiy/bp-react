import { Provider } from 'react-redux';

import { createStore } from './store';

const store = createStore();

export const Client = () => (
    <Provider store={store}>
        <div>Client</div>
    </Provider>
);
