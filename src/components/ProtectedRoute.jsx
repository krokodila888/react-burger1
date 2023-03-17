import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children, url  }) => {

  return loggedIn ? children : <Navigate to={url} replace />;
}

export default ProtectedRoute;