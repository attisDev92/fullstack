import NoteForm from './components/NoteForm'
import PersonForm from './components/PersonForm'

const App = () => {

  return (
    <div>
      
      <h2>notes</h2>
      <NoteForm />

      <h2>persons</h2>
      <PersonForm />

    </div>
  )
}

export default App