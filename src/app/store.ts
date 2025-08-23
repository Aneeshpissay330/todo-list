import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import tasksReducer from "../features/tasks";

// Combine reducers (scalable for future slices)
const rootReducer = combineReducers({
  tasks: tasksReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tasks"], // only persist tasks
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
