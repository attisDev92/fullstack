import { useState, useEffect } from 'react';
import axios from 'axios';
import FormFind from './components/FormFind';
import ListCountries from './components/ListCountries';
import CountryInfo from './components/CountryInfo';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [findCountry, setFindCountry] = useState('');
    const [weatherInfo, setWeatherInfo] = useState([]);

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data);
            })
            .catch(error => {
                console.eror(error);
            })
    }, []);

    const handlerOnChange = (event) => {
        const newFindCountry = event.target.value;
        setFindCountry(newFindCountry);
    }

    const handlerShow = (value) => {
        setFindCountry(value);
    }

    const listCountries = countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(findCountry.toLowerCase())
    );

    const getWeather = () => {
        const apiWeather = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_WEATHER}&query=${findCountry}`;
        axios
            .get(apiWeather)
            .then((response) => {
                setWeatherInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            }) 
    }

    const renderCountries = () => {
        if (listCountries.length > 10) {
            return "Too many matches, specify another filter.";
        } else if (listCountries.length === 1) {
            getWeather();
            return <CountryInfo country={listCountries[0]} infoWeather={weatherInfo} />;
        } else {
            return <ListCountries countries={listCountries} onClick={handlerShow} />;
        }
    }

    return (
        <div>
            <h1>Countries</h1>
            <FormFind labelText="Find countries" onChange={handlerOnChange} />
            <div>
                {renderCountries()}
            </div>
        </div>
    );
};

export default App;
