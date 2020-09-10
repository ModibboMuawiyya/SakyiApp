import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import FabricStore from '../../../app/stores/fabricStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import FabricDetailedInfo from './FabricDetailedInfo';
import FabricDetailedHeader from './FabricDetailedHeader';
import { FabricDetailedChat } from './FabricDetailedChat';
import { FabricDetailedSideBar } from './FabricDetailedSideBar';

interface DetailParams {
  id: string
}
const FabricDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const fabricStore = useContext(FabricStore)
  const { fabric, loadFabric, loadingInitial } = fabricStore

  useEffect(() => {
    loadFabric(match.params.id)
  }, [loadFabric, match.params.id])

  if (loadingInitial || !fabric) return <LoadingComponent content='Loading fabric...' />

  return (
    // <Card fluid>
    //   <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    //   <Card.Content>
    //     <Card.Header >{fabric!.title}</Card.Header>
    //     <Card.Meta>
    //       <span className='date'>{fabric!.date}</span>
    //     </Card.Meta>
    //     <Card.Description>
    //       {fabric!.description}
    //     </Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>
    //       <Button as={Link} to={`/manage/${fabric.id}`} basic color='blue' content='Edit' />
    //       <Button onClick={() => history.push('/fabrics')} basic color='grey' content='Cancel' />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
    <Grid>
      <GridColumn width={10}>
        <FabricDetailedHeader fabric={fabric} />
        <FabricDetailedInfo fabric={fabric} />
        <FabricDetailedChat />
      </GridColumn>
      <GridColumn width={6}>
        <FabricDetailedSideBar />
      </GridColumn>

    </Grid>
  )
}

export default observer(FabricDetails);