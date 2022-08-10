import React from "react";
import styles from "./todo.module.scss";

import { addTask, deleteAllTasks } from "../../redux/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TodoItem } from "../Items";
import { useLocation, useNavigate } from "react-router-dom";

export const Todo: React.FC = () => {
  const dispach = useAppDispatch();
  const [value, setValue] = React.useState<string>("");
  const [date, setDate] = React.useState("");
  const todos = useAppSelector((state) => state.todo.items);
  const taskCount = useAppSelector((state) => state.todo.taskCount);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleClick = () => {
    if (value !== "" && date !== "") {
      const newTasks = {
        id: uuidv4(),
        title: value,
        date: date,
      };
      dispach(addTask(newTasks));
      setValue("");
    }
  };

  const handleGetTasks = () => {
    navigate("/tasks");
  };

  const goBack = () => {
    navigate("/");
  };

  const deleteAll = () => {
    dispach(deleteAllTasks());
  };

  return (
    <div className={styles.content}>
      <p className={styles.content__title}>Todo List</p>
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={styles.input}
        />

        <input type="date" onChange={handleChangeDate} />

        <button className={styles.btn} onClick={handleClick}>
          ADD
        </button>
      </div>

      <div>
        {pathname === "/tasks" ? (
          ""
        ) : (
          <button className={styles.showBtn} onClick={handleGetTasks}>
            Show tasks ({taskCount})
          </button>
        )}

        {pathname === "/tasks" ? (
          <div>
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                title={item.title}
                id={item.id}
                date={item.date}
              />
            ))}
            <button className={styles.btnBack} onClick={goBack}>
              Go back
            </button>
            <button className={styles.btnDeleteAll} onClick={deleteAll}>
              Delete All
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
