import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useDispatch } from "../reducer_context/TasksReducer";

export function TaskTemplate({ task }) {
  const inputEditRef = useRef(null);
  const btnEditViewRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();
  const editingTemplate = (
    <form
      className="stack-small"
      onSubmit={(e) => {
        e.preventDefault();
        if (newName !== "") {
          dispatch({
            type: "edited",
            task: { ...task, name: newName },
          });
        } else alert("Замало букв в новому імені");
        setNewName("");
        setIsEditing(false);
      }}
    >
      <div className="form-group">
        <label className="todo-label" htmlFor={task.id}>
          Нове ім'я для {task.name}
        </label>
        <input
          id={task.id}
          className="todo-text"
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          ref={inputEditRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setIsEditing(false)}
        >
          Відміна
          <span className="visually-hidden">renaming {task.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Зберегти
          <span className="visually-hidden">нове ім'я для {task.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={task.id}
          type="checkbox"
          checked={task.completed}
          onChange={(e) =>
            dispatch({
              type: "edited",
              task: { ...task, completed: e.target.checked },
            })
          }
        />
        <label className="todo-label" htmlFor={task.id}>
          {task.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setIsEditing(true)}
          ref={btnEditViewRef}
        >
          Редагувати <span className="visually-hidden">{task.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() =>
            dispatch({
              type: "deleted",
              id: task.id,
            })
          }
        >
          Видалити <span className="visually-hidden">{task.name}</span>
        </button>
      </div>
    </div>
  );
  const taskTemplate = isEditing ? editingTemplate : viewTemplate;
  const wasEditihg = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditihg && isEditing) {
      inputEditRef.current.focus();
    }
    if (wasEditihg && !isEditing) {
      btnEditViewRef.current.focus();
    }
  }, [wasEditihg, isEditing]);

  return taskTemplate;
}
