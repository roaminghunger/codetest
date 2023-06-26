import { useDispatch } from 'react-redux';
import { addNewTodo } from '../redux/actions';

export function useCreateTodo() {
  const dispatch = useDispatch();

  const createTodo = async (value) => {
    try {
      if (value.trim()) {
        await dispatch(addNewTodo(value));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { createTodo };
}
