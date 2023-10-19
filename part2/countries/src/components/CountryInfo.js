import CountryData from './CountryData';
import CountryWeather from './CountryWeather';

const CountryInfo = ({ country, infoWeather }) => {

    const countryData = () => {
        if (!country || !country.name || !country.name.common) {
            return <div>No country found.</div>;
        } else {
            return <CountryData country={country} />;
        }
    }

    const countryWeather = () => {
        if (!infoWeather || !infoWeather.location) {
            return <div>No weather info.</div>;
        } else {
            return <CountryWeather infoWeather={infoWeather} />;
        }
    }

    return (
        <div>
            {countryData()}
            {countryWeather()}
        </div>
    );
};

export default CountryInfo;
