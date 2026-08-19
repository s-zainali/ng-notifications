import { Navigate } from 'react-router-dom';
import { NotificationProvider } from '../context/NotificationContext';
import { Outlet } from 'react-router-dom';

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    localStorage.removeItem('token'); 
    return <Navigate to="/login" replace />;
  }

  return (
    <NotificationProvider>
      {children ? children : <Outlet />}
    </NotificationProvider>
  );
};

export default ProtectedRoute;