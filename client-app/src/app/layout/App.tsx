import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../feature/nav/NavBar';
import FabricDashboard from '../../feature/fabrics/dashboard/FabricDashboard'
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import FabricForm from '../../feature/fabrics/form/FabricForm';
import FabricDetails from '../../feature/fabrics/details/FabricDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment >
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/fabrics' component={FabricDashboard} />
              <Route path='/fabrics/:id' component={FabricDetails} />
              <Route key={location.key} path={['/createFabrics', '/manage/:id']} component={FabricForm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>

      )} />


    </Fragment>
  );
}

export default withRouter(observer(App));
