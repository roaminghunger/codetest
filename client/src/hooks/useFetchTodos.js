import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, clearError } from '../redux/actions';

export function useFetchTodos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.allIds.map((id) => state.todos.byId[id]));
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
