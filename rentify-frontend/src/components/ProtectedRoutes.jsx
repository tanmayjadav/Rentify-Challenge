import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({userTypeRequired}) => {
  const userType = localStorage.getItem('userType');
  console.log(userType)
  console.log(userTypeRequired)
  if (userType != userTypeRequired) {
    return <Navigate to="/not-authorized" state={{ userTypeRequired }}/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;