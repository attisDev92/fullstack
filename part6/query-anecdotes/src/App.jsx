import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./request.js";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotification } from "./notificationContext.js";

const App = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdoteUpdated) => {
      queryClient.invalidateQueries(["anecdotes"]);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `you voted for "${anecdoteUpdated.content}"`,
      });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 2,
  });

  if (result.isPending) return <div>loading data...</div>;
  if (result.isError)
    return <div>anecdote service not available due to problem in server</div>;

  const anecdotes = result.data;

  return (
    <>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default App;
