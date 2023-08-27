import { useReducer } from "react";
import { createContext } from "react";
import { useContext } from "react";

const TasksContext = createContext(null);
const DispatchContext = createContext(null);

export function useTasks() {
  return useContext(TasksContext);
}
export function useDispatch() {
  return useContext(DispatchContext);
}
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, DATA);
  return (
    <TasksContext.Provider value={tasks}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [...tasks, action.task];
    }
    case "edited": {
      return tasks.map((task) => {
        if (task.id === action.task.id) return action.task;
        else return task;
      });
    }
    case "deleted": {
      return tasks.filter((task) => task.id !== action.id);
    }
    default:
      throw Error("Unknow type: " + action.type);
  }
}

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];
