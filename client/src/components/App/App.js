import React from 'react';
import TodoContainer from '../TodoContainer/TodoContainer';
import '../../styles/App.scss';

function App() {
  return (
    <div className="App">
      <TodoContainer data-testid="todo-container" />
    </div>
  );
}

export default App;
