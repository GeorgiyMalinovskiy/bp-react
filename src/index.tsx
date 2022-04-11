import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { createStore } from './core/client/store';

const container = document.getElementById('root');
const store = createStore();
render(
    <Provider store={store}>
        <App />
    </Provider>,
    container
);
