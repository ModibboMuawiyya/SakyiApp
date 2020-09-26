import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { FabricFormValues } from '../../../app/modules/fabric'
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import NumberInput from '../../../app/common/form/NumberInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime, convertPriceToInt } from '../../../app/common/util/util';
import { combineValidators, composeValidators, hasLengthGreaterThan, isNumeric, isRequired } from 'revalidate'
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({ message: 'The fabric Name is required' }),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(3)({ message: 'Description to be at least 4 characters' })
    )(),
    price: composeValidators(
        isRequired('Price'),
        isNumeric('Price')
    )('Price'),
    quantity: composeValidators(
        isRequired('Quantity'),
        isNumeric('Quantity')
    )('Quantity'),
    date: isRequired('Date'),
    time: isRequired('Time')
})

interface DetailParams {
    id: string
}

const FabricForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext)
    const {
        createFabric,
        editFabric,
        submitting,
        loadFabric
    } = rootStore.fabricStore;




    const [fabric, setFabric] = useState(new FabricFormValues())
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadFabric(match.params.id).then((fabric) => setFabric(new FabricFormValues(fabric))
            ).finally(() => setLoading(false));
        }
    }, [loadFabric, match.params.id]);




    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, price, quantity, ...fabric } = values;
        const quantityToInt = convertPriceToInt(values.quantity)
        const priceToInt = convertPriceToInt(values.price)
        fabric.date = dateAndTime;
        fabric.quantity = quantityToInt;
        fabric.price = priceToInt
        console.log(values)
        if (!fabric.id) {
            let newFabric = {
                ...fabric,
                id: uuid()
            }
            createFabric(newFabric)
        } else {
            editFabric(fabric)
        }
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={fabric}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    // onChange={handleInputChange}

                                    name='title'
                                    placeholder='Title'
                                    value={fabric.title}
                                    component={TextInput}
                                />

                                <Field
                                    component={TextAreaInput}
                                    name='description'
                                    rows={3}
                                    placeholder='Description'
                                    value={fabric.description}
                                />

                                <Form.Group>
                                    <Field<Date>
                                        name='date'
                                        placeholder='Date'
                                        date={true}
                                        value={fabric.date}
                                        component={DateInput}
                                    />
                                    <Field<Date>
                                        name='time'
                                        time={true}
                                        placeholder='Time'
                                        value={fabric.time}
                                        component={DateInput}
                                    />
                                </Form.Group>


                                <Field<number>
                                    placeholder='Quantity'
                                    value={fabric.quantity}
                                    name='quantity'
                                    component={NumberInput}
                                    type='number'
                                />

                                <Field
                                    placeholder='Price'
                                    value={fabric.price}
                                    name='price'
                                    component={NumberInput}
                                    type='number'
                                />

                                <Button
                                    disabled={loading || invalid || pristine}
                                    loading={submitting}
                                    floated='right'
                                    positive type='submit'
                                    content='Submit'
                                />

                                <Button
                                    disabled={loading}
                                    onClick={fabric.id ? () => history.push(`/fabrics/${fabric.id}`) : () => history.push('/fabrics')}
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                />
                            </Form>
                        )} />


                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(FabricForm);
