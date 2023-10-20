import { useState, useEffect } from 'react';
import FormFilter from './components/FormFilter';
import Persons from './components/Persons';
import FormNewContact from './components/FormNewContact';
import StatusMessage from './components/StatusMessage';
import {getAll, create, update, destroy} from './services';

const App = () => {

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [findName, setFindName] = useState('');
    const [errorMessage, setErrorMessage] = useState('create, update or delete contacts');

    useEffect(() => {
        getAll().then((initialData) => {
            setPersons(initialData);
        })
    }, []);

    const handlerOnChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handlerOnChangePhone = (event) => {
        setNewPhone(event.target.value);
    };

    const handlerOnSubmit = (event) => {
        event.preventDefault();

        if(newName.length === 0 || newPhone.length === 0) {
            return alert("Please fill in both name and phone number.");
        }

        const objectPerson = {
            name: newName,
            number: newPhone
        };

        if (persons.some(object => object.name === objectPerson.name && object.number === objectPerson.number)) {
            return alert(`${newName} it already added to phonebook`);
        } else if (persons.some(object => object.name === objectPerson.name && object.number !== objectPerson.number)) {
            
            const updateConfirm = window.confirm("you want to update this contact");
            const personToUpdate = persons.find(person => person.name === objectPerson.name);
            if (updateConfirm) {
                update(personToUpdate.id, objectPerson).then(updateContact => {
                    const currentPersons = persons.filter(person => person.id !== personToUpdate.id);   
                    const newPersons = [
                        ...currentPersons,
                        updateContact
                    ];
                    setPersons(newPersons);
                    setErrorMessage(`update ${objectPerson.name} number to ${objectPerson.number}`);
                    setTimeout(() => {
                        setErrorMessage('create, update or delete contacts')
                    }, 5000);
                });
            }
        } else {
            create(objectPerson).then(createContact => {
                const newPersons = [
                    ...persons,
                    createContact
                ];
                setPersons(newPersons);
                setErrorMessage(`added ${objectPerson.name}`)
                setTimeout(() => {
                    setErrorMessage('create, update or delete contacts')
                }, 5000);
            });
        }
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

    const handlerDeleteOn = (id) => {
        
        const deleteConfirm = window.confirm("Are you sure delete this contact");

        if(deleteConfirm){ 
            destroy(id).then(() => {
                const currentPersons = persons.filter(person => person.id !== id);
                const deletePerson = persons.find(person => person.id === id);
                setPersons(currentPersons);
                setErrorMessage(`you delete ${deletePerson.name}`);
                setTimeout(() => {
                    setErrorMessage('create, update or delete contacts');
                }, 5000);
            })
        }
    }

    return (
        <div>
            <h1> PHONEBOOK </h1>

            <FormFilter 
                labelText='filter show with' 
                onChange={handlerOnChangeFilter} 
            />

            <StatusMessage status={errorMessage}/>

            <h2>Add new contact</h2>

            <FormNewContact 
                onSubmit={handlerOnSubmit} 
                onChangeName={handlerOnChangeName} 
                valueNameInput={newName} 
                onChangePhone={handlerOnChangePhone} 
                valuePhoneInput={newPhone}
            />

            <h2> Numbers </h2>

            <Persons 
                persons={filterPersons} 
                handlerDelete={handlerDeleteOn}
            />

        </div>
    )
}

export default App;