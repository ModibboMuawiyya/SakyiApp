import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import FabricStore from '../../../app/stores/fabricStore'
import FabricListItem from './FabricListItem';



const FabricList: React.FC = () => {
    const fabricStore = useContext(FabricStore);
    const { fabricsByDate } = fabricStore;
    return (
        <Fragment>
            {fabricsByDate.map(([group, fabrics]) => (
                <Fragment key={group}>
                    <Label size='large' color='purple'>
                        {group}
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