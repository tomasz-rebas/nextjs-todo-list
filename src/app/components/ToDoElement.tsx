import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ToDo } from "../types";

interface Props {
  toDo: ToDo;
  setToDos: Dispatch<SetStateAction<ToDo[]>>;
}

export const ToDoElement = ({ toDo, setToDos }: Props) => {
  const { id, completed, title } = toDo;

  const handleChange = (_: ChangeEvent) => {
    setToDos((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, completed: !completed } : element
      )
    );
  };

  return (
    <div className="py-2">
      <label className="flex gap-2" htmlFor={`todo_${id}`}>
        <input
          className="w-5 h-5 mt-1 shrink-0"
          type="checkbox"
          id={`todo_${id}`}
          name={`todo_${id}`}
          checked={completed}
          onChange={handleChange}
        />
        <span className="text-[1.2em]">{title}</span>
      </label>
    </div>
  );
};
