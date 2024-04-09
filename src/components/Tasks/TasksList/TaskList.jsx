import TaskItem from '../TasksItem/TaskItem.jsx';
import { useSelector } from 'react-redux';
import style from './TaskList.module.sass';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);

  const taskIds = tasks.map(task => task.task_id);
const duplicateIds = taskIds.filter((id, index) => taskIds.indexOf(id) !== index);

console.log('IDs duplicados:', duplicateIds);

  return (
    <div className={style.taskList}>
      {/* <NabBar/> */}
      <div className={style.ulTask}>
        {tasks.map(task => (
          <TaskItem
            key={task.id} 
            task={task}
          />
        ))}
      </div>
    </div>
  );
};


export default TaskList;
