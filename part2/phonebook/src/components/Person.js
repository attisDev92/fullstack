const Person = ({ person }) => {
    return (
       <li>
            <p>{person.name} telf: {person.phone}</p>
       </li> 
    )
};

export default Person;