import Input from "./Input";

const FormFilter = ({ labelText, onChange }) => {
    
    return (
        <form >
            <label>{labelText} </label>
            <Input type='text' onChange={onChange} />
        </form >
    )
};

export default FormFilter;