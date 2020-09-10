import React from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { IFabric } from '../../../app/modules/fabric';
import { observer } from 'mobx-react-lite';

const fabricImageStyle = {
    filter: 'brightness(30%)'
};

const fabricImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const FabricDetailedHeader: React.FC<{ fabric: IFabric }> = ({ fabric }) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid style={fabricImageStyle} />
                <Segment basic style={fabricImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={fabric.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{fabric.date}</p>
                                <p>
                                    {fabric.description} <strong>Fabric</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment clearing attached='bottom'>
                <Button color='teal'>like </Button>
                <Button>Cancel </Button>
                <Button color='orange' floated='right'>
                    Manage Fabric
        </Button>
            </Segment>
        </Segment.Group>
    )
};

export default observer(FabricDetailedHeader)