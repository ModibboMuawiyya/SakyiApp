import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { IFabric } from '../../../app/modules/fabric';

const FabricDetailedInfo: React.FC<{ fabric: IFabric }> = ({ fabric }) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{fabric.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {fabric.date}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='green' name='money' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {fabric.price}
                        </span>

                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='grey' name='boxes' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {fabric.quantity}
                        </span>

                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
};

export default observer(FabricDetailedInfo);
