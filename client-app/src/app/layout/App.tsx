import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import { IFabric } from '../modules/fabric';
import NavBar from '../../feature/nav/NavBar';
import { FabricDashboard } from '../../feature/fabrics/dashboard/FabricDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

const App = () => {
  const [fabrics, setFabrics] = useState<IFabric[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<IFabric | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');


  const handleSelectFabric = (id: string) => {
    setSelectedFabric(fabrics.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedFabric(null);
    setEditMode(true)
  }

  const handleCreateFabric = (fabric: IFabric) => {
    setSubmitting(true);
    agent.Fabrics.create(fabric).then(() => {
      setFabrics([...fabrics, fabric]);
      setSelectedFabric(fabric);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleEditFabric = (fabric: IFabric) => {
    setSubmitting(true);
    agent.Fabrics.update(fabric).then(() => {
      setFabrics([...fabrics.filter(a => a.id !== fabric.id)]);
      setSelectedFabric(fabric);
      setEditMode(false);
    }).then(() => setSubmitting(false))

  }

  const handleDeleteFabric = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    const name = event.currentTarget;
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Fabrics.delete(id).then(() => {
      setFabrics([...fabrics.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))


  }

  useEffect(() => {
    agent.Fabrics.list()
      .then((response) => {
        let fabrics: IFabric[] = [];
        response.forEach(fabric => {
          fabric.date = fabric.date.split('.')[0]
          fabrics.push(fabric);
        })
        setFabrics(fabrics)
      }).then(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent content='Loading Fabrics......' />

  return (
    <Fragment >
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <FabricDashboard
          fabrics={fabrics}
          selectFabric={handleSelectFabric}
          selectedFabric={selectedFabric!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedFabric={setSelectedFabric}
          createFabric={handleCreateFabric}
          editFabric={handleEditFabric}
          deleteFabric={handleDeleteFabric}
          submitting={submitting}
          target={target}
        />
      </Container>

    </Fragment>
  );
}

export default App;
