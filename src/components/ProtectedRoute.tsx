import { Navigate } from 'react-router-dom';
import React, { useState, FC } from "react";
import { Route, RouteProps } from 'react-router';

type TProtectedRouteProps = {
  children: React.ReactNode;
  loggedIn: boolean;
  url: string;
} & RouteProps;

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, loggedIn, url  }) => {

  return loggedIn ? <>{children}</> : <Navigate to={url} /*replace*/ />;
}

export default ProtectedRoute;
