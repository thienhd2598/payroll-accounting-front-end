import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectToken } from 'redux/selectors';

const UserRoute = ({ ...rest }: any): any => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...rest} />;
  }
};

export default UserRoute;
