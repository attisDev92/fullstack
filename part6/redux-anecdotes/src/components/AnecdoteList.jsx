import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setNotificationVote, clearNotification } from '../reducers/notificationReducer';
import { useEffect, useState } from 'react';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  
  const anecdotesList = filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
  
  const handleVote = (id, content) => {
    dispatch(incrementVote(id));
    dispatch(setNotificationVote(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotesList.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
