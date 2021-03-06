import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label } from 'semantic-ui-react';

// type Props = FieldRenderProps<number, any>;input, meta, ...rest

interface IProps
    extends FieldRenderProps<number, HTMLElement>,
    FormFieldProps { }


const NumberInput: React.FC<IProps> = ({ input,
    width,
    type,
    placeholder,
    meta: { touched, error } }: IProps) => {
    return (
        // <input {...input} {...rest} type='0' />

        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
};





export default NumberInput
