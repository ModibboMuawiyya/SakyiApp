import React, { Fragment, useContext, useEffect } from 'react';
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
import LoginForm from '../../feature/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modal/ModalContainer';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext)
  const { setApploaded, token, apploaded } = rootStore.commonStore
  const { getUser } = rootStore.userStore

  useEffect(() => {
    if (token) {
      getUser().finally(() => setApploaded())
    } else {
      setApploaded()
    }
  }, [getUser, setApploaded, token])

  if (!apploaded) return <LoadingComponent content='Loading app..' />

  return (
    <Fragment >
      <ModalContainer />
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
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />

            </Switch>
          </Container>
        </Fragment>

      )} />


    </Fragment>
  );
}

export default withRouter(observer(App));
