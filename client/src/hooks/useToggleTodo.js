// hooks/useToggleTodo.js
import { useDispatch } from 'react-redux';
import { toggleTodo } from '../redux/actions';

export function useToggleTodo() {
  const dispatch = useDispatch();

  const toggleTodoStatus = async (id) => {
    try {
      await dispatch(toggleTodo(id));
    } catch (err) {
      console.error(err);
    }
  };

  return { toggleTodoStatus };
}
