import { createStore } from "redux";
import reducer from "./reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // user local storage 
const persistConfig = {
    key: 'root',
    storage,
  }
// Create persist reducer 
const persistedReducer = persistReducer(persistConfig, reducer);
// Remove REDUX_DEV_TOOL argument for production 
export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export let persistor = persistStore(store);
export default {store, persistor};
