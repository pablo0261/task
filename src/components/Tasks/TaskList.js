import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>Status: {task.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
