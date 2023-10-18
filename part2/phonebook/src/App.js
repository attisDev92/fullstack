import {useState} from 'react';
import Persons from './components/Persons';
import Input from './components/Input';
import Button from './components/Button';
import Person from './components/Person';
import FormFilter from './components/FormFilter';

const App = () => {

    const [persons, setPersons] = useState(Persons);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [findName, setFindName] = useState('');

    const handlerOnChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handlerOnChangePhone = (event) => {
        setNewPhone(event.target.value);
    };

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        
        const objectName = {
            name: newName,
            phone: newPhone
        };

        if (persons.some(object => object.name === objectName.name)) {
            return alert(`${newName} it already added to phonebook`);
        }

        const newPersons = [
            ...persons,
            objectName
        ];

        setPersons(newPersons);
        setNewName('');
        setNewPhone('');
    }

    const handlerOnChangeFilter = (event) => {
        const nameFind = event.target.value;

        setFindName(nameFind);
    }

    const filterPersons = !findName
        ? persons
        : persons.filter((person) =>
        person.name.toLowerCase().startsWith(findName.toLowerCase())
        );


    return (
        <div>
            <h1> PHONEBOOK </h1>
            <div>
                <FormFilter labelText='filter shwn with' onChange={handlerOnChangeFilter} />
            </div>
            <h2>Add new contact</h2>
            <form onSubmit={handlerOnSubmit}>
                <label>name: </label>
                <Input type='text' onChange={handlerOnChangeName} value={newName} /> <br/>
                <label>phone: </label>
                <Input type='tel' onChange={handlerOnChangePhone} value={newPhone} /> <br/>
                <Button nameBtn="add" type="onSubmit" /> <br/>
            </form>                
            <h2> Numbers </h2>
            <ul>
                {filterPersons.map(
                    person => <Person key={Person.name} person={person}/>)
                }
            </ul>
        </div>
    )

}

export default App;