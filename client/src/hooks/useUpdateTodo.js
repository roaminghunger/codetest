import { useDispatch } from 'react-redux';
import { updateTodo } from '../redux/actions';

export function useUpdateTodo() {
  const dispatch = useDispatch();

  const updateTodoData = async (id, editedContent) => {
    try {
      if (editedContent.trim()) {
        return dispatch(updateTodo(id, editedContent));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return { updateTodoData };
}
