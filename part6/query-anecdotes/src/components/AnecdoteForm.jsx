import { createNew } from "../request"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotification } from "../notificationContext"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries(['anecdotes'])
      dispatch({ type: 'SET_NOTIFICATION', payload: `you created "${newNote.content}" anecdote` })
    },

    onError: (error) => {
      if (error.message === 'Request failed with status code 400') {
        dispatch({ type: 'SET_NOTIFICATION', payload: 'Your anecdote must be at least 5 characters' })
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
