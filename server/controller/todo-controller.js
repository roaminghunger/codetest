import Todo from '../model/Todo.js';

export const addTodo = async (request, response) => {
  try {
    const newTodo = new Todo(request.body);
    const savedTodo = await newTodo.save();

    response.json(savedTodo);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred while adding the todo item.' });
  }
};

export const getAllTodos = async (request, response) => {
  try {
    const todos = await Todo.find({}).sort({ 'createdAt': 1 }); //newly created todo item will appear at the rear of the returned array
    response.json(todos);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred while fetching all todo items.' });
  }
};

export const updateTodo = async (request, response) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true } // returns the updated document
    );
    console.log('updatedTodo:', updatedTodo);

    if (!updatedTodo) {
      response.status(404).json({ message: 'No todo item found with the given id.' });
    } else {
      response.json(updatedTodo);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred while updating the todo item.' });
  }
};

export const deleteTodo = async (request, response) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(request.params.id);

    if (!deletedTodo) {
      response.status(404).json({ message: 'No todo item found with the given id.' });
    } else {
      response.json(deletedTodo);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred while deleting the todo item.' });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'No todo item found with the given id.' });

    return res.json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the todo item.' });
  }
};
