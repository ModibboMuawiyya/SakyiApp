import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../feature/nav/NavBar';
import FabricDashboard from '../../feature/fabrics/dashboard/FabricDashboard'
import { LoadingComponent } from './LoadingComponent';
import FabricStore from '../stores/fabricStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const fabricStore = useContext(FabricStore);

  useEffect(() => {
    fabricStore.loadFabrics();
  }, [fabricStore])

  if (fabricStore.loadingInitial) return <LoadingComponent content='Loading Fabrics......' />

  return (
    <Fragment >
      <NavBar />

      <Container style={{ marginTop: '7em' }}>
        <FabricDashboard />
      </Container>

    </Fragment>
  );
}

export default observer(App);
