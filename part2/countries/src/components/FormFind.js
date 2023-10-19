import Input from './Input';

const FormFind = ({ labelText, onChange }) => {
    return (
        <form>
            <label>{labelText}</label>
            <Input onChange={onChange} />
        </form>
    )
};

export default FormFind;