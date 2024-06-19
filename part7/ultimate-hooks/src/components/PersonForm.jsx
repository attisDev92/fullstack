import { useField, useResource } from '../hooks'
import { useEffect } from 'react'

const PersonForm = () => {

  const name = useField('text')
  const { reset:_, ...nameProps } = name
  const number = useField('text')
  const { reset:__, ...numberProps } = number
  const [persons, personService] = useResource('http://localhost:3005/persons')
  
  useEffect(() => {
    personService.getAll()
  }, [])

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.reset()
    number.reset()
  }

  return (
    <>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameProps} /> <br/>
        number <input {...numberProps} />
        <button type='submit'>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </>
  )
}

export default PersonForm