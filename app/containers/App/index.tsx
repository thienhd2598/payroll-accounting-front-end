/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import AnonymousRoute from 'components/Routes/AnonymousRoute';
import UserRoute from 'components/Routes/UserRoute';
import Layout from 'containers/Layout';
import Login from 'containers/LoginPage/Loadable';
import Register from 'containers/RegisterPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, useLocation } from 'react-router-dom';
import GlobalStyle from '../../global-styles';
import queryString from 'querystring';
import { Spin } from 'antd';

function App() {
  const [inited, setInited] = React.useState(false);
  const location = useLocation();
  const params = queryString.parse(
    location.search.slice(1, location.search.length),
  ) as any;

  React.useLayoutEffect(
    () => {
      let checkExistJwt = localStorage.getItem('jwt_authorities');

      if (params?.token && !checkExistJwt) {
        
        localStorage.setItem('jwt_authorities', params.token);
      }
      setInited(true)
    }, []
  );

  return (
    <React.Fragment>
      {!inited && <Spin />}
      {!!inited && (
        <Switch>
          <AnonymousRoute exact path="/login" component={Login} />
          <AnonymousRoute exact path="/register" component={Register} />
          {/* <AnonymousRoute path="/" component={Layout} />           */}
          <UserRoute path="/" component={Layout} />          
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <GlobalStyle />
    </React.Fragment>
  );
}
export default App;
