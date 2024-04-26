import TaskItem from "../TasksItem/TaskItem.jsx";
import style from "./TaskList.module.sass";
import { useSelector } from "react-redux";

const TaskList = () => {

  const tasks = useSelector(state => state.tasks.tasks);
  return (
    <div className={style.taskList}>
      {/* <NabBar/> */}
      <div className={style.ulTask}>
        {tasks.map(task => (
           <TaskItem key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
