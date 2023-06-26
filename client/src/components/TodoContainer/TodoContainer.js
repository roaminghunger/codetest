import React from 'react';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import TodoList from '../TodoList/TodoList';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useFetchTodos } from '../../hooks/useFetchTodos';
import '../../styles/TodoContainer.scss';

export default function TodoContainer() {
  const { todos, loading, error, clearApiError } = useFetchTodos();

  if (loading) {
    return <LoadingIndicator />; // Display a loading indicator if fetching is in process
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
        <button onClick={clearApiError}>Close</button>{' '}
      </div>
    );
  }

  return (
    <div className="TodoContainer">
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
