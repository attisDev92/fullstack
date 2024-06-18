
const Anecdote = ({ anecdote, voteFn }) => {

  return (
    <>
      <p>{anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Link: {anecdote.info}</p>
      <p>
        Votes: {anecdote.votes}
        <button onClick={() => voteFn(anecdote.id)}>vote</button>
      </p> 
    </>
  )
}

export default Anecdote