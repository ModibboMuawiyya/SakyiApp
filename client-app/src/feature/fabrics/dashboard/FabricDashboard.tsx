import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IFabric } from '../../../app/modules/fabric'
import { FabricList } from './FabricList'
import { FabricDetails } from '../details/FabricDetails'
import { FabricForm } from '../form/FabricForm'

interface Iprops{
    fabrics: IFabric[];
    selectFabric: (id: string) => void;
    selectedFabric: IFabric | null;
    editMode: boolean;
    setEditMode:(editMode:boolean) => void;
    setSelectedFabric:(fabric: IFabric|null) => void;
    createFabric : (fabric:IFabric) => void; 
    editFabric : (fabric:IFabric) => void;
    deleteFabric : (id:string) => void;
}

export const FabricDashboard: React.FC<Iprops> = ({
    fabrics,
    selectFabric, 
    selectedFabric,
    editMode,
    setEditMode,
    setSelectedFabric,
    createFabric,
    editFabric,
    deleteFabric
    }) => {
    return (
        <Grid>
            <Grid.Column width={10} >
                <FabricList 
                    fabrics ={fabrics}
                    selectFabric ={selectFabric}
                    deleteFabric ={deleteFabric}
                    />               
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedFabric && !editMode && <FabricDetails 
                    fabric ={selectedFabric}  
                    setEditMode ={setEditMode}
                    setSelectedFabric = {setSelectedFabric}
                />}

                {editMode && (<FabricForm
                    key = {(selectedFabric && selectedFabric.id) || 0}
                    setEditMode ={setEditMode}
                    fabric = {selectedFabric!}
                    createFabric ={createFabric}
                    editFabric = {editFabric}
                />)}
            </Grid.Column>
        </Grid>
    )
}
