import { nanoid } from "nanoid";
import {
  useFilterContext,
  useFilterMapContext,
  useSetFilter,
} from "../reducer_context/FilterContext";

export function Btns() {
  const FILTER_MAP = useFilterMapContext();
  const filter = useFilterContext();
  const setFilter = useSetFilter();
  const filterBtns = FILTER_MAP.map((filterName) => (
    <button
      key={nanoid()}
      type="button"
      className="btn toggle-btn"
      aria-pressed={filter === filterName.name}
      onClick={() => {
        setFilter(filterName.name);
      }}
    >
      <span className="visually-hidden">Показати </span>
      <span>{filterName.transl}</span>
      <span className="visually-hidden"> завдання</span>
    </button>
  ));

  return <div className="filters btn-group stack-exception">{filterBtns}</div>;
}
