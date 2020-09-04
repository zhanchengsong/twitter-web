import {combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
};
// Create persist reducer
// This creates a branch on the state tree called 'user'
const rootReducer = combineReducers({
    user: userReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Remove REDUX_DEV_TOOL argument for production 
export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export let persistor = persistStore(store);
export default {store, persistor};
