const Person = ({ person }) => {
    return (
       <li>
            <p>{person.name} | {person.phone}</p>
       </li> 
    )
};

export default Person;