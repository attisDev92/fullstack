import { useState, useEffect } from 'react';
import axios from 'axios';
import FormFind from './components/FormFind';
import ListCountries from './components/ListCountries';
import CountryInfo from './components/CountryInfo';


const App = () => {

    const [countries, setCountries] = useState([]);
    const [findCountry, setFindCountry] = useState('');

    useEffect(() => {
        
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data);
            });
    }, []);

    const handlerOnChage = (event) => {
        const newFindCountry = event.target.value;
        setFindCountry(newFindCountry);
    }

    const listCountries = countries.filter((country) => country.name.common.toLowerCase().startsWith(findCountry.toLowerCase())) ;

    const renderCountries = () => {
        if (listCountries.length > 10) {
            return "too many matches, specify another filter";
        } else if (listCountries.length === 1) {
            return <CountryInfo listCountries={listCountries} />;
        } else {
            return <ListCountries listCountries={listCountries} />;
        }
    }

    return (
        <div>
            <h1>Countries</h1>

            <FormFind labelText='find countries' onChange={handlerOnChage} />
            <div>
                {renderCountries()}
            </div>
        </div>
    );
};

export default App;
