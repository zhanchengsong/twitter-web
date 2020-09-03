import {combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import socketReducer from "./socketReduer"; // user local storage
const persistConfig = {
    key: 'root',
    storage,
};
const socketConfig = {
    key: 'socket',
    storage,
    blacklist: ['socket']
};
const userConfig = {
    key: 'user',
    storage,
}
// Create persist reducer
const rootReducer = combineReducers({
    user: userReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Remove REDUX_DEV_TOOL argument for production 
export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export let persistor = persistStore(store);
export default {store, persistor};
