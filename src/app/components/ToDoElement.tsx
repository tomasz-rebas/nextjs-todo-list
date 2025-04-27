import { ToDo } from "../types";

interface Props {
  toDo: ToDo;
}

export const ToDoElement = ({ toDo }: Props) => {
  return (
    <div className="w-[500px] mw-[500px] py-2">
      <label className="flex gap-2" htmlFor={`todo_${toDo.id}`}>
        <input
          className="w-5 h-5 mt-1 shrink-0"
          type="checkbox"
          id={`todo_${toDo.id}`}
          name={`todo_${toDo.id}`}
          defaultChecked={toDo.completed}
        />
        <span className="text-[1.2em]">{toDo.title}</span>
      </label>
    </div>
  );
};
