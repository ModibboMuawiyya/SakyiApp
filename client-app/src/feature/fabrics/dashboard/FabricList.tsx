import React, { useContext } from 'react'
import { Button, Item, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import FabricStore from '../../../app/stores/fabricStore'
import { Link } from 'react-router-dom';



const FabricList: React.FC = () => {
    const fabricStore = useContext(FabricStore);
    const { fabricsByDate, deleteFabric, submitting, target } = fabricStore;
    return (
        <Segment clearing>
            <Item.Group relaxed>
                {fabricsByDate.map(fabric => (
                    <Item key={fabric.id}>
                        {/* <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}

                        <Item.Content verticalAlign='middle'>
                            <Item.Header>{fabric.title}</Item.Header>
                            <Item.Description>{fabric.description}</Item.Description>
                            <Item.Description>{fabric.date}</Item.Description>
                            <Item.Description>Quantity: {fabric.quantity}</Item.Description>
                            <Item.Description>Price: {fabric.price}</Item.Description>
                            <Item.Extra>
                                <Button
                                    as={Link} to={`/fabrics/${fabric.id}`}
                                    floated='right'
                                    color='purple'
                                    content='View'
                                />
                                <Button
                                    name={fabric.id}
                                    loading={target === fabric.id && submitting}
                                    onClick={(e) => deleteFabric(e, fabric.id)}
                                    floated='right'
                                    color='red'
                                    content='Delete'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
};

export default observer(FabricList);