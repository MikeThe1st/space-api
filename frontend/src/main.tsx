import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {api} from './state/api.js'

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware().concat(api.middleware)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;