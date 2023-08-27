import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);
const SetFilterContext = createContext(null);
const FilterMapContext = createContext(null);

export function useFilterContext() {
  return useContext(FilterContext);
}
export function useFilterMapContext() {
  return useContext(FilterMapContext);
}
export function useSetFilter() {
  return useContext(SetFilterContext);
}
export function TasksFiltersProvider({ children }) {
  const [filter, setFilter] = useState("All");

  return (
    <FilterMapContext.Provider value={FILTER_MAP}>
      <FilterContext.Provider value={filter}>
        <SetFilterContext.Provider value={setFilter}>
          {children}
        </SetFilterContext.Provider>
      </FilterContext.Provider>
    </FilterMapContext.Provider>
  );
}

const FILTER_MAP = [
  {
    name: "All",
    transl: "Усі",
  },
  {
    name: "Active",
    transl: "Активні",
  },
  {
    name: "Completed",
    transl: "Виконані",
  },
];
