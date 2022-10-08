import { createStore, applyMiddleware, compose } from 'redux';
import pokeReducer from './reducer'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    pokeReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;

/*

    REDUX = [
        index === store: CONFIGURACIÓN DEL ESTADO DE REDUX,
        {
            action types => CONSTANTES DE TIPOS
            actions      => MATCHEO CON LAS RUTAS DEL BACK
            reducer      => MANEJO DEL ESTADO GLOBAL
        }
    ]

*/
