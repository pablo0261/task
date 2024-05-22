import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../../views/myTasks/MyTasksView";
import PropTypes from "prop-types";
import styles from "./TaskItem.module.sass";
import editIcon from "../../../images/iconEdit4.png";
import EditTaskForm from "../../Tasks/EditTasks/EditTasks";
import iconoDelete from "../../../images/iconDelete2.png";
import enlargeIcon from "../../../images/enlargeIcon.png";
import decreaseIcon from "../../../images/decreaseIcon.png";
import CloudinaryUploadWidget from "../../cloudinary/CloudinaryUploadWidget.jsx";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

const TaskItem = ({ task }) => {
  console.log("task:",task)
  const { task_id, title, description, user, status, upload } = task;
  const { handleUpdateTask, handleDeleteTask, admin } =
    useContext(TasksContext);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [taskData, setTaskData] = useState({
    task_id: task_id,
    title: title,
    description: description,
    user: user,
    status: status,
    upload: upload,
  });
  const name = task.user?.username || "Unknown";
console.log("taskdata:", taskData)
  //*-------CLOUDINARY---------//

  const [publicId, setPublicId] = useState(upload);
  const [cloudName] = useState("hzxyensd5");
  const [uploadPreset] = useState("aoh4fpwm");
  console.log("publicId:", publicId);

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  //*-------HASTA AQUI CLOUDINARY---------//

  useEffect(() => {
    setCurrentStatus(task.status);
    setTaskData(task);
  }, [task]);

  // useEffect(() => {
  //   setPublicId(taskData.upload);
  // }, [taskData.upload]);


  const onUploadSuccess = (newPublicId) => {
    const updatedTask = {
      ...taskData,
      upload: newPublicId,
    };
    setTaskData(updatedTask);
    setPublicId(newPublicId);
    console.log("estoy en handleUploadSuccess")
    handleUpdateTask(task_id, updatedTask); 
  };

  const handleStatusChange = (task_id, e) => {
    const newStatus = e ? e.target.value : currentStatus;
    const updatedTask = {
      ...taskData,
      status: newStatus,
    };
    setCurrentStatus(newStatus);
    setTaskData(updatedTask);
    handleUpdateTask(task_id, updatedTask);
    console.log("Entre al handleStatusChange:", task_id, e, updatedTask);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#a8aa17"; // Amarillo
      case "In_Progress":
        return "#2e801e"; // Verde
      case "Blocked":
        return "#ad3838"; // Rojo
      case "Completed":
        return "#01004E"; // Azul oscuro
      default:
        return "#000"; // Por defecto negro
    }
  };

  const selectStyle = {
    backgroundColor: getStatusColor(currentStatus), // Cambia el fondo
    color: "#fff",
  };

  return (
    <div
      key={task_id}
      className={`${styles.taskItem} ${expanded ? styles.expanded : ""}`}
    >
      <div className={styles.containerLeft}>
        <div className={styles.containerLeftTitleLine}>
          <h2 className={styles.title}>{taskData.title}</h2>
          {expanded ? (
            <img
              className={styles.decreaseCard}
              src={decreaseIcon}
              alt={"Edit"}
              onClick={toggleDescription}
            />
          ) : (
            <img
              className={styles.enlargeCard}
              src={enlargeIcon}
              alt={"Edit"}
              onClick={toggleDescription}
            />
          )}
        </div>
        <div className={styles.description}>
          <p>{taskData.description}</p>{" "}
        </div>
      </div>

      <div className={styles.containerRight}>
        <div className={styles.assigned}>
          <p className={styles.assignedTitle}>Assigned To:</p>
          <p className={styles.assignedUser}>{name ? name : "Unknown"}</p>
        </div>
      </div>
      <select
        className={styles.status}
        value={currentStatus}
        onChange={(e) => handleStatusChange(task_id, e)}
        style={selectStyle}
      >
        <option value="Pending">Pending</option>
        <option value="In_Progress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="Completed">Completed</option>
      </select>
      {admin && (
        <div className={styles.divButton}>
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            onUploadSuccess={onUploadSuccess}
          />

          <img
            className={styles.iconDelete}
            src={iconoDelete}
            alt={"Eliminar"}
            onClick={() => handleDeleteTask(task_id)}
          ></img>
          <img
            className={styles.editButton}
            src={editIcon}
            alt={"Edit"}
            onClick={toggleFormVisibility}
          />
        </div>
      )}
      {showForm && <EditTaskForm taskToEdit={task} setShowForm={setShowForm} />}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    status: PropTypes.oneOf(["Pending", "In_Progress", "Blocked", "Completed"]),
    upload: PropTypes.string,
  }),
};

export default TaskItem;
