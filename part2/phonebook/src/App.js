import {useState} from 'react';
import Persons from './components/Persons';

const Input = ({ type, onChange }) => <input type={type} onChange={onChange} />;

const Button = ({ nameBtn, type }) => <button type={type}>{nameBtn}</button>;

const Person = ({ person }) => {
    return (
       <li>
            <p>{person.name}</p>
       </li> 
    )
};

const App = () => {

    const [persons, setPersons] = useState(Persons);
    const [newName, setNewName] = useState('');

    const handlerOnChange = (event) => {
        setNewName(event.target.value);
    };

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        
        const objectName = {
            name: newName
        };

        if (persons.some(object => object.name === objectName.name)) {
            return alert(`${newName} it already added to phonebook`);
        }

        const newPersons = [
            ...persons,
            objectName
        ];

        setPersons(newPersons)
        setNewName('')
    }

    return (
        <div>
            <h1> PHONEBOOK </h1>
            <div>
                <form onSubmit={handlerOnSubmit}>
                    <label>name: </label>
                    <Input type='text' onChange={handlerOnChange}/>
                    <Button nameBtn="add" type="onSubmit"/>
                </form>                
            </div>
            <h2> Numbers </h2>
            <ul>
                {persons.map(
                    person => <Person key={person.name} person={person}/>)
                }
            </ul>
            
        </div>
    )

}

export default App;