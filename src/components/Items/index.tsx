import React from "react";
import styles from "./items.module.scss";

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hooks";
import { editTask, remove } from "../../redux/todoSlice";

interface IProps {
  title: string;
  id: string;
  date: string;
}

export const TodoItem: React.FC<IProps> = ({ title, id, date }) => {
  const [complate, setComplate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [value, setValue] = React.useState("");
  const dispach = useAppDispatch();

  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleDelete = () => {
    dispach(remove(id));
  };

  const handleComplate = () => {
    setComplate((prev) => !complate);
  };
  const handleEdit = () => {
    const newData = {
      id: id,
      title: value,
    };

    dispach(editTask(newData));
    setValue("");
    if (value !== "") {
      setShowEdit(false);
    }
  };
  const editToggle = () => {
    setShowEdit((prev) => !showEdit);
  };

  return (
    <div>
      <h3>
        <span>{date}: </span>
        <span className={complate ? styles.finish : " "}>{title}</span>
        <span
          onClick={editToggle}
          style={{ fontSize: "25px", color: "blue", cursor: "pointer" }}
        >
          {" "}
          <AiFillEdit />
        </span>
        <span
          style={{ fontSize: "25px", color: "red", cursor: "pointer" }}
          onClick={handleDelete}
        >
          {" "}
          <AiFillDelete />
        </span>
        <button onClick={handleComplate} className={styles.complateBtn}>
          {complate ? "Complated" : "Complate"}
        </button>
      </h3>
      {showEdit && (
        <>
          <span>Edit title </span>
          <input type="text" value={value} onChange={handleChangeEdit} />
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};
