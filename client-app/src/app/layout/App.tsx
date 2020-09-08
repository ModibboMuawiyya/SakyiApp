import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../feature/nav/NavBar';
import FabricDashboard from '../../feature/fabrics/dashboard/FabricDashboard'
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import FabricForm from '../../feature/fabrics/form/FabricForm';
import FabricDetails from '../../feature/fabrics/details/FabricDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment >
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path='/fabrics' component={FabricDashboard} />
            <Route path='/fabrics/:id' component={FabricDetails} />
            <Route key={location.key} path={['/createFabrics', '/manage/:id']} component={FabricForm} />
          </Container>
        </Fragment>

      )} />


    </Fragment>
  );
}

export default withRouter(observer(App));
