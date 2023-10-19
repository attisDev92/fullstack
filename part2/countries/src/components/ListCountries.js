import CountryName from './CountryName';

const ListCountries = ({ listCountries, onClick }) => {
    return (
        <ul>
            { listCountries.map(
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