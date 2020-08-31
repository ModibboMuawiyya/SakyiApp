import React from 'react'
import { Button, Item, Segment } from 'semantic-ui-react'
import { IFabric } from '../../../app/modules/fabric'


interface Iprops{
    fabrics: IFabric[];
    selectFabric: (id: string) => void;
    deleteFabric :(id:string) => void;
}

export const FabricList: React.FC<Iprops> = ({fabrics, selectFabric, deleteFabric}) => {
    return (
        <Segment clearing>
            <Item.Group relaxed>
                {fabrics.map(fabric => (
                    <Item key={fabric.id}>
                        {/* <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}

                        <Item.Content verticalAlign='middle'>
                            <Item.Header>{fabric.title}</Item.Header>
                            <Item.Description>{fabric.description}</Item.Description>
                            <Item.Description>{fabric.date}</Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectFabric(fabric.id)}
                                    floated='right'
                                    color='purple'
                                    content='View'
                                /> 
                                <Button
                                    onClick={() => deleteFabric(fabric.id)}
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
}