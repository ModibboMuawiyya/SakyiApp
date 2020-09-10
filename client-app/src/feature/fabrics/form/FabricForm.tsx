import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IFabric } from '../../../app/modules/fabric'
import { v4 as uuid } from 'uuid';
import FabricStore from '../../../app/stores/fabricStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
    id: string
}

const FabricForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const fabricStore = useContext(FabricStore)
    const {
        createFabric,
        editFabric,
        submitting,
        fabric: initialFormState,
        loadFabric,
        clearFabric
    } = fabricStore;




    const [fabric, setFabric] = useState<IFabric>({
        id: '',
        title: '',
        description: '',
        date: '',
        quantity: 0,
        price: 0
    })

    useEffect(() => {
        if (match.params.id && fabric.id.length === 0) {
            loadFabric(match.params.id).then(() => {
                initialFormState && setFabric(initialFormState)
            });
        }
        return () => {
            clearFabric()
        }
    }, [loadFabric, clearFabric, match.params.id, initialFormState, fabric.id.length]);

    const handleSubmit = () => {
        if (fabric.id.length === 0) {
            let newFabric = {
                ...fabric,
                id: uuid()
            }

            createFabric(newFabric).then(() => history.push(`/fabrics/${newFabric.id}`));

        } else {
            editFabric(fabric).then(() => history.push(`/fabrics/${fabric.id}`));
        }
    }

    const handleInputChange = (event: any) => {
        const { name, value } = event.currentTarget;
        setFabric({ ...fabric, [name]: event.currentTarget.type === 'number' ? parseInt(value) : value })
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            onChange={handleInputChange}
                            name='title'
                            placeholder='Title'
                            value={fabric.title}
                        />

                        <Form.TextArea
                            rows={2}
                            onChange={handleInputChange}
                            name='description'
                            placeholder='Description'
                            value={fabric.description}
                        />

                        <Form.Input
                            type='datetime-local'
                            onChange={handleInputChange}
                            name='date'
                            placeholder='Date'
                            value={fabric.date}
                        />

                        <Form.Input
                            placeholder='Quantity'
                            onChange={handleInputChange}
                            value={fabric.quantity}
                            name='quantity'
                            type='number'
                        />

                        <Form.Input
                            placeholder='Price'
                            onChange={handleInputChange}
                            value={fabric.price}
                            name='price'
                            type='number'
                        />

                        <Button
                            loading={submitting}
                            floated='right'
                            positive type='submit'
                            content='Submit'
                        />

                        <Button
                            onClick={() => history.push('/fabrics')}
                            floated='right'
                            type='button'
                            content='Cancel'
                        />
                    </Form>

                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(FabricForm);
