import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/actions';

export function useDeleteTodo() {
  const dispatch = useDispatch();

  const removeTodo = async (id) => {
    try {
      await dispatch(deleteTodo(id));
    } catch (err) {
      console.error(err);
    }
  };

  return { removeTodo };
}
