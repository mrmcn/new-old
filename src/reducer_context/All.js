import { TasksFiltersProvider } from "./FilterContext";
import { TasksProvider } from "./TasksReducer";

export function AllProvider({ children }) {
  return (
    <TasksFiltersProvider>
      <TasksProvider>{children}</TasksProvider>
    </TasksFiltersProvider>
  );
}
