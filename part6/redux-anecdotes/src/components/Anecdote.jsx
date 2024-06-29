const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  );
};

export default Anecdote;
