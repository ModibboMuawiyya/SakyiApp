import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import { IFabric } from '../modules/fabric';
import NavBar from '../../feature/nav/NavBar';
import { FabricDashboard } from '../../feature/fabrics/dashboard/FabricDashboard';

const App = () => {
  const [fabrics, setFabrics] = useState<IFabric[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<IFabric | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectFabric = (id: string) => {
    setSelectedFabric(fabrics.filter(a => a.id ===id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () =>{
    setSelectedFabric(null);
    setEditMode(true)
  }

  const handleCreateFabric =(fabric : IFabric) =>{
    setFabrics([...fabrics, fabric]);
    setSelectedFabric(fabric);
    setEditMode(false);
  }

  const handleEditFabric = (fabric: IFabric) =>{
    setFabrics([...fabrics.filter(a => a.id !== fabric.id)]);
    setSelectedFabric(fabric);
    setEditMode(false);
  }

  const handleDeleteFabric = (id:string) =>{
    setFabrics([...fabrics.filter(a=> a.id !== id)])
    
  }

  useEffect(() => {
    axios.get<IFabric[]>('http://localhost:5000/api/fabrics')
      .then((response) => {
        let fabrics:IFabric[] = [];
        response.data.forEach(fabric => {
          fabric.date = fabric.date.split('.')[0]
          fabrics.push(fabric);
        })
        setFabrics(fabrics)
      })
  }, [])

  return (
    <Fragment >
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
       <FabricDashboard 
          fabrics= {fabrics} 
          selectFabric = {handleSelectFabric}
          selectedFabric ={selectedFabric!} 
          editMode ={editMode}
          setEditMode ={setEditMode}
          setSelectedFabric ={setSelectedFabric}
          createFabric ={handleCreateFabric}
          editFabric = {handleEditFabric}
          deleteFabric = {handleDeleteFabric}
      />
      </Container>
      
    </Fragment>
  );
}

export default App;
