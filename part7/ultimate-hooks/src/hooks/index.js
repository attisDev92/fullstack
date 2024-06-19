import { useEffect, useState } from "react"
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  
  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async() => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async(resource) => {
    const newResource = {
      id: Math.floor(Math.random()*1000000),
      ...resource
    }
    const response = await axios.post(baseUrl, newResource)
    setResources(prevResources => prevResources.concat(response.data))
  }


  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}