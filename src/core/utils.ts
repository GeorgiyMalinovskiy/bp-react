interface ExtendedWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

export const withDevTools = (window: Window | ExtendedWindow): window is ExtendedWindow =>
    !!window && '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window;
