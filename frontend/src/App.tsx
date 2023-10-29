import React from 'react'
import LaunchPage from './pages/LaunchPage.tsx'
import AuthPage from './pages/AuthPage.tsx'
import Plans from './pages/Plans.tsx'
import Dashboard from './pages/Dashboard.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes.tsx'
import ApiDocs from './pages/ApiDocs.tsx'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LaunchPage/>} path="/"/>
        <Route element={<AuthPage/>} path="/login"/>
        <Route element={<AuthPage/>} path="/signup"/>
        <Route element={<PrivateRoutes/>}>
          <Route element={<Dashboard/>} path="/dashboard"/>
          <Route element={<Plans/>} path="/dashboard/plans"/>
          <Route element={<ApiDocs/>} path="/dashboard/api-docs"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
