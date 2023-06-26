import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getAllTodos, clearError } from '../redux/actions';

// Create a selector
const selectTodos = createSelector(
  (state) => state.todos.allIds,
  (state) => state.todos.byId,
  (allIds, byId) => allIds.map((id) => byId[id])
);

export function useFetchTodos() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const error = useSelector((state) => state.todos.error);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        await dispatch(clearError());
        await dispatch(getAllTodos());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [dispatch]);

  const clearApiError = () => dispatch(clearError());

  return { todos, loading, error, clearApiError };
}
