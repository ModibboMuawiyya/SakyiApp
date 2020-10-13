import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import FabricDetailedInfo from './FabricDetailedInfo';
import FabricDetailedHeader from './FabricDetailedHeader';
import { FabricDetailedChat } from './FabricDetailedChat';
import FabricDetailedSideBar from './FabricDetailedSideBar';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string
}
const FabricDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext)
  const { fabric, loadFabric, loadingInitial } = rootStore.fabricStore

  useEffect(() => {
    loadFabric(match.params.id);
  }, [loadFabric, match.params.id, history])

  if (loadingInitial) return <LoadingComponent content='Loading fabric...' />;

  if (!fabric)
    return <h2>Fabric not found </h2>
  return (
    <Grid>
      <GridColumn width={10}>
        <FabricDetailedHeader fabric={fabric} />
        <FabricDetailedInfo fabric={fabric} />
        <FabricDetailedChat />
      </GridColumn>
      <GridColumn width={6}>
        <FabricDetailedSideBar clients={fabric.clients} />
      </GridColumn>

    </Grid>
  )
}

export default observer(FabricDetails);