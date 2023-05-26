import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectToken } from 'redux/selectors';

const AnonymousRoute = ({ ...rest }: any): any => {
  const token = localStorage.getItem('jwt-token');

  if (!!token) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest} />;
  }
};

export default AnonymousRoute;
