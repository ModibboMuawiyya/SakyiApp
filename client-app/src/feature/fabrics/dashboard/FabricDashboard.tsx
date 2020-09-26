import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import FabricList from './FabricList'
import { observer } from 'mobx-react-lite'
import { LoadingComponent } from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'


const FabricDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadFabrics, loadingInitial } = rootStore.fabricStore
    useEffect(() => {
        loadFabrics();
    }, [loadFabrics])

    if (loadingInitial) return <LoadingComponent content='Loading Fabrics......' />
    return (
        <Grid>
            <Grid.Column width={10} >
                <FabricList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Fabric Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(FabricDashboard);