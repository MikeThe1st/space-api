import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useVerifyJwtMutation } from '../state/api'

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [verifyJwt] = useVerifyJwtMutation()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await verifyJwt({});
        if('data' in response) {
          if('status' in response.data) {
            if(response.data.status) {
              setIsAuthenticated(true)
            }
            else {
              setIsAuthenticated(false)
            }
          }
          else {
            setIsAuthenticated(false)
          }
        }
        else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Error verifying JWT:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

