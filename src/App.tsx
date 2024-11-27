import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './output.css'
import { ProtectedRoute } from './components/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/main",
    element:
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
])

const App: React.FC = () => {
  return <RouterProvider router={router} />;
}

export default App;
