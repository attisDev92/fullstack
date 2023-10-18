const FormFilter = ({ labelText, onChange }) => {
    
    return (
        <form >
            <labe>{labelText} </labe>
            <input type='text' onChange={onChange} />
        </form >
    )
};

export default FormFilter;