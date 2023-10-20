import Person from "./Person";

const Persons = ({ persons, handlerDelete }) => {
    return (
        <ul>
            {persons.map(
                person => <Person key={person.name} person={person} onClick={()=>handlerDelete(person.id)} />)
            }
        </ul>
    )
};

export default Persons;