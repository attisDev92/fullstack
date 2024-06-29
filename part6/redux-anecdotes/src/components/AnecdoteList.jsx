import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const anecdotesList =
    filter === ""
      ? anecdotes
      : anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );

  const handleVote = (id, content) => {
    dispatch(addVote(id)).then(() =>
      dispatch(
        setNotification({ message: `you voted for "${content}"`, time: 4000 })
      )
    );
  };

  return (
    <>
      {anecdotesList.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          handleVote={handleVote}
          key={anecdote.id}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
