import Button from './Button';

const Person = ({ person, onClick }) => {
    return (
       <li>
            <p>{person.name} telf: {person.number}</p>
            <Button type="button" nameBtn="Delete" onClick={onClick}/>
       </li> 
    )
};

export default Person;