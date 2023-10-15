import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('container'));

const Button = ( {name, handlerClick} ) => <button onClick={handlerClick}>{name}</button>;

const MostVotes = () => {
  
}

const App = ({ anecdotes }) => {

  const [numbers, setNumbers] = useState({
    index: 0,
    points: Array(anecdotes.length).fill(0)
  });

  const mostVotes = numbers.points.indexOf(Math.max(...numbers.points));

  const nextAnecdote = () => {
    const number = Math.floor(Math.random() * anecdotes.length);
    setNumbers({ ...numbers, index: number });
  };

  const voteAnecdote = () => {
    const copyPoints = [...numbers.points];
    copyPoints[numbers.index] = copyPoints[numbers.index] + 1;
    setNumbers({ ...numbers, points: copyPoints });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[numbers.index]}</p>
      <p>has {numbers.points[numbers.index]}</p>
      <Button name='next anecdote' handlerClick={nextAnecdote} />
      <Button name='vote' handlerClick={voteAnecdote} />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

root.render(<App anecdotes={anecdotes}/>);
