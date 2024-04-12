import TaskItem from "../TasksItem/TaskItem.jsx";
import style from "./TaskList.module.sass";
import { useContext } from "react";
import { TasksContext } from "../../../views/myTasks/MyTasksView.jsx";

const TaskList = () => {
  const { tasks } = useContext(TasksContext);

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
