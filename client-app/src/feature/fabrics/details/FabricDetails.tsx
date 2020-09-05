import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IFabric } from '../../../app/modules/fabric'

interface IProps {
  fabric: IFabric;
  setEditMode: (editMode: boolean) => void;
  setSelectedFabric: (fabric: IFabric | null) => void
}

export const FabricDetails: React.FC<IProps> = ({ fabric, setEditMode, setSelectedFabric }) => {
  return (
    <Card fluid>
      <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header >{fabric.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{fabric.date}</span>
        </Card.Meta>
        <Card.Description>
          {fabric.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
          <Button onClick={() => setSelectedFabric(null)} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
