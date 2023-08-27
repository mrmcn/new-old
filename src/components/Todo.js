import { useEffect, useRef } from "react";
import { useTasks } from "../reducer_context/TasksReducer";
import { usePrevious } from "../hooks/usePrevious";
import { TaskTemplate } from "./TodoTasksTemplate";
import { useFilterContext } from "../reducer_context/FilterContext";

export function Todo() {
  const h2Ref = useRef(null);
  const tasks = useTasks();
  const filter = useFilterContext();
  const listTodo = tasks.filter(action()).map((task) => (
    <li key={task.id} className="todo stack-small">
      <TaskTemplate task={task} />
    </li>
  ));
  const numOfTasks = listTodo.length;
  const taskOrTasks =
    (numOfTasks > 0) & (numOfTasks < 5) ? "завдання" : "завдань";
  const prevTasksArrayLength = usePrevious(tasks.length);

  function action() {
    if (filter === "All") {
      return () => true;
    }
    if (filter === "Active") {
      return (f) => !f.completed;
    }
    if (filter === "Completed") {
      return (f) => f.completed;
    }
  }

  useEffect(() => {
    if (tasks.length - prevTasksArrayLength === -1) {
      h2Ref.current.focus();
    }
  }, [tasks.length, prevTasksArrayLength]);

  return (
    <>
      <h2 id="list-heading" tabIndex="-1" ref={h2Ref}>
        {numOfTasks} {taskOrTasks} в цій категорії
      </h2>
      {/*eslint-disable-next-line jsx-a11y/no-redundant-roles*/}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {listTodo}
      </ul>
    </>
  );
}
