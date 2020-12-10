import React from 'react'
import { Image, List, Popup } from 'semantic-ui-react'
import { IClient } from '../../../app/modules/fabric'

interface IProps {
    clients: IClient[]
}

const FabricListItemLikes: React.FC<IProps> = ({ clients }) => {
    return (
        <List horizontal>
            {clients.map((client) => (

                <List.Item key={client.username}>
                    <Popup
                        header={client.displayName}
                        trigger={
                            <Image
                                size='mini'
                                circular
                                src={client.image || '/assets/user.png'}
                            />

                        }
                    />
                </List.Item>
            ))}
        </List>
    );
};


export default FabricListItemLikes