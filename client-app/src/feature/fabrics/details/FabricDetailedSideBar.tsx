import React, { Fragment } from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IClient } from '../../../app/modules/fabric'
import { observer } from 'mobx-react-lite'

interface Iprops {
    clients: IClient[]
}
const FabricDetailedSideBar: React.FC<Iprops> = ({ clients }) => {
    const isOwner = false;
    return (
        <Fragment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {clients.length} {clients.length === 1 ? 'Person' : 'People'} liked
              </Segment>
            <Segment attached>
                <List relaxed divided>
                    {clients.map((likee) => (
                        <Item key={likee.username} style={{ position: 'relative' }}>
                            {isOwner &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                             </Label>}
                            <Image size='tiny' src={likee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${likee.username}`}>{likee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </Fragment>
    )
}

export default observer(FabricDetailedSideBar)