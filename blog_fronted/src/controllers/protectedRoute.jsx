
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }){
  const user = JSON.parse(localStorage.getItem('user'));
  // if not user navigate to home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
