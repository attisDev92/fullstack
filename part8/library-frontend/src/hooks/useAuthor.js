import { useMutation } from "@apollo/client";
import { EDIT_BORN } from "../Graphql/authorQueries";
import { ALL_AUTHORS } from "../Graphql/authorQueries";

export const useEditAuthor = () => {

  const [editAuthorBorn, { error }] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error),
  });

  return {
    editAuthorBorn,
    error
  }
}