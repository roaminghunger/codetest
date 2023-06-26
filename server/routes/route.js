import express from 'express';
import { addTodo, getAllTodos, updateTodo, deleteTodo, getTodo } from '../controller/todo-controller.js';

const route = express.Router();

route.post('/todos', addTodo);
route.get('/todos', getAllTodos);
route.get('/todos/:id', getTodo);
route.patch('/todos/:id', updateTodo);
route.delete('/todos/:id', deleteTodo);

export default route;
