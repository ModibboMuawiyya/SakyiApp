import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import FabricStore from '../../../app/stores/fabricStore';
import { observer } from 'mobx-react-lite';


const FabricDetails: React.FC = () => {
  const fabricStore = useContext(FabricStore)
  const { selectedFabric: fabric, openEditForm, cancelSelectedFabric } = fabricStore
  return (
    <Card fluid>
      <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header >{fabric!.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{fabric!.date}</span>
        </Card.Meta>
        <Card.Description>
          {fabric!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => openEditForm(fabric!.id)} basic color='blue' content='Edit' />
          <Button onClick={cancelSelectedFabric} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(FabricDetails);