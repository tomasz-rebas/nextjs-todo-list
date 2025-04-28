import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Filter } from "../types";

interface Props {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export default function Filtering({ filter, setFilter }: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as Filter);
  };

  return (
    <div className="flex justify-end mb-4">
      <select
        className="border rounded px-3 py-2 w-full sm:w-auto"
        value={filter}
        onChange={handleChange}
        data-testid="filtering-select"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Unfinished">Unfinished</option>
      </select>
    </div>
  );
}
