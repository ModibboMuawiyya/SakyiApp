import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import FabricList from './FabricList'
import FabricDetails from '../details/FabricDetails'
import FabricForm from '../form/FabricForm'
import { observer } from 'mobx-react-lite'
import FabricStore from '../../../app/stores/fabricStore';


const FabricDashboard: React.FC = () => {
    const fabricStore = useContext(FabricStore);
    const { editMode, selectedFabric } = fabricStore;
    return (
        <Grid>
            <Grid.Column width={10} >
                <FabricList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedFabric && !editMode && <FabricDetails />}

                {editMode && (<FabricForm
                    key={(selectedFabric && selectedFabric.id) || 0}
                    fabric={selectedFabric!}
                />)}
            </Grid.Column>
        </Grid>
    )
};

export default observer(FabricDashboard);