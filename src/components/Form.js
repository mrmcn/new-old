import { useState } from "react";
import { useDispatch } from "../reducer_context/TasksReducer";
import { nanoid } from "nanoid";

export function Form() {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <h1>ШайтанApp</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTask !== "") {
            dispatch({
              type: "added",
              task: { id: nanoid(), name: newTask, completed: false },
            });
          } else alert("Нове завдання повинно мати назву");
          setNewTask("");
        }}
      >
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Додати нове завдання?
          </label>
        </h2>
        <input
          value={newTask}
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Додати
        </button>
      </form>
    </>
  );
}
