import React, { memo } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from './Dasboard';
import Company from 'containers/Company/Loadable';
import Department from 'containers/Department/Loadable';
import Position from 'containers/Position/Loadable';
import TimeKeeping from 'containers/Major/TimeKeeping/Loadable';
import Staff from 'containers/Staff/Loadable';
import Salary from 'containers/Major/Salary/Loadable';

const Layout = () => {
  return (
    <Dashboard>
      <Switch>
        <Redirect exact from="/" to="/he-thong" />               
        <Route exact path={'/quan-ly-phong-ban'} component={Department} />        
        <Route exact path={'/quan-ly-chuc-vu'} component={Position} />        
        <Route exact path={'/quan-ly-nhan-vien'} component={Staff} />        
        <Route exact path={'/cham-cong'} component={TimeKeeping} />        
        <Route exact path={'/tham-so-luong'} component={Salary} />        
      </Switch>
    </Dashboard>
  );
};

export default memo(Layout);
