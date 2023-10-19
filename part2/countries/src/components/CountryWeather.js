const CountryWeather = ({ infoWeather }) => {
    if (!infoWeather || !infoWeather.location) {
        return <div>No weather info.</div>;
    }

    return (
        <div>
            <h2>Weather in {infoWeather.location.name}</h2>
            <p><strong>temperature:</strong> {infoWeather.current.temperature}</p>
            <img src={infoWeather.current.weather_icons} alt={`weather of ${infoWeather.location.name}`} />
            <p><strong>wind:</strong>{infoWeather.current.wind_speed} direction {infoWeather.current.wind_dir}</p>
        </div>
    );
}

export default CountryWeather;
