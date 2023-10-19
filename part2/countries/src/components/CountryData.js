const ConuntryData = ({ country }) => {

    return (
        <div>
            <h2>{country.name.common}</h2>

            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>

            <h2>Lengueages</h2>
            <ul>
                { Object.values(country.languages).map((lenguage) => (
                <li key={lenguage}>{lenguage}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common}></img>
        </div>
    )
}

export default ConuntryData;