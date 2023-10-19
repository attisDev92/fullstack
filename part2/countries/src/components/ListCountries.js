import CountryName from './CountryName';

const ListCountries = ({ listCountries }) => {
    return (
        <ul>
            { listCountries.map(
                country => <CountryName key={country.name.common} name={country.name.common} />
            )}
        </ul>
    )
};

export  default ListCountries;