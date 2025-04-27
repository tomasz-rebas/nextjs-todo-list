import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Filter } from "../types";

interface Props {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export const Filtering = ({ filter, setFilter }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value.toUpperCase() as Filter;
    setFilter(newFilter);
  };

  return (
    <div className="mb-4">
      <select
        className="border rounded px-3 py-2"
        defaultValue={filter}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="unfinished">Unfinished</option>
      </select>
    </div>
  );
};
