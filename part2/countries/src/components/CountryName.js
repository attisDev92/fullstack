import Button from './Button';

const Country = ({ name, onClick, btnText, valueBtn }) => {

    return (
        <li>
            {name}
            <Button btnText={btnText} onClick={onClick} valueBtn={valueBtn} />
        </li>
    )
};

export default Country;