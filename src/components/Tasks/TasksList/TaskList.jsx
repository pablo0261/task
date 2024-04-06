import TaskItem from '../TasksItem/TaskItem.jsx';
import { useTasks } from '../../../views/myTasks/MyTasksView.jsx';
import style from './TaskList.module.sass';
// import NabBar from '../../NabBar/NabBar.jsx';

const TaskList = () => {
  const { tasks } = useTasks();

  const taskIds = tasks.map(task => task.id);
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
