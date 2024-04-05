import TaskItem from '../TasksItem/TaskItem.jsx';
import { useTasks } from '../../../views/myTasks/MyTasksView.jsx';
import style from './TaskList.module.sass';
import NabBar from '../../NabBar/NabBar.jsx';

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div className={style.taskList}>
      <NabBar/>
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
