const Person = ({ person }) => {
    return (
       <li>
            <p>{person.name} telf: {person.number}</p>
       </li> 
    )
};

export default Person;