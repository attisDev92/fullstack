import {useState} from 'react';
import PersonsList from './components/PersonsList';
import FormFilter from './components/FormFilter';
import Persons from './components/Persons';
import FormNewContact from './components/FormNewContact'


const App = () => {

    const [persons, setPersons] = useState(PersonsList);
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

            <FormFilter 
                labelText='filter shwn with' 
                onChange={handlerOnChangeFilter} 
            />

            <h2>Add new contact</h2>

            <FormNewContact 
                onSubmit={handlerOnSubmit} 
                onChangeName={handlerOnChangeName} 
                valueNameInput={newName} 
                onChangePhone={handlerOnChangePhone} 
                valuePhoneInput={newPhone} 
            />

            <h2> Numbers </h2>

            <Persons persons={filterPersons} />

        </div>
    )
}

export default App;