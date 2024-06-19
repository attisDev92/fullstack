import { useResource, useField } from "../hooks"
import { useEffect } from "react"

const NoteForm = () => {  
  const content = useField('text')
  const { reset:_, ...contentProps } = content
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  
  useEffect(() => {
    noteService.getAll()
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }

  return (
    <>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentProps} />
        <button type='submit'>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}
    </>
  )
}

export default NoteForm