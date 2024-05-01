import { useContext } from 'react';
import { TasksContext } from './path/to/TasksContext';

export const useTasks = () => useContext(TasksContext);