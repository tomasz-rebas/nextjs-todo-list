"use client";

import { useState } from "react";
import { Filter, ToDo } from "../types";
import { ToDoElement } from "./ToDoElement";
import { Filtering } from "./Filtering";

interface Props {
  initialData: ToDo[];
  error: string | null;
}

export const ToDoList = ({ initialData, error }: Props) => {
  const [toDos, setToDos] = useState<ToDo[]>(initialData);
  const [filter, setFilter] = useState<Filter>("All");

  const filteredTodos = toDos.filter((element) => {
    if (filter === "Completed") return element.completed;
    if (filter === "Unfinished") return !element.completed;
    return true;
  });

  if (error) {
    return <p className="text-red-800 font-bold">{error}</p>;
  }

  if (initialData.length === 0 && !error) {
    return <p>No tasks available.</p>;
  }

  return (
    <>
      <Filtering filter={filter} setFilter={setFilter} />
      <div className="flex flex-col items-start pb-12">
        {filteredTodos.map((toDo) => (
          <ToDoElement key={toDo.id} toDo={toDo} setToDos={setToDos} />
        ))}
      </div>
    </>
  );
};
