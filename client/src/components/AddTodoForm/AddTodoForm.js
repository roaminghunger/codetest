import React, { useState } from 'react';
import { useCreateTodo } from '../../hooks/useCreateTodo';
import '../../styles/AddTodoForm.scss';

export default function AddTodoForm() {
  const [value, setValue] = useState('');
  const { createTodo } = useCreateTodo();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.trim()) {
      createTodo(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="AddTodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
