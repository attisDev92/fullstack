import CountryName from './CountryName';

const ListCountries = ({ countries, onClick }) => {
    return (
        <ul>
            { countries.map(
                country => <CountryName 
                valueBtn={country.name.common} 
                key={country.name.common} 
                name={country.name.common} 
                btnText="show" 
                onClick={onClick}/>
            )}
        </ul>
    )
};

export  default ListCountries;