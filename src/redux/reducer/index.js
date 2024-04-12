import { combineReducers } from "redux";

import {
  ADD_TASK,
  GET_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  GET_USERS,
} from "../actions/action-types";

const initialState = {
  tasks: [],
  users: [],
};


const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case GET_TASK:
      return {
        tasks: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ), 
      };
    case GET_USERS:
      return {
        ...state,
        users: [action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
