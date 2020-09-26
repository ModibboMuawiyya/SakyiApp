import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import FabricListItem from './FabricListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { format } from 'date-fns'



const FabricList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { fabricsByDate } = rootStore.fabricStore;
    return (
        <Fragment>
            {fabricsByDate.map(([group, fabrics]) => (
                <Fragment key={group}>
                    <Label size='large' color='purple'>
                        {format(group, 'eeee do MMMM')}
                    </Label>
                    <Item.Group relaxed>
                        {fabrics.map(fabric => (
                            <FabricListItem key={fabric.id} fabric={fabric} />
                        ))}
                    </Item.Group>

                </Fragment>

            ))}
        </Fragment>
    )
};

export default observer(FabricList);