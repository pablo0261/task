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

  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("hzxyensd5");
  // Replace with your own upload preset
  const [uploadPreset] = useState("aoh4fpwm");
  console.log("publicId:", publicId);
  // Upload Widget Configuration
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  //*-------HASTA AQUI CLOUDINARY---------//

  useEffect(() => {//* Actualiza la card cada vez que cambia los valores el padre
    setCurrentStatus(task.status);
    setTaskData({
      task_id: task_id,
      title: title,
      description: description,
      user: user,
      status: status,
      upload: publicId,
    });
  }, [task]);

  useEffect(() => {//* Actualiza la card cuando se carga un documento a la card
    setCurrentStatus(task.status);
    setTaskData(prevTaskData => ({
      ...prevTaskData,
      upload: publicId,
    }));
    handleStatusChange(task_id);
    console.log("Entre al useffect 2:", task_id);
  }, [publicId]);

  const handleStatusChange = (task_id, e) => {//*actualiza los valores cada vez que se produce un cambio en la card y los envia al redux
    if (e) {
      const newStatus = e.target.value;
      setCurrentStatus(newStatus);
      const updatedTask = {
        task_id,
        title,
        description,
        user,
        status: newStatus,
        upload: publicId,
      };
      handleUpdateTask(task_id, updatedTask);
      console.log("Entre al handleStatusChange:", task_id, e, updatedTask);
    } else{
      handleUpdateTask(task_id, taskData);
    }
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
    upload: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    status: PropTypes.oneOf(["Pending", "In_Progress", "Blocked", "Completed"]),
  }),
};

export default TaskItem;
