import { useState, useEffect } from 'react'
import axios from 'axios'

const apiCountryURL = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const fetchCountry = async (name) => {
  try {
    const response = await axios.get(`${apiCountryURL}/${name}`)
    return response.data
  } catch (error) {
    console.error("Error fetching country:", error)
    return null
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      fetchCountry(name).then((data) => {
        setCountry(data)
      })
    }
  }, [name])

  return country
}
