import { Navigate, Outlet } from 'react-router-dom';
import { getLocalData } from './CommonFunctions';
import Constants from './Constants';


export default function ProtectedRoute({
    isAllowed = getLocalData(Constants.tokenKey) !== null,
    redirectPath = '/isc/login',
    children,
  }) {

    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
    
  };