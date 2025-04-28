"use client";

import { useState } from "react";
import { Filter, ToDo } from "../types";
import Filtering from "./Filtering";
import ToDoElement from "./ToDoElement";

interface Props {
  data: ToDo[];
  error: string | null;
}

export default function ToDoList({ data, error }: Props) {
  const [toDos, setToDos] = useState<ToDo[]>(data);
  const [filter, setFilter] = useState<Filter>("All");

  const filteredTodos = toDos.filter((element) => {
    if (filter === "Completed") return element.completed;
    if (filter === "Unfinished") return !element.completed;
    return true;
  });

  if (error) {
    return <p className="text-red-800 font-bold text-center">{error}</p>;
  }

  if (data.length === 0 && !error) {
    return <p className="text-center">No tasks available.</p>;
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
}
