import Button from './Button';
import Input from './Input';

const FormNewContact = ({ onSubmit, onChangeName, valueNameInput, onChangePhone, valuePhoneInput }) => {
    return (
        <form onSubmit={onSubmit}>
            <label>name: </label>
            <Input type='text' onChange={onChangeName} value={valueNameInput} /> <br/>
            <label>phone: </label>
            <Input type='tel' onChange={onChangePhone} value={valuePhoneInput} /> <br/>
            <Button nameBtn="add" type="onSubmit" /> <br/>
        </form> 
    )
};

export default FormNewContact;