import React from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IFabric } from '../../../app/modules/fabric';
import FabricListItemLikes from './FabricListItemLikes';

const FabricListItem: React.FC<{ fabric: IFabric }> = ({ fabric }) => {


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />

                        <Item.Content verticalAlign='middle'>
                            <Item.Header>{fabric.title}</Item.Header>
                            <Item.Description>{fabric.description}</Item.Description>
                            <Item.Extra>

                            </Item.Extra>
                        </Item.Content>
                    </Item>

                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='money' /> {fabric.price}
                <Icon name='cart' /> {fabric.quantity}
            </Segment>
            <Segment secondary><FabricListItemLikes attendees={fabric.attendees} /></Segment>
            <Segment clearing>
                <span>{fabric.description}</span>
                <Button
                    as={Link} to={`/fabrics/${fabric.id}`}
                    floated='right'
                    color='purple'
                    content='View'
                />
            </Segment>
        </Segment.Group>

    )
}

export default FabricListItem;
