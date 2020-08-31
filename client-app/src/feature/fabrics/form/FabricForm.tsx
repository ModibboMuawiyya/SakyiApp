import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IFabric } from '../../../app/modules/fabric'
import { v4 as uuid } from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    fabric: IFabric;
    createFabric: (fabric: IFabric) => void;
    editFabric: (fabric: IFabric) => void;
}

export const FabricForm: React.FC<IProps> = ({
    setEditMode,
    fabric: initialFormState,
    createFabric,
    editFabric
}) => {

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                description: '',
                date: '',
                quantity: 0,
                price: 0
            };
        }
    };

    const [fabric, setFabric] = useState<IFabric>(initializeForm)

    const handleSubmit = () => {
        if (fabric.id.length === 0) {
            let newFabric = {
                ...fabric,
                id: uuid()
            }
            createFabric(newFabric);
        } else {
            editFabric(fabric);
        }
    }
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setFabric({ ...fabric, [name]: value })
    }

    return (
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
                name='quantity' 
                value={fabric.quantity} 
                />

                <Form.Input 
                placeholder='Price' 
                onChange={handleInputChange} 
                name='price' 
                value={fabric.price} 
                />

                <Button
                 floated='right' 
                 positive type='submit' 
                 content='Submit' 
                 />

                <Button 
                onClick={() => setEditMode(false)} 
                floated='right' 
                type='button' 
                content='Cancel' 
                />
            </Form>

        </Segment>
    )
}
