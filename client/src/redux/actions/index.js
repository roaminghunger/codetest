import axios from 'axios';

import { ADD_NEW_TODO, GET_ALL_TODO, TOGGLE_TODO, UPDATE_TODO, DELETE_TODO, API_ERROR, CLEAR_ERROR } from './type';

const API_URL = 'http://localhost:8080';

export const addNewTodo = (data) => async (dispatch) => {
  try {
    const { data: resData } = await axios.post(`${API_URL}/todos`, { data });
    dispatch({ type: ADD_NEW_TODO, payload: resData });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const getAllTodos = () => async (dispatch) => {
  try {
    const { data: resData } = await axios.get(`${API_URL}/todos`);

    dispatch({ type: GET_ALL_TODO, payload: resData });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const toggleTodo = (id) => async (dispatch, getState) => {
  const currentDoneStatus = getState().todos.byId[id].done;
  try {
    const { data: resData } = await axios.patch(`${API_URL}/todos/${id}`, { done: !currentDoneStatus });
    dispatch({ type: TOGGLE_TODO, payload: resData });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const updateTodo = (id, data) => async (dispatch) => {
  console.log('Updating todo at URL', `${API_URL}/todos/${id}`);
  try {
    const { data: resData } = await axios.patch(`${API_URL}/todos/${id}`, { data });
    dispatch({ type: UPDATE_TODO, payload: resData });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const { data: resData } = await axios.delete(`${API_URL}/todos/${id}`);

    dispatch({ type: DELETE_TODO, payload: resData });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});
