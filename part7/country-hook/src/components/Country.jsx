const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.altSpellings[2]} </h3>
      <div>capital: {country.capital} </div>
      <div>population: {country.population}</div> 
      <img src={country.flags.svg} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

export default Country