import * as actionTypes from '../actions/type';

const initialState = {
  byId: {}, // Stores todos keyed by their id for quick access
  allIds: [], // List of all todo ids for ordered traversal
  error: null, // Store errors that might occur during API actions
};

export const todosReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_TODO:
      // Add new todo to 'byId' object and its id to 'allIds' array
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
        allIds: [...state.allIds, action.payload._id],
      };

    case actionTypes.GET_ALL_TODO:
      // Populate 'byId' object and 'allIds' array with received todos
      const byId = {};
      const allIds = [];
      action.payload.forEach((todo) => {
        byId[todo._id] = todo;
        allIds.push(todo._id);
      });
      return { byId, allIds };

    case actionTypes.TOGGLE_TODO:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: {
            ...state.byId[action.payload._id],
            done: !state.byId[action.payload._id].done,
          },
        },
      };

    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
      };

    case actionTypes.DELETE_TODO:
      const { [action.payload._id]: deletedTodo, ...remainingById } = state.byId;
      const remainingAllIds = state.allIds.filter((id) => id !== action.payload._id);
      return { byId: remainingById, allIds: remainingAllIds };

    case actionTypes.API_ERROR:
      return {
        ...state,
        error: action.payload, // store the error message
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null, // Clear the error
      };

    default:
      return state;
  }
};

// An example of state shape
// {
//   byId: {
//     '1': {
//       _id: '1',
//       data: 'Todo Item 1',
//       done: false,
//       createdAt: '2023-01-01T00:00:00Z'
//     },
//     '2': {
//       _id: '2',
//       data: 'Todo Item 2',
//       done: true,
//       createdAt: '2023-01-02T00:00:00Z'
//     },
//     // ... other todos
//   },
//   allIds: ['1', '2'] // ... other ids,
//   error: null,
// }
